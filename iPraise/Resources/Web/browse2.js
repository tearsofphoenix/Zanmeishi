Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
    var radio_date = new Date().Format("yyyy-MM-dd");


function showBlock()
{
    $('.bartists').show();
    $('.lartists').hide();

    $('#showBlock').removeClass('byBlock').addClass('byBlock_active');
    $('#showList').removeClass('byList_active').addClass('byList');
}

function showList()
{
    $('.bartists').hide();
    $('.lartists').show();

    $('#showBlock').removeClass('byBlock_active').addClass('byBlock');
    $('#showList').removeClass('byList').addClass('byList_active');
}

function playmore(id)
{
    $('#pb_' + id).show();
}


//防止图片太大撑爆网页
function ResizeImage(ImgD, Maxsize){ 
	var image=new Image(); 
	image.src=parseURL(ImgD.src); 
	if(image.width>0 && image.height>0){ 
		if(image.width>Maxsize){ 
			ImgD.width=Maxsize; 
			ImgD.height=(image.height*Maxsize+40)/image.width; 
			//ImgD.height=""; 
		}
	}
} 


var zmsp = {
    NAME: 'zmsp',
    ISON: 'zmsp[on]',
    UPDATE: 'zmsp[update]',
    SPLIT: ','
};

zmsp.ison = function() {
    return Sys.Cookie(zmsp.ISON);
}
zmsp.open = function(force) {

    if (!zmsp.ison())
    {
        /*
        var nba = $('<div style="display:none"><a href="/player" target="_blank">zmsp</a></div>');
        nba.appendTo(document.body);
        var a = $('a', nba).click();
        */

        //var tmpForm = $('<form method="get" target="_blank" action="/player"></form>');
        //tmpForm.appendTo(document.body);
        //tmpForm.submit();

        zmsp.player = window.open('/player', zmsp.NAME, 'width=920,height=652,menubar=0,resizable=0,status=0,titlebar=0,toolbar=0,location=1',"gl");//cmp弹出窗口尺寸
        //zmsp.player = window.open('/player', zmsp.NAME, 'width=920,height=652',"gl");//cmp弹出窗口尺寸
        if (!zmsp.player) {
            art.dialog({ title: '提示', icon: 'warning', content: '您的浏览器可能拦截了赞美诗网的播放器！<br/>请关闭您的浏览器窗口拦截功能或将赞美诗网设为可信网站！<br/>不知道如何关闭可以参考底部帮助中心', time: 4000 });
            return false;
        }
        zmsp.player.focus();

        Sys.Cookie(zmsp.UPDATE, null);   //第一次打开，就不叫更新了
    }
}

zmsp.play = function() {

    var songs = [];

    //两个参数为列表
    if (arguments.length > 1)
    {
        var name = arguments[0];
        $(":input[name='"+ name +"']").each(function(i, ele) {

            if (ele.checked && ele.value) {
                songs.push(ele.value);
            }
        });
    }
    else
    {
        var id = arguments[0];
        songs.push(id);
    }
    
    if (songs.length > 0)
    {
        $.getJSON('/player/cache', { play:1, songs: songs.join(',')}, function(json) {
        
            if (json.ok)
            {
                Sys.Cookie(zmsp.UPDATE, "1");   //通知更新
                zmsp.open("gl");
            }
            else
            {
                art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
            }

        });
    }
    else
    {
        art.dialog({ title: '提示', icon: 'warning', content: '请至少选择一首歌！', time: 3000 });
    }

}
zmsp.list = function() {

    var songs = [];

    //两个参数为列表
    if (arguments.length > 1)
    {
        var name = arguments[0];
        $(":input[name='"+ name +"']").each(function(i, ele) {

            if (ele.checked && ele.value) {
                songs.push(ele.value);
            }
        });
    }
    else
    {
        var id = arguments[0];
        songs.push(id);
    }
    
    if (songs.length > 0)
    {
        $.getJSON('/player/cache', { play:0, songs: songs.join(',')}, function(json) {
        
            if (json.ok)
            {
                Sys.Cookie(zmsp.UPDATE, "1");   //通知更新
                zmsp.open("gl");
                art.dialog({ title: '提示', icon: 'succeed', content: '已加入列表！', time: 3000 });
            }
            else
            {
                art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
            }

        });
    }
    else
    {
        art.dialog({ title: '提示', icon: 'warning', content: '请至少选择一首歌！', time: 3000 });
    }
}

