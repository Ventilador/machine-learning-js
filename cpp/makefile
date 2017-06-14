appname := myapp.exe

CXX := g++
CXXFLAGS := -Wall -g

srcfiles := Math/sum.cpp
objects  := Math/sum.0

all: $(appname)


$(appname): $(objects)
    $(CXX)  $(CXXFLAGS) $(LDFLAGS)  -o $(appname) $(objects) $(LDLIBS)

depend: .depend

.depend: $(srcfiles)
    rm -f ./.depend
    $(CXX) $(CXXFLAGS) -MM $^>>./.depend;

clean:
    rm -f $(objects)

dist-clean: clean
    rm -f *~ .depend

include .depend