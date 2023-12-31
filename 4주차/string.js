// 문자열 선언
var greeting = "Hello!";
var farewell = 'bye!';
var myname = '테킷';

var sentence = greeting + '\n' + myname;
console.log(sentence);

console.log(farewell+2); // 2를 알아서 문자로 인식해서 배열로 합쳐줌. 그러니까 에러 X

// 이스케이프 시퀀스
var sentence = greeting+'\n'+myname;
var sentence=greeting+'\t'+myname;
var sentence=greeting+'\''+myname;
var sentence=greeting+"\""+myname;
var sentence=greeting+"\\"+myname;
console.log(sentence);

//템플릿 리터럴
//멀티라인 텍스트 작업 가능, 이스케이프 시퀀스 필요X
var a='안녕하세요! 여러분:';
console.log(a);

var price =1000;
var b = '이 물건은 '+price+'원 입니다.'
console.log(b);

var c = '이 물건은 ${price}원 입니다.'
console.log(c);

var d='이 물건은 ${200+450}원 입니다.';
console.log(d);

// 문자열 함수
var abc="I am Iron man";

//indexOf
//문자열의 특정 값이 시작되는 위치
abc.indexOf("man");
console.log(abc.indexOf("man"));
console.log(abc.indexOf("I"));

//slice
//문자열의 일부를 잘라낼 때
console.log(abc.slice(0,3));
console.log(abc.slice(0,4));

//toUpperCase(), toLowerCase()
console.log(abc.toUpperCase());
console.log(abc.toLowerCase());

// startswith()
var efg = 'This is my car.';
console.log(efg.startsWith('Th'))
console.log(efg.startsWith('th'));

console.log(efg.endsWith('car.'));

// includes()
console.log(efg.includes('is'));