zmsp.artist = function(id) {

    $.getJSON('/player/artist/'+id, { }, function(json) {
        
        if (json.ok)
        {
            zmsp.open("gl");
            Sys.Cookie(zmsp.UPDATE, "1");   //通知更新
        }
        else
        {
            art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
        }

    });

}

zmsp.album = function(id) {

    $.getJSON('/player/album/'+id, { }, function(json) {
        
        if (json.ok)
        {
            zmsp.open("gl");
            Sys.Cookie(zmsp.UPDATE, "1");   //通知更新
        }
        else
        {
            art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
        }

    });

}
zmsp.box = function(id) {

    $.getJSON('/player/box/'+id, { }, function(json) {
        
        if (json.ok)
        {
            zmsp.open("gl");
            Sys.Cookie(zmsp.UPDATE, "1");   //通知更新
        }
        else
        {
            art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
        }

    });

}

zmsp.last = function() {

    if (zmsp.ison()) {
        art.dialog({ title: '提示', icon: 'warning', content: '您已经打开了播放器！', time: 4000 });
        return false;
    }

    $.getJSON('/player/last?'+Math.random(), { }, function(json) {
        
        if (json.ok)
        {            
            //var tmpForm = $('<form method="get" target="_blank" action="'+ json.url +'"></form>');
            //tmpForm.appendTo(document.body);
            //tmpForm.submit();

            zmsp.player = window.open(json.url, zmsp.NAME, 'width=920,height=652,menubar=0,resizable=0,status=0,titlebar=0,toolbar=0,location=1',"gl");//cmp弹出窗口尺寸
            //zmsp.player = window.open(json.url, zmsp.NAME, 'width=920,height=652',"gl");//cmp弹出窗口尺寸
            if (!zmsp.player) {
                art.dialog({ title: '提示', icon: 'warning', content: '您的浏览器可能拦截了赞美诗网的播放器！<br/>请关闭您的浏览器窗口拦截功能或将赞美诗网设为可信网站！<br/>不知道如何关闭可以参考底部帮助中心', time: 4000 });
                return false;
            }
            zmsp.player.focus();
        }
        else
        {
            art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
        }

    });

}
zmsp.rand = function(id) {

    if (!confirm('该操作会清空当前播放列表，你确定要使用随便听听吗？')) {
        return;
    }

    $.getJSON('/player/rand/'+id, { }, function(json) {
        
        if (json.ok)
        {
            location.reload();
        }
        else
        {
            art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3 });
        }

    });

}
zmsp.savesel = function (sel) {
    if (sel.value == '') {
        $('#zmspbox_newbox').show();
        $('#zmspbox_name').focus();
    }
    else {
        $('#zmspbox_newbox').hide();
        $('#zmspbox_name').val('');
    }
}

