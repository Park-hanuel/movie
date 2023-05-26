// 반복문
// 1. for

for(var i=0; i<10; i++)
{
    console.log(i);
}

for(var i=10; i>0; i--)
{
    console.log(i);
}
for(var i=0; i<10; i++)
{
    for(var j=0; j<10; j++)
    {
        console.log('${i}-${j}');
    }
}

// 2. while -> 횟수가 정해지지 X 때 쓰면 좋음
var flag =10;
while (flag>0)
{
    console.log(flag); //무한 반복을 멈춰야 불필요 줄일 수 ㅇ
    flag--;
}

// 3. do...while

var flag =10; // do-while은 참/거짓에 상관없이 식을 한 번은 돌림.
do {
    console.log(flag);
    flag--;
} while (flag<0); // do-while은 ; 뒤에 꼭 붙이기
