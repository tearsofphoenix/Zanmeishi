/* artDialog 5 | (c) 2009-2012 TangBin | http://code.google.com/p/artdialog/ */
(function(g, h) {
    function i(a) {
        var c = f.expando, d = a === g ? 0: a[c];
        d === h && (a[c] = d=++f.uuid);
        return d
    }
    var f = g.art = function(a, c) {
        return new f.fn.constructor(a, c)
    }, p = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, o = /[\n\t]/g;
    if (g.$ === h)
        g.$ = f;
    f.fn = f.prototype = {
        constructor: function(a, c) {
            var d, c = c || document;
            if (!a)
                return this;
            if (a.nodeType)
                return this[0] = a, this;
            if ("string" === typeof a && (d = p.exec(a)) && d[2])
                return (d = c.getElementById(d[2])) && d.parentNode && (this[0] = d), this;
            this[0] = a;
            return this
        },
        hasClass: function(a) {
            return -1 <
            (" " + this[0].className + " ").replace(o, " ").indexOf(" " + a + " ")?!0 : !1
        },
        addClass: function(a) {
            this.hasClass(a) || (this[0].className += " " + a);
            return this
        },
        removeClass: function(a) {
            var c = this[0];
            if (a) {
                if (this.hasClass(a))
                    c.className = c.className.replace(a, " ")
            } else 
                c.className = "";
            return this
        },
        css: function(a, c) {
            var d, e = this[0];
            if ("string" === typeof a) {
                if (c === h)
                    return f.css(e, a);
                e.style[a] = c
            } else 
                for (d in a)
                    e.style[d] = a[d];
            return this
        },
        show: function() {
            return this.css("display", "block")
        },
        hide: function() {
            return this.css("display",
            "none")
        },
        offset: function() {
            var a = this[0], c = a.getBoundingClientRect(), d = a.ownerDocument, a = d.body, d = d.documentElement;
            return {
                left: c.left + (self.pageXOffset || d.scrollLeft) - (d.clientLeft || a.clientLeft || 0),
                top: c.top + (self.pageYOffset || d.scrollTop) - (d.clientTop || a.clientTop || 0)
            }
        },
        html: function(a) {
            var c = this[0];
            if (a === h)
                return c.innerHTML;
            f.cleanData(c.getElementsByTagName("*"));
            c.innerHTML = parseHTML(a);
            return this
        },
        remove: function() {
            var a = this[0];
            f.cleanData(a.getElementsByTagName("*"));
            f.cleanData([a]);
            a.parentNode.removeChild(a);
            return this
        },
        bind: function(a, c) {
            f.event.add(this[0], a, c);
            return this
        },
        unbind: function(a, c) {
            f.event.remove(this[0], a, c);
            return this
        }
    };
    f.fn.constructor.prototype = f.fn;
    f.isWindow = function(a) {
        return a && "object" === typeof a && "setInterval"in a
    };
    f.fn.find = function(a) {
        var c = this[0], d = a.split(".")[1];
        if (d)
            if (document.getElementsByClassName)
                d = c.getElementsByClassName(d);
            else {
                for (var e = a = 0, b = [], c = (c || document).getElementsByTagName("*"), m = c.length, d = RegExp("(^|\\s)" + d + "(\\s|$)"); a < m; a++)
                    d.test(c[a].className) &&
                    (b[e] = c[a], e++);
                    d = b
            } else 
                d = c.getElementsByTagName(a);
        return f(d[0])
    };
    f.each = function(a, c) {
        var d, e = 0, b = a.length;
        if (b === h)
            for (d in a) {
                if (!1 === c.call(a[d], d, a[d]))
                    break
            } else 
                for (d = a[0]; e < b&&!1 !== c.call(d, e, d); d = a[++e]);
        return a
    };
    f.data = function(a, c, d) {
        var e = f.cache, a = i(a);
        if (c === h)
            return e[a];
        e[a] || (e[a] = {});
        d !== h && (e[a][c] = d);
        return e[a][c]
    };
    f.removeData = function(a, c) {
        var d=!0, e = f.expando, b = f.cache, m = i(a), n = m && b[m];
        if (n)
            if (c) {
                delete n[c];
                for (var k in n)
                    d=!1;
                    d && delete f.cache[m]
            } else 
                delete b[m], a.removeAttribute ?
        a.removeAttribute(e) : a[e] = null
    };
    f.uuid = 0;
    f.cache = {};
    f.expando = "@cache" + + new Date;
    f.event = {
        add: function(a, c, d) {
            var j;
            var e, b = f.event;
            e = f.data(a, "@events") || f.data(a, "@events", {});
            j = e[c] = e[c] || {}, e = j;
            (e.listeners = e.listeners || []).push(d);
            if (!e.handler)
                e.elem = a, e.handler = b.handler(e), a.addEventListener ? a.addEventListener(c, e.handler, !1) : a.attachEvent("on" + c, e.handler)
        },
        remove: function(a, c, d) {
            var e, b, m;
            b = f.event;
            var n=!0, k = f.data(a, "@events");
            if (k)
                if (c) {
                    if (b = k[c]) {
                        m = b.listeners;
                        if (d)
                            for (e = 0; e < m.length; e++)
                                m[e] ===
                                d && m.splice(e--, 1);
                        else 
                            b.listeners = [];
                            if (0 === b.listeners.length) {
                                a.removeEventListener ? a.removeEventListener(c, b.handler, !1) : a.detachEvent("on" + c, b.handler);
                                delete k[c];
                                b = f.data(a, "@events");
                                for (var r in b)
                                    n=!1;
                                    n && f.removeData(a, "@events")
                                }
                        }
                } else 
                    for (e in k)
                        b.remove(a, e)
            },
        handler: function(a) {
            return function(c) {
                for (var c = f.event.fix(c || g.event), d = 0, e = a.listeners, b; b = e[d++];)
                    !1 === b.call(a.elem, c) && (c.preventDefault(), c.stopPropagation())
            }
        },
        fix: function(a) {
            if (a.target)
                return a;
            var c = {
                target: a.srcElement ||
                document,
                preventDefault: function() {
                    a.returnValue=!1
                },
                stopPropagation: function() {
                    a.cancelBubble=!0
                }
            }, d;
            for (d in a)
                c[d] = a[d];
            return c
        }
    };
    f.cleanData = function(a) {
        for (var c = 0, d, e = a.length, b = f.event.remove, m = f.removeData; c < e; c++)
            d = a[c], b(d), m(d)
    };
    f.css = "defaultView"in document && "getComputedStyle"in document.defaultView ? function(a, c) {
        return document.defaultView.getComputedStyle(a, !1)[c]
    } : function(a, c) {
        return a.currentStyle[c] || ""
    };
    f.each(["Left", "Top"], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function() {
            var c =
            this[0], b;
            return (b = f.isWindow(c) ? c : 9 === c.nodeType ? c.defaultView || c.parentWindow : !1) ? "pageXOffset"in b ? b[a ? "pageYOffset": "pageXOffset"] : b.document.documentElement[d] || b.document.body[d] : c[d]
        }
    });
    f.each(["Height", "Width"], function(a, c) {
        var d = c.toLowerCase();
        f.fn[d] = function(a) {
            var b = this[0];
            return !b ? null == a ? null : this : f.isWindow(b) ? b.document.documentElement["client" + c] || b.document.body["client" + c] : 9 === b.nodeType ? Math.max(b.documentElement["client" + c], b.body["scroll" + c], b.documentElement["scroll" + c],
            b.body["offset" + c], b.documentElement["offset" + c]) : null
        }
    });
    return f
})(window);
(function(g, h, i) {
    if ("BackCompat" === document.compatMode)
        throw Error("artDialog: Document types require more than xhtml1.0");
    var f, p = 0, o = "artDialog" + + new Date, a = h.VBArray&&!h.XMLHttpRequest, c = "createTouch"in document&&!("onmousemove"in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent), d=!a&&!c, e = function(b, a, n) {
        b = b || {};
        if ("string" === typeof b || 1 === b.nodeType)
            b = {
                content: b,
                fixed: !c
            };
        var k;
        k = e.defaults;
        var r = b.follow = 1 === this.nodeType && this || b.follow, t;
        for (t in k)
            b[t] === i && (b[t] = k[t]);
        b.id = r &&
        r[o + "follow"] || b.id || o + p;
        if (k = e.list[b.id])
            return r && k.follow(r), k.zIndex().focus(), k;
        if (!d)
            b.fixed=!1;
        if (!b.button ||!b.button.push)
            b.button = [];
        if (a !== i)
            b.ok = a;
        b.ok && b.button.push({
            id: "ok",
            value: b.okValue,
            callback: b.ok,
            focus: !0
        });
        if (n !== i)
            b.cancel = n;
        b.cancel && b.button.push({
            id: "cancel",
            value: b.cancelValue,
            callback: b.cancel
        });
        e.defaults.zIndex = b.zIndex;
        p++;
        return e.list[b.id] = f ? f.constructor(b) : new e.fn.constructor(b)
    };
    e.version = "5.0";
    e.fn = e.prototype = {
        constructor: function(b) {
            var a;
            this.closed=!1;
            this.config = b;
            this.dom = a = this.dom || this._getDom();
            b.skin && a.wrap.addClass(b.skin);
            a.wrap.css("position", b.fixed ? "fixed" : "absolute");
            a.close[!1 === b.cancel ? "hide": "show"]();
            a.content.css("padding", b.padding);
            this.button.apply(this, b.button);
            this.title(b.title).content(b.content).size(b.width, b.height).time(b.time);
            b.follow ? this.follow(b.follow) : this.position();
            this.zIndex();
            b.lock && this.lock();
            this._addEvent();
            this[b.visible ? "visible": "hidden"]().focus();
            f = null;
            b.initialize && b.initialize.call(this);
            return this
        },
        content: function(b) {
            var a, c, e, d, f = this, v = this.dom.content, l = v[0];
            this._elemBack && (this._elemBack(), delete this._elemBack);
            if ("string" === typeof b)
                v.html(b);
            else if (b && 1 === b.nodeType)
                d = b.style.display, a = b.previousSibling, c = b.nextSibling, e = b.parentNode, this._elemBack = function() {
                a && a.parentNode ? a.parentNode.insertBefore(b, a.nextSibling) : c && c.parentNode ? c.parentNode.insertBefore(b, c) : e && e.appendChild(b);
                b.style.display = d;
                f._elemBack = null
            }, v.html(""), l.appendChild(b), g(b).show();
            return this.position()
        },
        title: function(b) {
            var a = this.dom, c = a.outer, a = a.title;
            !1 === b ? (a.hide().html(""), c.addClass("d-state-noTitle")) : (a.show().html(b), c.removeClass("d-state-noTitle"));
            return this
        },
        position: function() {
            var b = this.dom, a = b.wrap[0], c = b.window, e = b.document, d = this.config.fixed, b = d ? 0: e.scrollLeft(), e = d ? 0: e.scrollTop(), d = c.width(), f = c.height(), g = a.offsetHeight, c = (d - a.offsetWidth) / 2 + b, d = d = (g < 4 * f / 7 ? 0.382 * f - g / 2 : (f - g) / 2) + e, a = a.style;
            a.left = Math.max(c, b) + "px";
            a.top = Math.max(d, e) + "px";
            return this
        },
        size: function(b, a) {
            var c =
            this.dom.main[0].style;
            "number" === typeof b && (b += "px");
            "number" === typeof a && (a += "px");
            c.width = b;
            c.height = a;
            return this
        },
        follow: function(b) {
            var a = g(b), c = this.config;
            if (!b ||!b.offsetWidth&&!b.offsetHeight)
                return this.position(this._left, this._top);
            var d = c.fixed, e = o + "follow", f = this.dom, h = f.window, l = f.document, f = h.width(), h = h.height(), s = l.scrollLeft(), l = l.scrollTop(), j = a.offset(), a = b.offsetWidth, i = d ? j.left - s: j.left, j = d ? j.top - l: j.top, q = this.dom.wrap[0], p = q.style, u = q.offsetWidth, q = q.offsetHeight, w = i - (u -
            a) / 2, x = j + b.offsetHeight, s = d ? 0: s, d = d ? 0: l;
            p.left = (w < s ? i : w + u > f && i - u > s ? i - u + a : w) + "px";
            p.top = (x + q > h + d && j - q > d ? j - q : x) + "px";
            this._follow && this._follow.removeAttribute(e);
            this._follow = b;
            b[e] = c.id;
            return this
        },
        button: function() {
            for (var b = this.dom.buttons, a = b[0], c = this._listeners = this._listeners || {}, d = [].slice.call(arguments), e = 0, f, h, l, i, j; e < d.length; e++) {
                f = d[e];
                h = f.value;
                l = f.id || h;
                i=!c[l];
                j=!i ? c[l].elem : document.createElement("input");
                j.type = "button";
                j.className = "d-button";
                c[l] || (c[l] = {});
                if (h)
                    j.value = h;
                if (f.width)
                    j.style.width =
                    f.width;
                if (f.callback)
                    c[l].callback = f.callback;
                if (f.focus)
                    this._focus && this._focus.removeClass("d-state-highlight"), this._focus = g(j).addClass("d-state-highlight"), this.focus();
                j[o + "callback"] = l;
                j.disabled=!!f.disabled;
                if (i)
                    c[l].elem = j, a.appendChild(j)
            }
            b[0].style.display = d.length ? "" : "none";
            return this
        },
        visible: function() {
            this.dom.wrap.css("visibility", "visible");
            this.dom.outer.addClass("d-state-visible");
            this._isLock && this._lockMask.show();
            return this
        },
        hidden: function() {
            this.dom.wrap.css("visibility",
            "hidden");
            this.dom.outer.removeClass("d-state-visible");
            this._isLock && this._lockMask.hide();
            return this
        },
        close: function() {
            if (this.closed)
                return this;
            var b = this.dom, a = b.wrap, c = e.list, k = this.config.beforeunload, g = this.config.follow;
            if (k&&!1 === k.call(this))
                return this;
            if (e.focus === this)
                e.focus = null;
            g && g.removeAttribute(o + "follow");
            this._elemBack && this._elemBack();
            this.time();
            this.unlock();
            this._removeEvent();
            delete c[this.config.id];
            if (f)
                a.remove();
            else {
                f = this;
                b.title.html("");
                b.content.html("");
                b.buttons.html("");
                a[0].className = a[0].style.cssText = "";
                b.outer[0].className = "d-outer";
                a.css({
                    left: 0,
                    top: 0,
                    position: d ? "fixed": "absolute"
                });
                for (var h in this)
                    this.hasOwnProperty(h) && "dom" !== h && delete this[h];
                this.hidden()
            }
            this.closed=!0;
            return this
        },
        time: function(b) {
            var a = this, c = this._timer;
            c && clearTimeout(c);
            if (b)
                this._timer = setTimeout(function() {
                    a._click("cancel")
                }, b);
            return this
        },
        focus: function() {
            if (this.config.focus)
                try {
                    var b = this._focus && this._focus[0] || this.dom.close[0];
                    b && b.focus()
            } catch (a) {}
            return this
        },
        zIndex: function() {
            var b =
            this.dom, a = e.focus, c = e.defaults.zIndex++;
            b.wrap.css("zIndex", c);
            this._lockMask && this._lockMask.css("zIndex", c-1);
            a && a.dom.outer.removeClass("d-state-focus");
            e.focus = this;
            b.outer.addClass("d-state-focus");
            return this
        },
        lock: function() {
            if (this._isLock)
                return this;
            var b = this, a = this.dom, c = document.createElement("div"), f = g(c), i = e.defaults.zIndex-1;
            this.zIndex();
            a.outer.addClass("d-state-lock");
            f.css({
                zIndex: i,
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }).addClass("d-mask");
            d || f.css({
                position: "absolute",
                width: g(h).width() + "px",
                height: g(document).height() + "px"
            });
            f.bind("click", function() {
                b._reset()
            }).bind("dblclick", function() {
                b._click("cancel")
            });
            document.body.appendChild(c);
            this._lockMask = f;
            this._isLock=!0;
            return this
        },
        unlock: function() {
            if (!this._isLock)
                return this;
            this._lockMask.unbind();
            this._lockMask.hide();
            this._lockMask.remove();
            this.dom.outer.removeClass("d-state-lock");
            this._isLock=!1;
            return this
        },
        _getDom: function() {
            var b = document.body;
            if (!b)
                throw Error('artDialog: "documents.body" not ready');
            var a = document.createElement("div");
            a.style.cssText = "position:absolute;left:0;top:0";
            a.innerHTML = parseHTML(e._templates);
            b.insertBefore(a, b.firstChild);
            for (var c = 0, d = {}, f = a.getElementsByTagName("*"), i = f.length; c < i; c++)(b = f[c].className.split("d-")[1]) 
                && (d[b] = g(f[c]));
            d.window = g(h);
            d.document = g(document);
            d.wrap = g(a);
            return d
        },
        _click: function(b) {
            b = this._listeners[b] && this._listeners[b].callback;
            return "function" !== typeof b ||!1 !== b.call(this) ? this.close() : this
        },
        _reset: function() {
            var b = this.config.follow;
            b ? this.follow(b) :
            this.position()
        },
        _addEvent: function() {
            var b = this, a = this.dom;
            a.wrap.bind("click", function(c) {
                c = c.target;
                if (c.disabled)
                    return !1;
                if (c === a.close[0])
                    return b._click("cancel"), !1;
                (c = c[o + "callback"]) && b._click(c)
            }).bind("mousedown", function() {
                b.zIndex()
            })
        },
        _removeEvent: function() {
            this.dom.wrap.unbind()
        }
    };
    e.fn.constructor.prototype = e.fn;
    g.fn.dialog = g.fn.artDialog = function() {
        var b = arguments;
        this[this.live ? "live": "bind"]("click", function() {
            e.apply(this, b);
            return !1
        });
        return this
    };
    e.focus = null;
    e.get = function(b) {
        return b ===
        i ? e.list : e.list[b]
    };
    e.list = {};
    g(document).bind("keydown", function(b) {
        var a = b.target, c = a.nodeName, d = /^input|textarea$/i, f = e.focus, b = b.keyCode;
        f && f.config.esc&&!(d.test(c) && "button" !== a.type) && 27 === b && f._click("cancel")
    });
    g(h).bind("resize", function() {
        var b = e.list, a;
        for (a in b)
            b[a]._reset()
    });
    e._templates = '<div class="d-outer"><table class="d-border"><tbody><tr><td class="d-nw"></td><td class="d-n"></td><td class="d-ne"></td></tr><tr><td class="d-w"></td><td class="d-c"><div class="d-inner"><table class="d-dialog"><tbody><tr><td class="d-header"><div class="d-titleBar"><div class="d-title"></div><a class="d-close" href="javascript:/*artDialog*/;">\u00d7</a></div></td></tr><tr><td class="d-main"><div class="d-content"></div></td></tr><tr><td class="d-footer"><div class="d-buttons"></div></td></tr></tbody></table></div></td><td class="d-e"></td></tr><tr><td class="d-sw"></td><td class="d-s"></td><td class="d-se"></td></tr></tbody></table></div>';
    e.defaults = {
        content: '<div class="d-loading"><span>loading..</span></div>',
        title: "message",
        button: null,
        ok: null,
        cancel: null,
        initialize: null,
        beforeunload: null,
        okValue: "ok",
        cancelValue: "cancel",
        width: "auto",
        height: "auto",
        padding: "20px 25px",
        skin: null,
        time: null,
        esc: !0,
        focus: !0,
        visible: !0,
        follow: null,
        lock: !1,
        fixed: !1,
        zIndex: 1987
    };
    this.artDialog = g.dialog = g.artDialog = e
})(this.art || this.jQuery, this);