zmsp.save = function (id) {

    var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
    $.getJSON('/player/save/' + id, { r:Math.random() }, function (json_load) {

        loading.close();

        if (json_load.ok == false) {
            art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
        } else {

            var html = '<div style="width:400px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px;">歌曲：</td>\
                    <td style="padding:5px 0 0 0;">共 ' + json_load.count + ' 首</td>\
                  </tr>\
                  <tr>\
                    <td>音乐盒：</td>\
                    <td style="padding:5px 0 0 2px;">\
                        <select id="zmspbox_boxid" name="boxid" onchange="zmsp.savesel(this);">\
                            <option value="" selected="selected">-- 添加新音乐盒 --</option>';

            var hasone = false;
            for (var i = 0; i < json_load.boxes.length; i++) {
                var box = json_load.boxes[i];
                if (box.isnew) {
                    hasone = true;
                    html += '<option value="' + box.id + '">' + box.name + '</option>';
                } else {
                    html += '<option value="' + box.id + '">' + box.name + '</option>';
                }
            }


            html += '</select>\
                    </td>\
                  </tr>\
                  <tr id="zmspbox_newbox"' + (hasone ? '' : '') + '>\
                    <td>音乐盒名称：</td>\
                    <td style="padding:5px 0 5px 2px;">\
                        <input type="text" id="zmspbox_name" name="name" style="width:200px;" /></td>\
                  </tr>\
                </table>\
                </div>';


            var ddd = art.dialog({
                fixed: true,
                padding: '0 20px',
                title: '保存到音乐盒',
                content: html,
                okValue: '保存到音乐盒',
                ok: function () {

                    var boxid = $('#zmspbox_boxid');
                    var name = $('#zmspbox_name');

                    if (boxid.val() == '' && name.val() == '') {
                        alert('新音乐盒名称不可为空！');
                        content.focus();
                        return false;
                    }
                    var loading = art.dialog({ fixed: true, content: '正在提交，请稍后...' });
                    $.post('/player/save/' + id, { boxid: boxid.val(), name: name.val() }, function (json_post) {

                        loading.close();

                        if (json_post.ok) {
                            art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                        } else {
                            art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                        }

                    });


                },
                cancel: true,
                cancelValue: '取消'
            });

        }
    });

}






var zms = {

    login: function () {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/login', { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:300px; padding:10px 0 0 0;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px;">邮箱或昵称：</td>\
                    <td><input type="text" id="zmslogin_user" name="user" style="width:200px;" value="" /></td>\
                  </tr>\
                  <tr>\
                    <td>密码：</td>\
                    <td style="padding:5px 0 5px 0;"><input type="password" id="zmslogin_password" name="password" style="width:150px;" value="" /></td>\
                  </tr>\
                  <tr>\
                    <td>保存登录：</td>\
                    <td style="padding:5px 0 5px 0;"><select id="zmslogin_time" name="time"><option value="0">浏览器进程(不保存)</option><option value="1440">保存一天</option><option value="10080">保存一周</option><option value="43200">保存一个月</option><option value="525600">保存一年</option></select></td>\
                  </tr>\
                </table>\
                </div>';

                var ddd = art.dialog({
					
                    fixed: true,
                    padding: '0 20px',
                    title: '会员登录',
                    content: html,
                    okValue: '登录',
                    ok: function () {

                        var user = $('#zmslogin_user');
                        var password = $('#zmslogin_password');

                        if (user.val() == '' || password.val() == '') {
                            alert('帐号和密码不可为空！');
                            return false;
                        }

                        $.post('/ajax/login', { user: user.val(), password: password.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                                $('#zms_login_name').html(json_post.name);
                                $('#zms_login_home').attr('href', json_post.home);
                                $('#zms_login_avatar').attr('src', json_post.avatar);
                                $('#zms_login_no').hide();
                                $('#zms_login_yes').show();
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });

                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });

    },

    logout: function (id) {

        $.getJSON('/ajax/logout', {}, function (json) {

            if (json.ok) {
                $('#zms_login_no').show();
                $('#zms_login_yes').hide();
            }
            else {
                art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
            }

        });

    },









    feedback: function () {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/feedback', { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:400px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px;">反馈类型：</td>\
                    <td style="padding:5px 0 0 0;"><select id="zmsfeedback_typeid" name="typeid">';

                    for (var i=0;i<json_load.types.length; i++) {
                        var type = json_load.types[i];
                        html+='<option value="'+ type.id +'">'+ type.name +'</option>';
                    }

                html+='</select><a href="/help/i57vqmj7.html" target="_blank">如果是诗歌无法播放请先看这里：）</a></td>\
                  </tr>\
                  <tr>\
                    <td>您的名字：</td>\
                    <td style="padding:5px 0 0 2px;"><input type="text" id="zmsfeedback_name" name="name" style="width:150px;" value="' + json_load.name + '" /></td>\
                  </tr>\
                  <tr>\
                    <td>您的邮箱：</td>\
                    <td style="padding:5px 0 5px 2px;"><input type="text" id="zmsfeedback_email" name="email" style="width:200px;" value="' + json_load.email + '" /></td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">反馈内容：</td>\
                    <td style="padding:5px 0 0 2px;"><textarea id="zmsfeedback_content" name="content" style="width:300px; height:70px;"></textarea></td>\
                  </tr>\
                  <tr>\
                    <td></td>\
                    <td>（请至少输入10个以上字符）</td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
					width: '450px',
                    fixed: true,
                    padding: '0 20px',
                    title: '用户反馈',
                    content: html,
                    okValue: '提交反馈',
                    ok: function () {
                        var typeid = $('#zmsfeedback_typeid');
                        var name = $('#zmsfeedback_name');
                        var email = $('#zmsfeedback_email');
                        var content = $('#zmsfeedback_content');

                        if (typeid.val() == '' || name.val() == '' || email.val() == '' || content.val() == '') {
                            alert('名字，邮箱，反馈内容不可为空！');
                            content.focus();
                            return false;
                        }

                        var regx = /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+[,]{0,1})+$/;
                        if (!regx.test(email.val())) {
                            alert('错误的邮箱地址格式，请确认！');
                            email.focus();
                            return false;
                        }

                        $.post('/ajax/feedback', { typeid: typeid.val(), name: name.val(), email: email.val(), content: content.val() }, function (json_post) {
                           
                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', fixed: true, content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', fixed: true, content: json_post.msg, time: 3000 });
                            }
						
                        });


                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });

    },

