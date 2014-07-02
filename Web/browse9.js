var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

Sys.Domain = null; // 'zanmeishi.com';
if (Sys.Domain) { ignore = Sys.Domain; }

Sys.Post = function (id) {
    setTimeout("$('#" + id + "').attr('disabled', true)", 1);
}
Sys.Chk = function (name, status) {
    $("input[name='" + name + "']").attr("checked", status);
}


var showed = false;
var showOverlay = null;
var showModal = null;
var showTitle = null;
var showLoading = null;
var showIframe = null;
function unshow() { showIframe.hide(); showLoading.hide(); showModal.hide(); showOverlay.hide(); CollectGarbage(); }
function reshow(width, height) {
    showModal.css('width', width + 'px'); showModal.css('height', (height + 24) + 'px'); showModal.css('margin-left', '-' + (Math.ceil(width / 2)) + 'px');
    showLoading.css('width', width + 'px'); showLoading.css('height', (height + 24) + 'px'); showLoading.css('margin-left', '-' + (Math.ceil(width / 2)) + 'px');
    showIframe.css('width', width + 'px'); showIframe.css('height', height + 'px');
    if (!(Sys.ie == '6.0')) { showModal.css('margin-top', '-' + (Math.ceil((height + 24) / 2)) + 'px'); showLoading.css('margin-top', '-' + (Math.ceil((height) / 2)) + 'px'); }
}
function show(title, url, callback) {
    if (!showed) {
        showOverlay = $('<div class="overlay"></div>').appendTo('body').mousedown(function () { return false; });
        showModal = $('<div class="modal"><div class="s"><div class="st">' + title + '</div><div class="sc"></div><div class="sm"><img alt="关闭" src="../images/close.gif"/></div></div>').appendTo('body').mousedown(function () { return false; }); ;
        showLoading = $('<div class="loading"></div>').appendTo('body');
        showIframe = $('<iframe frameborder="0" scrolling="no" src="' + url + '" style="width:100%; height:100%;" />');
        showTitle = $('.st', showModal)

        $('.sc', showModal).append(showIframe);
        $('.sm img', showModal).click(unshow);

        showIframe.load(function () {
            showIframe.css('width', '5px'); showIframe.css('height', '5px');

            var win = showIframe[0].contentWindow;
            win.unshow = unshow;
            win.callback = callback;

            showLoading.hide();
            showIframe.show();

            reshow(win.document.documentElement.scrollWidth, win.document.documentElement.scrollHeight);

            if (win.setTitle) { showTitle.html(win.setTitle); }
        });

        reshow(200, 50);

        showed = true;
    }
    else {
        showOverlay.show();
        showLoading.show();

        reshow(200, 50);

        showModal.show();

        showTitle.html(title);
        showIframe.attr('src', url);
    }
}


/* Cookie 操作 */
Sys.Cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 1000));    //秒
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        //var path = options.path ? '; path=' + options.path : '';
        var path = '; path=/';
        //var domain = options.domain ? '; domain=' + options.domain : '';
        var domain = Sys.Domain ? '; domain=' + Sys.Domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
    else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


Sys.Tab = function (i) {
    $('.tab li').removeClass('on');
    $('.tabdiv').hide();

    $($('.tab li')[i]).addClass('on');
    $($('.tabdiv')[i]).show();
}




Sys.Uping = function (msg) {
    msg = msg || '正在上传, 请不要关闭页面...';

    var overlay = $('<div class="overlay"></div>').appendTo('body').mousedown(function () { return false; });
    var uping = $('<div class="uping">' + msg + '</div>').appendTo('body').mousedown(function () { return false; });
}




/* 扩展 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

var sysextend = function(destination, source) { 
    for (property in source) { 
        destination[property] = source[property]; 
    } 
    return destination; 
}