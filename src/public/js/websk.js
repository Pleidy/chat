'use strict';

let func = {};

func.from = '';
func.to = '';
func.type = '';
func.headImg = '';
func.curHeadImg = '';
func.tarHeadImg = '';

$(document).ready(function () {
});

/**
 *
 * @param web_sk_url
 */
func.wsConnect = function (web_sk_url) {
    if (func.ws === undefined) {
        func.ws = new WebSocket(web_sk_url);

        func.ws.onopen = function () {
            console.log('连接成功');
        };
        func.ws.onmessage = function (data) {
            func.mycallback(data.data);
            $(".talk-panel").scrollTop($(".talk-panel")[0].scrollHeight);
        };
        func.ws.onclose = function () {
            console.log('连接断开');
        }
    }
};

/**
 *
 * @param url
 */
func.openChat = function (url) {
    var img_src, p_class;
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        data: {
            sole_key: func.from,
            to: func.to,
            type: func.type,
        },
        success: function (item) {
            for (var i = 0; i < item['data'].length; i++) {
                p_class = 'card-text-yonghu';
                img_src = func.curHeadImg;

                if (item['data'][i]['from'].indexOf(func.type) === -1) {
                    img_src = func.tarHeadImg;
                    p_class = 'card-text';
                }

                func.fix(item['data'][i]['content'], p_class, img_src);
            }

            $('#name').replaceWith('<span>'+item['name']+'</span>');
            $('.infix').replaceWith('<div class="chat-tipsxinxi"><span class="chat-tips">'+item['time']+'</span></div><p class="infix" hidden></p>');
        },
        complete: function () {
            func.wsConnect("ws://127.0.0.1:9501/?sole_key=" + func.from + "&to=" + func.to);
        }
    });
};

/**
 *
 * @param data
 */
func.mycallback = function (data) {
    var start = data.indexOf('['); // 第一次出现的位置
    var start1 = data.indexOf('{');
    if (start < 0) {
        start = start1;
    }
    if (start >= 0 && start1 >= 0) {
        start = Math.min(start, start1);
    }
    if (start >= 0) {
        console.log(data);
        var json = data.substr(start); //截取
        var p_class = 'card-text-yonghu';
        var img_src = func.curHeadImg;
        json = JSON.parse(json);

        if (func.type !== json[0]) {
            img_src = func.tarHeadImg;
            p_class = 'card-text';
        }

        func.fix(json[1]['message'], p_class, img_src);

        if (json[0] === 'kefu') {
            func.infoRead({
                from: json[1]['from'],
                to: json[1]['to'],
            });
        }
    }
};

/**
 *
 * @param data
 */
func.infoRead = function (data) {
    $.post("/read",data,function(result){
    });
};

/**
 *
 * @param content
 * @param p_class
 * @param img_src
 */
func.fix = function (content, p_class = 'card-text', img_src = func.headImg) {
    var pfix = $('.infix');

    var pcontent = '';
    pcontent += '<p class="' + p_class + '">';
    pcontent += '<img src="' + img_src + '" width="40" height="40" alt="">';
    pcontent += '<span class="jiantou">' + content + '</span>';
    pcontent += '</p>';
    pcontent += '<p class="infix" hidden></p>';

    pfix.replaceWith(pcontent);
};

/**
 *
 */
func.send = function () {
    var message = document.getElementById('content').innerHTML;

    func.ws.send(JSON.stringify([func.type, {
        from: func.from,
        to: func.to,
        message: message
    }]));

    document.getElementById('content').innerHTML = '';
};

/**
 *
 * @param salt
 * @returns {string}
 */
func.soleKey = function (salt = '') {
    var chat = localStorage.getItem('chat');

    if (chat == null || chat.length === 0) {
        chat = salt ? salt : Math.random().toString(36).slice(-7);

        localStorage.setItem('chat', chat);
    }

    return chat;
};


