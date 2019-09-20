const lamda =  require("./lamda.js");

// array methods
// lamda.each([15, 23, 39, 88, 56], console.log);

// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// const array = lamda.map(nums, (el, i) => el**i);
// lamda.each(array, console.log)

// const array2 = lamda.filter(nums, (el) => el % 2 == 0); 
// lamda.each(array2, console.log);

// const array3 = lamda.reject(nums, (el) => el % 2 == 0);
// lamda.each(array3, console.log);


// looping methods
lamda.while(
    (a = 0, b = 10) => (a < b), // condition
    (a = 0, b = 10) => {  // body
        console.log(`${a} < ${b},\n`); 
        return [a + 1, b] 
    },
);

lamda.times(5, i => console.log(`i = ${i},\n`));

lamda.for(0, 5, 2, j => console.log(`j = ${j},\n`));


// range
const R = lamda.range(1, 10, 2);
lamda.each(R, k => console.log(`k = ${k},\n`));