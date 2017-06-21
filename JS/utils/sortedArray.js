module.exports = sortedList;
function sortedList(comparator, maxLength) {
    if (!arguments.length) {
        this.direction = true;
    } else if (typeof comparator === 'function') {
        this.comparator = comparator;
    } else {
        this.direction = comparator;
    }
    this.maxLength = typeof maxLength === 'number' && maxLength > 1 ? ~~maxLength : 0;
    this.length = 0;
    this.first = this.last = null;
}
sortedList.prototype.comparator = defaultComparator;
sortedList.prototype.forEach = defaultForEach;
sortedList.prototype.getFirst = defaultGetFirst;
sortedList.prototype.slice = defaultSlice;
sortedList.prototype.push = defaultPush;


function defaultPush() {
    let length = arguments.length;
    while (length--) {
        let sum = true;
        const val = arguments[length];
        if (!this.length) {
            this.first = this.last = {
                prev: null,
                next: null,
                value: val
            };
        } else if (this.comparator(val, this.last.value)) {
            if (!this.maxLength || this.length < this.maxLength) {
                const newNode = {
                    next: null,
                    prev: this.last,
                    value: val
                };
                if (this.last === this.first) {
                    this.last = this.first.next = newNode;
                } else {
                    this.last.next = newNode;
                    this.last = newNode;
                }
            } else {
                sum = false;
            }
        } else if (this.comparator(this.first.value, val)) {
            const newNode = {
                prev: null,
                next: this.first,
                value: val
            };
            if (this.last === this.first) {
                this.first = this.last.prev = newNode;
            } else {
                this.first.prev = newNode;
                this.first = newNode;
            }
            if (this.maxLength && this.length === this.maxLength) {
                this.last = this.last.prev;
                this.last.next = null;
                sum = false;
            }
        } else {
            let node = this.first;
            let inserted = false;
            while (!inserted && (node = node.next)) {
                if (this.comparator(node.value, val)) {
                    inserted = true;
                    const newNode = {
                        next: node,
                        prev: node.prev,
                        value: val
                    };
                    node.prev.next = newNode;
                    node.prev = newNode;
                }
            }
            if (this.maxLength && this.length === this.maxLength) {
                this.last = this.last.prev;
                this.last.next = null;
                sum = false;
            }
        }
        if (sum) this.length++;
    }
    return this;
}

function defaultComparator(a, b) {
    return this.direction === a > b;
}

function defaultForEach(cb, context_) {
    if (this.length) {
        let count = 0;
        let context = arguments.length === 2 ? context_ : null;
        let node = this.first;
        do {
            cb.call(context, node.value, count++);
        } while (node = node.next);
    }
}

function defaultGetFirst(count) {
    return this.slice(0, count);
}

function defaultSlice(from_, end_) {
    if (arguments.length === 0 || (from_ === 0 && end_ === this.length)) {
        return sliceAll.apply(this);
    }
    let from = from_ || 0;
    const toReturn = [];
    let end;
    if (end_ && end_ < this.length) {
        end = end_;
        while (end < 0) {
            end += this.length;
        }
    } else {
        end = this.length;
    }
    if (!from) {
        let node = this.first;
        do {
            toReturn.push(node.value);
        } while (++from < end && (node = node.next));
    } else if (from < 0) {

    }
    return toReturn;
}

function sliceAll() {
    let ii = this.length;
    if (!ii) {
        return [];
    }
    const toReturn = new Array(ii);
    let node = this.last;
    do {
        toReturn[--ii] = node;
    } while (node = node.prev);
    return toReturn;
}
