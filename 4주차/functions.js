/**
 * 함수
 * -작업의 묶음
 * -코드를 반복해서 작성하는 비효율 줄임
 */

function multiply(a,b)
{
    return a*b;
}

multiply(10,5);
console.log(multiply(10,5));
var result=multiply(435,24);
console.log(result);

// 함수 표현식
/** 
var multiply = function(a,b)
{
    return a*b;
};
console.log(multiply(10,5));
console.log(calc(10,5));

*/

var a=10;
while(true)
{
    var a=1000;
    break;
}

console.log(a);

// 호이스팅

console.log(word);

word="happy";
console.log(word);
var word;

// let
/**
console.log(word);
let word;
word="happy";
console.log(word);
 */

let a=10;
while(true){
    let a=1000; // 블록 밖 a와 무관
    break;
}
console.log(a);

// const

const b=2; // 값이 변하지 않는 값을 const로 선언(ex. 파이)
console.log(b);
b=3;

// const로 선언된 변수에 할당된 객체
const student={
    grade: 1,
    class: 3
};

//student.grade=2;
student={
    num: 20123,
    grade: 2
}
console.log(student);

// 화살표 함수

let plus=(a,b)=>{
    return a+b;
};

// let plus=(a,b)=>a+b;
console.log(plus(2.3));

let print = word => {
    console.log(word);
};

print("Hello!");

let myfunc =() => {
    return 1;
}

console.log(myfuc());

