/**
 * 배열
 * -복수의 데이터를 순서대로 담고 있는 자료구조
 * -배열의 순서는 0부터 시작
 * -키=> 인덱스, 값=> 요소
 */

var mbti = ['INFP', 'ENFJ', 'INTJ'];
console.log(mbti[0]);
console.log(mbti.length); // 3 반환, 배열 요소 개수

mbti[3]='ESFP';
console.log(mbti.length); // 4 반환

mbti[2]='ISTJ';
console.log(mbti[2]); // 'ISTJ'로 덮어씌워짐

// push()
console.log(mbti.pushmbti.push('ESFP', 'ISTJ')); // 5반환

// 스프레드 문법
var newMbti=[...mbti, 'ESFP', 'ISTJ'];
console.log(mbti);
console.log(newmbti);
//질문: 드래그 한 부분 주석 다는 거 어떻게 하나요?

// pop()
console.log(mbti.pop());
console.log(mbti);

// unshift()
// 배열의 앞쪽에 요소를 추가하는 함수
console.log(mbti.unshift('ESFP', 'ISTJ'));
console.log(mbti);

// shift()
console.log(mbti.shift());

//slice()
console.log(mbti.slice());
console.log(mbti.slice(-1)); // -1은 맨 마지막 요소 반환

// join()
console.log(mbti.join());
console.log(mbti.join('-'));
console.log(mbti.join('|'));
console.log(mbti.join(''));

// sort()
console.log(mbti.sort()); // 오름차순

// reverse()
console.log(mbti.sort().reverse()); // 내림차순

