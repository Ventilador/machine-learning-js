#include <v8.h>
using namespace v8;

void Mean(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsArray())
    {
        return;
    }
    Local<Array> array = Local<Array>::Cast(args[0]);

    double result = 0;
    unsigned int size = array->Length();
    for (unsigned int i = 0; i < size; i++)
    {
        if (array->Has(i))
        {
            Local<Value> v = array->Get(i);
            result += v->NumberValue();
        }
        else
        {
            return;
        }
    }

    args.GetReturnValue().Set(Number::New(isolate, result / size));
}

void init(Local<Object> exports)
{
    NODE_SET_METHOD(exports, "Mean", Mean);
}

NODE_MODULE(cMath, init)