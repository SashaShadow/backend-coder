import { parse } from 'https://deno.land/std@0.95.0/datetime/mod.ts';

const myDate = parse('10-10-2022', 'dd-mm-yyyy');

console.log(myDate);