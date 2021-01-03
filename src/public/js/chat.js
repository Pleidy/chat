//即时通讯
$(document).ready(function(){
    // getEmo();
    slideTalk();
    clickEmo();
});
function slideTalk(){
    var t_head = $(".talk-head");
    var t_body = $(".talk-body");
    var t_img = $(".livechat-girl");
    t_img.click(function(){
        t_head.animate({width:'360px'},function(){
            t_body.slideDown()
        });
    });
    t_head.click(function(){
        t_body.slideUp(function () {
            t_head.animate({width:'0'});
        });
    });
    t_img.click(function(){
        t_img.animate({width:'0'},function(){

        });
    });
    t_img.click(function(){
        t_img.animate({width:'60'},function(){

        });
    });
}
function getEmo(){
    var emo_row = $(".talk-emo .row");
    $.getJSON("chat/json/emoName.json","",function(data){
        for (var i=0;i<data.emo_name.length;i++){
            console.log(data.emo_name[i]);
            emo_row.append('<div class="text-center">\n' +
                '<a href="JavaScript:void(0);">\n' +
                '<img class="emoji" src="chat/images/emoji/'+data.emo_name[i]+'.png" onclick="goToContent(this);" alt="" name="'+data.emo_name[i]+'">\n' +
                '</a>\n' +
                '</div>');
        }
    });
}
function clickEmo(){
    var click_emo = $(".click-emo");
    var t_emo = $(".talk-emo");
    var emoji = $(".emoji");
    var flag = 0;
    click_emo.click(function(){
        if(flag==0){//用到了再加载
            getEmo();
            flag=1;
        }
        if(t_emo.css("display")=="none"){
            t_emo.slideDown();
        }else{
            t_emo.slideUp();
        }
    });
    t_emo.click(function(){
        t_emo.hide();
    });
    emoji.parents("a").click(function(){
        console.log("111")
    })
}
function goToContent(a){
    var emoji = a.src;
    var t_content = $(".talk-content");
    var text = '<img class="h-25" src="'+emoji+'" alt="" >';
    t_content.append(text);//直接追加是剪切的效果
};
