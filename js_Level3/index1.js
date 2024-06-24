                                                
$('.tab-button').eq(0).on('click', function(){ 
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(0).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(0).addClass('show');
});  


var button =  $('.tab-button');
var content =  $('.tab-content');

/*
for(let i=0; i<$('.tab-button').length; i++){ 
    button.eq(i).on('click', function(){
       openTap(i);
    }); 
}
*/

$('.list').click(function(e){
    /*if(e.target == document.querySelectorAll('.tab-button')[0]){
        openTap(0);
    }
    */
    console.log((e.target.dataset.id));
    openTap(e.target.dataset.id);

})

function openTap(tap){
    button.removeClass('orange');
    button.eq(tap).addClass('orange');
    content.removeClass('show');
    content.eq(tap).addClass('show');
}