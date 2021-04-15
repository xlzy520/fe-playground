const add = (a,b)=>{
  return a + b;
}

console.log(add(1,2), '===========打印的 ------ ', add);

import { add as add1 } from "./helloworld1";


console.log(add1, '===========打印的 ------ ');
