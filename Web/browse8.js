(function(e, t) {
    function a(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(u, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true"?!0 : r === "false"?!1 : r === "null" ? null : s.isNaN(r) ? o.test(r) ? s.parseJSON(r) : r : parseFloat(r)
                } catch (a) {}
                s.data(e, n, r)
            } else 
                r = t
        }
        return r
    }
    function f(e) {
        for (var t in e)
            if (t !== "toJSON")
                return !1;
        return !0
    }
    function l(e, n, r) {
        var i = n + "defer", o = n + "queue", u = n + "mark", a = s.data(e, i, t, !0);
        a && (r === "queue" ||!s.data(e, o, t, !0)) && (r === "mark" ||!s.data(e, u, t, !0)) && setTimeout(function() {
            !s.data(e, o, t, !0)&&!s.data(e, u, t, !0) && (s.removeData(e, i, !0), a.resolve())
        }, 0)
    }
    function C() {
        return !1
    }
    function k() {
        return !0
    }
    function M(e) {
        var t, n, r, i, o, u, a, f, l, c, h, p, d, v = [], m = [], g = s._data(this, "events");
        if (e.liveFired === this ||!g ||!g.live || e.target.disabled || e.button && e.type === "click")
            return;
        e.namespace && (p = new RegExp("(^|\\.)" + e.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), e.liveFired = this;
        var y = g.live.slice(0);
        for (a = 0; a < y.length; a++)
            o = y[a], o.origType.replace(w, "") === e.type ? m.push(o.selector) : y.splice(a--, 1);
        i = s(e.target).closest(m, e.currentTarget);
        for (f = 0, l = i.length; f < l; f++) {
            h = i[f];
            for (a = 0; a < y.length; a++) {
                o = y[a];
                if (h.selector === o.selector && (!p || p.test(o.namespace))&&!h.elem.disabled) {
                    u = h.elem, r = null;
                    if (o.preType === "mouseenter" || o.preType === "mouseleave")
                        e.type = o.preType, r = s(e.relatedTarget).closest(o.selector)[0], r && s.contains(u, r) && (r = u);
                    (!r || r !== u) && v.push({
                        elem: u,
                        handleObj: o,
                        level: h.level
                    })
                }
            }
        }
        for (f = 0, l = v.length; f < l; f++) {
            i = v[f];
            if (n && i.level > n)
                break;
            e.currentTarget = i.elem, e.data = i.handleObj.data, e.handleObj = i.handleObj, d = i.handleObj.origHandler.apply(i.elem, arguments);
            if (d===!1 || e.isPropagationStopped()) {
                n = i.level, d===!1 && (t=!1);
                if (e.isImmediatePropagationStopped())
                    break
            }
        }
        return t
    }
    function _(e, t) {
        return (e && e !== "*" ? e + "." : "") + t.replace(S, "`").replace(x, "&")
    }
    function q(e) {
        return !e ||!e.parentNode || e.parentNode.nodeType === 11
    }
    function R(e, t, n) {
        t = t || 0;
        if (s.isFunction(t))
            return s.grep(e, function(e, r) {
                var i=!!t.call(e, r, e);
                return i === n
            });
        if (t.nodeType)
            return s.grep(e, function(e, r) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = s.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (B.test(t))
                return s.filter(t, r, !n);
            t = s.filter(t, r)
        }
        return s.grep(e, function(e, r) {
            return s.inArray(e, t) >= 0 === n
        })
    }
    function Z(e, t) {
        return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function et(e, t) {
        if (t.nodeType !== 1 ||!s.hasData(e))
            return;
        var n = s.expando, r = s.data(e), i = s.data(t, r);
        if (r = r[n]) {
            var o = r.events;
            i = i[n] = s.extend({}, r);
            if (o) {
                delete i.handle, i.events = {};
                for (var u in o)
                    for (var a = 0, f = o[u].length; a < f; a++)
                        s.event.add(t, u + (o[u][a].namespace ? "." : "") + o[u][a].namespace, o[u][a], o[u][a].data)
                    }
        }
    }
    function tt(e, t) {
        var n;
        if (t.nodeType !== 1)
            return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase();
        if (n === "object")
            t.outerHTML = e.outerHTML;
        else if (n !== "input" || e.type !== "checkbox" && e.type !== "radio") {
            if (n === "option")
                t.selected = e.defaultSelected;
            else if (n === "input" || n === "textarea")
                t.defaultValue = e.defaultValue
        } else 
            e.checked && (t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value);
        t.removeAttribute(s.expando)
    }
    function nt(e) {
        return "getElementsByTagName"in e ? e.getElementsByTagName("*") : "querySelectorAll"in e ? e.querySelectorAll("*") : []
    }
    function rt(e) {
        if (e.type === "checkbox" || e.type === "radio")
            e.defaultChecked = e.checked
    }
    function it(e) {
        s.nodeName(e, "input") ? rt(e) : "getElementsByTagName"in e && s.grep(e.getElementsByTagName("input"), rt)
    }
    function gt(e, t, n) {
        var r = t === "width" ? e.offsetWidth: e.offsetHeight, i = t === "width" ? ht: pt;
        if (r > 0)
            return n !== "border" && s.each(i, function() {
                n || (r -= parseFloat(s.css(e, "padding" + this)) || 0), n === "margin" ? r += parseFloat(s.css(e, n + this)) || 0 : r -= parseFloat(s.css(e, "border" + this + "Width")) || 0
            }), r + "px";
        r = dt(e, t, t);
        if (r < 0 || r == null)
            r = e.style[t] || 0;
        return r = parseFloat(r) || 0, n && s.each(i, function() {
            r += parseFloat(s.css(e, "padding" + this)) || 0, n !== "padding" && (r += parseFloat(s.css(e, "border" + this + "Width")) || 0), n === "margin" && (r += parseFloat(s.css(e, n + this)) || 0)
        }), r + "px"
    }
    function Ct() {
        return setTimeout(kt, 0), Nt = s.now()
    }
    function kt() {
        Nt = t
    }
    function Lt(e, t) {
        var n = {};
        return s.each(Tt.concat.apply([], Tt.slice(0, t)), function() {
            n[this] = e
        }), n
    }
    function At(e) {
        if (!yt[e]) {
            var t = n.body, r = s("<" + e + ">").appendTo(t), i = r.css("display");
            r.remove();
            if (i === "none" || i === "") {
                bt || (bt = n.createElement("iframe"), bt.frameBorder = bt.width = bt.height = 0), t.appendChild(bt);
                if (!wt ||!bt.createElement)
                    wt = (bt.contentWindow || bt.contentDocument).document, wt.write((n.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>", "gl"), wt.close();
                r = wt.createElement(e), wt.body.appendChild(r), i = s.css(r, "display"), t.removeChild(bt)
            }
            yt[e] = i
        }
        return yt[e]
    }
    function _t(e) {
        return s.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n = e.document, r = e.navigator, i = e.location, s = function() {
        function A() {
            if (r.isReady)
                return;
            try {
                n.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(A, 1);
                return 
            }
            r.ready()
        }
        var r = function(e, t) {
            return new r.fn.init(e, t, o)
        }, i = e.jQuery, s = e.$, o, u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, a = /\S/, f = /^\s+/, l = /\s+$/, c = /\d/, h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, p = /^[\],:{}\s]*$/, d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, m = /(?:^|:|,)(?:\s*\[)+/g, g = /-([a-z]|[0-9])/ig, y = /^-ms-/, b = function(e, t) {
            return (t + "").toUpperCase()
        }, w, E, S = Object.prototype.toString, x = Object.prototype.hasOwnProperty, T = Array.prototype.push, N = Array.prototype.slice, C = String.prototype.trim, k = Array.prototype.indexOf, L = {};
        return r.fn = r.prototype = {
            constructor: r,
            init: function(e, i, s) {
                var o, a, f, l;
                if (!e)
                    return this;
                if (e.nodeType)
                    return this.context = this[0] = e, this.length = 1, this;
                if (e === "body"&&!i && n.body)
                    return this.context = n, this[0] = n.body, this.selector = e, this.length = 1, this;
                if (typeof e == "string") {
                    e.charAt(0) === "<" && e.charAt(e.length-1) === ">" && e.length >= 3 ? o = [null, e, null] : o = u.exec(e);
                    if (o && (o[1] ||!i)) {
                        if (o[1])
                            return i = i instanceof r ? i[0] : i, l = i ? i.ownerDocument || i : n, f = h.exec(e), f ? r.isPlainObject(i) ? (e = [n.createElement(f[1])], r.fn.attr.call(e, i, !0)) : e = [l.createElement(f[1])] : (f = r.buildFragment([o[1]], [l]), e = (f.cacheable ? r.clone(f.fragment) : f.fragment).childNodes), r.merge(this, e);
                        a = n.getElementById(o[2]);
                        if (a && a.parentNode) {
                            if (a.id !== o[2])
                                return s.find(e);
                            this.length = 1, this[0] = a
                        }
                        return this.context = n, this.selector = e, this
                    }
                    return !i || i.jquery ? (i || s).find(e) : this.constructor(i).find(e)
                }
                return r.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), r.makeArray(e, this))
            },
            selector: "",
            jquery: "1.6.4",
            length: 0,
            toArray: function() {
                return N.call(this, 0)
            },
            get: function(e) {
                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            },
            pushStack: function(e, t, n) {
                var i = this.constructor();
                return r.isArray(e) ? T.apply(i, e) : r.merge(i, e), i.prevObject = this, i.context = this.context, t === "find" ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")"), i
            },
            each: function(e, t) {
                return r.each(this, e, t)
            },
            ready: function(e) {
                return r.bindReady(), w.done(e), this
            },
            eq: function(e) {
                return e===-1 ? this.slice(e) : this.slice(e, + e + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(N.apply(this, arguments), "slice", N.call(arguments).join(","))
            },
            map: function(e) {
                return this.pushStack(r.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: T,
            sort: [].sort,
            splice: [].splice
        }, r.fn.init.prototype = r.fn, r.extend = r.fn.extend = function() {
            var e, n, i, s, o, u, a = arguments[0] || {}, f = 1, l = arguments.length, c=!1;
            typeof a == "boolean" && (c = a, a = arguments[1] || {}, f = 2), typeof a != "object"&&!r.isFunction(a) && (a = {}), l === f && (a = this, --f);
            for (; f < l; f++)
                if ((e = arguments[f]) != null)
                    for (n in e) {
                        i = a[n], s = e[n];
                        if (a === s)
                            continue;
                            c && s && (r.isPlainObject(s) || (o = r.isArray(s))) ? (o ? (o=!1, u = i && r.isArray(i) ? i : []) : u = i && r.isPlainObject(i) ? i : {}, a[n] = r.extend(c, u, s)) : s !== t && (a[n] = s)
                    }
            return a
        }, r.extend({
            noConflict: function(t) {
                return e.$ === r && (e.$ = s), t && e.jQuery === r && (e.jQuery = i), r
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? r.readyWait++ : r.ready(!0)
            },
            ready: function(e) {
                if (e===!0&&!--r.readyWait || e!==!0&&!r.isReady) {
                    if (!n.body)
                        return setTimeout(r.ready, 1);
                    r.isReady=!0;
                    if (e!==!0&&--r.readyWait > 0)
                        return;
                    w.resolveWith(n, [r]), r.fn.trigger && r(n).trigger("ready").unbind("ready")
                }
            },
            bindReady: function() {
                if (w)
                    return;
                w = r._Deferred();
                if (n.readyState === "complete")
                    return setTimeout(r.ready, 1);
                if (n.addEventListener)
                    n.addEventListener("DOMContentLoaded", E, !1), e.addEventListener("load", r.ready, !1);
                else if (n.attachEvent) {
                    n.attachEvent("onreadystatechange", E), e.attachEvent("onload", r.ready);
                    var t=!1;
                    try {
                        t = e.frameElement == null
                    } catch (i) {}
                    n.documentElement.doScroll && t && A()
                }
            },
            isFunction: function(e) {
                return r.type(e) === "function"
            },
            isArray: Array.isArray || function(e) {
                return r.type(e) === "array"
            },
            isWindow: function(e) {
                return e && typeof e == "object" && "setInterval"in e
            },
            isNaN: function(e) {
                return e == null ||!c.test(e) || isNaN(e)
            },
            type: function(e) {
                return e == null ? String(e) : L[S.call(e)] || "object"
            },
            isPlainObject: function(e) {
                if (!e || r.type(e) !== "object" || e.nodeType || r.isWindow(e))
                    return !1;
                try {
                    if (e.constructor&&!x.call(e, "constructor")&&!x.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (n) {
                    return !1
                }
                var i;
                for (i in e);
                return i === t || x.call(e, i)
            },
            isEmptyObject: function(e) {
                for (var t in e)
                    return !1;
                return !0
            },
            error: function(e) {
                throw e
            },
            parseJSON: function(t) {
                if (typeof t != "string" ||!t)
                    return null;
                t = r.trim(t);
                if (e.JSON && e.JSON.parse)
                    return e.JSON.parse(t);
                if (p.test(t.replace(d, "@").replace(v, "]").replace(m, "")))
                    return (new Function("return " + t))();
                r.error("Invalid JSON: " + t)
            },
            noop: function() {},
            camelCase: function(e) {
                return e.replace(y, "ms-").replace(g, b)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
            },
            each: function(e, n, i) {
                var s, o = 0, u = e.length, a = u === t || r.isFunction(e);
                if (i) {
                    if (a) {
                        for (s in e)
                            if (n.apply(e[s], i)===!1)
                                break
                    } else 
                        for (; o < u;)
                            if (n.apply(e[o++], i)===!1)
                                break
                } else if (a) {
                    for (s in e)
                        if (n.call(e[s], s, e[s])===!1)
                            break
                } else 
                    for (; o < u;)
                        if (n.call(e[o], o, e[o++])===!1)
                            break;
                return e
            },
            trim: C ? function(e) {
                return e == null ? "" : C.call(e)
            }
            : function(e) {
                return e == null ? "" : e.toString().replace(f, "").replace(l, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                if (e != null) {
                    var i = r.type(e);
                    e.length == null || i === "string" || i === "function" || i === "regexp" || r.isWindow(e) ? T.call(n, e) : r.merge(n, e)
                }
                return n
            },
            inArray: function(e, t) {
                if (!t)
                    return -1;
                if (k)
                    return k.call(t, e);
                for (var n = 0, r = t.length; n < r; n++)
                    if (t[n] === e)
                        return n;
                return -1
            },
            merge: function(e, n) {
                var r = e.length, i = 0;
                if (typeof n.length == "number")
                    for (var s = n.length; i < s; i++)
                        e[r++] = n[i];
                else 
                    while (n[i] !== t)
                        e[r++] = n[i++];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                var r = [], i;
                n=!!n;
                for (var s = 0, o = e.length; s < o; s++)
                    i=!!t(e[s], s), n !== i && r.push(e[s]);
                return r
            },
            map: function(e, n, i) {
                var s, o, u = [], a = 0, f = e.length, l = e instanceof r || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f-1] || f === 0 || r.isArray(e));
                if (l)
                    for (; a < f; a++)
                        s = n(e[a], a, i), s != null && (u[u.length] = s);
                else 
                    for (o in e)
                        s = n(e[o], o, i), s != null && (u[u.length] = s);
                return u.concat.apply([], u)
            },
            guid: 1,
            proxy: function(e, n) {
                if (typeof n == "string") {
                    var i = e[n];
                    n = e, e = i
                }
                if (!r.isFunction(e))
                    return t;
                var s = N.call(arguments, 2), o = function() {
                    return e.apply(n, s.concat(N.call(arguments)))
                };
                return o.guid = e.guid = e.guid || o.guid || r.guid++, o
            },
            access: function(e, n, i, s, o, u) {
                var a = e.length;
                if (typeof n == "object") {
                    for (var f in n)
                        r.access(e, f, n[f], s, o, i);
                    return e
                }
                if (i !== t) {
                    s=!u && s && r.isFunction(i);
                    for (var l = 0; l < a; l++)
                        o(e[l], n, s ? i.call(e[l], l, o(e[l], n)) : i, u);
                    return e
                }
                return a ? o(e[0], n) : t
            },
            now: function() {
                return (new Date).getTime()
            }
        }), r.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
            L["[object " + t + "]"] = t.toLowerCase()
        }), a.test(" ") && (f = /^[\s\xA0]+/, l = /[\s\xA0]+$/), o = r(n), n.addEventListener ? E = function() {
            n.removeEventListener("DOMContentLoaded", E, !1), r.ready()
        } : n.attachEvent && (E = function() {
            n.readyState === "complete" && (n.detachEvent("onreadystatechange", E), r.ready())
        }), r
    }();
    s.extend({
        _Deferred: function() {
            var e = [], t, n, r, i = {
                done: function() {
                    if (!r) {
                        var n = arguments, o, u, a, f, l;
                        t && (l = t, t = 0);
                        for (o = 0, u = n.length; o < u; o++)
                            a = n[o], f = s.type(a), f === "array" ? i.done.apply(i, a) : f === "function" && e.push(a);
                        l && i.resolveWith(l[0], l[1])
                    }
                    return this
                },
                resolveWith: function(i, s) {
                    if (!r&&!t&&!n) {
                        s = s || [], n = 1;
                        try {
                            while (e[0])
                                e.shift().apply(i, s)
                            } finally {
                            t = [i, s], n = 0
                        }
                    }
                    return this
                },
                resolve: function() {
                    return i.resolveWith(this, arguments), this
                },
                isResolved: function() {
                    return !!n||!!t
                },
                cancel: function() {
                    return r = 1, e = [], this
                }
            };
            return i
        }
    }), s.support = function() {
        var e = n.createElement("div"), t = n.documentElement, r, i, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w;
        e.setAttribute("className", "t"), e.innerHTML = parseHTML("   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>"), r = e.getElementsByTagName("*"), i = e.getElementsByTagName("a")[0];
        if (!r ||!r.length ||!i)
            return {};
        o = n.createElement("select"), u = o.appendChild(n.createElement("option")), a = e.getElementsByTagName("input")[0], l = {
            leadingWhitespace: e.firstChild.nodeType === 3,
            tbody: !e.getElementsByTagName("tbody").length,
            htmlSerialize: !!e.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: i.getAttribute("href") === "/a",
            opacity: /^0.55$/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: a.value === "on",
            optSelected: u.selected,
            getSetAttribute: e.className !== "t",
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, a.checked=!0, l.noCloneChecked = a.cloneNode(!0).checked, o.disabled=!0, l.optDisabled=!u.disabled;
        try {
            delete e.test
        } catch (E) {
            l.deleteExpando=!1
        }
        !e.addEventListener && e.attachEvent && e.fireEvent && (e.attachEvent("onclick", function() {
            l.noCloneEvent=!1
        }), e.cloneNode(!0).fireEvent("onclick")), a = n.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), l.radioValue = a.value === "t", a.setAttribute("checked", "checked"), e.appendChild(a), c = n.createDocumentFragment(), c.appendChild(e.firstChild), l.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = parseHTML(""), e.style.width = e.style.paddingLeft = "1px", h = n.getElementsByTagName("body")[0], d = n.createElement(h ? "div" : "body"), v = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, h && s.extend(v, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (b in v)
            d.style[b] = v[b];
        d.appendChild(e), p = h || t, p.insertBefore(d, p.firstChild), l.appendChecked = a.checked, l.boxModel = e.offsetWidth === 2, "zoom"in e.style && (e.style.display = "inline", e.style.zoom = 1, l.inlineBlockNeedsLayout = e.offsetWidth === 2, e.style.display = "", e.innerHTML = parseHTML("<div style='width:4px;'></div>"), l.shrinkWrapBlocks = e.offsetWidth !== 2), e.innerHTML = parseHTML("<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>"), m = e.getElementsByTagName("td"), w = m[0].offsetHeight === 0, m[0].style.display = "", m[1].style.display = "none", l.reliableHiddenOffsets = w && m[0].offsetHeight === 0, e.innerHTML = parseHTML(""), n.defaultView && n.defaultView.getComputedStyle && (f = n.createElement("div"), f.style.width = "0", f.style.marginRight = "0", e.appendChild(f), l.reliableMarginRight = (parseInt((n.defaultView.getComputedStyle(f, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0), d.innerHTML = parseHTML(""), p.removeChild(d);
        if (e.attachEvent)
            for (b in{
                submit: 1,
                change: 1,
                focusin: 1
            })
                y = "on" + b, w = y in e, w || (e.setAttribute(y, "return;"), w = typeof e[y] == "function"), l[b + "Bubbles"] = w;
        return d = c = o = u = h = f = e = a = null, l
    }(), s.boxModel = s.support.boxModel;
    var o = /^(?:\{.*\}|\[.*\])$/, u = /([A-Z])/g;
    s.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando], !!e&&!f(e)
        },
        data: function(e, n, r, i) {
            if (!s.acceptData(e))
                return;
            var o, u, a = s.expando, f = typeof n == "string", l = e.nodeType, c = l ? s.cache: e, h = l ? e[s.expando]: e[s.expando] && s.expando;
            if ((!h || i && h && c[h]&&!c[h][a]) && f && r === t)
                return;
            h || (l ? e[s.expando] = h=++s.uuid : h = s.expando), c[h] || (c[h] = {}, l || (c[h].toJSON = s.noop));
            if (typeof n == "object" || typeof n == "function")
                i ? c[h][a] = s.extend(c[h][a], n) : c[h] = s.extend(c[h], n);
            return o = c[h], i && (o[a] || (o[a] = {}), o = o[a]), r !== t && (o[s.camelCase(n)] = r), n === "events"&&!o[n] ? o[a] && o[a].events : (f ? (u = o[n], u == null && (u = o[s.camelCase(n)])) : u = o, u)
        },
        removeData: function(e, t, n) {
            if (!s.acceptData(e))
                return;
            var r, i = s.expando, o = e.nodeType, u = o ? s.cache: e, a = o ? e[s.expando]: s.expando;
            if (!u[a])
                return;
            if (t) {
                r = n ? u[a][i] : u[a];
                if (r) {
                    r[t] || (t = s.camelCase(t)), delete r[t];
                    if (!f(r))
                        return 
                }
            }
            if (n) {
                delete u[a][i];
                if (!f(u[a]))
                    return 
            }
            var l = u[a][i];
            s.support.deleteExpando ||!u.setInterval ? delete u[a] : u[a] = null, l ? (u[a] = {}, o || (u[a].toJSON = s.noop), u[a][i] = l) : o && (s.support.deleteExpando ? delete e[s.expando] : e.removeAttribute ? e.removeAttribute(s.expando) : e[s.expando] = null)
        },
        _data: function(e, t, n) {
            return s.data(e, t, n, !0)
        },
        acceptData: function(e) {
            if (e.nodeName) {
                var t = s.noData[e.nodeName.toLowerCase()];
                if (t)
                    return t!==!0 && e.getAttribute("classid") === t
            }
            return !0
        }
    }), s.fn.extend({
        data: function(e, n) {
            var r = null;
            if (typeof e == "undefined") {
                if (this.length) {
                    r = s.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var i = this[0].attributes, o;
                        for (var u = 0, f = i.length; u < f; u++)
                            o = i[u].name, o.indexOf("data-") === 0 && (o = s.camelCase(o.substring(5)), a(this[0], o, r[o]))
                    }
                }
                return r
            }
            if (typeof e == "object")
                return this.each(function() {
                    s.data(this, e)
                });
            var l = e.split(".");
            return l[1] = l[1] ? "." + l[1] : "", n === t ? (r = this.triggerHandler("getData" + l[1] + "!", [l[0]]), r === t && this.length && (r = s.data(this[0], e), r = a(this[0], e, r)), r === t && l[1] ? this.data(l[0]) : r) : this.each(function() {
                var t = s(this), r = [l[0], n];
                t.triggerHandler("setData" + l[1] + "!", r), s.data(this, e, n), t.triggerHandler("changeData" + l[1] + "!", r)
            })
        },
        removeData: function(e) {
            return this.each(function() {
                s.removeData(this, e)
            })
        }
    }), s.extend({
        _mark: function(e, n) {
            e && (n = (n || "fx") + "mark", s.data(e, n, (s.data(e, n, t, !0) || 0) + 1, !0))
        },
        _unmark: function(e, n, r) {
            e!==!0 && (r = n, n = e, e=!1);
            if (n) {
                r = r || "fx";
                var i = r + "mark", o = e ? 0: (s.data(n, i, t, !0) || 1)-1;
                o ? s.data(n, i, o, !0) : (s.removeData(n, i, !0), l(n, r, "mark"))
            }
        },
        queue: function(e, n, r) {
            if (e) {
                n = (n || "fx") + "queue";
                var i = s.data(e, n, t, !0);
                return r && (!i || s.isArray(r) ? i = s.data(e, n, s.makeArray(r), !0) : i.push(r)), i || []
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = s.queue(e, t), r = n.shift(), i;
            r === "inprogress" && (r = n.shift()), r && (t === "fx" && n.unshift("inprogress"), r.call(e, function() {
                s.dequeue(e, t)
            })), n.length || (s.removeData(e, t + "queue", !0), l(e, t, "queue"))
        }
    }), s.fn.extend({
        queue: function(e, n) {
            return typeof e != "string" && (n = e, e = "fx"), n === t ? s.queue(this[0], e) : this.each(function() {
                var t = s.queue(this, e, n);
                e === "fx" && t[0] !== "inprogress" && s.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                s.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = s.fx ? s.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function() {
                var n = this;
                setTimeout(function() {
                    s.dequeue(n, t)
                }, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        }
    });
    var c = /[\n\t\r]/g, h = /\s+/, p = /\r/g, d = /^(?:button|input)$/i, v = /^(?:button|input|object|select|textarea)$/i, m = /^a(?:rea)?$/i, g = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, y, b;
    s.fn.extend({
        attr: function(e, t) {
            return s.access(this, e, t, !0, s.attr)
        },
        removeAttr: function(e) {
            return this.each(function() {
                s.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return s.access(this, e, t, !0, s.prop)
        },
        removeProp: function(e) {
            return e = s.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, u, a;
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).addClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string") {
                t = e.split(h);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1)
                            i.className = e;
                        else {
                            o = " " + i.className + " ";
                            for (u = 0, a = t.length; u < a; u++)
                                ~o.indexOf(" " + t[u] + " ") || (o += t[u] + " ");
                                i.className = s.trim(o)
                            }
                    }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, o, u, a, f;
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).removeClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(h);
                for (r = 0, i = this.length; r < i; r++) {
                    o = this[r];
                    if (o.nodeType === 1 && o.className)
                        if (e) {
                            u = (" " + o.className + " ").replace(c, " ");
                            for (a = 0, f = n.length; a < f; a++)
                                u = u.replace(" " + n[a] + " ", " ");
                                o.className = s.trim(u)
                        } else 
                            o.className = ""
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e, r = typeof t == "boolean";
            return s.isFunction(e) ? this.each(function(n) {
                s(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, o = 0, u = s(this), a = t, f = e.split(h);
                    while (i = f[o++])
                        a = r ? a : !u.hasClass(i), u[a ? "addClass": "removeClass"](i)
                } else if (n === "undefined" || n === "boolean")
                    this.className && s._data(this, "__className__", this.className), this.className = this.className || e===!1 ? "" : s._data(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ";
            for (var n = 0, r = this.length; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(c, " ").indexOf(t)>-1)
                    return !0;
            return !1
        },
        val: function(e) {
            var n, r, i = this[0];
            if (!arguments.length)
                return i ? (n = s.valHooks[i.nodeName.toLowerCase()] || s.valHooks[i.type], n && "get"in n && (r = n.get(i, "value")) !== t ? r : (r = i.value, typeof r == "string" ? r.replace(p, "") : r == null ? "" : r)) : t;
            var o = s.isFunction(e);
            return this.each(function(r) {
                var i = s(this), u;
                if (this.nodeType !== 1)
                    return;
                o ? u = e.call(this, r, i.val()) : u = e, u == null ? u = "" : typeof u == "number" ? u += "" : s.isArray(u) && (u = s.map(u, function(e) {
                    return e == null ? "" : e + ""
                })), n = s.valHooks[this.nodeName.toLowerCase()] || s.valHooks[this.type];
                if (!n ||!("set"in n) || n.set(this, u, "value") === t)
                    this.value = u
            })
        }
    }), s.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n = e.selectedIndex, r = [], i = e.options, o = e.type === "select-one";
                    if (n < 0)
                        return null;
                    for (var u = o ? n : 0, a = o ? n + 1 : i.length; u < a; u++) {
                        var f = i[u];
                        if (f.selected && (s.support.optDisabled?!f.disabled : f.getAttribute("disabled") === null) && (!f.parentNode.disabled ||!s.nodeName(f.parentNode, "optgroup"))
                            ) {
                            t = s(f).val();
                            if (o)
                                return t;
                            r.push(t)
                        }
                    }
                    return o&&!r.length && i.length ? s(i[n]).val() : r
                },
                set: function(e, t) {
                    var n = s.makeArray(t);
                    return s(e).find("option").each(function() {
                        this.selected = s.inArray(s(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex =- 1), n
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attrFix: {
            tabindex: "tabIndex"
        },
        attr: function(e, n, r, i) {
            var o = e.nodeType;
            if (!e || o === 3 || o === 8 || o === 2)
                return t;
            if (i && n in s.attrFn)
                return s(e)[n](r);
            if ("getAttribute"in e) {
                var u, a, f = o !== 1 ||!s.isXMLDoc(e);
                return f && (n = s.attrFix[n] || n, a = s.attrHooks[n], a || (g.test(n) ? a = b : y && (a = y))), r !== t ? r === null ? (s.removeAttr(e, n), t) : a && "set"in a && f && (u = a.set(e, r, n)) !== t ? u : (e.setAttribute(n, "" + r), r) : a && "get"in a && f && (u = a.get(e, n)) !== null ? u : (u = e.getAttribute(n), u === null ? t : u)
            }
            return s.prop(e, n, r)
        },
        removeAttr: function(e, t) {
            var n;
            e.nodeType === 1 && (t = s.attrFix[t] || t, s.attr(e, t, ""), e.removeAttribute(t), g.test(t) && (n = s.propFix[t] || t)in e && (e[n]=!1))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (d.test(e.nodeName) && e.parentNode)
                        s.error("type property can't be changed");
                    else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return y && s.nodeName(e, "button") ? y.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (y && s.nodeName(e, "button"))
                        return y.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i = e.nodeType;
            if (!e || i === 3 || i === 8 || i === 2)
                return t;
            var o, u, a = i !== 1 ||!s.isXMLDoc(e);
            return a && (n = s.propFix[n] || n, u = s.propHooks[n]), r !== t ? u && "set"in u && (o = u.set(e, r, n)) !== t ? o : e[n] = r : u && "get"in u && (o = u.get(e, n)) !== null ? o : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : v.test(e.nodeName) || m.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), s.attrHooks.tabIndex = s.propHooks.tabIndex, b = {
        get: function(e, n) {
            var r;
            return s.prop(e, n)===!0 || (r = e.getAttributeNode(n)) && r.nodeValue!==!1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t===!1 ? s.removeAttr(e, n) : (r = s.propFix[n] || n, r in e && (e[r]=!0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, s.support.getSetAttribute || (y = s.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n), r && r.nodeValue !== "" ? r.nodeValue : t
        },
        set: function(e, t, r) {
            var i = e.getAttributeNode(r);
            return i || (i = n.createAttribute(r), e.setAttributeNode(i)), i.nodeValue = t + ""
        }
    }, s.each(["width", "height"], function(e, t) {
        s.attrHooks[t] = s.extend(s.attrHooks[t], {
            set: function(e, n) {
                if (n === "")
                    return e.setAttribute(t, "auto"), n
            }
        })
    })), s.support.hrefNormalized || s.each(["href", "src", "width", "height"], function(e, n) {
        s.attrHooks[n] = s.extend(s.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }), s.support.style || (s.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = "" + t
        }
    }), s.support.optSelected || (s.propHooks.selected = s.extend(s.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), s.support.checkOn || s.each(["radio", "checkbox"], function() {
        s.valHooks[this] = {
            get: function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }), s.each(["radio", "checkbox"], function() {
        s.valHooks[this] = s.extend(s.valHooks[this], {
            set: function(e, t) {
                if (s.isArray(t))
                    return e.checked = s.inArray(s(e).val(), t) >= 0
            }
        })
    });
    var w = /\.(.*)$/, E = /^(?:textarea|input|select)$/i, S = /\./g, x = / /g, T = /[^\w\s.|`]/g, N = function(e) {
        return e.replace(T, "\\$&")
    };
    s.event = {
        add: function(e, n, r, i) {
            if (e.nodeType === 3 || e.nodeType === 8)
                return;
            if (r===!1)
                r = C;
            else if (!r)
                return;
            var o, u;
            r.handler && (o = r, r = o.handler), r.guid || (r.guid = s.guid++);
            var a = s._data(e);
            if (!a)
                return;
            var f = a.events, l = a.handle;
            f || (a.events = f = {}), l || (a.handle = l = function(e) {
                return typeof s == "undefined"||!!e && s.event.triggered === e.type ? t : s.event.handle.apply(l.elem, arguments)
            }), l.elem = e, n = n.split(" ");
            var c, h = 0, p;
            while (c = n[h++]) {
                u = o ? s.extend({}, o) : {
                    handler: r,
                    data: i
                }, c.indexOf(".")>-1 ? (p = c.split("."), c = p.shift(), u.namespace = p.slice(0).sort().join(".")) : (p = [], u.namespace = ""), u.type = c, u.guid || (u.guid = r.guid);
                var d = f[c], v = s.event.special[c] || {};
                if (!d) {
                    d = f[c] = [];
                    if (!v.setup || v.setup.call(e, i, p, l)===!1)
                        e.addEventListener ? e.addEventListener(c, l, !1) : e.attachEvent && e.attachEvent("on" + c, l)
                    }
                v.add && (v.add.call(e, u), u.handler.guid || (u.handler.guid = r.guid)), d.push(u), s.event.global[c]=!0
            }
            e = null
        },
        global: {},
        remove: function(e, n, r, i) {
            if (e.nodeType === 3 || e.nodeType === 8)
                return;
            r===!1 && (r = C);
            var o, u, a, f, l = 0, c, h, p, d, v, m, g, y = s.hasData(e) && s._data(e), b = y && y.events;
            if (!y ||!b)
                return;
            n && n.type && (r = n.handler, n = n.type);
            if (!n || typeof n == "string" && n.charAt(0) === ".") {
                n = n || "";
                for (u in b)
                    s.event.remove(e, u + n);
                return 
            }
            n = n.split(" ");
            while (u = n[l++]) {
                g = u, m = null, c = u.indexOf(".") < 0, h = [], c || (h = u.split("."), u = h.shift(), p = new RegExp("(^|\\.)" + s.map(h.slice(0).sort(), N).join("\\.(?:.*\\.)?") + "(\\.|$)")), v = b[u];
                if (!v)
                    continue;
                if (!r) {
                    for (f = 0; f < v.length; f++) {
                        m = v[f];
                        if (c || p.test(m.namespace))
                            s.event.remove(e, g, m.handler, f), v.splice(f--, 1)
                    }
                    continue
                }
                d = s.event.special[u] || {};
                for (f = i || 0; f < v.length; f++) {
                    m = v[f];
                    if (r.guid === m.guid) {
                        if (c || p.test(m.namespace))
                            i == null && v.splice(f--, 1), d.remove && d.remove.call(e, m);
                        if (i != null)
                            break
                    }
                }
                if (v.length === 0 || i != null && v.length === 1)(!d.teardown || d.teardown.call(e, h)===!1) && s.removeEvent(e, u, y.handle)
                    , o = null, delete b[u]
            }
            if (s.isEmptyObject(b)) {
                var w = y.handle;
                w && (w.elem = null), delete y.events, delete y.handle, s.isEmptyObject(y) && s.removeData(e, t, !0)
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, r, i, o) {
            var u = n.type || n, a = [], f;
            u.indexOf("!") >= 0 && (u = u.slice(0, -1), f=!0), u.indexOf(".") >= 0 && (a = u.split("."), u = a.shift(), a.sort());
            if ((!i || s.event.customEvent[u])&&!s.event.global[u])
                return;
            n = typeof n == "object" ? n[s.expando] ? n : new s.Event(u, n) : new s.Event(u), n.type = u, n.exclusive = f, n.namespace = a.join("."), n.namespace_re = new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)");
            if (o ||!i)
                n.preventDefault(), n.stopPropagation();
            if (!i) {
                s.each(s.cache, function() {
                    var e = s.expando, t = this[e];
                    t && t.events && t.events[u] && s.event.trigger(n, r, t.handle.elem)
                });
                return 
            }
            if (i.nodeType === 3 || i.nodeType === 8)
                return;
            n.result = t, n.target = i, r = r != null ? s.makeArray(r) : [], r.unshift(n);
            var l = i, c = u.indexOf(":") < 0 ? "on" + u: "";
            do {
                var h = s._data(l, "handle");
                n.currentTarget = l, h && h.apply(l, r), c && s.acceptData(l) && l[c] && l[c].apply(l, r)===!1 && (n.result=!1, n.preventDefault()), l = l.parentNode || l.ownerDocument || l === n.target.ownerDocument && e
            }
            while (l&&!n.isPropagationStopped());
            if (!n.isDefaultPrevented()) {
                var p, d = s.event.special[u] || {};
                if ((!d._default || d._default.call(i.ownerDocument, n)===!1) && (u !== "click" ||!s.nodeName(i, "a")) && s.acceptData(i)) {
                    try {
                        c && i[u] && (p = i[c], p && (i[c] = null), s.event.triggered = u, i[u]())
                    } catch (v) {}
                    p && (i[c] = p), s.event.triggered = t
                }
            }
            return n.result
        },
        handle: function(n) {
            n = s.event.fix(n || e.event);
            var r = ((s._data(this, "events") || {})[n.type] || []).slice(0), i=!n.exclusive&&!n.namespace, o = Array.prototype.slice.call(arguments, 0);
            o[0] = n, n.currentTarget = this;
            for (var u = 0, a = r.length; u < a; u++) {
                var f = r[u];
                if (i || n.namespace_re.test(f.namespace)) {
                    n.handler = f.handler, n.data = f.data, n.handleObj = f;
                    var l = f.handler.apply(this, o);
                    l !== t && (n.result = l, l===!1 && (n.preventDefault(), n.stopPropagation()));
                    if (n.isImmediatePropagationStopped())
                        break
                }
            }
            return n.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(e) {
            if (e[s.expando])
                return e;
            var r = e;
            e = s.Event(r);
            for (var i = this.props.length, o; i;)
                o = this.props[--i], e[o] = r[o];
            e.target || (e.target = e.srcElement || n), e.target.nodeType === 3 && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement);
            if (e.pageX == null && e.clientX != null) {
                var u = e.target.ownerDocument || n, a = u.documentElement, f = u.body;
                e.pageX = e.clientX + (a && a.scrollLeft || f && f.scrollLeft || 0) - (a && a.clientLeft || f && f.clientLeft || 0), e.pageY = e.clientY + (a && a.scrollTop || f && f.scrollTop || 0) - (a && a.clientTop || f && f.clientTop || 0)
            }
            return e.which == null && (e.charCode != null || e.keyCode != null) && (e.which = e.charCode != null ? e.charCode : e.keyCode), !e.metaKey && e.ctrlKey && (e.metaKey = e.ctrlKey), !e.which && e.button !== t && (e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0), e
        },
        special: {
            ready: {
                setup: s.bindReady,
                teardown: s.noop
            },
            live: {
                add: function(e) {
                    s.event.add(this, _(e.origType, e.selector), s.extend({}, e, {
                        handler: M,
                        guid: e.handler.guid
                    }))
                },
                remove: function(e) {
                    s.event.remove(this, _(e.origType, e.selector), e)
                }
            },
            beforeunload: {
                setup: function(e, t, n) {
                    s.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        }
    }, s.removeEvent = n.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        e.detachEvent && e.detachEvent("on" + t, n)
    }, s.Event = function(e, t) {
        if (!this.preventDefault)
            return new s.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue===!1 || e.getPreventDefault && e.getPreventDefault() ? k : C) : this.type = e, t && s.extend(this, t), this.timeStamp = s.now(), this[s.expando]=!0
    }, s.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = k;
            var e = this.originalEvent;
            if (!e)
                return;
            e.preventDefault ? e.preventDefault() : e.returnValue=!1
        },
        stopPropagation: function() {
            this.isPropagationStopped = k;
            var e = this.originalEvent;
            if (!e)
                return;
            e.stopPropagation && e.stopPropagation(), e.cancelBubble=!0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = k, this.stopPropagation()
        },
        isDefaultPrevented: C,
        isPropagationStopped: C,
        isImmediatePropagationStopped: C
    };
    var L = function(e) {
        var t = e.relatedTarget, n=!1, r = e.type;
        e.type = e.data, t !== this && (t && (n = s.contains(this, t)), n || (s.event.handle.apply(this, arguments), e.type = r))
    }, A = function(e) {
        e.type = e.data, s.event.handle.apply(this, arguments)
    };
    s.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        s.event.special[e] = {
            setup: function(n) {
                s.event.add(this, t, n && n.selector ? A : L, e)
            },
            teardown: function(e) {
                s.event.remove(this, t, e && e.selector ? A : L)
            }
        }
    }), s.each(["bind", "one"], function(e, n) {
        s.fn[n] = function(e, r, i) {
            var o;
            if (typeof e == "object") {
                for (var u in e)
                    this[n](u, r, e[u], i);
                return this
            }
            if (arguments.length === 2 || r===!1)
                i = r, r = t;
            n === "one" ? (o = function(e) {
                return s(this).unbind(e, o), i.apply(this, arguments)
            }, o.guid = i.guid || s.guid++) : o = i;
            if (e === "unload" && n !== "one")
                this.one(e, r, i);
            else 
                for (var a = 0, f = this.length; a < f; a++)
                    s.event.add(this[a], e, o, r);
            return this
        }
    }), s.fn.extend({
        unbind: function(e, t) {
            if (typeof e == "object"&&!e.preventDefault)
                for (var n in e)
                    this.unbind(n, e[n]);
            else 
                for (var r = 0, i = this.length; r < i; r++)
                    s.event.remove(this[r], e, t);
            return this
        },
        delegate
        : function(e, t, n, r) {
            return this.live(t, n, r, e)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 0 ? this.unbind("live") : this.die(t, null, n, e)
        },
        trigger: function(e, t) {
            return this.each(function() {
                s.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0])
                return s.event.trigger(e, t, this[0], !0)
        },
        toggle: function(e) {
            var t = arguments, n = e.guid || s.guid++, r = 0, i = function(n) {
                var i = (s.data(this, "lastToggle" + e.guid) || 0)%r;
                return s.data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) ||!1
            };
            i.guid = n;
            while (r < t.length)
                t[r++].guid = n;
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var O = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    s.each(["live", "die"], function(e, n) {
        s.fn[n] = function(e, r, i, o) {
            var u, a = 0, f, l, c, h = o || this.selector, p = o ? this: s(this.context);
            if (typeof e == "object"&&!e.preventDefault) {
                for (var d in e)
                    p[n](d, r, e[d], h);
                return this
            }
            if (n === "die"&&!e && o && o.charAt(0) === ".")
                return p.unbind(o), this;
            if (r===!1 || s.isFunction(r))
                i = r || C, r = t;
            e = (e || "").split(" ");
            while ((u = e[a++]) != null) {
                f = w.exec(u), l = "", f && (l = f[0], u = u.replace(w, ""));
                if (u === "hover") {
                    e.push("mouseenter" + l, "mouseleave" + l);
                    continue
                }
                c = u, O[u] ? (e.push(O[u] + l), u += l) : u = (O[u] || u) + l;
                if (n === "live")
                    for (var v = 0, m = p.length; v < m; v++)
                        s.event.add(p[v], "live." + _(u, h), {
                            data: r,
                            selector: h,
                            handler: i,
                            origType: u,
                            origHandler: i,
                            preType: c
                        });
                else 
                    p.unbind("live." + _(u, h), i)
            }
            return this
        }
    }), s.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(e, t) {
        s.fn[t] = function(e, n) {
            return n == null && (n = e, e = null), arguments.length > 0 ? this.bind(t, e, n) : this.trigger(t)
        }, s.attrFn && (s.attrFn[t]=!0)
    }), function() {
        function b(e, t, n, r, i, s) {
            for (var o = 0, u = r.length; o < u; o++) {
                var a = r[o];
                if (a) {
                    var f=!1;
                    a = a[e];
                    while (a) {
                        if (a.sizcache === n) {
                            f = r[a.sizset];
                            break
                        }
                        a.nodeType === 1&&!s && (a.sizcache = n, a.sizset = o);
                        if (a.nodeName.toLowerCase() === t) {
                            f = a;
                            break
                        }
                        a = a[e]
                    }
                    r[o] = f
                }
            }
        }
        function w(e, t, n, r, i, s) {
            for (var o = 0, u = r.length; o < u; o++) {
                var a = r[o];
                if (a) {
                    var f=!1;
                    a = a[e];
                    while (a) {
                        if (a.sizcache === n) {
                            f = r[a.sizset];
                            break
                        }
                        if (a.nodeType === 1) {
                            s || (a.sizcache = n, a.sizset = o);
                            if (typeof t != "string") {
                                if (a === t) {
                                    f=!0;
                                    break
                                }
                            } else if (l.filter(t, [a]).length > 0) {
                                f = a;
                                break
                            }
                        }
                        a = a[e]
                    }
                    r[o] = f
                }
            }
        }
        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, r = 0, i = Object.prototype.toString, o=!1, u=!0, a = /\\/g, f = /\W/;
        [0, 0].sort(function() {
            return u=!1, 0
        });
        var l = function(t, r, s, o) {
            s = s || [], r = r || n;
            var u = r;
            if (r.nodeType !== 1 && r.nodeType !== 9)
                return [];
            if (!t || typeof t != "string")
                return s;
            var a, f, p, d, m, g, y, b, w=!0, S = l.isXML(r), x = [], T = t;
            do {
                e.exec(""), a = e.exec(T);
                if (a) {
                    T = a[3], x.push(a[1]);
                    if (a[2]) {
                        d = a[3];
                        break
                    }
                }
            }
            while (a);
            if (x.length > 1 && h.exec(t))
                if (x.length === 2 && c.relative[x[0]])
                    f = E(x[0] + x[1], r);
                else {
                    f = c.relative[x[0]] ? [r] : l(x.shift(), r);
                    while (x.length)
                        t = x.shift(), c.relative[t] && (t += x.shift()), f = E(t, f)
                } else {
                !o && x.length > 1 && r.nodeType === 9&&!S && c.match.ID.test(x[0])&&!c.match.ID.test(x[x.length-1]) && (m = l.find(x.shift(), r, S), r = m.expr ? l.filter(m.expr, m.set)[0] : m.set[0]);
                if (r) {
                    m = o ? {
                        expr: x.pop(),
                        set: v(o)
                    } : l.find(x.pop(), x.length !== 1 || x[0] !== "~" && x[0] !== "+" ||!r.parentNode ? r : r.parentNode, S), f = m.expr ? l.filter(m.expr, m.set) : m.set, x.length > 0 ? p = v(f) : w=!1;
                    while (x.length)
                        g = x.pop(), y = g, c.relative[g] ? y = x.pop() : g = "", y == null && (y = r), c.relative[g](p, y, S)
                } else 
                    p = x = []
            }
            p || (p = f), p || l.error(g || t);
            if (i.call(p) === "[object Array]")
                if (!w)
                    s.push.apply(s, p);
                else if (r && r.nodeType === 1)
                    for (b = 0; p[b] != null; b++)
                        p[b] && (p[b]===!0 || p[b].nodeType === 1 && l.contains(r, p[b])) && s.push(f[b]);
                else 
                    for (b = 0; p[b] != null; b++)
                        p[b] && p[b].nodeType === 1 && s.push(f[b]);
            else 
                v(p, s);
            return d && (l(d, u, s, o), l.uniqueSort(s)), s
        };
        l.uniqueSort = function(e) {
            if (g) {
                o = u, e.sort(g);
                if (o)
                    for (var t = 1; t < e.length; t++)
                        e[t] === e[t-1] && e.splice(t--, 1)
            }
            return e
        }, l.matches = function(e, t) {
            return l(e, null, null, t)
        }, l.matchesSelector = function(e, t) {
            return l(t, null, null, [e]).length > 0
        }, l.find = function(e, t, n) {
            var r;
            if (!e)
                return [];
            for (var i = 0, s = c.order.length; i < s; i++) {
                var o, u = c.order[i];
                if (o = c.leftMatch[u].exec(e)) {
                    var f = o[1];
                    o.splice(1, 1);
                    if (f.substr(f.length-1) !== "\\") {
                        o[1] = (o[1] || "").replace(a, ""), r = c.find[u](o, t, n);
                        if (r != null) {
                            e = e.replace(c.match[u], "");
                            break
                        }
                    }
                }
            }
            return r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []), {
                set: r, expr: e
            }
        }, l.filter = function(e, n, r, i) {
            var s, o, u = e, a = [], f = n, h = n && n[0] && l.isXML(n[0]);
            while (e && n.length) {
                for (var p in c.filter)
                    if ((s = c.leftMatch[p].exec(e)) != null && s[2]) {
                        var d, v, m = c.filter[p], g = s[1];
                        o=!1, s.splice(1, 1);
                        if (g.substr(g.length-1) === "\\")
                            continue;
                            f === a && (a = []);
                            if (c.preFilter[p]) {
                                s = c.preFilter[p](s, f, r, a, i, h);
                                if (!s)
                                    o = d=!0;
                                else if (s===!0)
                                    continue
                            }
                            if (s)
                                for (var y = 0; (v = f[y]) != null; y++)
                                    if (v) {
                                        d = m(v, s, y, f);
                                        var b = i^!!d;
                                        r && d != null ? b ? o=!0 : f[y]=!1 : b && (a.push(v), o=!0)
                                    }
                                    if (d !== t) {
                                        r || (f = a), e = e.replace(c.match[p], "");
                                        if (!o)
                                            return [];
                                            break
                                    }
                    }
                if (e === u) {
                    if (o != null)
                        break;
                    l.error(e)
                }
                u = e
            }
            return f
        }, l.error = function(e) {
            throw "Syntax error, unrecognized expression: " + e
        };
        var c = l.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(e) {
                    return e.getAttribute("href")
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function(e, t) {
                    var n = typeof t == "string", r = n&&!f.test(t), i = n&&!r;
                    r && (t = t.toLowerCase());
                    for (var s = 0, o = e.length, u; s < o; s++)
                        if (u = e[s]) {
                            while ((u = u.previousSibling) && u.nodeType !== 1);
                            e[s] = i || u && u.nodeName.toLowerCase() === t ? u ||!1 : u === t
                        }
                    i && l.filter(t, e, !0)
                },
                ">": function(e, t) {
                    var n, r = typeof t == "string", i = 0, s = e.length;
                    if (r&&!f.test(t)) {
                        t = t.toLowerCase();
                        for (; i < s; i++) {
                            n = e[i];
                            if (n) {
                                var o = n.parentNode;
                                e[i] = o.nodeName.toLowerCase() === t ? o : !1
                            }
                        }
                    } else {
                        for (; i < s; i++)
                            n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
                        r && l.filter(t, e, !0)
                    }
                },
                "": function(e, t, n) {
                    var i, s = r++, o = w;
                    typeof t == "string"&&!f.test(t) && (t = t.toLowerCase(), i = t, o = b), o("parentNode", t, s, e, i, n)
                },
                "~": function(e, t, n) {
                    var i, s = r++, o = w;
                    typeof t == "string"&&!f.test(t) && (t = t.toLowerCase(), i = t, o = b), o("previousSibling", t, s, e, i, n)
                }
            },
            find: {
                ID: function(e, t, n) {
                    if (typeof t.getElementById != "undefined"&&!n) {
                        var r = t.getElementById(e[1]);
                        return r && r.parentNode ? [r] : []
                    }
                },
                NAME: function(e, t) {
                    if (typeof t.getElementsByName != "undefined") {
                        var n = [], r = t.getElementsByName(e[1]);
                        for (var i = 0, s = r.length; i < s; i++)
                            r[i].getAttribute("name") === e[1] && n.push(r[i]);
                        return n.length === 0 ? null : n
                    }
                },
                TAG: function(e, t) {
                    if (typeof t.getElementsByTagName != "undefined")
                        return t.getElementsByTagName(e[1])
                }
            },
            preFilter: {
                CLASS: function(e, t, n, r, i, s) {
                    e = " " + e[1].replace(a, "") + " ";
                    if (s)
                        return e;
                    for (var o = 0, u; (u = t[o]) != null; o++)
                        u && (i^(u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o]=!1));
                    return !1
                },
                ID: function(e) {
                    return e[1].replace(a, "")
                },
                TAG: function(e, t) {
                    return e[1].replace(a, "").toLowerCase()
                },
                CHILD: function(e) {
                    if (e[1] === "nth") {
                        e[2] || l.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
                        var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" ||!/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1)-0, e[3] = t[3]-0
                    } else 
                        e[2] && l.error(e[0]);
                    return e[0] = r++, e
                },
                ATTR: function(e, t, n, r, i, s) {
                    var o = e[1] = e[1].replace(a, "");
                    return !s && c.attrMap[o] && (e[1] = c.attrMap[o]), e[4] = (e[4] || e[5] || "").replace(a, ""), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
                },
                PSEUDO: function(t, n, r, i, s) {
                    if (t[1] === "not") {
                        if (!((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                            var o = l.filter(t[3], n, r, !0^s);
                            return r || i.push.apply(i, o), !1
                        }
                        t[3] = l(t[3], null, null, n)
                    } else if (c.match.POS.test(t[0]) || c.match.CHILD.test(t[0]))
                        return !0;
                    return t
                },
                POS: function(e) {
                    return e.unshift(!0), e
                }
            },
            filters: {
                enabled: function(e) {
                    return e.disabled===!1 && e.type !== "hidden"
                },
                disabled: function(e) {
                    return e.disabled===!0
                },
                checked: function(e) {
                    return e.checked===!0
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected===!0
                },
                parent: function(e) {
                    return !!e.firstChild
                },
                empty: function(e) {
                    return !e.firstChild
                },
                has: function(e, t, n) {
                    return !!l(n[3], e).length
                },
                header: function(e) {
                    return /h\d/i.test(e.nodeName)
                },
                text: function(e) {
                    var t = e.getAttribute("type"), n = e.type;
                    return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                },
                radio: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                },
                checkbox: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                },
                file: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                },
                password: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                },
                submit: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "submit" === e.type
                },
                image: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                },
                reset: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "reset" === e.type
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && "button" === e.type || t === "button"
                },
                input: function(e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                },
                focus: function(e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(e, t) {
                    return t === 0
                },
                last: function(e, t, n, r) {
                    return t === r.length-1
                },
                even: function(e, t) {
                    return t%2 === 0
                },
                odd: function(e, t) {
                    return t%2 === 1
                },
                lt: function(e, t, n) {
                    return t < n[3]-0
                },
                gt: function(e, t, n) {
                    return t > n[3]-0
                },
                nth: function(e, t, n) {
                    return n[3]-0 === t
                },
                eq: function(e, t, n) {
                    return n[3]-0 === t
                }
            },
            filter: {
                PSEUDO: function(e, t, n, r) {
                    var i = t[1], s = c.filters[i];
                    if (s)
                        return s(e, n, t, r);
                    if (i === "contains")
                        return (e.textContent || e.innerText || l.getText([e]) || "").indexOf(t[3]) >= 0;
                    if (i === "not") {
                        var o = t[3];
                        for (var u = 0, a = o.length; u < a; u++)
                            if (o[u] === e)
                                return !1;
                        return !0
                    }
                    l.error(i)
                },
                CHILD: function(e, t) {
                    var n = t[1], r = e;
                    switch (n) {
                    case"only":
                    case"first":
                        while (r = r.previousSibling)
                            if (r.nodeType === 1)
                                return !1;
                        if (n === "first")
                            return !0;
                        r = e;
                    case"last":
                        while (r = r.nextSibling)
                            if (r.nodeType === 1)
                                return !1;
                        return !0;
                    case"nth":
                        var i = t[2], s = t[3];
                        if (i === 1 && s === 0)
                            return !0;
                        var o = t[0], u = e.parentNode;
                        if (u && (u.sizcache !== o ||!e.nodeIndex)) {
                            var a = 0;
                            for (r = u.firstChild; r; r = r.nextSibling)
                                r.nodeType === 1 && (r.nodeIndex=++a);
                            u.sizcache = o
                        }
                        var f = e.nodeIndex - s;
                        return i === 0 ? f === 0 : f%i === 0 && f / i >= 0
                    }
                },
                ID: function(e, t) {
                    return e.nodeType === 1 && e.getAttribute("id") === t
                },
                TAG: function(e, t) {
                    return t === "*" && e.nodeType === 1 || e.nodeName.toLowerCase() === t
                },
                CLASS: function(e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t)>-1
                },
                ATTR: function(e, t) {
                    var n = t[1], r = c.attrHandle[n] ? c.attrHandle[n](e): e[n] != null ? e[n]: e.getAttribute(n), i = r + "", s = t[2], o = t[4];
                    return r == null ? s === "!=" : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r!==!1
                },
                POS: function(e, t, n, r) {
                    var i = t[2], s = c.setFilters[i];
                    if (s)
                        return s(e, n, t, r)
                }
            }
        }, h = c.match.POS, p = function(e, t) {
            return "\\" + (t-0 + 1)
        };
        for (var d in c.match)
            c.match[d] = new RegExp(c.match[d].source + /(?![^\[]*\])(?![^\(]*\))/.source), c.leftMatch[d] = new RegExp(/(^(?:.|\r|\n)*?)/.source + c.match[d].source.replace(/\\(\d+)/g, p));
        var v = function(e, t) {
            return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
        };
        try {
            Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
        } catch (m) {
            v = function(e, t) {
                var n = 0, r = t || [];
                if (i.call(e) === "[object Array]")
                    Array.prototype.push.apply(r, e);
                else if (typeof e.length == "number")
                    for (var s = e.length; n < s; n++)
                        r.push(e[n]);
                else 
                    for (; e[n]; n++)
                        r.push(e[n]);
                return r
            }
        }
        var g, y;
        n.documentElement.compareDocumentPosition ? g = function(e, t) {
            return e === t ? (o=!0, 0) : !e.compareDocumentPosition ||!t.compareDocumentPosition ? e.compareDocumentPosition?-1 : 1 : e.compareDocumentPosition(t) & 4?-1 : 1
        } : (g = function(e, t) {
            if (e === t)
                return o=!0, 0;
            if (e.sourceIndex && t.sourceIndex)
                return e.sourceIndex - t.sourceIndex;
            var n, r, i = [], s = [], u = e.parentNode, a = t.parentNode, f = u;
            if (u === a)
                return y(e, t);
            if (!u)
                return -1;
            if (!a)
                return 1;
            while (f)
                i.unshift(f), f = f.parentNode;
            f = a;
            while (f)
                s.unshift(f), f = f.parentNode;
            n = i.length, r = s.length;
            for (var l = 0; l < n && l < r; l++)
                if (i[l] !== s[l])
                    return y(i[l], s[l]);
            return l === n ? y(e, s[l], -1) : y(i[l], t, 1)
        }, y = function(e, t, n) {
            if (e === t)
                return n;
            var r = e.nextSibling;
            while (r) {
                if (r === t)
                    return -1;
                r = r.nextSibling
            }
            return 1
        }), l.getText = function(e) {
            var t = "", n;
            for (var r = 0; e[r]; r++)
                n = e[r], n.nodeType === 3 || n.nodeType === 4 ? t += n.nodeValue : n.nodeType !== 8 && (t += l.getText(n.childNodes));
            return t
        }, function() {
            var e = n.createElement("div"), r = "script" + (new Date).getTime(), i = n.documentElement;
            e.innerHTML = parseHTML("<a name='" + r + "'/>"), i.insertBefore(e, i.firstChild), n.getElementById(r) && (c.find.ID = function(e, n, r) {
                if (typeof n.getElementById != "undefined"&&!r) {
                    var i = n.getElementById(e[1]);
                    return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                }
            }, c.filter.ID = function(e, t) {
                var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                return e.nodeType === 1 && n && n.nodeValue === t
            }), i.removeChild(e), i = e = null
        }(), function() {
            var e = n.createElement("div");
            e.appendChild(n.createComment("")), e.getElementsByTagName("*").length > 0 && (c.find.TAG = function(e, t) {
                var n = t.getElementsByTagName(e[1]);
                if (e[1] === "*") {
                    var r = [];
                    for (var i = 0; n[i]; i++)
                        n[i].nodeType === 1 && r.push(n[i]);
                    n = r
                }
                return n
            }), e.innerHTML = parseHTML("<a href='#'></a>"), e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (c.attrHandle.href = parseURL(function(e) {
                return e.getAttribute("href", 2)
            })), e = null
        }(), n.querySelectorAll && function() {
            var e = l, t = n.createElement("div"), r = "__sizzle__";
            t.innerHTML = parseHTML("<p class='TEST'></p>");
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0)
                return;
            l = function(t, i, s, o) {
                i = i || n;
                if (!o&&!l.isXML(i)) {
                    var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                    if (u && (i.nodeType === 1 || i.nodeType === 9)) {
                        if (u[1])
                            return v(i.getElementsByTagName(t), s);
                        if (u[2] && c.find.CLASS && i.getElementsByClassName)
                            return v(i.getElementsByClassName(u[2]), s)
                        }
                    if (i.nodeType === 9) {
                        if (t === "body" && i.body)
                            return v([i.body], s);
                        if (u && u[3]) {
                            var a = i.getElementById(u[3]);
                            if (!a ||!a.parentNode)
                                return v([], s);
                            if (a.id === u[3])
                                return v([a], s)
                            }
                        try {
                            return v(i.querySelectorAll(t), s)
                        } catch (f) {}
                    } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
                        var h = i, p = i.getAttribute("id"), d = p || r, m = i.parentNode, g = /^\s*[+~]/.test(t);
                        p ? d = d.replace(/'/g, "\\$&") : i.setAttribute("id", d), g && m && (i = i.parentNode);
                        try {
                            if (!g || m)
                                return v(i.querySelectorAll("[id='" + d + "'] " + t), s)
                            } catch (y) {} finally {
                                p || h.removeAttribute("id")
                            }
                    }
                }
                return e(t, i, s, o)
            };
            for (var i in e)
                l[i] = e[i];
            t = null
        }(), function() {
            var e = n.documentElement, t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
            if (t) {
                var r=!t.call(n.createElement("div"), "div"), i=!1;
                try {
                    t.call(n.documentElement, "[test!='']:sizzle")
                } catch (s) {
                    i=!0
                }
                l.matchesSelector = function(e, n) {
                    n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!l.isXML(e))
                        try {
                            if (i ||!c.match.PSEUDO.test(n)&&!/!=/.test(n)) {
                                var s = t.call(e, n);
                                if (s ||!r || e.document && e.document.nodeType !== 11)
                                    return s
                            }
                    } catch (o) {}
                    return l(n, null, null, [e]).length > 0
                }
            }
        }(), function() {
            var e = n.createElement("div");
            e.innerHTML = parseHTML("<div class='test e'></div><div class='test'></div>");
            if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0)
                return;
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1)
                return;
            c.order.splice(1, 0, "CLASS"), c.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName != "undefined"&&!n)
                    return t.getElementsByClassName(e[1])
            }, e = null
        }(), n.documentElement.contains ? l.contains = function(e, t) {
            return e !== t && (e.contains ? e.contains(t) : !0)
        } : n.documentElement.compareDocumentPosition ? l.contains = function(e, t) {
            return !!(e.compareDocumentPosition(t) & 16)
        } : l.contains = function() {
            return !1
        }, l.isXML = function(e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        };
        var E = function(e, t) {
            var n, r = [], i = "", s = t.nodeType ? [t]: t;
            while (n = c.match.PSEUDO.exec(e))
                i += n[0], e = e.replace(c.match.PSEUDO, "");
            e = c.relative[e] ? e + "*" : e;
            for (var o = 0, u = s.length; o < u; o++)
                l(e, s[o], r);
            return l.filter(i, r)
        };
        s.find = l, s.expr = l.selectors, s.expr[":"] = s.expr.filters, s.unique = l.uniqueSort, s.text = l.getText, s.isXMLDoc = l.isXML, s.contains = l.contains
    }();
    var D = /Until$/, P = /^(?:parents|prevUntil|prevAll)/, H = /,/, B = /^.[^:#\[\.,]*$/, j = Array.prototype.slice, F = s.expr.match.POS, I = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    s.fn.extend({
        find: function(e) {
            var t = this, n, r;
            if (typeof e != "string")
                return s(e).filter(function() {
                    for (n = 0, r = t.length; n < r; n++)
                        if (s.contains(t[n], this))
                            return !0
                        });
            var i = this.pushStack("", "find", e), o, u, a;
            for (n = 0, r = this.length; n < r; n++) {
                o = i.length, s.find(e, this[n], i);
                if (n > 0)
                    for (u = o; u < i.length; u++)
                        for (a = 0; a < o; a++)
                            if (i[a] === i[u]) {
                                i.splice(u--, 1);
                                break
                            }
            }
            return i
        },
        has: function(e) {
            var t = s(e);
            return this.filter(function() {
                for (var e = 0, n = t.length; e < n; e++)
                    if (s.contains(this, t[e]))
                        return !0
            })
        },
        not: function(e) {
            return this.pushStack(R(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(R(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e == "string" ? s.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n = [], r, i, o = this[0];
            if (s.isArray(e)) {
                var u, a, f = {}, l = 1;
                if (o && e.length) {
                    for (r = 0, i = e.length; r < i; r++)
                        a = e[r], f[a] || (f[a] = F.test(a) ? s(a, t || this.context) : a);
                    while (o && o.ownerDocument && o !== t) {
                        for (a in f)
                            u = f[a], (u.jquery ? u.index(o)>-1 : s(o).is(u)) && n.push({
                            selector: a,
                            elem: o,
                            level: l
                        });
                        o = o.parentNode, l++
                    }
                }
                return n
            }
            var c = F.test(e) || typeof e != "string" ? s(e, t || this.context): 0;
            for (r = 0, i = this.length; r < i; r++) {
                o = this[r];
                while (o) {
                    if (c ? c.index(o)>-1 : s.find.matchesSelector(o, e)) {
                        n.push(o);
                        break
                    }
                    o = o.parentNode;
                    if (!o ||!o.ownerDocument || o === t || o.nodeType === 11)
                        break
                }
            }
            return n = n.length > 1 ? s.unique(n) : n, this.pushStack(n, "closest", e)
        },
        index: function(e) {
            return e ? typeof e == "string" ? s.inArray(this[0], s(e)) : s.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? s(e, t): s.makeArray(e && e.nodeType ? [e] : e), r = s.merge(this.get(), n);
            return this.pushStack(q(n[0]) || q(r[0]) ? r : s.unique(r))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), s.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return s.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return s.dir(e, "parentNode", n)
        },
        next: function(e) {
            return s.nth(e, 2, "nextSibling")
        },
        prev: function(e) {
            return s.nth(e, 2, "previousSibling")
        },
        nextAll: function(e) {
            return s.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return s.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return s.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return s.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return s.sibling(e.parentNode.firstChild, e)
        },
        children: function(e) {
            return s.sibling(e.firstChild)
        },
        contents: function(e) {
            return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : s.makeArray(e.childNodes)
        }
    }, function(e, t) {
        s.fn[e] = function(n, r) {
            var i = s.map(this, t, n), o = j.call(arguments);
            return D.test(e) || (r = n), r && typeof r == "string" && (i = s.filter(r, i)), i = this.length > 1&&!I[e] ? s.unique(i) : i, (this.length > 1 || H.test(r)) && P.test(e) && (i = i.reverse()), this.pushStack(i, e, o.join(","))
        }
    }), s.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [], o = e[n];
            while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 ||!s(o).is(r)))
                o.nodeType === 1 && i.push(o), o = o[n];
            return i
        },
        nth: function(e, t, n, r) {
            t = t || 1;
            var i = 0;
            for (; e; e = e[n])
                if (e.nodeType === 1&&++i === t)
                    break;
            return e
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling)
                e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var U = / jQuery\d+="(?:\d+|null)"/g, z = /^\s+/, W = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, X = /<([\w:]+)/, V = /<tbody/i, $ = /<|&#?\w+;/, J = /<(?:script|object|embed|option|style)/i, K = /checked\s*(?:[^=]|=\s*.checked.)/i, Q = /\/(java|ecma)script/i, G = /^\s*<!(?:\[CDATA\[|\-\-)/, Y = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    Y.optgroup = Y.option, Y.tbody = Y.tfoot = Y.colgroup = Y.caption = Y.thead, Y.th = Y.td, s.support.htmlSerialize || (Y._default = [1, "div<div>", "</div>"]), s.fn.extend({
        text: function(e) {
            return s.isFunction(e) ? this.each(function(t) {
                var n = s(this);
                n.text(e.call(this, t, n.text()))
            }) : typeof e != "object" && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e)) : s.text(this)
        },
        wrapAll: function(e) {
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = s(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1)
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return s.isFunction(e) ? this.each(function(t) {
                s(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = s(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            return this.each(function() {
                s(this).wrapAll(e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                s.nodeName(this, "body") || s(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
            if (arguments.length) {
                var e = s(arguments[0]);
                return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                return e.push.apply(e, s(arguments[0]).toArray()), e
            }
        },
        remove: function(e, t) {
            for (var n = 0, r; (r = this[n]) != null; n++)
                if (!e || s.filter(e, [r]).length)!t && r.nodeType === 1 && (s.cleanData(r.getElementsByTagName("*")), s.cleanData([r])
                    ), r.parentNode && r.parentNode.removeChild(r);
            return this
        },
        empty: function() {
            for (var e = 0, t; (t = this[e]) != null; e++) {
                t.nodeType === 1 && s.cleanData(t.getElementsByTagName("*"));
                while (t.firstChild)
                    t.removeChild(t.firstChild)
            }
            return this
        },
        clone: function(e, t) {
            return e = e == null?!1 : e, t = t == null ? e : t, this.map(function() {
                return s.clone(this, e, t)
            })
        },
        html: function(e) {
            if (e === t)
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(U, "") : null;
            if (typeof e == "string"&&!J.test(e) && (s.support.leadingWhitespace ||!z.test(e))&&!Y[(X.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(W, "<$1></$2>");
                try {
                    for (var n = 0, r = this.length; n < r; n++)
                        this[n].nodeType === 1 && (s.cleanData(this[n].getElementsByTagName("*")), this[n].innerHTML = parseHTML(e))
                } catch (i) {
                    this.empty().append(e)
                }
            } else 
                s.isFunction(e) ? this.each(function(t) {
                    var n = s(this);
                    n.html(e.call(this, t, n.html()))
                }) : this.empty().append(e);
            return this
        },
        replaceWith: function(e) {
            return this[0] && this[0].parentNode ? s.isFunction(e) ? this.each(function(t) {
                var n = s(this), r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = s(e).detach()), this.each(function() {
                var t = this.nextSibling, n = this.parentNode;
                s(this).remove(), t ? s(t).before(e) : s(n).append(e)
            })): this.length ? this.pushStack(s(s.isFunction(e) ? e(): e),
            "replaceWith",
            e): this
        }, detach : function(e) {
            return this.remove(e, !0)
        }, domManip: function(e, n, r) {
            var i, o, u, a, f = e[0], l = [];
            if (!s.support.checkClone && arguments.length === 3 && typeof f == "string" && K.test(f))
                return this.each(function() {
                    s(this).domManip(e, n, r, !0)
                });
            if (s.isFunction(f))
                return this.each(function(i) {
                    var o = s(this);
                    e[0] = f.call(this, i, n ? o.html() : t), o.domManip(e, n, r)
                });
            if (this[0]) {
                a = f && f.parentNode, s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length ? i = {
                    fragment: a
                } : i = s.buildFragment(e, this, l), u = i.fragment, u.childNodes.length === 1 ? o = u = u.firstChild : o = u.firstChild;
                if (o) {
                    n = n && s.nodeName(o, "tr");
                    for (var c = 0, h = this.length, p = h-1; c < h; c++)
                        r.call(n ? Z(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, !0, !0) : u)
                    }
                l.length && s.each(l, evalScript)
            }
            return this
        }
    }), s.buildFragment = function(e, t, r) {
        var i, o, u, a;
        return t && t[0] && (a = t[0].ownerDocument || t[0]), a.createDocumentFragment || (a = n), e.length === 1 && typeof e[0] == "string" && e[0].length < 512 && a === n && e[0].charAt(0) === "<"&&!J.test(e[0]) && (s.support.checkClone ||!K.test(e[0])) && (o=!0, u = s.fragments[e[0]], u && u !== 1 && (i = u)), i || (i = a.createDocumentFragment(), s.clean(e, a, i, r)), o && (s.fragments[e[0]] = u ? i : 1), {
            fragment: i, cacheable: o
        }
    }, s.fragments = {}, s.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        s.fn[e] = function(n) {
            var r = [], i = s(n), o = this.length === 1 && this[0].parentNode;
            if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1)
                return i[t](this[0]), this;
            for (var u = 0, a = i.length; u < a; u++) {
                var f = (u > 0 ? this.clone(!0) : this).get();
                s(i[u])[t](f), r = r.concat(f)
            }
            return this.pushStack(r, e, i.selector)
        }
    }), s.extend({
        clone: function(e, t, n) {
            var r = e.cloneNode(!0), i, o, u;
            if ((!s.support.noCloneEvent ||!s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11)&&!s.isXMLDoc(e)) {
                tt(e, r), i = nt(e), o = nt(r);
                for (u = 0; i[u]; ++u)
                    o[u] && tt(i[u], o[u])
            }
            if (t) {
                et(e, r);
                if (n) {
                    i = nt(e), o = nt(r);
                    for (u = 0; i[u]; ++u)
                        et(i[u], o[u])
                    }
            }
            return i = o = null, r
        },
        clean: function(e, t, r, i) {
            var o;
            t = t || n, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || n);
            var u = [], a;
            for (var f = 0, l; (l = e[f]) != null; f++) {
                typeof l == "number" && (l += "");
                if (!l)
                    continue;
                if (typeof l == "string")
                    if (!$.test(l))
                        l = t.createTextNode(l);
                    else {
                        l = l.replace(W, "<$1></$2>");
                        var c = (X.exec(l) || ["", ""])[1].toLowerCase(), h = Y[c] || Y._default, p = h[0], d = t.createElement("div");
                        d.innerHTML = parseHTML(h[1] + l + h[2]);
                        while (p--)
                            d = d.lastChild;
                            if (!s.support.tbody) {
                                var v = V.test(l), m = c === "table"&&!v ? d.firstChild && d.firstChild.childNodes: h[1] === "<table>"&&!v ? d.childNodes: [];
                                for (a = m.length-1; a >= 0; --a)
                                    s.nodeName(m[a], "tbody")&&!m[a].childNodes.length && m[a].parentNode.removeChild(m[a])
                                }
                                !s.support.leadingWhitespace && z.test(l) && d.insertBefore(t.createTextNode(z.exec(l)[0]), d.firstChild), l = d.childNodes
                        }
                var g;
                if (!s.support.appendChecked)
                    if (l[0] && typeof (g = l.length) == "number")
                        for (a = 0; a < g; a++)
                            it(l[a]);
                    else 
                        it(l);
                l.nodeType ? u.push(l) : u = s.merge(u, l)
            }
            if (r) {
                o = function(e) {
                    return !e.type || Q.test(e.type)
                };
                for (f = 0; u[f]; f++)
                    if (i && s.nodeName(u[f], "script") && (!u[f].type || u[f].type.toLowerCase() === "text/javascript"))
                        i.push(u[f].parentNode ? u[f].parentNode.removeChild(u[f]) : u[f]);
                    else {
                        if (u[f].nodeType === 1) {
                            var y = s.grep(u[f].getElementsByTagName("script"), o);
                            u.splice.apply(u, [f + 1, 0].concat(y))
                        }
                        r.appendChild(u[f])
                    }
                }
            return u
        },
        cleanData: function(e) {
            var t, n, r = s.cache, i = s.expando, o = s.event.special, u = s.support.deleteExpando;
            for (var a = 0, f; (f = e[a]) != null; a++) {
                if (f.nodeName && s.noData[f.nodeName.toLowerCase()])
                    continue;
                n = f[s.expando];
                if (n) {
                    t = r[n] && r[n][i];
                    if (t && t.events) {
                        for (var l in t.events)
                            o[l] ? s.event.remove(f, l) : s.removeEvent(f, l, t.handle);
                        t.handle && (t.handle.elem = null)
                    }
                    u ? delete f[s.expando] : f.removeAttribute && f.removeAttribute(s.expando), delete r[n]
                }
            }
        }
    });
    var st = /alpha\([^)]*\)/i, ot = /opacity=([^)]*)/, ut = /([A-Z]|^ms)/g, at = /^-?\d+(?:px)?$/i, ft = /^-?\d/, lt = /^([\-+])=([\-+.\de]+)/, ct = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, ht = ["Left", "Right"], pt = ["Top", "Bottom"], dt, vt, mt;
    s.fn.css = function(e, n) {
        return arguments.length === 2 && n === t ? this : s.access(this, e, n, !0, function(e, n, r) {
            return r !== t ? s.style(e, n, r) : s.css(e, n)
        })
    }, s.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = dt(e, "opacity", "opacity");
                        return n === "" ? "1" : n
                    }
                    return e.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": s.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 ||!e.style)
                return;
            var o, u, a = s.camelCase(n), f = e.style, l = s.cssHooks[a];
            n = s.cssProps[a] || a;
            if (r === t)
                return l && "get"in l && (o = l.get(e, !1, i)) !== t ? o : f[n];
            u = typeof r, u === "string" && (o = lt.exec(r)) && (r =+ (o[1] + 1)*+o[2] + parseFloat(s.css(e, n)), u = "number");
            if (r == null || u === "number" && isNaN(r))
                return;
            u === "number"&&!s.cssNumber[a] && (r += "px");
            if (!l ||!("set"in l) || (r = l.set(e, r)) !== t)
                try {
                    f[n] = r
            } catch (c) {}
        },
        css: function(e, n, r) {
            var i, o;
            n = s.camelCase(n), o = s.cssHooks[n], n = s.cssProps[n] || n, n === "cssFloat" && (n = "float");
            if (o && "get"in o && (i = o.get(e, !0, r)) !== t)
                return i;
            if (dt)
                return dt(e, n)
        },
        swap: function(e, t, n) {
            var r = {};
            for (var i in t)
                r[i] = e.style[i], e.style[i] = t[i];
            n.call(e);
            for (i in t)
                e.style[i] = r[i]
        }
    }), s.each(["height", "width"], function(e, t) {
        s.cssHooks[t] = {
            get: function(e, n, r) {
                var i;
                if (n)
                    return e.offsetWidth !== 0 ? gt(e, t, r) : (s.swap(e, ct, function() {
                        i = gt(e, t, r)
                    }), i)
            },
            set: function(e, t) {
                if (!at.test(t))
                    return t;
                t = parseFloat(t);
                if (t >= 0)
                    return t + "px"
            }
        }
    }), s.support.opacity || (s.cssHooks.opacity = {
        get: function(e, t) {
            return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style, r = e.currentStyle, i = s.isNaN(t) ? "": "alpha(opacity=" + t * 100 + ")", o = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && s.trim(o.replace(st, "")) === "") {
                n.removeAttribute("filter");
                if (r&&!r.filter)
                    return 
            }
            n.filter = st.test(o) ? o.replace(st, i) : o + " " + i
        }
    }), s(function() {
        s.support.reliableMarginRight || (s.cssHooks.marginRight = {
            get: function(e, t) {
                var n;
                return s.swap(e, {
                    display: "inline-block"
                }, function() {
                    t ? n = dt(e, "margin-right", "marginRight") : n = e.style.marginRight
                }), n
            }
        })
    }), n.defaultView && n.defaultView.getComputedStyle && (vt = function(e, n) {
        var r, i, o;
        n = n.replace(ut, "-$1").toLowerCase();
        if (!(i = e.ownerDocument.defaultView))
            return t;
        if (o = i.getComputedStyle(e, null))
            r = o.getPropertyValue(n), r === ""&&!s.contains(e.ownerDocument.documentElement, e) && (r = s.style(e, n));
        return r
    }), n.documentElement.currentStyle && (mt = function(e, t) {
        var n, r = e.currentStyle && e.currentStyle[t], i = e.runtimeStyle && e.runtimeStyle[t], s = e.style;
        return !at.test(r) && ft.test(r) && (n = s.left, i && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : r || 0, r = s.pixelLeft + "px", s.left = n, i && (e.runtimeStyle.left = i)), r === "" ? "auto" : r
    }), dt = vt || mt, s.expr && s.expr.filters && (s.expr.filters.hidden = function(e) {
        var t = e.offsetWidth, n = e.offsetHeight;
        return t === 0 && n === 0 ||!s.support.reliableHiddenOffsets && (e.style.display || s.css(e, "display")) === "none"
    }, s.expr.filters.visible = function(e) {
        return !s.expr.filters.hidden(e)
    });
    var yt = {}, bt, wt, Et = /^(?:toggle|show|hide)$/, St = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, xt, Tt = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], Nt;
    s.fn.extend({
        show: function(e, t, n) {
            var r, i;
            if (e || e === 0)
                return this.animate(Lt("show", 3), e, t, n);
            for (var o = 0, u = this.length; o < u; o++)
                r = this[o], r.style && (i = r.style.display, !s._data(r, "olddisplay") && i === "none" && (i = r.style.display = ""), i === "" && s.css(r, "display") === "none" && s._data(r, "olddisplay", At(r.nodeName)));
            for (o = 0; o < u; o++) {
                r = this[o];
                if (r.style) {
                    i = r.style.display;
                    if (i === "" || i === "none")
                        r.style.display = s._data(r, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function(e, t, n) {
            if (e || e === 0)
                return this.animate(Lt("hide", 3), e, t, n);
            for (var r = 0, i = this.length; r < i; r++)
                if (this[r].style) {
                    var o = s.css(this[r], "display");
                    o !== "none"&&!s._data(this[r], "olddisplay") && s._data(this[r], "olddisplay", o)
                }
            for (r = 0; r < i; r++)
                this[r].style && (this[r].style.display = "none");
            return this
        },
        _toggle: s.fn.toggle,
        toggle: function(e, t, n) {
            var r = typeof e == "boolean";
            return s.isFunction(e) && s.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function() {
                var t = r ? e: s(this).is(":hidden");
                s(this)[t ? "show": "hide"]()
            }) : this.animate(Lt("toggle", 3), e, t, n), this
        },
        fadeTo: function(e, t, n, r) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = s.speed(t, n, r);
            return s.isEmptyObject(e) ? this.each(i.complete, [!1]) : (e = s.extend({}, e), this[i.queue===!1 ? "each" : "queue"](function() {
                i.queue===!1 && s._mark(this);
                var t = s.extend({}, i), n = this.nodeType === 1, r = n && s(this).is(":hidden"), o, u, a, f, l, c, h, p, d;
                t.animatedProperties = {};
                for (a in e) {
                    o = s.camelCase(a), a !== o && (e[o] = e[a], delete e[a]), u = e[o], s.isArray(u) ? (t.animatedProperties[o] = u[1], u = e[o] = u[0]) : t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing";
                    if (u === "hide" && r || u === "show"&&!r)
                        return t.complete.call(this);
                    n && (o === "height" || o === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], s.css(this, "display") === "inline" && s.css(this, "float") === "none" &&
                    (s.support.inlineBlockNeedsLayout ? (f = At(this.nodeName), f === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)) : this.style.display = "inline-block"))
                }
                t.overflow != null && (this.style.overflow = "hidden");
                for (a in e)
                    l = new s.fx(this, t, a), u = e[a], Et.test(u) ? l[u === "toggle" ? r ? "show": "hide": u]() : (c = St.exec(u), h = l.cur(), c ? (p = parseFloat(c[2]), d = c[3] || (s.cssNumber[a] ? "" : "px"), d !== "px" && (s.style(this, a, (p || 1) + d), h = (p || 1) / l.cur() * h, s.style(this, a, h + d)), c[1] && (p = (c[1] === "-="?-1 : 1) * p + h), l.custom(h, p, d)) : l.custom(h, u, ""));
                return !0
            }))
        },
        stop: function(e, t) {
            return e && this.queue([]), this.each(function() {
                var e = s.timers, n = e.length;
                t || s._unmark(!0, this);
                while (n--)
                    e[n].elem === this && (t && e[n](!0), e.splice(n, 1))
            }), t || this.dequeue(), this
        }
    }), s.each({
        slideDown: Lt("show", 1),
        slideUp: Lt("hide", 1),
        slideToggle: Lt("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        s.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), s.extend({
        speed: function(e, t, n) {
            var r = e && typeof e == "object" ? s.extend({}, e): {
                complete: n ||!n && t || s.isFunction(e) && e,
                duration: e,
                easing: n && t || t&&!s.isFunction(t) && t
            };
            return r.duration = s.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default, r.old = r.complete, r.complete = function(e) {
                s.isFunction(r.old) && r.old.call(this), r.queue!==!1 ? s.dequeue(this) : e!==!1 && s._unmark(this)
            }, r
        },
        easing: {
            linear: function(e, t, n, r) {
                return n + r * e
            },
            swing: function(e, t, n, r) {
                return ( - Math.cos(e * Math.PI) / 2 + .5) * r + n
            }
        },
        timers: [],
        fx: function(e, t, n) {
            this.options = t, this.elem = e, this.prop = n, t.orig = t.orig || {}
        }
    }), s.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (s.fx.step[this.prop] || s.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] == null||!!this.elem.style && this.elem.style[this.prop] != null) {
                var e, t = s.css(this.elem, this.prop);
                return isNaN(e = parseFloat(t))?!t || t === "auto" ? 0 : t : e
            }
            return this.elem[this.prop]
        },
        custom: function(e, t, n) {
            function o(e) {
                return r.step(e)
            }
            var r = this, i = s.fx;
            this.startTime = Nt || Ct(), this.start = e, this.end = t, this.unit = n || this.unit || (s.cssNumber[this.prop] ? "" : "px"), this.now = this.start, this.pos = this.state = 0, o.elem = this.elem, o() && s.timers.push(o)&&!xt && (xt = setInterval(i.tick, i.interval))
        },
        show: function() {
            this.options.orig[this.prop] = s.style(this.elem, this.prop), this.options.show=!0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), s(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = s.style(this.elem, this.prop), this.options.hide=!0, this.custom(this.cur(), 0)
        },
        step: function(e) {
            var t = Nt || Ct(), n=!0, r = this.elem, i = this.options, o, u;
            if (e || t >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop]=!0;
                for (o in i.animatedProperties)
                    i.animatedProperties[o]!==!0 && (n=!1);
                if (n) {
                    i.overflow != null&&!s.support.shrinkWrapBlocks && s.each(["", "X", "Y"], function(e, t) {
                        r.style["overflow" + t] = i.overflow[e]
                    }), i.hide && s(r).hide();
                    if (i.hide || i.show)
                        for (var a in i.animatedProperties)
                            s.style(r, a, i.orig[a]);
                    i.complete.call(r)
                }
                return !1
            }
            return i.duration == Infinity ? this.now = t : (u = t - this.startTime, this.state = u / i.duration, this.pos = s.easing[i.animatedProperties[this.prop]](this.state, u, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, s.extend(s.fx, {
        tick: function() {
            for (var e = s.timers, t = 0; t < e.length; ++t)
                e[t]() || e.splice(t--, 1);
            e.length || s.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(xt), xt = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(e) {
                s.style(e.elem, "opacity", e.now)
            },
            _default: function(e) {
                e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = (e.prop === "width" || e.prop === "height" ? Math.max(0, e.now) : e.now) + e.unit : e.elem[e.prop] = e.now
            }
        }
    }), s.expr && s.expr.filters && (s.expr.filters.animated = function(e) {
        return s.grep(s.timers, function(t) {
            return e === t.elem
        }).length
    });
    var Ot = /^t(?:able|d|h)$/i, Mt = /^(?:body|html)$/i;
    "getBoundingClientRect"in n.documentElement ? s.fn.offset = function(e) {
        var t = this[0], n;
        if (e)
            return this.each(function(t) {
                s.offset.setOffset(this, e, t)
            });
        if (!t ||!t.ownerDocument)
            return null;
        if (t === t.ownerDocument.body)
            return s.offset.bodyOffset(t);
        try {
            n = t.getBoundingClientRect()
        } catch (r) {}
        var i = t.ownerDocument, o = i.documentElement;
        if (!n ||!s.contains(o, t))
            return n ? {
                top: n.top,
                left: n.left
            } : {
                top: 0,
                left: 0
            };
        var u = i.body, a = _t(i), f = o.clientTop || u.clientTop || 0, l = o.clientLeft || u.clientLeft || 0, c = a.pageYOffset || s.support.boxModel && o.scrollTop || u.scrollTop, h = a.pageXOffset || s.support.boxModel && o.scrollLeft || u.scrollLeft, p = n.top + c - f, d = n.left + h - l;
        return {
            top: p,
            left: d
        }
    } : s.fn.offset = function(e) {
        var t = this[0];
        if (e)
            return this.each(function(t) {
                s.offset.setOffset(this, e, t)
            });
        if (!t ||!t.ownerDocument)
            return null;
        if (t === t.ownerDocument.body)
            return s.offset.bodyOffset(t);
        s.offset.initialize();
        var n, r = t.offsetParent, i = t, o = t.ownerDocument, u = o.documentElement, a = o.body, f = o.defaultView, l = f ? f.getComputedStyle(t, null): t.currentStyle, c = t.offsetTop, h = t.offsetLeft;
        while ((t = t.parentNode) && t !== a && t !== u) {
            if (s.offset.supportsFixedPosition && l.position === "fixed")
                break;
            n = f ? f.getComputedStyle(t, null) : t.currentStyle, c -= t.scrollTop, h -= t.scrollLeft, t === r && (c += t.offsetTop, h += t.offsetLeft, s.offset.doesNotAddBorder && (!s.offset.doesAddBorderForTableAndCells ||!Ot.test(t.nodeName)) && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0), i = r, r = t.offsetParent), s.offset.subtractsBorderForOverflowNotVisible && n.overflow !== "visible" && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0), l = n
        }
        if (l.position === "relative" || l.position === "static")
            c += a.offsetTop, h += a.offsetLeft;
        return s.offset.supportsFixedPosition && l.position === "fixed" && (c += Math.max(u.scrollTop, a.scrollTop), h += Math.max(u.scrollLeft, a.scrollLeft)), {
            top: c, left: h
        }
    }, s.offset = {
        initialize: function() {
            var e = n.body, t = n.createElement("div"), r, i, o, u, a = parseFloat(s.css(e, "marginTop")) || 0, f = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            s.extend(t.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), t.innerHTML = parseHTML(f), e.insertBefore(t, e.firstChild), r = t.firstChild, i = r.firstChild, u = r.nextSibling.firstChild.firstChild, this.doesNotAddBorder = i.offsetTop !== 5, this.doesAddBorderForTableAndCells = u.offsetTop === 5, i.style.position = "fixed", i.style.top = "20px", this.supportsFixedPosition = i.offsetTop === 20 || i.offsetTop === 15, i.style.position = i.style.top = "", r.style.overflow = "hidden", r.style.position = "relative", this.subtractsBorderForOverflowNotVisible = i.offsetTop===-5, this.doesNotIncludeMarginInBodyOffset = e.offsetTop !== a, e.removeChild(t), s.offset.initialize = s.noop
        },
        bodyOffset: function(e) {
            var t = e.offsetTop, n = e.offsetLeft;
            return s.offset.initialize(), s.offset.doesNotIncludeMarginInBodyOffset && (t += parseFloat(s.css(e, "marginTop")) || 0, n += parseFloat(s.css(e, "marginLeft")) || 0), {
                top: t, left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = s.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = s(e), o = i.offset(), u = s.css(e, "top"), a = s.css(e, "left"), f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a])>-1, l = {}, c = {}, h, p;
            f ? (c = i.position(), h = c.top, p = c.left) : (h = parseFloat(u) || 0, p = parseFloat(a) || 0), s.isFunction(t) && (t = t.call(e, n, o)), t.top != null && (l.top = t.top - o.top + h), t.left != null && (l.left = t.left - o.left + p), "using"in t ? t.using.call(e, l) : i.css(l)
        }
    }, s.fn.extend({
        position: function() {
            if (!this[0])
                return null;
            var e = this[0], t = this.offsetParent(), n = this.offset(), r = Mt.test(t[0].nodeName) ? {
                top: 0,
                left: 0
            }
            : t.offset();
            return n.top -= parseFloat(s.css(e, "marginTop")) || 0, n.left -= parseFloat(s.css(e, "marginLeft")) || 0, r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top, left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || n.body;
                while (e&&!Mt.test(e.nodeName) && s.css(e, "position") === "static")
                    e = e.offsetParent;
                return e
            })
        }
    }), s.each(["Left", "Top"], function(e, n) {
        var r = "scroll" + n;
        s.fn[r] = function(n) {
            var i, o;
            return n === t ? (i = this[0], i ? (o = _t(i), o ? "pageXOffset"in o ? o[e ? "pageYOffset" : "pageXOffset"] : s.support.boxModel && o.document.documentElement[r] || o.document.body[r] : i[r]) : null) : this.each(function() {
                o = _t(this), o ? o.scrollTo(e ? s(o).scrollLeft() : n, e ? n : s(o).scrollTop()) : this[r] = n
            })
        }
    }), s.each(["Height", "Width"], function(e, n) {
        var r = n.toLowerCase();
        s.fn["inner" + n] = function() {
            var e = this[0];
            return e && e.style ? parseFloat(s.css(e, r, "padding")) : null
        }, s.fn["outer" + n] = function(e) {
            var t = this[0];
            return t && t.style ? parseFloat(s.css(t, r, e ? "margin" : "border")) : null
        }, s.fn[r] = function(e) {
            var i = this[0];
            if (!i)
                return e == null ? null : this;
            if (s.isFunction(e))
                return this.each(function(t) {
                    var n = s(this);
                    n[r](e.call(this, t, n[r]()))
                });
            if (s.isWindow(i)) {
                var o = i.document.documentElement["client" + n], u = i.document.body;
                return i.document.compatMode === "CSS1Compat" && o || u && u["client" + n] || o
            }
            if (i.nodeType === 9)
                return Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]);
            if (e === t) {
                var a = s.css(i, r), f = parseFloat(a);
                return s.isNaN(f) ? a : f
            }
            return this.css(r, typeof e == "string" ? e : e + "px")
        }
    }), DUOSHUO.jQuery = s
})(window);