ccmradio: function () {
	
        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });

            loading.close();            

                var html = '<div class="radio24">正在24小时不间断直播中（中断后请点击停止再播放）...</div>\
				<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="420" height="22" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">\
    <param name="movie" value=""/>\
    <param name="flashvars" value="autostart=true&file=vod51_Live/ch04.flv&streamer=rtmp://flv.ccdntech.com/live/_definst_/&image=/jwplayer/preview.jpg&controlbar=bottom"/>\
    <param name="quality" value="high"/>\
    <param name="allowfullscreen" value="false">\
    <param name="wmode" value="transparent" />\
    <param name="autostart" value="0">\
    <param name="allowFullScreen" value="true" />\
    <embed src="'+ zmsurl.sta +'/swf/player_ccm.swf" width="420" height="22" controls=ImageWindow console=_master type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="autostart=true&file=vod51_Live/ch04.flv&streamer=rtmp://flv.ccdntech.com/live/_definst_/&controlbar=bottom"/>\
</object>\
<form action="http://www.goodnews.org.tw/broadcast_list.php" method="post" target="_blank" >\
<input type="hidden" name="act" value="search">\
<input type="hidden" name="broad_type" value="2">\
<input name="broad_date" type="hidden" value="'+ radio_date +'" />\
<select name="broad_time">\
                          <option value="00:00:00">AM 00:00-01:00</option>\
                          <option value="01:00:00">AM 01:00-02:00</option>\
                          <option value="02:00:00">AM 02:00-03:00</option>\
                          <option value="03:00:00">AM 03:00-04:00</option>\
                          <option value="04:00:00">AM 04:00-05:00</option>\
                          <option value="05:00:00">AM 05:00-06:00</option>\
                          <option value="06:00:00">AM 06:00-07:00</option>\
                          <option value="07:00:00">AM 07:00-08:00</option>\
                          <option value="08:00:00">AM 08:00-09:00</option>\
                          <option value="09:00:00">AM 09:00-10:00</option>\
                          <option value="10:00:00">AM 10:00-11:00</option>\
                          <option value="11:00:00">AM 11:00-12:00</option>\
                          <option value="12:00:00">PM 12:00-13:00</option>\
                          <option value="13:00:00">PM 13:00-14:00</option>\
                          <option value="14:00:00">PM 14:00-15:00</option>\
                          <option value="15:00:00">PM 15:00-16:00</option>\
                          <option value="16:00:00">PM 16:00-17:00</option>\
                          <option value="17:00:00">PM 17:00-18:00</option>\
                          <option value="18:00:00">PM 18:00-19:00</option>\
                          <option value="19:00:00">PM 19:00-20:00</option>\
                          <option value="20:00:00">PM 20:00-21:00</option>\
                          <option value="21:00:00">PM 21:00-22:00</option>\
                          <option value="22:00:00">PM 22:00-23:00</option>\
                          <option value="23:00:00">PM 23:00-24:00</option>\
</select>\
<input name="" type="submit" value="曲目查询" /></form>';

                var ddd = art.dialog({
					width: '450px',
                    fixed: true,
                    padding: '20px',
                    title: '佳音现代流行圣乐电台',
                    content: html
					//lock: true,
                    //okValue: '提交反馈',                    
                    //cancel: true,
                    //cancelValue: '取消'
                });
          
    },

