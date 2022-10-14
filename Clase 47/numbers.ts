import { bgWhite, yellow, red, green } from 'https://deno.land/std/fmt/colors.ts';

const myNums = (...nums: number[]): any => {
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    let total = 0;
    for (let i = 0; i < nums.length; i ++) {
        total += nums[i];
    }
    const prom = total / nums.length;

    return {
        max,
        min,
        prom
    };
}
console.log(myNums(3,4,6,2));