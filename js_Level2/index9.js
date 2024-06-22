/*
버튼 0 누르면
- 모든 버튼에 붙은 orange 클래스명 제거
- 버튼 0에 orange 클래스명 추가
- 모든 div에 붙은 show 클래스명 제거
- div0에 show 클래스명 추가
*/
                                                // .eq(0)은 querySelctorAll('.tab-button')[0]과 같음
$('.tab-button').eq(0).on('click', function(){ // jQuery에서 $는 모든 요소 찾음
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(0).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(0).addClass('show');
});  


var button =  $('.tab-button');
var content =  $('.tab-content');

for(let i=0; i<$('.tab-button').length; i++){ // 반복문 안에 있는 변수를 만들 때 let으로 (cuz 변수의 범위)
    button.eq(i).on('click', function(){
        button.removeClass('orange');
        button.eq(i).addClass('orange');
        content.removeClass('show');
        content.eq(i).addClass('show');
    }); 
}