classicradio: function () {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });

            loading.close();            

                var html = '<div class="radio24">正在24小时不间断直播中（中断后请点击停止再播放）...</div>\
				<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="420" height="50" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">\
    <param name="movie" value=""/>\
    <param name="flashvars" value="autostart=true&file=vod51_Live/ch03.flv&streamer=rtmp://flv.ccdntech.com/live/_definst_/&image=/jwplayer/preview.jpg&controlbar=bottom"/>\
    <param name="quality" value="high"/>\
    <param name="allowfullscreen" value="false">\
    <param name="wmode" value="transparent" />\
    <param name="autostart" value="0">\
    <param name="allowFullScreen" value="true" />\
      <embed src="'+ zmsurl.sta +'/swf/player_classic.swf" width="420" height="22" controls=ImageWindow console=_master type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="autostart=true&file=vod51_Live/ch03.flv&streamer=rtmp://flv.ccdntech.com/live/_definst_/&controlbar=bottom"/>\
        </object>\
		<form action="http://www.goodnews.org.tw/broadcast_list.php" method="post" target="_blank" >\
<input type="hidden" name="act" value="search">\
<input type="hidden" name="broad_type" value="1">\
<input name="broad_date" type="hidden" value="'+ radio_date +'" />\
<select name="broad_time">\
                          <option value="00:00:00">AM 00:00-01:00</option>\
                          <option value="01:00:00">AM 01:00-02:00</option>\
                          <option value="02:00:00">AM 02:00-03:00</option>\
                          <option value="03:00:00">AM 03:00-04:00</option>\
                          <option value="04:00:00">AM 04:00-05:00</option>\
                          <option value="05:00:00">AM 05:00-06:00</option>\
                          <option value="06:00:00">AM 06:00-07:00</option>\
                          <option value="07:00:00">AM 07:00-08:00</option>\
                          <option value="08:00:00">AM 08:00-09:00</option>\
                          <option value="09:00:00">AM 09:00-10:00</option>\
                          <option value="10:00:00">AM 10:00-11:00</option>\
                          <option value="11:00:00">AM 11:00-12:00</option>\
                          <option value="12:00:00">PM 12:00-13:00</option>\
                          <option value="13:00:00">PM 13:00-14:00</option>\
                          <option value="14:00:00">PM 14:00-15:00</option>\
                          <option value="15:00:00">PM 15:00-16:00</option>\
                          <option value="16:00:00">PM 16:00-17:00</option>\
                          <option value="17:00:00">PM 17:00-18:00</option>\
                          <option value="18:00:00">PM 18:00-19:00</option>\
                          <option value="19:00:00">PM 19:00-20:00</option>\
                          <option value="20:00:00">PM 20:00-21:00</option>\
                          <option value="21:00:00">PM 21:00-22:00</option>\
                          <option value="22:00:00">PM 22:00-23:00</option>\
                          <option value="23:00:00">PM 23:00-24:00</option>\
</select>\
<input name="" type="submit" value="曲目查询" /></form>';


                var ddd = art.dialog({
					width: '450px',
                    fixed: true,
                    padding: '20px',
                    title: '佳音传统经典圣乐电台',
                    content: html
                    //okValue: '提交反馈',                    
                    //cancel: true,
                    //cancelValue: '取消'
                });
          
    },

    fav: function (type, name, id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/fav', { r:Math.random(), typeid: type, dataid: id }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:360px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:50px; vertical-align: top; padding:5px 0;">收藏：</td>\
                    <td style="padding:5px 0;">' + name + '</td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">备注：</td>\
                    <td><textarea id="zmsfav_text_' + id + '" name="text" style="width:300px; height:70px;"></textarea></td>\
                  </tr>\
                  <tr>\
                    <td></td>\
                    <td><input type="checkbox" id="zmsfav_show_' + id + '" /><label for="zmsfav_show_' + id + '">同时推荐给大家</label></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '添加收藏',
                    content: html,
                    okValue: '确认收藏',
                    ok: function () {

                        var text = $('#zmsfav_text_' + id);
                        var show = $('#zmsfav_show_' + id);
                        var isshow = show.attr('checked') ? '1' : '0';

                        $.post('/ajax/fav', { typeid: type, dataid: id, text: text.val(), show: isshow }, function (json_post) {
                            //alert(json_post);

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });


                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });
    },



    show: function (type, name, id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/show', { r:Math.random(), typeid: type, dataid: id }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:360px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:50px; vertical-align: top; padding:5px 0;">推荐：</td>\
                    <td style="padding:5px 0;">' + name + '</td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">理由：</td>\
                    <td><textarea id="zmsshow_text_' + id + '" name="text" style="width:300px; height:70px;"></textarea></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '添加推荐',
                    content: html,
                    okValue: '确认推荐',
                    ok: function () {

                        var text = $('#zmsshow_text_' + id);

                        $.post('/ajax/show', { typeid: type, dataid: id, text: text.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });
                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });
    },






    send: function (name, id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/send', { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:410px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:90px;">歌曲：</td>\
                    <td style="padding:5px 0 0 0;">' + name + '</td>\
                  </tr>\
                  <tr>\
                    <td>您的名字：</td>\
                    <td style="padding:5px 0 0 2px;"><input type="text" id="zmssend_you" name="you" style="width:150px;" value="' + json_load.name + '" /></td>\
                  </tr>\
                  <tr>\
                    <td>朋友的名字：</td>\
                    <td style="padding:5px 0 5px 2px;"><input type="text" id="zmssend_name" name="name" style="width:150px;" /></td>\
                  </tr>\
                  <tr>\
                    <td>朋友的邮箱：</td>\
                    <td style="padding:5px 0 5px 2px;"><input type="text" id="zmssend_email" name="email" style="width:200px;" /></td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">写点祝福吧：</td>\
                    <td style="padding:5px 0 0 2px;"><textarea id="zmssend_content" name="content" style="width:300px; height:70px;"></textarea></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '送歌给朋友',
                    content: html,
                    okValue: '确认发送',
                    ok: function () {

                        var you = $('#zmssend_you');
                        var name = $('#zmssend_name');
                        var email = $('#zmssend_email');
                        var content = $('#zmssend_content');

                        if (you.val() == '' || name.val() == '' || email.val() == '' || content.val() == '') {
                            alert('名字，邮箱，内容不可为空！');
                            content.focus();
                            return false;
                        }

                        var regx = /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+[,]{0,1})+$/;
                        if (!regx.test(email.val())) {
                            alert('错误的邮箱地址格式，请确认！');
                            email.focus();
                            return false;
                        }

                        $.post('/ajax/send', { songid: id, you: you.val(), name: name.val(), email: email.val(), content: content.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });


                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });

    },





    boxselect: function (sel) {
        if (sel.value == '') {
            $('#zmsbox_newbox').show();
            $('#zmsbox_name').focus();
        }
        else {
            $('#zmsbox_newbox').hide();
            $('#zmsbox_name').val('');
        }
    },
    box: function (name, id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/box', { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:400px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px;">歌曲：</td>\
                    <td style="padding:5px 0 0 0;">' + name + '</td>\
                  </tr>\
                  <tr>\
                    <td>音乐盒：</td>\
                    <td style="padding:5px 0 0 2px;">\
                        <select id="zmsbox_boxid" name="boxid" onchange="zms.boxselect(this);">\
                            <option value="">-- 添加新音乐盒 --</option>';

                var hasone = false;
                for (var i = 0; i < json_load.boxes.length; i++) {
                    var box = json_load.boxes[i];
                    if (box.isnew) {
                        hasone = true;
                        html += '<option value="' + box.id + '" selected="selected">' + box.name + '</option>';
                    } else {
                        html += '<option value="' + box.id + '">' + box.name + '</option>';
                    }
                }


                html += '</select>\
                    </td>\
                  </tr>\
                  <tr id="zmsbox_newbox"' + (hasone ? ' style="display:none;"' : '') + '>\
                    <td>音乐盒名称：</td>\
                    <td style="padding:5px 0 5px 2px;">\
                        <input type="text" id="zmsbox_name" name="name" style="width:200px;" /></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '添加歌曲到音乐盒',
                    content: html,
                    okValue: '添加到音乐盒',
                    ok: function () {

                        var boxid = $('#zmsbox_boxid');
                        var name = $('#zmsbox_name');

                        if (boxid.val() == '' && name.val() == '') {
                            alert('新音乐盒名称不可为空！');
                            content.focus();
                            return false;
                        }

                        $.post('/ajax/box', { songid: id, boxid: boxid.val(), name: name.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });


                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });

    },

    down: function (id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/down/' + id, { r:Math.random() }, function (json) {

            loading.close();

            if (json.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
            } else {

                var html = '<div style="width:400px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:50px; vertical-align: top; padding:5px 0;">歌手：</td>\
                    <td style="padding:5px 0;">' + json.artist + '</td>\
                  </tr>\
                  <tr>\
                    <td style="width:50px; vertical-align: top; padding:5px 0;">歌曲：</td>\
                    <td style="padding:5px 0;">' + json.song + '</td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top; padding:5px 0;">品质：</td>\
                    <td style="padding:5px 0;">';

                //html+='<div><input type="radio" id="zmsdown_play" name="zmsdown" value="'+ json.play.url +'" checked="checked" />&nbsp;<label for="zmsdown_play">标准品质</label>&nbsp;&nbsp;<strong>'+ json.play.length +'</strong>&nbsp;&nbsp;('+ json.play.rate +' kbps)</div>';
                html += '<div><input type="radio" id="zmsdown_play_' + id + '" name="zmsdown" value="' + json.play.url + '" checked="checked" />&nbsp;<label for="zmsdown_play_' + id + '">标准品质</label></div>';//&nbsp;&nbsp;(' + json.play.rate + ' kbps)

                if (json.down) {
                    html += '<div style="padding:5px 0 0 0;"><input type="radio" id="zmsdown_down_' + id + '" name="zmsdown" value="' + json.down.url + '" />&nbsp;<label for="zmsdown_down_' + id + '">高品质</label></div>';//&nbsp;&nbsp;(' + json.down.rate + ' kbps)
                    //html+='<div style="padding:5px 0 0 0;"><input type="radio" id="zmsdown_down" name="zmsdown" value="'+ json.down.url +'" />&nbsp;<label for="zmsdown_down">高品质</label>&nbsp;&nbsp;<strong>'+ json.down.length +'</strong>&nbsp;&nbsp;('+ json.down.rate +' kbps)</div>';
                }


                html += '</td>\
                  </tr>\
                </table>\
                </div>';

                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '下载歌曲',
                    content: html,
                    okValue: '下载',
                    ok: function () {

                        var play = $('#zmsdown_play_' + id);
                        var down = $('#zmsdown_down_' + id);

                        if (play.attr('checked')) {
                            location.href = parseURL(play.val());
                        } else if (down.attr('checked')) {
                            location.href = parseURL(down.val());
                        } else {
                            alert('未知操作！');
                            return false;
                        }
                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });

    },

    downs: function () {

        var songs = [];

        //两个参数为列表
        if (arguments.length > 1) {
            var name = arguments[0];
            $(":input[name='" + name + "']").each(function (i, ele) {

                if (ele.checked && ele.value) {
                    songs.push(ele.value);
                }
            });
        }
        else {
            var id = arguments[0];
            songs.push(id);
        }

        if (songs.length == 0) {
            art.dialog({ title: '提示', icon: 'warning', content: '请至少选择一首歌曲！', time: 3000 });
            return;
        }

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/downs', { r:Math.random(), songs: songs.join(',') }, function (json) {

            loading.close();

            if (json.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json.msg, time: 3000 });
            } else {

                var html = '<div style="width:450px; height:250px; overflow-y:scroll;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">';

                for (var i in json.songs) {
                    var entity = json.songs[i];
                    var index = parseInt(i) + 1;
                    html += '<tr style="border-bottom:dotted 1px #d7d6d0;">\
                        <td style="padding:5px 0 0 20px;">' + index + '. ' + entity.song + '</td>';
                    if (entity.url) {
                        html += '<td style="padding:5px 20px 0 0; width:80px; text-align:right;"><a href="' + entity.url + '">点此下载</a></td>';
                    } else {
                        html += '<td style="padding:5px 20px 0 0; width:80px; text-align:right;"><span class="gray">暂无下载</span></td>';
                    }

                    html += '</tr>';
                }

                html += '</table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0',
                    title: '下载歌曲  -  可用下载软件选择下载全部链接，并筛选mp3文件进行批量下载',
                    content: html
                });

            }
        });
    },




    text: function (id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/songtext/' + id, { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:500px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px; vertical-align: top; padding:5px 0;">歌曲：</td>\
                    <td style="padding:5px 0;">' + json_load.song + '</td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">文本歌词：</td>\
                    <td><textarea id="zmstext_content_' + id + '" name="text" style="width:400px; height:250px;">' + json_load.content + '</textarea></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '提供文本歌词',
                    content: html,
                    okValue: '提交歌词',
                    ok: function () {

                        var content = $('#zmstext_content_' + id);

                        if (content.val() == '') {
                            alert('歌词不可为空！');
                            content.focus();
                            return false;
                        }
                        if (content.val().length < 10) {
                            alert('歌词内容太度太短，请提供完整歌曲！');
                            content.focus();
                            return false;
                        }

                        $.post('/ajax/songtext/' + id, { content: content.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });
                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });
    },


    lyric: function (id) {

        var loading = art.dialog({ fixed: true, content: '正在加载，请稍后...' });
        $.getJSON('/ajax/songlyric/' + id, { r:Math.random() }, function (json_load) {

            loading.close();

            if (json_load.ok == false) {
                art.dialog({ title: '提示', icon: 'warning', content: json_load.msg, time: 3000 });
            } else {

                var html = '<div style="width:500px;">\
                <table style="line-heigth:30px;" width="100%"  border="0" cellpadding="0" cellspacing="0">\
                  <tr>\
                    <td style="width:80px; vertical-align: top; padding:5px 0;">歌曲：</td>\
                    <td style="padding:5px 0;">' + json_load.song + '</td>\
                  </tr>\
                  <tr>\
                    <td style="vertical-align: top;">LRC歌词：</td>\
                    <td><textarea id="zmstext_content_' + id + '" name="text" style="width:400px; height:250px;">' + json_load.content + '</textarea></td>\
                  </tr>\
                </table>\
                </div>';


                var ddd = art.dialog({
                    fixed: true,
                    padding: '0 20px',
                    title: '提供动态歌词',
                    content: html,
                    okValue: '提交歌词',
                    ok: function () {

                        var content = $('#zmstext_content_' + id);

                        if (content.val() == '') {
                            alert('歌词不可为空！');
                            content.focus();
                            return false;
                        }
                        if (content.val().length < 10) {
                            alert('歌词内容太度太短，请提供完整歌曲！');
                            content.focus();
                            return false;
                        }
                        if (content.val().indexOf('[') < 0 || content.val().indexOf(']') < 0) {
                            alert('您所提交的歌词不符合LRC歌词的要求，请确认！');
                            content.focus();
                            return false;
                        }

                        $.post('/ajax/songlyric/' + id, { content: content.val() }, function (json_post) {

                            if (json_post.ok) {
                                art.dialog({ title: '提示', icon: 'succeed', content: json_post.msg, time: 3000 });
                            } else {
                                art.dialog({ title: '提示', icon: 'warning', content: json_post.msg, time: 3000 });
                            }

                        });
                    },
                    cancel: true,
                    cancelValue: '取消'
                });

            }
        });
    }
};