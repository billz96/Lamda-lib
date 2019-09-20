const lamda = {};

lamda.head = ([x, ..._]) => x;

lamda.tail = ([_, ...xs]) => xs;

lamda.reverse = ([x, ...xs]) => x ? [lamda.reverse([...xs]), x] : [];

lamda.init = (array) => array ? lamda.tail(lamda.reverse(array)) : [];

lamda.each = ([x, ...xs], fn, index = 0) => {
    if (!x) return;
    fn(x, index); 
    lamda.each(xs, fn, index + 1);
};

lamda.map = ([x, ...xs], fn, result=[], index=0) => {
    if (!x) return result;
    result.push(fn(x, index));
    lamda.map(xs, fn, result, index + 1);
};

lamda.filter = ([x, ...xs], fn, result = [], index = 0) => {
    if (!x) return result;
    if (fn(x, index)) {
        result.push(x);
        lamda.filter(xs, fn, result, index + 1);
    }
};

lamda.reject = (array, fn) => lamda.filter(array, (el, i) => !fn(el, i));

lamda.partition = (array, fn) => [lamda.filter(array, fn), lamda.reject(array, fn)];

lamda.fold = ([x, ...xs], fn, value=x, index=0) => {
    if (!x) return value;
    let newValue = fn(value, x, index);
    lamda.fold(xs, fn, newValue, index + 1);
};

lamda.foldRight = (array, fn, init = array[array.length-1]) => {
    return lamda.fold(array.reverse(), fn, init);
};

lamda.pipe = (...fns) => {
    return lamda.fold(fns, (acc, fn) => (x) => acc(fn(x)));
}

lamda.pipeRight = (...fns) => {
    return lamda.pipe(...fns.reverse());
}

lamda.first = (n, array) => lamda.filter(array, (el, i) => i <= (n-1));

lamda.last = (n, array) => lamda.filter(lamda.reverse(array), (el, i) => i <= (n - 1));

lamda.takeWhile = ([x, ...xs], fn, result=[]) => {
    if (!x) return result;

    const elem = array[index];
    if (!fn(elem)) return result;
    
    result.push(elem);
    lamda.takeWhile(xs, fn, result);
}

lamda.count = ([x, ...xs], len = 0) => x ? lamda.count(xs, len + 1) : len;

lamda.sum = ([x, ...xs], sum = 0) => x ? lamda.sum(xs, sum + x) : sum;

lamda.product = ([x, ...xs], p = 1) => x ? lamda.product(xs, p * x) : p;

lamda.times = (n, body) => {
    if (n == 0) return;
    body(n);
    lamda.times(n - 1, body);
};

lamda.while = (cond, body, args) => {
    if (args ? cond(...args) : cond()) {
        lamda.while(cond, body, args ? body(...args) : body());
    }
};

lamda.for = (start, end, step, body=(i)=>{}) => {
    if (start <= end){
        body(start);
        lamda.for(start + step, end, step, body);
    }
    return;
};

lamda.range = (start, end, step = 1, result = []) => {
    if (!start <= end) {
        return result;
    }
    result.push(index);
    lamda.range(start + step, end, step, result);
};

lamda.factorial = (n, acc = 1) => n > 0 ? lamda.factorial(n - 1, n * acc) : acc;

lamda.fibonacci = n => n > 2 ? lamda.fibonacci(n - 1) + lamda.fibonacci(n - 2) : 1;


// functional list
lamda.cons = (...args) => ({ h:lamda.head(args), t:lamda.tail(args) });

lamda.car = ({h, t}) => h;

lamda.cdr = ({ h, t}) => t;

lamda.isList = (arg) => arg.h && arg.t;

lamda.concat = (list1, list2) => {
    return lamda.isList(list1) && lamda.isList(list2) ? 
        lamda.cons(list1.h, list1.t, list2.h, list2.t) : null;
};

lamda.Each = ({h, t}, fn, index=0) => {
    if (h) { 
        fn(h, index); 
        lamda.Each(t, fn, index + 1); 
    }
    return;
};

lamda.Map = ({h, t}, fn, index=0, result=[]) => {
    if (h) {
        result.push(fn(h, index)); 
        lamda.mapFn(t, fn, index+1, result) 
    }
    return result;
};

lamda.Filter = ({h, t}, fn, index=0, result=[]) => {
    if (h) {
        if (fn(h, index)) result.push(h);
        lamda.Filter(t, fn, index + 1, result);
    }
    return result;
};


// lamda calculus functions in js:
// lamda.T = x => y => x

// lamda.F = x => y => y;

// lamda.not = p => p(T)(F);

// lamda.and = p => q => p(q)(p);

// lamda.or = p => q => p(p)(q);

// lamda.eq = p => q => p(p)(lamda.not(q));

// lamda.id = x => x;

module.exports = lamda;