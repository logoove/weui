!
function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(r.exports, r, r.exports, e),
        r.loaded = !0,
        r.exports
    }
    var n = {};
    return e.m = t,
    e.c = n,
    e.p = "",
    e(0)
} ([function(t, e, n) {
    t.exports = n(1)
},
function(t, e, n) {
    function i() {
        var t, e;
        if (navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) {
            if (e = navigator.plugins["Shockwave Flash"].description) return e
        } else if ("undefined" != typeof window.ActiveXObject) try {
            if (t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"), t && (e = t.GetVariable("$version"))) return e
        } catch(n) {}
        return ""
    }
    var r = n(2),
    o = n(5),
    a = n(3),
    u = n(4),
    s = n(6),
    c = n(7),
    l = function(t, e) {
        function n() {
            var t = g().preload;
            return ke[t] || 0
        }
        function i() {
            return we[Qe] || 0
        }
        function l() {
            var e = a._.some(g().tracks,
            function(t) {
                var e = t.kind;
                return "captions" === e || "subtitles" === e
            });
            if (e) return 1;
            var n = t.getCaptionsList();
            return n.length > 1 ? 2 : 0
        }
        function f() {
            var t = g(),
            e = t.sources[0],
            n = e.type;
            if (!n) {
                var i = e.file;
                n = a.extension(i)
            }
            return n
        }
        function p() {
            var t = g(),
            e = t.tracks;
            return a._.some(e,
            function(t) {
                return "thumbnails" === t.kind
            })
        }
        function h() {
            return ye[Oe] || 0
        }
        function g(e) {
            try {
                return t.getPlaylistItem(e)
            } catch(n) {}
            return e = e || me,
            this.getConfig().playlist[e] || null
        }
        function v() {
            return !! t.getConfig().autostart
        }
        function m() {
            return t.getAdBlock ? t.getAdBlock() : -1
        }
        function w(t, e, n) {
            if (e === 1 / 0) return null;
            var i = e / n;
            return t / i + 1 | 0
        }
        function y(e) {
            var n = T();
            return fe || pe.calculate(),
            [oe($, v(), 11), oe(W, Ue, 19), oe(vt, ve, 20), oe(mt, ce, 20), oe(gt, n, 21), oe(Z, Ae, 21), oe(G, ge, 21), oe(it, fe.bucket, 21), oe(ot, fe.width, 21), oe(at, fe.height, 21), oe(Kt, t.getMute(), 27), oe(zt, t.getVolume(), 28), oe(lt, le || F(e), 29), oe(Qt, De.getViewablePercentage(fe), 30), oe(Bt, De.getPosition(), 31), oe(At, a.getActiveTab(), 31), oe($t, Ge, 32), oe(ft, m(), 100), oe(tt, V(e), 101), oe(ct, !0, 102)]
        }
        function k(t) {
            return [oe(Y, S(t), 100)].concat(y(t))
        }
        function b(t, e) {
            return [oe(st, e, 23), oe(Gt, j(), 24)].concat(k(t))
        }
        function C(t) {
            Oe = t.playReason || "",
            le = F(t.item),
            le && U()
        }
        function P(e) {
            t.off("beforePlay", C),
            t.once("beforePlay", C),
            I(),
            ce = N(12),
            me = e.index,
            Ye = tn = !1,
            Qe = null
        }
        function I() {
            qe = {},
            Ne = !1,
            Be = 0,
            Ke = 0
        }
        function x(t) {
            return function(e) {
                var n = qe[t];
                if (t === Je) {
                    e = e.metadata || e;
                    var i = e.segment;
                    i && (Ye = !0, tn = i.encryption);
                    var r = e.drm;
                    if (r && (Qe = r), n && (e.width = e.width || n.width, e.height = e.height || n.height, e.duration = e.duration || n.duration), (100 === e.duration || 0 === e.duration) && 0 === e.width && 0 === e.height) return
                }
                if (qe[t] = e, t === Xe && (n || (Ze = 0), $e = L(), Ke = 0), qe[Xe] && qe[Je] && qe[He] && qe[We]) {
                    var o = T();
                    "flash_adaptive" === o ? !Ne && Ye && (Ne = !0, Ye = !1, O()) : Ne || (Ne = !0, O())
                }
            }
        }
        function T() {
            if (a._.isFunction(t.getProvider)) {
                var e = t.getProvider();
                return e ? e.name: ""
            }
            return ""
        }
        function _() {
            var e = t.getDuration();
            if (e <= 0) {
                var n = qe[Je];
                n && (e = n.duration)
            }
            return 0 | e
        }
        function M(t) {
            return t === 1 / 0 ? 1 / 0 : (t = 0 | t, t <= 0 ? 0 : t < 30 ? 1 : t < 60 ? 4 : t < 180 ? 8 : t < 300 ? 16 : 32)
        }
        function E(t) {
            return t = 0 | t,
            t <= 0 || t === 1 / 0 ? 0 : t < 15 ? 1 : t <= 300 ? 2 : t <= 1200 ? 3 : 4
        }
        function L() {
            var e = t.getContainer().querySelector("video");
            return e ? e.currentTime: t.getPosition()
        }
        function S(t) {
            var e;
            if (!t) return null;
            var n = t.sources;
            if (n) {
                for (var i = [], r = n.length; r--;) n[r].file && i.push(n[r].file);
                i.sort(),
                e = i[0]
            } else e = t.file;
            return a.getAbsolutePath(e)
        }
        function V(t) {
            return t ? t.title: null
        }
        function A(t) {
            var e = t || g();
            if (!e) return null;
            var n = e.feedid || se.feedid;
            return a.validateId(n) ? n: null
        }
        function F(t) {
            var e = t || g();
            if (!e) return null;
            var n = e.mediaid;
            return a.validateId(n) ? n: (n = a.getMediaId(e.file), a.validateId(n) ? n: null)
        }
        function R(t) {
            var e = t || g();
            if (!e || !e.stereomode) return null;
            switch (e.stereomode) {
            case "monoscopic":
                return 0;
            case "stereoscopicTopBottom":
                return 1;
            case "stereoscopicLeftRight":
                return 2;
            default:
                return null
            }
        }
        function j() {
            if (t.getPlugin) {
                var e = t.getPlugin("vr");
                if (e) switch (e.getMode()) {
                case "magic-window":
                    return 0;
                case "cardboard":
                    return 1;
                case "gear-vr":
                    return 2;
                default:
                    return null
                }
            }
            return null
        }
        function D(e) {
            if (!e) return null;
            var n = 1,
            i = 2,
            r = 3,
            o = 4,
            u = 5,
            s = 6,
            c = 0,
            l = qe[He];
            if (l && l.levels && l.levels.length) {
                var d = l.levels[0];
                if (d && "auto" === ("" + d.label).toLowerCase()) return u
            }
            var f, p = e.sources;
            if (f = p[0].type, a.hasClass(t.getContainer(), "jw-flag-audio-player")) return s;
            var h = qe[Je] || {},
            g = 0 | h.width,
            v = 0 | h.height;
            return 0 === g && 0 === v ? "rtmp" === f ? s: c: g <= 320 ? n: g <= 640 ? i: g <= 1280 ? r: o
        }
        function U() {
            ze.track(Ve, H, [oe(Xt, se.hlshtml, 21), oe(Tt, h(), 22), oe(wt, A(), 22)].concat(k(g())))
        }
        function q(e, i) {
            e = e || g();
            var r = !t.getControls(),
            o = -1;
            i && i.setupTime && (o = i.setupTime),
            pe.calculate(),
            ze.track(Ve, z, [oe(dt, d(), 22), oe(pt, o, 24), oe(yt, be, 22), oe(Nt, xe, 22), oe(kt, Pe, 22), oe(bt, Te, 23), oe(Ct, _e, 23), oe(Pt, Ie, 22), oe(Vt, n(), 22), oe(Ot, se.pad, 22), oe(It, Me, 23), oe(xt, Ee, 23), oe(Dt, Le, 21), oe(Ut, Ce, 22), oe(Xt, se.hlshtml, 24), oe(qt, r, 24), oe(Jt, Se, 25), oe(Yt, R(e), 26)].concat(k(e)))
        }
        function N(t) {
            return new Array(t + 1).join((Math.random().toString(36) + "00000000000000000").slice(2, 18)).slice(0, t)
        }
        function O() {
            var e = _(),
            n = g(),
            r = -1;
            "function" == typeof t.qoe && (r = t.qoe().firstFrame);
            var o = f(),
            a = p(),
            u = l(),
            s = i() || tn;
            pe.calculate(),
            ze.track(Ve, X, [oe(rt, D(n), 21), oe(ut, E(e), 22), oe(_t, e, 22), oe(wt, A(n), 22), oe(Mt, o, 22), oe(jt, t.getPlaylist().length, 22), oe(Et, a, 23), oe(Lt, u, 23), oe(St, s, 23), oe(ht, r, 23), oe(Xt, se.hlshtml, 24), oe(Tt, h(), 25), oe(Yt, R(n), 27)].concat(b(n, M(e))).concat(K()))
        }
        function B(e, n, i, r) {
            if (le) {
                var o = g(),
                u = o[Ht] || 0,
                s = o[Wt] || null,
                c = [];
                if (r) {
                    if (!u) return;
                    c.push(oe(Zt, r, 23))
                }
                var l = n + .5 | 0;
                l > 0 && (pe.calculate(), ze.track(Ve, J, [oe(et, l, 21), oe(nt, 0 | e, 22), oe(wt, A(), 22), oe(Ft, a.getDocumentFocus(), 31), oe(Rt, a.getTabFocus(t.getContainer()), 31), oe(Ht, u, 23), oe(Wt, s, 23)].concat(c).concat(b(o, i)).concat(Q())))
            }
        }
        function K() {
            return de ? [oe(te, re.cx, 30), oe(ee, re.o, 30)] : []
        }
        function Q() {
            return de ? [oe(ee, re.o, 30), oe(ne, re.cs, 30), oe(ie, re.pip, 30)] : []
        }
        a._ || t._.extend(a, t.utils, {
            _: t._
        });
        var z = "e",
        X = "s",
        J = "t",
        H = "pa",
        W = "c",
        Z = "ed",
        $ = "d",
        G = "ph",
        Y = "mu",
        tt = "t",
        et = "ti",
        nt = "pw",
        it = "ps",
        rt = "vs",
        ot = "wd",
        at = "pl",
        ut = "l",
        st = "q",
        ct = "m",
        lt = "id",
        dt = "fv",
        ft = "eb",
        pt = "st",
        ht = "ff",
        gt = "pp",
        vt = "emi",
        mt = "pli",
        wt = "fed",
        yt = "vp",
        kt = "po",
        bt = "s",
        Ct = "r",
        Pt = "sn",
        It = "cb",
        xt = "ga",
        Tt = "pr",
        _t = "vd",
        Mt = "mk",
        Et = "tt",
        Lt = "cct",
        St = "drm",
        Vt = "pd",
        At = "at",
        Ft = "df",
        Rt = "tf",
        jt = "plc",
        Dt = "pid",
        Ut = "dd",
        qt = "cp",
        Nt = "ab",
        Ot = "pad",
        Bt = "ap",
        Kt = "mt",
        Qt = "vi",
        zt = "vl",
        Xt = "hls",
        Jt = "rf",
        Ht = "tvs",
        Wt = "set",
        Zt = "pdt",
        $t = "ccp",
        Gt = "vr",
        Yt = "vrt",
        te = "cx",
        ee = "o",
        ne = "cs",
        ie = "pip",
        re = {
            cx: 0,
            o: 0,
            cs: 0,
            pip: 0
        },
        oe = function(t, e, n) {
            return new u(t, e, n)
        },
        ae = 128,
        ue = e.debug === !0,
        se = t.getConfig();
        e.version = a.simpleSemver(t.version);
        var ce, le, de = parseInt(e.sdkplatform, 10),
        fe = null,
        pe = this,
        he = a._.isObject(window.jwplayer) ? window.jwplayer.defaults || {}: {},
        ge = se[G] || he[G] || 0,
        ve = N(12),
        me = 0,
        we = {
            aes: 1,
            widevine: 2,
            playready: 3
        },
        ye = {
            interaction: 1,
            "related-interaction": 1,
            autostart: 2,
            repeat: 3,
            external: 4,
            "related-auto": 5,
            playlist: 6
        },
        ke = {
            none: 1,
            metadata: 2,
            auto: 3
        },
        be = se.visualplaylist !== !1,
        Ce = se.displaydescription !== !1,
        Pe = !!se.image,
        Ie = se.skin,
        xe = !!se.advertising,
        Te = !!se.sharing,
        _e = !!se.related,
        Me = !!se.cast,
        Ee = !!se.ga,
        Le = se.pid,
        Se = "";
        _e && (Se = se.related.recommendations || se.related.file || Se);
        var Ve, Ae = 0,
        Fe = se.key;
        if (Fe) {
            var Re = new a.key(Fe),
            je = Re.edition();
            "invalid" !== je && (Ve = Re.token()),
            "platinum" === je ? Ae = 8 : "trial" === je ? Ae = 7 : "enterprise" === je ? Ae = 6 : "invalid" === je ? Ae = 4 : "ads" === je ? Ae = 3 : "premium" === je ? Ae = 2 : "pro" === je && (Ae = 1)
        }
        Ve || (Ve = "_"),
        pe.getCommonAdTrackingParameters = function() {
            return y(g(), !1)
        },
        pe.calculate = function() {
            fe = function() {
                var e = 1,
                n = 2,
                i = 3,
                r = 4,
                o = 5,
                u = 0,
                s = t.getConfig(),
                c = t.getWidth(),
                l = t.getHeight(),
                d = /\d+%/.test(c);
                if (d) {
                    var f = a.bounds(t.getContainer());
                    c = Math.ceil(f.width),
                    l = Math.ceil(f.height)
                }
                return c = 0 | c,
                /\d+%/.test(s.width || c) && s.aspectratio ? {
                    bucket: r,
                    width: c,
                    height: l
                }: a.hasClass(t.getContainer(), "jw-flag-audio-player") ? {
                    bucket: o,
                    width: c,
                    height: l
                }: 0 === c ? {
                    bucket: u,
                    width: c,
                    height: l
                }: c <= 320 ? {
                    bucket: e,
                    width: c,
                    height: l
                }: c <= 640 ? {
                    bucket: n,
                    width: c,
                    height: l
                }: {
                    bucket: i,
                    width: c,
                    height: l
                }
            } ()
        },
        pe.getPlayerSize = function() {
            return fe
        };
        var De = new o(t, 2e3),
        Ue = s(pe, e, Ve, ue, t, De);
        c(pe, t, e, Ve, ue, De);
        var qe, Ne, Oe, Be, Ke, Qe, ze = new r(e, ue, "jwplayer6", De, t.getContainer()),
        Xe = "play",
        Je = "meta",
        He = "levels",
        We = "firstFrame",
        Ze = 0,
        $e = null,
        Ge = !1,
        Ye = !1,
        tn = !1;
        t.on("mobile-sdk-lt",
        function(t) {
            a._.extend(re, t)
        }),
        t.onReady(function(t) {
            q(g(), t)
        }),
        t.onPlay(x(Xe)),
        t.on("firstFrame", x(We)),
        t.onMeta(x(Je)),
        t.onQualityLevels(x(He)),
        t.onCast(function(t) {
            Ge = !!t.active
        }),
        t.onTime(function(e) {
            var n = L(),
            i = e.duration;
            if (n) {
                if (n > 1) {
                    if (!qe[Je]) {
                        var r = {
                            duration: i
                        },
                        o = t.getContainer().querySelector("video");
                        o && (r.width = o.videoWidth, r.height = o.videoHeight),
                        x(Je)(r)
                    }
                    qe[He] || x(He)({})
                }
                var a = M(i),
                u = w(n, i, a);
                0 === Be && (Be = u),
                null === $e && ($e = n);
                var s = n - $e;
                if ($e = n, s = Math.min(Math.max(0, s), 4), Ze += s, !(i <= 0 || i === 1 / 0) && u === Be + 1) {
                    var c = ae * Be / a;
                    if (Be = 0, u > a) return;
                    B(c, Ze, a),
                    Ze = 0
                }
            }
        }),
        t.onComplete(function() {
            var t = _();
            if (! (t <= 0 || t === 1 / 0)) {
                var e = M(t);
                B(ae, Ze, e),
                Ze = 0
            }
        }),
        t.on("meta",
        function(t) {
            t = t.metadata || t;
            var e, n = t.TXXX;
            if (n && (e = n.programDateTime)) {
                var i = Date.parse(e);
                if (i >= Ke) {
                    var r = 3e4,
                    o = Ke;
                    Ke = Math.floor(i / r) * r + r,
                    o > 0 && (B(null, Ze || 1, null, e), Ze = 0)
                }
            }
        }),
        t.onSeek(function() {
            $e = L(),
            Ke = 0,
            Be = 0
        }),
        t.onIdle(I),
        t.onPlaylistItem(P),
        I()
    },
    d = function() {
        var t = (i().match(/^\D*(\d+)[\.,](\d+).*$/) || []).splice(1).join(".");
        return function() {
            return t
        }
    } (),
    f = window.jwplayerPluginJsonp || window.jwplayer().registerPlugin;
    f("jwpsrv", "6.0", l)
},
function(t, e, n) {
    var i = n(3),
    r = n(4),
    o = function(t, e, n, r, o) {
        i._.isFunction(t.onping) && (this.onping = t.onping);
        var a = parseInt(t.sdkplatform, 10),
        u = 1 === a || 2 === a,
        s = o.ownerDocument,
        c = s.documentElement,
        l = "complete" === c.readyState,
        d = {
            trackerVersion: "2.8.6",
            serverURL: "ww3.sinaimg.cn/large/b6839357gw1fbk8gbwtzog2001001017.gif?",
            playerVersion: t.version,
            config: t,
            SDKPlatform: t.sdkplatform || "0",
            isMobileSDK: u,
            iFrame: void 0,
            pageURL: void 0,
            pageTitle: void 0,
            pageLoaded: l,
            queue: [],
            images: [],
            debug: e,
            positionUtils: r
        };
        if (!u) {
            if (d.iFrame = window.top !== window.self, d.iFrame) {
                d.pageURL = c.referrer;
                try {
                    d.pageURL = d.pageURL || window.top.location.href,
                    d.pageTitle = window.top.document.title
                } catch(f) {}
            }
            d.pageURL = d.pageURL || window.location.href,
            d.pageTitle = d.pageTitle || s.title
        }
        var p = i._.extend(this, d);
        if (!l) {
            var h = function() {
                for (p.pageLoaded = !0; p.queue.length;) p.ping(p.queue.shift());
                window.removeEventListener("load", h)
            };
            window.addEventListener && window.addEventListener("load", h),
            setTimeout(h, 5e3)
        }
    };
    o.prototype.track = function(t, e, n) {
        this.ping(this.buildTrackingURL(t, e, n), e)
    };
    var a = "tv",
    u = "n",
    s = "aid",
    c = "e",
    l = "i",
    d = "ifd",
    f = "pv",
    p = "pu",
    h = "pt",
    g = "sdk",
    v = "sv",
    m = "bi",
    w = "an",
    y = "did",
    k = "dm",
    b = "sc",
    C = "ts",
    P = "ha",
    I = function(t, e, n) {
        return new r(t, e, n)
    },
    x = function(t) {
        var e, n, i = 0;
        if (t = decodeURIComponent(t), !t.length) return i;
        for (e = 0; e < t.length; e++) n = t.charCodeAt(e),
        i = (i << 5) - i + n,
        i &= i;
        return i
    };
    o.prototype.buildTrackingURL = function(t, e, n) {
        var i = [I(a, this.trackerVersion, 0), I(u, Math.random().toFixed(16).substr(2, 16), 2), I(s, t, 4), I(c, e, 5), I(l, this.iFrame, 6), I(d, this.positionUtils.getIFrameDepth(), 6), I(f, this.playerVersion, 7), I(p, this.pageURL, 101), I(h, this.pageTitle, 103), I(g, this.SDKPlatform, 25)].concat(n);
        this.isMobileSDK && i.push(I(y, this.config.mobiledeviceid || "", 26), I(v, this.config.iossdkversion || "", 27), I(k, this.config.mobiledevicemodel || "", 28), I(m, this.config.bundleid || "", 29), I(w, this.config.applicationname || "", 30), I(b, this.config.systemcaptions || "", 31), I(C, this.config.texttospeech || "", 32), I(P, this.config.hardwareacceleration || "", 33)),
        i.sort(function(t, e) {
            return t.priority - e.priority
        });
        for (var r = [], o = 0; o < i.length; o++) r.push(i[o].getKey() + "=" + encodeURIComponent(i[o].getValue()));
        var T = r.join("&"),
        _ = "h=" + x(T) + "&" + T,
        M = ["//", this.serverURL, "/", this.serverPath, _];
        return "file:" === window.location.protocol && M.unshift("https:"),
        M.join("")
    },
    o.prototype.ping = function(t, e) {
        var n = "i" !== e && "ar" !== e && "as" !== e;
        if (!this.pageLoaded && n) return void this.queue.push(t);
        var i = new Image;
        i.src = t;
        for (var r = this.images,
        o = r.length; o--&&(r[o].width || r[o].complete);) r.length = o;
        if (r.push(i), this.debug && this.onping) try {
            this.onping.call(this, t)
        } catch(a) {
            console.error("jwpsrv.onping:", a.message)
        }
    },
    t.exports = o
},
function(t, e) {
    var n = {};
    n.getAdClientValue = function(t) {
        if (t) {
            if (/vast/.test(t)) return 0;
            if (/googima/.test(t)) return 1;
            if (/freewheel/.test(t)) return 2
        }
        return - 1
    },
    n.getMediaId = function(t) {
        var e = /.*\/(?:manifests|videos)\/([a-zA-Z0-9]{8})[\.-].*/,
        n = e.exec(t);
        return n && 2 === n.length ? n[1] : null
    },
    n.getActiveTab = function(t, e) {
        for (var n = 0; n < e.length && (n && (t = e[n] + "Hidden"), !(t in document)); n++);
        return t ?
        function() {
            return ! document[t]
        }: function() {
            return null
        }
    } ("hidden", ["hidden", "webkit", "moz", "ms", "o"]),
    n.getDocumentFocus = function() {
        return document.hasFocus && "function" == typeof document.hasFocus && document.hasFocus()
    },
    n.getTabFocus = function(t) {
        for (var e = document.activeElement; e;) {
            if (e === t) return ! 0;
            e = e.parentNode
        }
        return ! 1
    },
    n.isAbsolutePath = function(t) {
        return t.match(/^[a-zA-Z]+:\/\//)
    },
    n.simpleSemver = function(t) {
        return t.split("+")[0]
    },
    n.hasClass = function(t, e) {
        var n = " " + e + " ";
        return 1 === t.nodeType && (" " + t.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(n) >= 0
    },
    n.validateId = function(t) {
        var e = /^[a-zA-Z0-9]{8}$/;
        return e.test(t)
    },
    t.exports = n
},
function(t, e) {
    var n = function(t, e, n) {
        e === !0 || e === !1 ? e = e ? 1 : 0 : null !== e && void 0 !== e || (e = ""),
        this.key = t,
        this.value = e,
        this.priority = n
    };
    n.prototype.getKey = function() {
        return this.key
    },
    n.prototype.getValue = function() {
        return this.value
    },
    t.exports = n
},
function(t, e) {
    function n(t, e) {
        var n = t.top + t.height < e.top || t.top > e.top + e.height || t.left + t.width < e.left || t.left > e.left + e.width,
        i = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        };
        return n === !1 && (i = {
            top: Math.max(t.top, e.top),
            left: Math.max(t.left, e.left),
            width: Math.min(Math.abs(t.left - (e.left + e.width)), Math.abs(e.left - (t.left + t.width)), t.width, e.width),
            height: Math.min(Math.abs(t.top - (e.top + e.height)), Math.abs(e.top - (t.top + t.height)), t.height, e.height)
        }),
        i
    }
    function i(t, e) {
        for (var i, r = t,
        o = e; null !== r.parentElement && "undefined" != typeof r.parentElement.tagName;) i = s(r.parentElement),
        o = n(o, i),
        r = r.parentElement;
        var a = s(r.ownerDocument.body).width,
        u = s(r.ownerDocument.body).height;
        return o = n(o, {
            top: 0,
            left: 0,
            width: a,
            height: u
        })
    }
    function r(t, e) {
        for (var n = t,
        i = e; null !== n && "undefined" != typeof n.tagName;) null !== n.offsetParent && n.offsetParent === n.parentElement.offsetParent ? (i.top += n.offsetTop - n.parentElement.offsetTop, i.left += n.offsetLeft - n.parentElement.offsetLeft) : (i.top += n.offsetTop, i.left += n.offsetLeft),
        null !== n.parentElement && "BODY" !== n.parentElement.tagName && (i.top -= "undefined" != typeof n.parentElement.scrollTop ? n.parentElement.scrollTop: 0, i.left -= "undefined" != typeof n.parentElement.scrollLeft ? n.parentElement.scrollLeft: 0),
        n = n.parentElement;
        return i
    }
    function o(t, e) {
        for (var n = {
            top: 0,
            left: 0
        },
        i = t.getContainer(); null !== i;) {
            if (n = r(i, n), e || c(i) === window.top) return n;
            i = c(i).frameElement
        }
        return n
    }
    function a(t) {
        for (var e = t.getContainer(), n = s(e); null !== e;) {
            if (n = i(e, n), c(e) === window.top) return n;
            try {
                e = c(e).frameElement,
                n.top += e.offsetTop,
                n.left += e.offsetLeft
            } catch(r) {
                e = null
            }
        }
        return n
    }
    function u(t, e) {
        for (var n = t.getContainer(), o = s(n), a = {
            top: 0,
            left: 0
        }; null !== n;) {
            o = i(n, o),
            a = r(n, a);
            var u = c(n);
            if (u === window.top) {
                u.parent.postMessage(JSON.stringify({
                    type: "jwpsrv_position_response",
                    playerId: t.id,
                    rect: {
                        top: o.top,
                        left: o.left,
                        width: o.width,
                        height: o.height
                    },
                    iframeDepth: 0,
                    coords: a,
                    responseChain: e
                }), "*"),
                n = null;
                break
            }
            try {
                n = u.frameElement
            } catch(l) {
                n = null
            }
            null === n ? parent.postMessage(JSON.stringify({
                type: "jwpsrv_position",
                playerId: t.id,
                rect: {
                    top: o.top,
                    left: o.left,
                    width: o.width,
                    height: o.height
                },
                iframeDepth: 0,
                coords: a,
                responseChain: e
            }), "*") : (o.top += n.offsetTop, o.left += n.offsetLeft)
        }
    }
    function s(t) {
        if (!t.getBoundingClientRect) throw new Error("Cannot get bounds: " + t);
        var e = t.getBoundingClientRect(),
        n = {
            left: e.left,
            top: e.top,
            width: e.width,
            height: e.height
        };
        return "width" in e || (n.width = e.right - e.left),
        "height" in e || (n.height = e.bottom - e.top),
        n
    }
    function c(t) {
        var e = t.ownerDocument;
        return e.defaultView || e.parentWindow
    }
    var l = function(t, e) {
        function n() {
            var e = t.getContainer();
            return ! e || t.getState() === r && !e.parentNode
        }
        this.playerAPI = t,
        this.lastViewRect = void 0,
        this.lastViewPos = void 0,
        this.iframeDepth = 0;
        var i, r = "idle",
        o = window.location;
        try {
            i = !(window.top.location.protocol === o.protocol && window.top.location.host === o.host && window.top.location.port === o.port)
        } catch(a) {
            i = !0
        }
        if (this.isPolling = i, i) {
            var s = this,
            c = "" + Math.floor(1e11 * Math.random()),
            l = function(t) {
                var e;
                try {
                    e = JSON.parse(t.data)
                } catch(n) {}
                e && e.type && "jwpsrv_position_response" === e.type && s.playerAPI.id === e.playerId && (s.lastViewRect = e.rect, s.lastViewPos = e.coords, s.iframeDepth = e.iframeDepth)
            };
            window.addEventListener ? window.addEventListener("message", l) : window.attachEvent("onmessage", l),
            u(t, c);
            var d = setInterval(function() {
                n() ? clearInterval(d) : s.isPolling && u(t, c)
            },
            e)
        }
    };
    l.prototype.getPosition = function() {
        if (this.playerAPI.getFullscreen()) return "0,0";
        if (this.isPolling) return this.lastViewPos ? this.lastViewPos.left + "," + this.lastViewPos.top: null;
        var t = o(this.playerAPI, this.isPolling);
        return t.left + "," + t.top
    },
    l.prototype.getViewablePercentage = function(t) {
        if (this.playerAPI.getFullscreen()) return 1;
        if (this.isPolling) return this.lastViewRect ? Math.round(1e3 * (this.lastViewRect.width * this.lastViewRect.height / (t.width * t.height))) / 1e3: null;
        var e = a(this.playerAPI);
        return Math.round(1e3 * (e.width * e.height / (t.width * t.height))) / 1e3
    },
    l.prototype.getIFrameDepth = function() {
        if (this.isPolling === !0) return this.iframeDepth ? this.iframeDepth: null;
        for (var t = c(this.playerAPI.getContainer()), e = 0; t !== window.top;) t = c(t.frameElement),
        e++;
        return e
    },
    t.exports = l
},
function(t, e, n) {
    function i(t, e, n) {
        return new o(t, e, n)
    }
    var r = n(2),
    o = n(4),
    a = n(3);
    t.exports = function(t, e, n, o, u, s) {
        function c(t, e) {
            C.track(n, t, e)
        }
        function l(t) {
            I === -1 && t && (I = a.getAdClientValue(t.client)),
            d(t, "adbreakid"),
            d(t, "adtagid"),
            d(t, "offset"),
            d(t, "witem"),
            d(t, "wcount"),
            d(t, "skipoffset"),
            d(t, "linear",
            function(t, e) {
                return e === t
            }),
            d(t, "adposition",
            function(t, e) {
                return {
                    pre: 0,
                    mid: 1,
                    post: 2,
                    api: 3
                } [e]
            }),
            d(t, "creativetype",
            function(t, e) {
                var n = "";
                switch (e) {
                case "static":
                    n = "image/unknown";
                    break;
                case "video":
                    n = "video/unknown";
                    break;
                case "vpaid":
                case "vpaid-swf":
                    n = "application/x-shockwave-flash";
                    break;
                case "vpaid-js":
                    n = "application/javascript";
                    break;
                default:
                    n = e || n
                }
                return b.adCreativeType = n,
                n
            }),
            d(t, "tag",
            function(t, e) {
                return b.tagdomain = g(a.getAbsolutePath(e)),
                e
            }),
            b.adSystem = t.adsystem || b.adSystem,
            b.vastVersion = t.vastversion || b.vastVersion,
            b.podIndex = t.sequence || b.podIndex,
            b.podCount = t.podcount || b.podCount
        }
        function d(t, e, n) {
            t.hasOwnProperty(e) && (n = n || f, b[e] = n(e, t[e]))
        }
        function f(t, e) {
            return e
        }
        function p() {
            var t, e = u.getPlaylistItem();
            return e && (t = e.feedid),
            t || (t = k.feedid),
            a.validateId(t) ? t: null
        }
        function h(t, e) {
            if (! (e > 4)) {
                if (P.adscheduleid && e > b.previousQuartile) {
                    l(t);
                    var n = [i(q, b.duration, 1), i(J, e, 1)].concat(w());
                    c(E, n)
                }
                b.previousQuartile = e
            }
        }
        function g(t) {
            if (t) {
                var e = t.match(new RegExp(/^[^\/]*:\/\/\/?([^\/]*)/));
                if (e && e.length > 1) return e[1]
            }
            return ""
        }
        function v() {
            return [i(V, b.adId, 1), i(A, u.getMute(), 28), i(Q, b.tagdomain, 29), i(R, b.adposition, 31), i(H, b.witem, 32), i(W, b.wcount, 32)].concat(t.getCommonAdTrackingParameters())
        }
        function m() {
            return [i(Z, P.adscheduleid, 20), i($, b.adbreakid, 21), i(G, b.adtagid, 21), i(Y, b.skipoffset, 22), i(tt, b.offset, 23)]
        }
        function w() {
            return t.calculate(),
            [i(B, b.podCount, 22), i(K, b.podIndex, 23), i(D, b.adCreativeType, 24), i(F, b.linear, 25), i(j, b.vastVersion, 26), i(U, b.adSystem, 27), i(O, a.getDocumentFocus(), 31), i(N, a.getTabFocus(u.getContainer()), 31)].concat(v())
        }
        var y = {
            numCompanions: -1,
            podCount: 0,
            podIndex: 0,
            linear: -1,
            vastVersion: -1,
            adSystem: "",
            adCreativeType: "",
            adposition: -1,
            tagdomain: "",
            position: "",
            previousQuartile: 0,
            duration: "",
            witem: 1,
            wcount: 1
        },
        k = u.getConfig(),
        b = null,
        C = new r(e, o, "clienta", s, u.getContainer()),
        P = (k || {}).advertising || {},
        I = a.getAdClientValue(P.client),
        x = "i",
        T = "as",
        _ = "c",
        M = "s",
        E = "v",
        L = "ae",
        S = "ar",
        V = "adi",
        A = "mt",
        F = "al",
        R = "p",
        j = "vv",
        D = "ct",
        U = "ad",
        q = "du",
        N = "tf",
        O = "df",
        B = "pc",
        K = "pi",
        Q = "vu",
        z = "ec",
        X = "tw",
        J = "qt",
        H = "awi",
        W = "awc",
        Z = "ask",
        $ = "abk",
        G = "atk",
        Y = "sko",
        tt = "abo",
        et = "fed";
        return u.on("adRequest adMeta adImpression adComplete adSkipped adError adTime",
        function(t) {
            b && b.adId === t.id && t.id !== -1 || (b = a._.extend({
                adId: t.id
            },
            y))
        }).on("adRequest adMeta adImpression adComplete adSkipped adError", l).on("adRequest",
        function() {
            P.adscheduleid && c(S, v().concat(m()))
        }).on("adImpression",
        function() {
            c(x, [i(Y, b.skipoffset, 1), i(et, p(), 2)].concat(w()).concat(m()))
        }).on("adStarted",
        function() {
            c(T, w().concat(m()))
        }).on("adComplete",
        function(t) {
            h(t, 4)
        }).on("adSkipped",
        function() {
            var t = [i(X, b.position, 1), i(J, b.previousQuartile, 1), i(q, b.duration, 1)].concat(m()).concat(w());
            c(M, t)
        }).on("adError",
        function(t) {
            if (P.adscheduleid) {
                var e = 1;
                "object" == typeof t && t && void 0 !== t.code && (e = t.code);
                var n = [i(z, e, 1)].concat(v().concat(m()));
                c(L, n)
            }
        }).on("adClick",
        function() {
            var t = [i(X, b.position, 1), i(q, b.duration, 1), i(J, b.previousQuartile, 1)].concat(w().concat(m()));
            c(_, t)
        }).on("adTime",
        function(t) {
            if (b.position = t.position, b.duration = b.duration || t.duration, b.duration) {
                var e = Math.floor((4 * b.position + .05) / b.duration);
                h(t, e)
            }
        }),
        I
    }
},
function(t, e, n) {
    function i(t, e, n, i) {
        function a(t) {
            return function(r) {
                t(r, e, n, i)
            }
        }
        if (t.getPlugin) {
            var u = t.getPlugin("related");
            u && (u.on("open", a(r)), u.on("play", a(o)))
        }
    }
    function r(t, e, n, i) {
        a(p, t, [], e, n, i)
    }
    function o(t, e, n, i) {
        var r = [];
        if (l._.has(t, "item")) {
            var o;
            o = "play" === t.onclick ? t.item.mediaid: t.item.link,
            r.push(I(y, o, 5))
        }
        l._.has(t, "autoplaytimer") && r.push(I(b, t.autoplaytimer, 5)),
        a(f, t, r, e, n, i)
    }
    function a(t, e, n, i, r, o) {
        n = u(t, n, e, i),
        o.track(r, t, n.concat(i.getCommonAdTrackingParameters()))
    }
    function u(t, e, n, i) {
        if (i.calculate(), l._.has(n, "onclick") && e.push(I(h, "play" === n.onclick ? 1 : 0, 21)), l._.has(n, "method")) {
            var r, o = P[n.method] || 0;
            t === f ? r = m: t === p && (r = w),
            r && e.push(I(r, o, 5))
        }
        return l._.has(n, "method_group_id") && e.push(I(g, n.method_group_id, 5)),
        l._.has(n, "rec_id") && e.push(I(v, n.rec_id, 6)),
        l._.has(n, "position") && e.push(I(k, n.position + 1, 6)),
        e.push(I(C, s(n), 6)),
        e
    }
    function s(t) {
        var e = null;
        return l._.has(t, "feedid") && l.validateId(t.feedid) && (e = t.feedid),
        e
    }
    var c = n(2),
    l = n(3),
    d = n(4),
    f = "rc",
    p = "rs",
    h = "os",
    g = "mgi",
    v = "ri",
    m = "rct",
    w = "rst",
    y = "rn",
    k = "oc",
    b = "rat",
    C = "fed",
    P = {
        play: 1,
        api: 2,
        interaction: 3,
        complete: 4,
        auto: 5,
        manual: 6,
        link: 7
    };
    t.exports = function(t, e, n, r, o, a) {
        var u = new c(n, o, "jwplayer6", a, e.getContainer());
        e.on("ready",
        function() {
            i(e, t, r, u)
        })
    };
    var I = function(t, e, n) {
        return new d(t, e, n)
    }
}]);