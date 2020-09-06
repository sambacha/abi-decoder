var abiDecoder = (function (t) {
  var r = {};
  function e(i) {
    if (r[i]) return r[i].exports;
    var n = (r[i] = { i: i, l: !1, exports: {} });
    return t[i].call(n.exports, n, n.exports, e), (n.l = !0), n.exports;
  }
  return (
    (e.m = t),
    (e.c = r),
    (e.d = function (t, r, i) {
      e.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: i });
    }),
    (e.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (e.t = function (t, r) {
      if ((1 & r && (t = e(t)), 8 & r)) return t;
      if (4 & r && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (e.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & r && "string" != typeof t)
      )
        for (var n in t)
          e.d(
            i,
            n,
            function (r) {
              return t[r];
            }.bind(null, n)
          );
      return i;
    }),
    (e.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(r, "a", r), r;
    }),
    (e.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (e.p = ""),
    e((e.s = 12))
  );
})([
  function (t, r, e) {
    (function (t) {
      !(function (t, r) {
        "use strict";
        function i(t, r) {
          if (!t) throw new Error(r || "Assertion failed");
        }
        function n(t, r) {
          t.super_ = r;
          var e = function () {};
          (e.prototype = r.prototype),
            (t.prototype = new e()),
            (t.prototype.constructor = t);
        }
        function o(t, r, e) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== r && "be" !== r) || ((e = r), (r = 10)),
              this._init(t || 0, r || 10, e || "be"));
        }
        var s;
        "object" == typeof t ? (t.exports = o) : (r.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          s = e(22).Buffer;
        } catch (t) {}
        function u(t, r, e) {
          for (var i = 0, n = Math.min(t.length, e), o = r; o < n; o++) {
            var s = t.charCodeAt(o) - 48;
            (i <<= 4),
              (i |=
                s >= 49 && s <= 54
                  ? s - 49 + 10
                  : s >= 17 && s <= 22
                  ? s - 17 + 10
                  : 15 & s);
          }
          return i;
        }
        function h(t, r, e, i) {
          for (var n = 0, o = Math.min(t.length, e), s = r; s < o; s++) {
            var u = t.charCodeAt(s) - 48;
            (n *= i), (n += u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u);
          }
          return n;
        }
        (o.isBN = function (t) {
          return (
            t instanceof o ||
            (null !== t &&
              "object" == typeof t &&
              t.constructor.wordSize === o.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (o.max = function (t, r) {
            return t.cmp(r) > 0 ? t : r;
          }),
          (o.min = function (t, r) {
            return t.cmp(r) < 0 ? t : r;
          }),
          (o.prototype._init = function (t, r, e) {
            if ("number" == typeof t) return this._initNumber(t, r, e);
            if ("object" == typeof t) return this._initArray(t, r, e);
            "hex" === r && (r = 16), i(r === (0 | r) && r >= 2 && r <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++,
              16 === r ? this._parseHex(t, n) : this._parseBase(t, r, n),
              "-" === t[0] && (this.negative = 1),
              this.strip(),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initNumber = function (t, r, e) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initArray = function (t, r, e) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var o,
              s,
              u = 0;
            if ("be" === e)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            else if ("le" === e)
              for (n = 0, o = 0; n < t.length; n += 3)
                (s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            return this.strip();
          }),
          (o.prototype._parseHex = function (t, r) {
            (this.length = Math.ceil((t.length - r) / 6)),
              (this.words = new Array(this.length));
            for (var e = 0; e < this.length; e++) this.words[e] = 0;
            var i,
              n,
              o = 0;
            for (e = t.length - 6, i = 0; e >= r; e -= 6)
              (n = u(t, e, e + 6)),
                (this.words[i] |= (n << o) & 67108863),
                (this.words[i + 1] |= (n >>> (26 - o)) & 4194303),
                (o += 24) >= 26 && ((o -= 26), i++);
            e + 6 !== r &&
              ((n = u(t, r, e + 6)),
              (this.words[i] |= (n << o) & 67108863),
              (this.words[i + 1] |= (n >>> (26 - o)) & 4194303)),
              this.strip();
          }),
          (o.prototype._parseBase = function (t, r, e) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= r) i++;
            i--, (n = (n / r) | 0);
            for (
              var o = t.length - e,
                s = o % i,
                u = Math.min(o, o - s) + e,
                a = 0,
                l = e;
              l < u;
              l += i
            )
              (a = h(t, l, l + i, r)),
                this.imuln(n),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            if (0 !== s) {
              var f = 1;
              for (a = h(t, l, t.length, r), l = 0; l < s; l++) f *= r;
              this.imuln(f),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            }
          }),
          (o.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var r = 0; r < this.length; r++) t.words[r] = this.words[r];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (o.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var a = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          l = [
            0,
            0,
            25,
            16,
            12,
            11,
            10,
            9,
            8,
            8,
            7,
            7,
            7,
            7,
            6,
            6,
            6,
            6,
            6,
            6,
            6,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
          ],
          f = [
            0,
            0,
            33554432,
            43046721,
            16777216,
            48828125,
            60466176,
            40353607,
            16777216,
            43046721,
            1e7,
            19487171,
            35831808,
            62748517,
            7529536,
            11390625,
            16777216,
            24137569,
            34012224,
            47045881,
            64e6,
            4084101,
            5153632,
            6436343,
            7962624,
            9765625,
            11881376,
            14348907,
            17210368,
            20511149,
            243e5,
            28629151,
            33554432,
            39135393,
            45435424,
            52521875,
            60466176,
          ];
        function c(t, r, e) {
          e.negative = r.negative ^ t.negative;
          var i = (t.length + r.length) | 0;
          (e.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            o = 0 | r.words[0],
            s = n * o,
            u = 67108863 & s,
            h = (s / 67108864) | 0;
          e.words[0] = u;
          for (var a = 1; a < i; a++) {
            for (
              var l = h >>> 26,
                f = 67108863 & h,
                c = Math.min(a, r.length - 1),
                m = Math.max(0, a - t.length + 1);
              m <= c;
              m++
            ) {
              var p = (a - m) | 0;
              (l +=
                ((s = (n = 0 | t.words[p]) * (o = 0 | r.words[m]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s);
            }
            (e.words[a] = 0 | f), (h = 0 | l);
          }
          return 0 !== h ? (e.words[a] = 0 | h) : e.length--, e.strip();
        }
        (o.prototype.toString = function (t, r) {
          var e;
          if (((r = 0 | r || 1), 16 === (t = t || 10) || "hex" === t)) {
            e = "";
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var u = this.words[s],
                h = (16777215 & ((u << n) | o)).toString(16);
              (e =
                0 !== (o = (u >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? a[6 - h.length] + h + e
                  : h + e),
                (n += 2) >= 26 && ((n -= 26), s--);
            }
            for (0 !== o && (e = o.toString(16) + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var c = l[t],
              m = f[t];
            e = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero(); ) {
              var d = p.modn(m).toString(t);
              e = (p = p.idivn(m)).isZero() ? d + e : a[c - d.length] + d + e;
            }
            for (this.isZero() && (e = "0" + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (o.prototype.toBuffer = function (t, r) {
            return i(void 0 !== s), this.toArrayLike(s, t, r);
          }),
          (o.prototype.toArray = function (t, r) {
            return this.toArrayLike(Array, t, r);
          }),
          (o.prototype.toArrayLike = function (t, r, e) {
            var n = this.byteLength(),
              o = e || Math.max(1, n);
            i(n <= o, "byte array longer than desired length"),
              i(o > 0, "Requested array length <= 0"),
              this.strip();
            var s,
              u,
              h = "le" === r,
              a = new t(o),
              l = this.clone();
            if (h) {
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[u] = s);
              for (; u < o; u++) a[u] = 0;
            } else {
              for (u = 0; u < o - n; u++) a[u] = 0;
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[o - u - 1] = s);
            }
            return a;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var r = t,
                  e = 0;
                return (
                  r >= 4096 && ((e += 13), (r >>>= 13)),
                  r >= 64 && ((e += 7), (r >>>= 7)),
                  r >= 8 && ((e += 4), (r >>>= 4)),
                  r >= 2 && ((e += 2), (r >>>= 2)),
                  e + r
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var r = t,
              e = 0;
            return (
              0 == (8191 & r) && ((e += 13), (r >>>= 13)),
              0 == (127 & r) && ((e += 7), (r >>>= 7)),
              0 == (15 & r) && ((e += 4), (r >>>= 4)),
              0 == (3 & r) && ((e += 2), (r >>>= 2)),
              0 == (1 & r) && e++,
              e
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              r = this._countBits(t);
            return 26 * (this.length - 1) + r;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, r = 0; r < this.length; r++) {
              var e = this._zeroBits(this.words[r]);
              if (((t += e), 26 !== e)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var r = 0; r < t.length; r++)
              this.words[r] = this.words[r] | t.words[r];
            return this.strip();
          }),
          (o.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var r;
            r = this.length > t.length ? t : this;
            for (var e = 0; e < r.length; e++)
              this.words[e] = this.words[e] & t.words[e];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            var r, e;
            this.length > t.length
              ? ((r = this), (e = t))
              : ((r = t), (e = this));
            for (var i = 0; i < e.length; i++)
              this.words[i] = r.words[i] ^ e.words[i];
            if (this !== r)
              for (; i < r.length; i++) this.words[i] = r.words[i];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = 0 | Math.ceil(t / 26),
              e = t % 26;
            this._expand(r), e > 0 && r--;
            for (var n = 0; n < r; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              e > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - e))),
              this.strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, r) {
            i("number" == typeof t && t >= 0);
            var e = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(e + 1),
              (this.words[e] = r
                ? this.words[e] | (1 << n)
                : this.words[e] & ~(1 << n)),
              this.strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            var r, e, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (r = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (r = this.isub(t)),
                (t.negative = 1),
                r._normSign()
              );
            this.length > t.length
              ? ((e = this), (i = t))
              : ((e = t), (i = this));
            for (var n = 0, o = 0; o < i.length; o++)
              (r = (0 | e.words[o]) + (0 | i.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            for (; 0 !== n && o < e.length; o++)
              (r = (0 | e.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            if (((this.length = e.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (e !== this)
              for (; o < e.length; o++) this.words[o] = e.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var r;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (r = this.sub(t)), (t.negative ^= 1), r)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (r = t.sub(this)), (this.negative = 1), r)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var r = this.iadd(t);
              return (t.negative = 1), r._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var e,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((e = this), (i = t)) : ((e = t), (i = this));
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (r = (0 | e.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            for (; 0 !== o && s < e.length; s++)
              (o = (r = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var m = function (t, r, e) {
          var i,
            n,
            o,
            s = t.words,
            u = r.words,
            h = e.words,
            a = 0,
            l = 0 | s[0],
            f = 8191 & l,
            c = l >>> 13,
            m = 0 | s[1],
            p = 8191 & m,
            d = m >>> 13,
            g = 0 | s[2],
            v = 8191 & g,
            y = g >>> 13,
            w = 0 | s[3],
            M = 8191 & w,
            b = w >>> 13,
            _ = 0 | s[4],
            A = 8191 & _,
            E = _ >>> 13,
            x = 0 | s[5],
            S = 8191 & x,
            B = x >>> 13,
            N = 0 | s[6],
            T = 8191 & N,
            k = N >>> 13,
            R = 0 | s[7],
            O = 8191 & R,
            I = R >>> 13,
            C = 0 | s[8],
            P = 8191 & C,
            j = C >>> 13,
            F = 0 | s[9],
            U = 8191 & F,
            L = F >>> 13,
            D = 0 | u[0],
            z = 8191 & D,
            q = D >>> 13,
            Z = 0 | u[1],
            H = 8191 & Z,
            $ = Z >>> 13,
            V = 0 | u[2],
            W = 8191 & V,
            Y = V >>> 13,
            G = 0 | u[3],
            J = 8191 & G,
            K = G >>> 13,
            X = 0 | u[4],
            Q = 8191 & X,
            tt = X >>> 13,
            rt = 0 | u[5],
            et = 8191 & rt,
            it = rt >>> 13,
            nt = 0 | u[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            ut = 0 | u[7],
            ht = 8191 & ut,
            at = ut >>> 13,
            lt = 0 | u[8],
            ft = 8191 & lt,
            ct = lt >>> 13,
            mt = 0 | u[9],
            pt = 8191 & mt,
            dt = mt >>> 13;
          (e.negative = t.negative ^ r.negative), (e.length = 19);
          var gt =
            (((a + (i = Math.imul(f, z))) | 0) +
              ((8191 & (n = ((n = Math.imul(f, q)) + Math.imul(c, z)) | 0)) <<
                13)) |
            0;
          (a = ((((o = Math.imul(c, q)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (i = Math.imul(p, z)),
            (n = ((n = Math.imul(p, q)) + Math.imul(d, z)) | 0),
            (o = Math.imul(d, q));
          var vt =
            (((a + (i = (i + Math.imul(f, H)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, $)) | 0) + Math.imul(c, H)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, $)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(v, z)),
            (n = ((n = Math.imul(v, q)) + Math.imul(y, z)) | 0),
            (o = Math.imul(y, q)),
            (i = (i + Math.imul(p, H)) | 0),
            (n = ((n = (n + Math.imul(p, $)) | 0) + Math.imul(d, H)) | 0),
            (o = (o + Math.imul(d, $)) | 0);
          var yt =
            (((a + (i = (i + Math.imul(f, W)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, Y)) | 0) + Math.imul(c, W)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, Y)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(M, z)),
            (n = ((n = Math.imul(M, q)) + Math.imul(b, z)) | 0),
            (o = Math.imul(b, q)),
            (i = (i + Math.imul(v, H)) | 0),
            (n = ((n = (n + Math.imul(v, $)) | 0) + Math.imul(y, H)) | 0),
            (o = (o + Math.imul(y, $)) | 0),
            (i = (i + Math.imul(p, W)) | 0),
            (n = ((n = (n + Math.imul(p, Y)) | 0) + Math.imul(d, W)) | 0),
            (o = (o + Math.imul(d, Y)) | 0);
          var wt =
            (((a + (i = (i + Math.imul(f, J)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, K)) | 0) + Math.imul(c, J)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, K)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(A, z)),
            (n = ((n = Math.imul(A, q)) + Math.imul(E, z)) | 0),
            (o = Math.imul(E, q)),
            (i = (i + Math.imul(M, H)) | 0),
            (n = ((n = (n + Math.imul(M, $)) | 0) + Math.imul(b, H)) | 0),
            (o = (o + Math.imul(b, $)) | 0),
            (i = (i + Math.imul(v, W)) | 0),
            (n = ((n = (n + Math.imul(v, Y)) | 0) + Math.imul(y, W)) | 0),
            (o = (o + Math.imul(y, Y)) | 0),
            (i = (i + Math.imul(p, J)) | 0),
            (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(d, J)) | 0),
            (o = (o + Math.imul(d, K)) | 0);
          var Mt =
            (((a + (i = (i + Math.imul(f, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, tt)) | 0) + Math.imul(c, Q)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, tt)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(S, z)),
            (n = ((n = Math.imul(S, q)) + Math.imul(B, z)) | 0),
            (o = Math.imul(B, q)),
            (i = (i + Math.imul(A, H)) | 0),
            (n = ((n = (n + Math.imul(A, $)) | 0) + Math.imul(E, H)) | 0),
            (o = (o + Math.imul(E, $)) | 0),
            (i = (i + Math.imul(M, W)) | 0),
            (n = ((n = (n + Math.imul(M, Y)) | 0) + Math.imul(b, W)) | 0),
            (o = (o + Math.imul(b, Y)) | 0),
            (i = (i + Math.imul(v, J)) | 0),
            (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(y, J)) | 0),
            (o = (o + Math.imul(y, K)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(d, Q)) | 0),
            (o = (o + Math.imul(d, tt)) | 0);
          var bt =
            (((a + (i = (i + Math.imul(f, et)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, it)) | 0) + Math.imul(c, et)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, it)) | 0) + (n >>> 13)) | 0) +
              (bt >>> 26)) |
            0),
            (bt &= 67108863),
            (i = Math.imul(T, z)),
            (n = ((n = Math.imul(T, q)) + Math.imul(k, z)) | 0),
            (o = Math.imul(k, q)),
            (i = (i + Math.imul(S, H)) | 0),
            (n = ((n = (n + Math.imul(S, $)) | 0) + Math.imul(B, H)) | 0),
            (o = (o + Math.imul(B, $)) | 0),
            (i = (i + Math.imul(A, W)) | 0),
            (n = ((n = (n + Math.imul(A, Y)) | 0) + Math.imul(E, W)) | 0),
            (o = (o + Math.imul(E, Y)) | 0),
            (i = (i + Math.imul(M, J)) | 0),
            (n = ((n = (n + Math.imul(M, K)) | 0) + Math.imul(b, J)) | 0),
            (o = (o + Math.imul(b, K)) | 0),
            (i = (i + Math.imul(v, Q)) | 0),
            (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(y, Q)) | 0),
            (o = (o + Math.imul(y, tt)) | 0),
            (i = (i + Math.imul(p, et)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(d, et)) | 0),
            (o = (o + Math.imul(d, it)) | 0);
          var _t =
            (((a + (i = (i + Math.imul(f, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, st)) | 0) + Math.imul(c, ot)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(O, z)),
            (n = ((n = Math.imul(O, q)) + Math.imul(I, z)) | 0),
            (o = Math.imul(I, q)),
            (i = (i + Math.imul(T, H)) | 0),
            (n = ((n = (n + Math.imul(T, $)) | 0) + Math.imul(k, H)) | 0),
            (o = (o + Math.imul(k, $)) | 0),
            (i = (i + Math.imul(S, W)) | 0),
            (n = ((n = (n + Math.imul(S, Y)) | 0) + Math.imul(B, W)) | 0),
            (o = (o + Math.imul(B, Y)) | 0),
            (i = (i + Math.imul(A, J)) | 0),
            (n = ((n = (n + Math.imul(A, K)) | 0) + Math.imul(E, J)) | 0),
            (o = (o + Math.imul(E, K)) | 0),
            (i = (i + Math.imul(M, Q)) | 0),
            (n = ((n = (n + Math.imul(M, tt)) | 0) + Math.imul(b, Q)) | 0),
            (o = (o + Math.imul(b, tt)) | 0),
            (i = (i + Math.imul(v, et)) | 0),
            (n = ((n = (n + Math.imul(v, it)) | 0) + Math.imul(y, et)) | 0),
            (o = (o + Math.imul(y, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(d, ot)) | 0),
            (o = (o + Math.imul(d, st)) | 0);
          var At =
            (((a + (i = (i + Math.imul(f, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, at)) | 0) + Math.imul(c, ht)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, at)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(P, z)),
            (n = ((n = Math.imul(P, q)) + Math.imul(j, z)) | 0),
            (o = Math.imul(j, q)),
            (i = (i + Math.imul(O, H)) | 0),
            (n = ((n = (n + Math.imul(O, $)) | 0) + Math.imul(I, H)) | 0),
            (o = (o + Math.imul(I, $)) | 0),
            (i = (i + Math.imul(T, W)) | 0),
            (n = ((n = (n + Math.imul(T, Y)) | 0) + Math.imul(k, W)) | 0),
            (o = (o + Math.imul(k, Y)) | 0),
            (i = (i + Math.imul(S, J)) | 0),
            (n = ((n = (n + Math.imul(S, K)) | 0) + Math.imul(B, J)) | 0),
            (o = (o + Math.imul(B, K)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(M, et)) | 0),
            (n = ((n = (n + Math.imul(M, it)) | 0) + Math.imul(b, et)) | 0),
            (o = (o + Math.imul(b, it)) | 0),
            (i = (i + Math.imul(v, ot)) | 0),
            (n = ((n = (n + Math.imul(v, st)) | 0) + Math.imul(y, ot)) | 0),
            (o = (o + Math.imul(y, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(d, ht)) | 0),
            (o = (o + Math.imul(d, at)) | 0);
          var Et =
            (((a + (i = (i + Math.imul(f, ft)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, ct)) | 0) + Math.imul(c, ft)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, ct)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(U, z)),
            (n = ((n = Math.imul(U, q)) + Math.imul(L, z)) | 0),
            (o = Math.imul(L, q)),
            (i = (i + Math.imul(P, H)) | 0),
            (n = ((n = (n + Math.imul(P, $)) | 0) + Math.imul(j, H)) | 0),
            (o = (o + Math.imul(j, $)) | 0),
            (i = (i + Math.imul(O, W)) | 0),
            (n = ((n = (n + Math.imul(O, Y)) | 0) + Math.imul(I, W)) | 0),
            (o = (o + Math.imul(I, Y)) | 0),
            (i = (i + Math.imul(T, J)) | 0),
            (n = ((n = (n + Math.imul(T, K)) | 0) + Math.imul(k, J)) | 0),
            (o = (o + Math.imul(k, K)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(B, Q)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (i = (i + Math.imul(A, et)) | 0),
            (n = ((n = (n + Math.imul(A, it)) | 0) + Math.imul(E, et)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(M, ot)) | 0),
            (n = ((n = (n + Math.imul(M, st)) | 0) + Math.imul(b, ot)) | 0),
            (o = (o + Math.imul(b, st)) | 0),
            (i = (i + Math.imul(v, ht)) | 0),
            (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(y, ht)) | 0),
            (o = (o + Math.imul(y, at)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = ((n = (n + Math.imul(p, ct)) | 0) + Math.imul(d, ft)) | 0),
            (o = (o + Math.imul(d, ct)) | 0);
          var xt =
            (((a + (i = (i + Math.imul(f, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, dt)) | 0) + Math.imul(c, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, dt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(U, H)),
            (n = ((n = Math.imul(U, $)) + Math.imul(L, H)) | 0),
            (o = Math.imul(L, $)),
            (i = (i + Math.imul(P, W)) | 0),
            (n = ((n = (n + Math.imul(P, Y)) | 0) + Math.imul(j, W)) | 0),
            (o = (o + Math.imul(j, Y)) | 0),
            (i = (i + Math.imul(O, J)) | 0),
            (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(I, J)) | 0),
            (o = (o + Math.imul(I, K)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(k, Q)) | 0),
            (o = (o + Math.imul(k, tt)) | 0),
            (i = (i + Math.imul(S, et)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(B, et)) | 0),
            (o = (o + Math.imul(B, it)) | 0),
            (i = (i + Math.imul(A, ot)) | 0),
            (n = ((n = (n + Math.imul(A, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(M, ht)) | 0),
            (n = ((n = (n + Math.imul(M, at)) | 0) + Math.imul(b, ht)) | 0),
            (o = (o + Math.imul(b, at)) | 0),
            (i = (i + Math.imul(v, ft)) | 0),
            (n = ((n = (n + Math.imul(v, ct)) | 0) + Math.imul(y, ft)) | 0),
            (o = (o + Math.imul(y, ct)) | 0);
          var St =
            (((a + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, dt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(d, dt)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(U, W)),
            (n = ((n = Math.imul(U, Y)) + Math.imul(L, W)) | 0),
            (o = Math.imul(L, Y)),
            (i = (i + Math.imul(P, J)) | 0),
            (n = ((n = (n + Math.imul(P, K)) | 0) + Math.imul(j, J)) | 0),
            (o = (o + Math.imul(j, K)) | 0),
            (i = (i + Math.imul(O, Q)) | 0),
            (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(T, et)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(k, et)) | 0),
            (o = (o + Math.imul(k, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(B, ot)) | 0),
            (o = (o + Math.imul(B, st)) | 0),
            (i = (i + Math.imul(A, ht)) | 0),
            (n = ((n = (n + Math.imul(A, at)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, at)) | 0),
            (i = (i + Math.imul(M, ft)) | 0),
            (n = ((n = (n + Math.imul(M, ct)) | 0) + Math.imul(b, ft)) | 0),
            (o = (o + Math.imul(b, ct)) | 0);
          var Bt =
            (((a + (i = (i + Math.imul(v, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(v, dt)) | 0) + Math.imul(y, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(y, dt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(U, J)),
            (n = ((n = Math.imul(U, K)) + Math.imul(L, J)) | 0),
            (o = Math.imul(L, K)),
            (i = (i + Math.imul(P, Q)) | 0),
            (n = ((n = (n + Math.imul(P, tt)) | 0) + Math.imul(j, Q)) | 0),
            (o = (o + Math.imul(j, tt)) | 0),
            (i = (i + Math.imul(O, et)) | 0),
            (n = ((n = (n + Math.imul(O, it)) | 0) + Math.imul(I, et)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(k, ot)) | 0),
            (o = (o + Math.imul(k, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, at)) | 0) + Math.imul(B, ht)) | 0),
            (o = (o + Math.imul(B, at)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = ((n = (n + Math.imul(A, ct)) | 0) + Math.imul(E, ft)) | 0),
            (o = (o + Math.imul(E, ct)) | 0);
          var Nt =
            (((a + (i = (i + Math.imul(M, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(M, dt)) | 0) + Math.imul(b, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(b, dt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(U, Q)),
            (n = ((n = Math.imul(U, tt)) + Math.imul(L, Q)) | 0),
            (o = Math.imul(L, tt)),
            (i = (i + Math.imul(P, et)) | 0),
            (n = ((n = (n + Math.imul(P, it)) | 0) + Math.imul(j, et)) | 0),
            (o = (o + Math.imul(j, it)) | 0),
            (i = (i + Math.imul(O, ot)) | 0),
            (n = ((n = (n + Math.imul(O, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, at)) | 0) + Math.imul(k, ht)) | 0),
            (o = (o + Math.imul(k, at)) | 0),
            (i = (i + Math.imul(S, ft)) | 0),
            (n = ((n = (n + Math.imul(S, ct)) | 0) + Math.imul(B, ft)) | 0),
            (o = (o + Math.imul(B, ct)) | 0);
          var Tt =
            (((a + (i = (i + Math.imul(A, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, dt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(E, dt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(U, et)),
            (n = ((n = Math.imul(U, it)) + Math.imul(L, et)) | 0),
            (o = Math.imul(L, it)),
            (i = (i + Math.imul(P, ot)) | 0),
            (n = ((n = (n + Math.imul(P, st)) | 0) + Math.imul(j, ot)) | 0),
            (o = (o + Math.imul(j, st)) | 0),
            (i = (i + Math.imul(O, ht)) | 0),
            (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, at)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = ((n = (n + Math.imul(T, ct)) | 0) + Math.imul(k, ft)) | 0),
            (o = (o + Math.imul(k, ct)) | 0);
          var kt =
            (((a + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, dt)) | 0) + Math.imul(B, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(B, dt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(U, ot)),
            (n = ((n = Math.imul(U, st)) + Math.imul(L, ot)) | 0),
            (o = Math.imul(L, st)),
            (i = (i + Math.imul(P, ht)) | 0),
            (n = ((n = (n + Math.imul(P, at)) | 0) + Math.imul(j, ht)) | 0),
            (o = (o + Math.imul(j, at)) | 0),
            (i = (i + Math.imul(O, ft)) | 0),
            (n = ((n = (n + Math.imul(O, ct)) | 0) + Math.imul(I, ft)) | 0),
            (o = (o + Math.imul(I, ct)) | 0);
          var Rt =
            (((a + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, dt)) | 0) + Math.imul(k, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(k, dt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(U, ht)),
            (n = ((n = Math.imul(U, at)) + Math.imul(L, ht)) | 0),
            (o = Math.imul(L, at)),
            (i = (i + Math.imul(P, ft)) | 0),
            (n = ((n = (n + Math.imul(P, ct)) | 0) + Math.imul(j, ft)) | 0),
            (o = (o + Math.imul(j, ct)) | 0);
          var Ot =
            (((a + (i = (i + Math.imul(O, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(O, dt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(I, dt)) | 0) + (n >>> 13)) | 0) +
              (Ot >>> 26)) |
            0),
            (Ot &= 67108863),
            (i = Math.imul(U, ft)),
            (n = ((n = Math.imul(U, ct)) + Math.imul(L, ft)) | 0),
            (o = Math.imul(L, ct));
          var It =
            (((a + (i = (i + Math.imul(P, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(P, dt)) | 0) + Math.imul(j, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(j, dt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863);
          var Ct =
            (((a + (i = Math.imul(U, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(U, dt)) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0;
          return (
            (a =
              ((((o = Math.imul(L, dt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (h[0] = gt),
            (h[1] = vt),
            (h[2] = yt),
            (h[3] = wt),
            (h[4] = Mt),
            (h[5] = bt),
            (h[6] = _t),
            (h[7] = At),
            (h[8] = Et),
            (h[9] = xt),
            (h[10] = St),
            (h[11] = Bt),
            (h[12] = Nt),
            (h[13] = Tt),
            (h[14] = kt),
            (h[15] = Rt),
            (h[16] = Ot),
            (h[17] = It),
            (h[18] = Ct),
            0 !== a && ((h[19] = a), e.length++),
            e
          );
        };
        function p(t, r, e) {
          return new d().mulp(t, r, e);
        }
        function d(t, r) {
          (this.x = t), (this.y = r);
        }
        Math.imul || (m = c),
          (o.prototype.mulTo = function (t, r) {
            var e = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? m(this, t, r)
              : e < 63
              ? c(this, t, r)
              : e < 1024
              ? (function (t, r, e) {
                  (e.negative = r.negative ^ t.negative),
                    (e.length = t.length + r.length);
                  for (var i = 0, n = 0, o = 0; o < e.length - 1; o++) {
                    var s = n;
                    n = 0;
                    for (
                      var u = 67108863 & i,
                        h = Math.min(o, r.length - 1),
                        a = Math.max(0, o - t.length + 1);
                      a <= h;
                      a++
                    ) {
                      var l = o - a,
                        f = (0 | t.words[l]) * (0 | r.words[a]),
                        c = 67108863 & f;
                      (u = 67108863 & (c = (c + u) | 0)),
                        (n +=
                          (s =
                            ((s = (s + ((f / 67108864) | 0)) | 0) +
                              (c >>> 26)) |
                            0) >>> 26),
                        (s &= 67108863);
                    }
                    (e.words[o] = u), (i = s), (s = n);
                  }
                  return 0 !== i ? (e.words[o] = i) : e.length--, e.strip();
                })(this, t, r)
              : p(this, t, r);
          }),
          (d.prototype.makeRBT = function (t) {
            for (
              var r = new Array(t), e = o.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              r[i] = this.revBin(i, e, t);
            return r;
          }),
          (d.prototype.revBin = function (t, r, e) {
            if (0 === t || t === e - 1) return t;
            for (var i = 0, n = 0; n < r; n++)
              (i |= (1 & t) << (r - n - 1)), (t >>= 1);
            return i;
          }),
          (d.prototype.permute = function (t, r, e, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = r[t[s]]), (n[s] = e[t[s]]);
          }),
          (d.prototype.transform = function (t, r, e, i, n, o) {
            this.permute(o, t, r, e, i, n);
            for (var s = 1; s < n; s <<= 1)
              for (
                var u = s << 1,
                  h = Math.cos((2 * Math.PI) / u),
                  a = Math.sin((2 * Math.PI) / u),
                  l = 0;
                l < n;
                l += u
              )
                for (var f = h, c = a, m = 0; m < s; m++) {
                  var p = e[l + m],
                    d = i[l + m],
                    g = e[l + m + s],
                    v = i[l + m + s],
                    y = f * g - c * v;
                  (v = f * v + c * g),
                    (g = y),
                    (e[l + m] = p + g),
                    (i[l + m] = d + v),
                    (e[l + m + s] = p - g),
                    (i[l + m + s] = d - v),
                    m !== u &&
                      ((y = h * f - a * c), (c = h * c + a * f), (f = y));
                }
          }),
          (d.prototype.guessLen13b = function (t, r) {
            var e = 1 | Math.max(r, t),
              i = 1 & e,
              n = 0;
            for (e = (e / 2) | 0; e; e >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (d.prototype.conjugate = function (t, r, e) {
            if (!(e <= 1))
              for (var i = 0; i < e / 2; i++) {
                var n = t[i];
                (t[i] = t[e - i - 1]),
                  (t[e - i - 1] = n),
                  (n = r[i]),
                  (r[i] = -r[e - i - 1]),
                  (r[e - i - 1] = -n);
              }
          }),
          (d.prototype.normalize13b = function (t, r) {
            for (var e = 0, i = 0; i < r / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / r) +
                Math.round(t[2 * i] / r) +
                e;
              (t[i] = 67108863 & n),
                (e = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (d.prototype.convert13b = function (t, r, e, n) {
            for (var o = 0, s = 0; s < r; s++)
              (o += 0 | t[s]),
                (e[2 * s] = 8191 & o),
                (o >>>= 13),
                (e[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * r; s < n; ++s) e[s] = 0;
            i(0 === o), i(0 == (-8192 & o));
          }),
          (d.prototype.stub = function (t) {
            for (var r = new Array(t), e = 0; e < t; e++) r[e] = 0;
            return r;
          }),
          (d.prototype.mulp = function (t, r, e) {
            var i = 2 * this.guessLen13b(t.length, r.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              u = new Array(i),
              h = new Array(i),
              a = new Array(i),
              l = new Array(i),
              f = new Array(i),
              c = e.words;
            (c.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(r.words, r.length, a, i),
              this.transform(s, o, u, h, i, n),
              this.transform(a, o, l, f, i, n);
            for (var m = 0; m < i; m++) {
              var p = u[m] * l[m] - h[m] * f[m];
              (h[m] = u[m] * f[m] + h[m] * l[m]), (u[m] = p);
            }
            return (
              this.conjugate(u, h, i),
              this.transform(u, h, c, o, i, n),
              this.conjugate(c, o, i),
              this.normalize13b(c, i),
              (e.negative = t.negative ^ r.negative),
              (e.length = t.length + r.length),
              e.strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var r = new o(null);
            return (
              (r.words = new Array(this.length + t.length)), this.mulTo(t, r)
            );
          }),
          (o.prototype.mulf = function (t) {
            var r = new o(null);
            return (r.words = new Array(this.length + t.length)), p(this, t, r);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            i("number" == typeof t), i(t < 67108864);
            for (var r = 0, e = 0; e < this.length; e++) {
              var n = (0 | this.words[e]) * t,
                o = (67108863 & n) + (67108863 & r);
              (r >>= 26),
                (r += (n / 67108864) | 0),
                (r += o >>> 26),
                (this.words[e] = 67108863 & o);
            }
            return 0 !== r && ((this.words[e] = r), this.length++), this;
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var r = (function (t) {
              for (var r = new Array(t.bitLength()), e = 0; e < r.length; e++) {
                var i = (e / 26) | 0,
                  n = e % 26;
                r[e] = (t.words[i] & (1 << n)) >>> n;
              }
              return r;
            })(t);
            if (0 === r.length) return new o(1);
            for (
              var e = this, i = 0;
              i < r.length && 0 === r[i];
              i++, e = e.sqr()
            );
            if (++i < r.length)
              for (var n = e.sqr(); i < r.length; i++, n = n.sqr())
                0 !== r[i] && (e = e.mul(n));
            return e;
          }),
          (o.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var r,
              e = t % 26,
              n = (t - e) / 26,
              o = (67108863 >>> (26 - e)) << (26 - e);
            if (0 !== e) {
              var s = 0;
              for (r = 0; r < this.length; r++) {
                var u = this.words[r] & o,
                  h = ((0 | this.words[r]) - u) << e;
                (this.words[r] = h | s), (s = u >>> (26 - e));
              }
              s && ((this.words[r] = s), this.length++);
            }
            if (0 !== n) {
              for (r = this.length - 1; r >= 0; r--)
                this.words[r + n] = this.words[r];
              for (r = 0; r < n; r++) this.words[r] = 0;
              this.length += n;
            }
            return this.strip();
          }),
          (o.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, r, e) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = r ? (r - (r % 26)) / 26 : 0);
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              u = 67108863 ^ ((67108863 >>> o) << o),
              h = e;
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var a = 0; a < s; a++) h.words[a] = this.words[a];
              h.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, a = 0; a < this.length; a++)
                this.words[a] = this.words[a + s];
            else (this.words[0] = 0), (this.length = 1);
            var l = 0;
            for (a = this.length - 1; a >= 0 && (0 !== l || a >= n); a--) {
              var f = 0 | this.words[a];
              (this.words[a] = (l << (26 - o)) | (f >>> o)), (l = f & u);
            }
            return (
              h && 0 !== l && (h.words[h.length++] = l),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (o.prototype.ishrn = function (t, r, e) {
            return i(0 === this.negative), this.iushrn(t, r, e);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            return !(this.length <= e) && !!(this.words[e] & n);
          }),
          (o.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= e)
            )
              return this;
            if (
              (0 !== r && e++,
              (this.length = Math.min(e, this.length)),
              0 !== r)
            ) {
              var n = 67108863 ^ ((67108863 >>> r) << r);
              this.words[this.length - 1] &= n;
            }
            return this.strip();
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var r = 0; r < this.length && this.words[r] >= 67108864; r++)
              (this.words[r] -= 67108864),
                r === this.length - 1
                  ? (this.words[r + 1] = 1)
                  : this.words[r + 1]++;
            return (this.length = Math.max(this.length, r + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var r = 0; r < this.length && this.words[r] < 0; r++)
                (this.words[r] += 67108864), (this.words[r + 1] -= 1);
            return this.strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, r, e) {
            var n,
              o,
              s = t.length + e;
            this._expand(s);
            var u = 0;
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + e]) + u;
              var h = (0 | t.words[n]) * r;
              (u = ((o -= 67108863 & h) >> 26) - ((h / 67108864) | 0)),
                (this.words[n + e] = 67108863 & o);
            }
            for (; n < this.length - e; n++)
              (u = (o = (0 | this.words[n + e]) + u) >> 26),
                (this.words[n + e] = 67108863 & o);
            if (0 === u) return this.strip();
            for (i(-1 === u), u = 0, n = 0; n < this.length; n++)
              (u = (o = -(0 | this.words[n]) + u) >> 26),
                (this.words[n] = 67108863 & o);
            return (this.negative = 1), this.strip();
          }),
          (o.prototype._wordDiv = function (t, r) {
            var e = (this.length, t.length),
              i = this.clone(),
              n = t,
              s = 0 | n.words[n.length - 1];
            0 !== (e = 26 - this._countBits(s)) &&
              ((n = n.ushln(e)), i.iushln(e), (s = 0 | n.words[n.length - 1]));
            var u,
              h = i.length - n.length;
            if ("mod" !== r) {
              ((u = new o(null)).length = h + 1),
                (u.words = new Array(u.length));
              for (var a = 0; a < u.length; a++) u.words[a] = 0;
            }
            var l = i.clone()._ishlnsubmul(n, 1, h);
            0 === l.negative && ((i = l), u && (u.words[h] = 1));
            for (var f = h - 1; f >= 0; f--) {
              var c =
                67108864 * (0 | i.words[n.length + f]) +
                (0 | i.words[n.length + f - 1]);
              for (
                c = Math.min((c / s) | 0, 67108863), i._ishlnsubmul(n, c, f);
                0 !== i.negative;

              )
                c--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, f),
                  i.isZero() || (i.negative ^= 1);
              u && (u.words[f] = c);
            }
            return (
              u && u.strip(),
              i.strip(),
              "div" !== r && 0 !== e && i.iushrn(e),
              { div: u || null, mod: i }
            );
          }),
          (o.prototype.divmod = function (t, r, e) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new o(0), mod: new o(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((u = this.neg().divmod(t, r)),
                  "mod" !== r && (n = u.div.neg()),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.iadd(t)),
                  { div: n, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((u = this.divmod(t.neg(), r)),
                  "mod" !== r && (n = u.div.neg()),
                  { div: n, mod: u.mod })
                : 0 != (this.negative & t.negative)
                ? ((u = this.neg().divmod(t.neg(), r)),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.isub(t)),
                  { div: u.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new o(0), mod: this }
                : 1 === t.length
                ? "div" === r
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === r
                  ? { div: null, mod: new o(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new o(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, r)
            );
            var n, s, u;
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var r = this.divmod(t);
            if (r.mod.isZero()) return r.div;
            var e = 0 !== r.div.negative ? r.mod.isub(t) : r.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = e.cmp(i);
            return o < 0 || (1 === n && 0 === o)
              ? r.div
              : 0 !== r.div.negative
              ? r.div.isubn(1)
              : r.div.iaddn(1);
          }),
          (o.prototype.modn = function (t) {
            i(t <= 67108863);
            for (var r = (1 << 26) % t, e = 0, n = this.length - 1; n >= 0; n--)
              e = (r * e + (0 | this.words[n])) % t;
            return e;
          }),
          (o.prototype.idivn = function (t) {
            i(t <= 67108863);
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var n = (0 | this.words[e]) + 67108864 * r;
              (this.words[e] = (n / t) | 0), (r = n % t);
            }
            return this.strip();
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0;
              r.isEven() && e.isEven();

            )
              r.iushrn(1), e.iushrn(1), ++a;
            for (var l = e.clone(), f = r.clone(); !r.isZero(); ) {
              for (
                var c = 0, m = 1;
                0 == (r.words[0] & m) && c < 26;
                ++c, m <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  (n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(f)),
                    n.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, d = 1;
                0 == (e.words[0] & d) && p < 26;
                ++p, d <<= 1
              );
              if (p > 0)
                for (e.iushrn(p); p-- > 0; )
                  (u.isOdd() || h.isOdd()) && (u.iadd(l), h.isub(f)),
                    u.iushrn(1),
                    h.iushrn(1);
              r.cmp(e) >= 0
                ? (r.isub(e), n.isub(u), s.isub(h))
                : (e.isub(r), u.isub(n), h.isub(s));
            }
            return { a: u, b: h, gcd: e.iushln(a) };
          }),
          (o.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n, s = new o(1), u = new o(0), h = e.clone();
              r.cmpn(1) > 0 && e.cmpn(1) > 0;

            ) {
              for (
                var a = 0, l = 1;
                0 == (r.words[0] & l) && a < 26;
                ++a, l <<= 1
              );
              if (a > 0)
                for (r.iushrn(a); a-- > 0; )
                  s.isOdd() && s.iadd(h), s.iushrn(1);
              for (
                var f = 0, c = 1;
                0 == (e.words[0] & c) && f < 26;
                ++f, c <<= 1
              );
              if (f > 0)
                for (e.iushrn(f); f-- > 0; )
                  u.isOdd() && u.iadd(h), u.iushrn(1);
              r.cmp(e) >= 0 ? (r.isub(e), s.isub(u)) : (e.isub(r), u.isub(s));
            }
            return (n = 0 === r.cmpn(1) ? s : u).cmpn(0) < 0 && n.iadd(t), n;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var r = this.clone(),
              e = t.clone();
            (r.negative = 0), (e.negative = 0);
            for (var i = 0; r.isEven() && e.isEven(); i++)
              r.iushrn(1), e.iushrn(1);
            for (;;) {
              for (; r.isEven(); ) r.iushrn(1);
              for (; e.isEven(); ) e.iushrn(1);
              var n = r.cmp(e);
              if (n < 0) {
                var o = r;
                (r = e), (e = o);
              } else if (0 === n || 0 === e.cmpn(1)) break;
              r.isub(e);
            }
            return e.iushln(i);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (o.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            i("number" == typeof t);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            if (this.length <= e)
              return this._expand(e + 1), (this.words[e] |= n), this;
            for (var o = n, s = e; 0 !== o && s < this.length; s++) {
              var u = 0 | this.words[s];
              (o = (u += o) >>> 26), (u &= 67108863), (this.words[s] = u);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var r,
              e = t < 0;
            if (0 !== this.negative && !e) return -1;
            if (0 === this.negative && e) return 1;
            if ((this.strip(), this.length > 1)) r = 1;
            else {
              e && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              r = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var r = this.ucmp(t);
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var i = 0 | this.words[e],
                n = 0 | t.words[e];
              if (i !== n) {
                i < n ? (r = -1) : i > n && (r = 1);
                break;
              }
            }
            return r;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (o.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new _(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var g = { k256: null, p224: null, p192: null, p25519: null };
        function v(t, r) {
          (this.name = t),
            (this.p = new o(r, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function y() {
          v.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function w() {
          v.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function M() {
          v.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function b() {
          v.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function _(t) {
          if ("string" == typeof t) {
            var r = o._prime(t);
            (this.m = r.p), (this.prime = r);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (v.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (v.prototype.ireduce = function (t) {
            var r,
              e = t;
            do {
              this.split(e, this.tmp),
                (r = (e = (e = this.imulK(e)).iadd(this.tmp)).bitLength());
            } while (r > this.n);
            var i = r < this.n ? -1 : e.ucmp(this.p);
            return (
              0 === i
                ? ((e.words[0] = 0), (e.length = 1))
                : i > 0
                ? e.isub(this.p)
                : void 0 !== e.strip
                ? e.strip()
                : e._strip(),
              e
            );
          }),
          (v.prototype.split = function (t, r) {
            t.iushrn(this.n, 0, r);
          }),
          (v.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(y, v),
          (y.prototype.split = function (t, r) {
            for (var e = Math.min(t.length, 9), i = 0; i < e; i++)
              r.words[i] = t.words[i];
            if (((r.length = e), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var n = t.words[9];
            for (r.words[r.length++] = 4194303 & n, i = 10; i < t.length; i++) {
              var o = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & o) << 4) | (n >>> 22)), (n = o);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (y.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 0 | t.words[e];
              (r += 977 * i),
                (t.words[e] = 67108863 & r),
                (r = 64 * i + ((r / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(w, v),
          n(M, v),
          n(b, v),
          (b.prototype.imulK = function (t) {
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 19 * (0 | t.words[e]) + r,
                n = 67108863 & i;
              (i >>>= 26), (t.words[e] = n), (r = i);
            }
            return 0 !== r && (t.words[t.length++] = r), t;
          }),
          (o._prime = function (t) {
            if (g[t]) return g[t];
            var r;
            if ("k256" === t) r = new y();
            else if ("p224" === t) r = new w();
            else if ("p192" === t) r = new M();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              r = new b();
            }
            return (g[t] = r), r;
          }),
          (_.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (_.prototype._verify2 = function (t, r) {
            i(0 == (t.negative | r.negative), "red works only with positives"),
              i(t.red && t.red === r.red, "red works only with red numbers");
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (_.prototype.add = function (t, r) {
            this._verify2(t, r);
            var e = t.add(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
          }),
          (_.prototype.iadd = function (t, r) {
            this._verify2(t, r);
            var e = t.iadd(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e;
          }),
          (_.prototype.sub = function (t, r) {
            this._verify2(t, r);
            var e = t.sub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
          }),
          (_.prototype.isub = function (t, r) {
            this._verify2(t, r);
            var e = t.isub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e;
          }),
          (_.prototype.shl = function (t, r) {
            return this._verify1(t), this.imod(t.ushln(r));
          }),
          (_.prototype.imul = function (t, r) {
            return this._verify2(t, r), this.imod(t.imul(r));
          }),
          (_.prototype.mul = function (t, r) {
            return this._verify2(t, r), this.imod(t.mul(r));
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var r = this.m.andln(3);
            if ((i(r % 2 == 1), 3 === r)) {
              var e = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, e);
            }
            for (
              var n = this.m.subn(1), s = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              s++, n.iushrn(1);
            i(!n.isZero());
            var u = new o(1).toRed(this),
              h = u.redNeg(),
              a = this.m.subn(1).iushrn(1),
              l = this.m.bitLength();
            for (
              l = new o(2 * l * l).toRed(this);
              0 !== this.pow(l, a).cmp(h);

            )
              l.redIAdd(h);
            for (
              var f = this.pow(l, n),
                c = this.pow(t, n.addn(1).iushrn(1)),
                m = this.pow(t, n),
                p = s;
              0 !== m.cmp(u);

            ) {
              for (var d = m, g = 0; 0 !== d.cmp(u); g++) d = d.redSqr();
              i(g < p);
              var v = this.pow(f, new o(1).iushln(p - g - 1));
              (c = c.redMul(v)), (f = v.redSqr()), (m = m.redMul(f)), (p = g);
            }
            return c;
          }),
          (_.prototype.invm = function (t) {
            var r = t._invmp(this.m);
            return 0 !== r.negative
              ? ((r.negative = 0), this.imod(r).redNeg())
              : this.imod(r);
          }),
          (_.prototype.pow = function (t, r) {
            if (r.isZero()) return new o(1).toRed(this);
            if (0 === r.cmpn(1)) return t.clone();
            var e = new Array(16);
            (e[0] = new o(1).toRed(this)), (e[1] = t);
            for (var i = 2; i < e.length; i++) e[i] = this.mul(e[i - 1], t);
            var n = e[0],
              s = 0,
              u = 0,
              h = r.bitLength() % 26;
            for (0 === h && (h = 26), i = r.length - 1; i >= 0; i--) {
              for (var a = r.words[i], l = h - 1; l >= 0; l--) {
                var f = (a >> l) & 1;
                n !== e[0] && (n = this.sqr(n)),
                  0 !== f || 0 !== s
                    ? ((s <<= 1),
                      (s |= f),
                      (4 === ++u || (0 === i && 0 === l)) &&
                        ((n = this.mul(n, e[s])), (u = 0), (s = 0)))
                    : (u = 0);
              }
              h = 26;
            }
            return n;
          }),
          (_.prototype.convertTo = function (t) {
            var r = t.umod(this.m);
            return r === t ? r.clone() : r;
          }),
          (_.prototype.convertFrom = function (t) {
            var r = t.clone();
            return (r.red = null), r;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          n(A, _),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var r = this.imod(t.mul(this.rinv));
            return (r.red = null), r;
          }),
          (A.prototype.imul = function (t, r) {
            if (t.isZero() || r.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var e = t.imul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, r) {
            if (t.isZero() || r.isZero()) return new o(0)._forceRed(this);
            var e = t.mul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })(t, this);
    }.call(this, e(4)(t)));
  },
  function (t, r) {
    var e;
    e = (function () {
      return this;
    })();
    try {
      e = e || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (e = window);
    }
    t.exports = e;
  },
  function (t, r, e) {
    "use strict";
    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <http://feross.org>
       * @license  MIT
       */
      var i = e(16),
        n = e(17),
        o = e(18);
      function s() {
        return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function u(t, r) {
        if (s() < r) throw new RangeError("Invalid typed array length");
        return (
          h.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(r)).__proto__ = h.prototype)
            : (null === t && (t = new h(r)), (t.length = r)),
          t
        );
      }
      function h(t, r, e) {
        if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h))
          return new h(t, r, e);
        if ("number" == typeof t) {
          if ("string" == typeof r)
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          return f(this, t);
        }
        return a(this, t, r, e);
      }
      function a(t, r, e, i) {
        if ("number" == typeof r)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer
          ? (function (t, r, e, i) {
              if ((r.byteLength, e < 0 || r.byteLength < e))
                throw new RangeError("'offset' is out of bounds");
              if (r.byteLength < e + (i || 0))
                throw new RangeError("'length' is out of bounds");
              r =
                void 0 === e && void 0 === i
                  ? new Uint8Array(r)
                  : void 0 === i
                  ? new Uint8Array(r, e)
                  : new Uint8Array(r, e, i);
              h.TYPED_ARRAY_SUPPORT
                ? ((t = r).__proto__ = h.prototype)
                : (t = c(t, r));
              return t;
            })(t, r, e, i)
          : "string" == typeof r
          ? (function (t, r, e) {
              ("string" == typeof e && "" !== e) || (e = "utf8");
              if (!h.isEncoding(e))
                throw new TypeError(
                  '"encoding" must be a valid string encoding'
                );
              var i = 0 | p(r, e),
                n = (t = u(t, i)).write(r, e);
              n !== i && (t = t.slice(0, n));
              return t;
            })(t, r, e)
          : (function (t, r) {
              if (h.isBuffer(r)) {
                var e = 0 | m(r.length);
                return 0 === (t = u(t, e)).length || r.copy(t, 0, 0, e), t;
              }
              if (r) {
                if (
                  ("undefined" != typeof ArrayBuffer &&
                    r.buffer instanceof ArrayBuffer) ||
                  "length" in r
                )
                  return "number" != typeof r.length || (i = r.length) != i
                    ? u(t, 0)
                    : c(t, r);
                if ("Buffer" === r.type && o(r.data)) return c(t, r.data);
              }
              var i;
              throw new TypeError(
                "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
              );
            })(t, r);
      }
      function l(t) {
        if ("number" != typeof t)
          throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function f(t, r) {
        if ((l(r), (t = u(t, r < 0 ? 0 : 0 | m(r))), !h.TYPED_ARRAY_SUPPORT))
          for (var e = 0; e < r; ++e) t[e] = 0;
        return t;
      }
      function c(t, r) {
        var e = r.length < 0 ? 0 : 0 | m(r.length);
        t = u(t, e);
        for (var i = 0; i < e; i += 1) t[i] = 255 & r[i];
        return t;
      }
      function m(t) {
        if (t >= s())
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              s().toString(16) +
              " bytes"
          );
        return 0 | t;
      }
      function p(t, r) {
        if (h.isBuffer(t)) return t.length;
        if (
          "undefined" != typeof ArrayBuffer &&
          "function" == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var e = t.length;
        if (0 === e) return 0;
        for (var i = !1; ; )
          switch (r) {
            case "ascii":
            case "latin1":
            case "binary":
              return e;
            case "utf8":
            case "utf-8":
            case void 0:
              return D(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * e;
            case "hex":
              return e >>> 1;
            case "base64":
              return z(t).length;
            default:
              if (i) return D(t).length;
              (r = ("" + r).toLowerCase()), (i = !0);
          }
      }
      function d(t, r, e) {
        var i = !1;
        if (((void 0 === r || r < 0) && (r = 0), r > this.length)) return "";
        if (((void 0 === e || e > this.length) && (e = this.length), e <= 0))
          return "";
        if ((e >>>= 0) <= (r >>>= 0)) return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return T(this, r, e);
            case "utf8":
            case "utf-8":
              return S(this, r, e);
            case "ascii":
              return B(this, r, e);
            case "latin1":
            case "binary":
              return N(this, r, e);
            case "base64":
              return x(this, r, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return k(this, r, e);
            default:
              if (i) throw new TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (i = !0);
          }
      }
      function g(t, r, e) {
        var i = t[r];
        (t[r] = t[e]), (t[e] = i);
      }
      function v(t, r, e, i, n) {
        if (0 === t.length) return -1;
        if (
          ("string" == typeof e
            ? ((i = e), (e = 0))
            : e > 2147483647
            ? (e = 2147483647)
            : e < -2147483648 && (e = -2147483648),
          (e = +e),
          isNaN(e) && (e = n ? 0 : t.length - 1),
          e < 0 && (e = t.length + e),
          e >= t.length)
        ) {
          if (n) return -1;
          e = t.length - 1;
        } else if (e < 0) {
          if (!n) return -1;
          e = 0;
        }
        if (("string" == typeof r && (r = h.from(r, i)), h.isBuffer(r)))
          return 0 === r.length ? -1 : y(t, r, e, i, n);
        if ("number" == typeof r)
          return (
            (r &= 255),
            h.TYPED_ARRAY_SUPPORT &&
            "function" == typeof Uint8Array.prototype.indexOf
              ? n
                ? Uint8Array.prototype.indexOf.call(t, r, e)
                : Uint8Array.prototype.lastIndexOf.call(t, r, e)
              : y(t, [r], e, i, n)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function y(t, r, e, i, n) {
        var o,
          s = 1,
          u = t.length,
          h = r.length;
        if (
          void 0 !== i &&
          ("ucs2" === (i = String(i).toLowerCase()) ||
            "ucs-2" === i ||
            "utf16le" === i ||
            "utf-16le" === i)
        ) {
          if (t.length < 2 || r.length < 2) return -1;
          (s = 2), (u /= 2), (h /= 2), (e /= 2);
        }
        function a(t, r) {
          return 1 === s ? t[r] : t.readUInt16BE(r * s);
        }
        if (n) {
          var l = -1;
          for (o = e; o < u; o++)
            if (a(t, o) === a(r, -1 === l ? 0 : o - l)) {
              if ((-1 === l && (l = o), o - l + 1 === h)) return l * s;
            } else -1 !== l && (o -= o - l), (l = -1);
        } else
          for (e + h > u && (e = u - h), o = e; o >= 0; o--) {
            for (var f = !0, c = 0; c < h; c++)
              if (a(t, o + c) !== a(r, c)) {
                f = !1;
                break;
              }
            if (f) return o;
          }
        return -1;
      }
      function w(t, r, e, i) {
        e = Number(e) || 0;
        var n = t.length - e;
        i ? (i = Number(i)) > n && (i = n) : (i = n);
        var o = r.length;
        if (o % 2 != 0) throw new TypeError("Invalid hex string");
        i > o / 2 && (i = o / 2);
        for (var s = 0; s < i; ++s) {
          var u = parseInt(r.substr(2 * s, 2), 16);
          if (isNaN(u)) return s;
          t[e + s] = u;
        }
        return s;
      }
      function M(t, r, e, i) {
        return q(D(r, t.length - e), t, e, i);
      }
      function b(t, r, e, i) {
        return q(
          (function (t) {
            for (var r = [], e = 0; e < t.length; ++e)
              r.push(255 & t.charCodeAt(e));
            return r;
          })(r),
          t,
          e,
          i
        );
      }
      function _(t, r, e, i) {
        return b(t, r, e, i);
      }
      function A(t, r, e, i) {
        return q(z(r), t, e, i);
      }
      function E(t, r, e, i) {
        return q(
          (function (t, r) {
            for (
              var e, i, n, o = [], s = 0;
              s < t.length && !((r -= 2) < 0);
              ++s
            )
              (e = t.charCodeAt(s)),
                (i = e >> 8),
                (n = e % 256),
                o.push(n),
                o.push(i);
            return o;
          })(r, t.length - e),
          t,
          e,
          i
        );
      }
      function x(t, r, e) {
        return 0 === r && e === t.length
          ? i.fromByteArray(t)
          : i.fromByteArray(t.slice(r, e));
      }
      function S(t, r, e) {
        e = Math.min(t.length, e);
        for (var i = [], n = r; n < e; ) {
          var o,
            s,
            u,
            h,
            a = t[n],
            l = null,
            f = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
          if (n + f <= e)
            switch (f) {
              case 1:
                a < 128 && (l = a);
                break;
              case 2:
                128 == (192 & (o = t[n + 1])) &&
                  (h = ((31 & a) << 6) | (63 & o)) > 127 &&
                  (l = h);
                break;
              case 3:
                (o = t[n + 1]),
                  (s = t[n + 2]),
                  128 == (192 & o) &&
                    128 == (192 & s) &&
                    (h = ((15 & a) << 12) | ((63 & o) << 6) | (63 & s)) >
                      2047 &&
                    (h < 55296 || h > 57343) &&
                    (l = h);
                break;
              case 4:
                (o = t[n + 1]),
                  (s = t[n + 2]),
                  (u = t[n + 3]),
                  128 == (192 & o) &&
                    128 == (192 & s) &&
                    128 == (192 & u) &&
                    (h =
                      ((15 & a) << 18) |
                      ((63 & o) << 12) |
                      ((63 & s) << 6) |
                      (63 & u)) > 65535 &&
                    h < 1114112 &&
                    (l = h);
            }
          null === l
            ? ((l = 65533), (f = 1))
            : l > 65535 &&
              ((l -= 65536),
              i.push(((l >>> 10) & 1023) | 55296),
              (l = 56320 | (1023 & l))),
            i.push(l),
            (n += f);
        }
        return (function (t) {
          var r = t.length;
          if (r <= 4096) return String.fromCharCode.apply(String, t);
          var e = "",
            i = 0;
          for (; i < r; )
            e += String.fromCharCode.apply(String, t.slice(i, (i += 4096)));
          return e;
        })(i);
      }
      (r.Buffer = h),
        (r.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return h.alloc(+t);
        }),
        (r.INSPECT_MAX_BYTES = 50),
        (h.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === t.foo() &&
                      "function" == typeof t.subarray &&
                      0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (r.kMaxLength = s()),
        (h.poolSize = 8192),
        (h._augment = function (t) {
          return (t.__proto__ = h.prototype), t;
        }),
        (h.from = function (t, r, e) {
          return a(null, t, r, e);
        }),
        h.TYPED_ARRAY_SUPPORT &&
          ((h.prototype.__proto__ = Uint8Array.prototype),
          (h.__proto__ = Uint8Array),
          "undefined" != typeof Symbol &&
            Symbol.species &&
            h[Symbol.species] === h &&
            Object.defineProperty(h, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (h.alloc = function (t, r, e) {
          return (function (t, r, e, i) {
            return (
              l(r),
              r <= 0
                ? u(t, r)
                : void 0 !== e
                ? "string" == typeof i
                  ? u(t, r).fill(e, i)
                  : u(t, r).fill(e)
                : u(t, r)
            );
          })(null, t, r, e);
        }),
        (h.allocUnsafe = function (t) {
          return f(null, t);
        }),
        (h.allocUnsafeSlow = function (t) {
          return f(null, t);
        }),
        (h.isBuffer = function (t) {
          return !(null == t || !t._isBuffer);
        }),
        (h.compare = function (t, r) {
          if (!h.isBuffer(t) || !h.isBuffer(r))
            throw new TypeError("Arguments must be Buffers");
          if (t === r) return 0;
          for (
            var e = t.length, i = r.length, n = 0, o = Math.min(e, i);
            n < o;
            ++n
          )
            if (t[n] !== r[n]) {
              (e = t[n]), (i = r[n]);
              break;
            }
          return e < i ? -1 : i < e ? 1 : 0;
        }),
        (h.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (h.concat = function (t, r) {
          if (!o(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return h.alloc(0);
          var e;
          if (void 0 === r)
            for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
          var i = h.allocUnsafe(r),
            n = 0;
          for (e = 0; e < t.length; ++e) {
            var s = t[e];
            if (!h.isBuffer(s))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            s.copy(i, n), (n += s.length);
          }
          return i;
        }),
        (h.byteLength = p),
        (h.prototype._isBuffer = !0),
        (h.prototype.swap16 = function () {
          var t = this.length;
          if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var r = 0; r < t; r += 2) g(this, r, r + 1);
          return this;
        }),
        (h.prototype.swap32 = function () {
          var t = this.length;
          if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var r = 0; r < t; r += 4)
            g(this, r, r + 3), g(this, r + 1, r + 2);
          return this;
        }),
        (h.prototype.swap64 = function () {
          var t = this.length;
          if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var r = 0; r < t; r += 8)
            g(this, r, r + 7),
              g(this, r + 1, r + 6),
              g(this, r + 2, r + 5),
              g(this, r + 3, r + 4);
          return this;
        }),
        (h.prototype.toString = function () {
          var t = 0 | this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? S(this, 0, t)
            : d.apply(this, arguments);
        }),
        (h.prototype.equals = function (t) {
          if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === h.compare(this, t);
        }),
        (h.prototype.inspect = function () {
          var t = "",
            e = r.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString("hex", 0, e).match(/.{2}/g).join(" ")),
              this.length > e && (t += " ... ")),
            "<Buffer " + t + ">"
          );
        }),
        (h.prototype.compare = function (t, r, e, i, n) {
          if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          if (
            (void 0 === r && (r = 0),
            void 0 === e && (e = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === n && (n = this.length),
            r < 0 || e > t.length || i < 0 || n > this.length)
          )
            throw new RangeError("out of range index");
          if (i >= n && r >= e) return 0;
          if (i >= n) return -1;
          if (r >= e) return 1;
          if (this === t) return 0;
          for (
            var o = (n >>>= 0) - (i >>>= 0),
              s = (e >>>= 0) - (r >>>= 0),
              u = Math.min(o, s),
              a = this.slice(i, n),
              l = t.slice(r, e),
              f = 0;
            f < u;
            ++f
          )
            if (a[f] !== l[f]) {
              (o = a[f]), (s = l[f]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (h.prototype.includes = function (t, r, e) {
          return -1 !== this.indexOf(t, r, e);
        }),
        (h.prototype.indexOf = function (t, r, e) {
          return v(this, t, r, e, !0);
        }),
        (h.prototype.lastIndexOf = function (t, r, e) {
          return v(this, t, r, e, !1);
        }),
        (h.prototype.write = function (t, r, e, i) {
          if (void 0 === r) (i = "utf8"), (e = this.length), (r = 0);
          else if (void 0 === e && "string" == typeof r)
            (i = r), (e = this.length), (r = 0);
          else {
            if (!isFinite(r))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (r |= 0),
              isFinite(e)
                ? ((e |= 0), void 0 === i && (i = "utf8"))
                : ((i = e), (e = void 0));
          }
          var n = this.length - r;
          if (
            ((void 0 === e || e > n) && (e = n),
            (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          i || (i = "utf8");
          for (var o = !1; ; )
            switch (i) {
              case "hex":
                return w(this, t, r, e);
              case "utf8":
              case "utf-8":
                return M(this, t, r, e);
              case "ascii":
                return b(this, t, r, e);
              case "latin1":
              case "binary":
                return _(this, t, r, e);
              case "base64":
                return A(this, t, r, e);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return E(this, t, r, e);
              default:
                if (o) throw new TypeError("Unknown encoding: " + i);
                (i = ("" + i).toLowerCase()), (o = !0);
            }
        }),
        (h.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      function B(t, r, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var n = r; n < e; ++n) i += String.fromCharCode(127 & t[n]);
        return i;
      }
      function N(t, r, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var n = r; n < e; ++n) i += String.fromCharCode(t[n]);
        return i;
      }
      function T(t, r, e) {
        var i = t.length;
        (!r || r < 0) && (r = 0), (!e || e < 0 || e > i) && (e = i);
        for (var n = "", o = r; o < e; ++o) n += L(t[o]);
        return n;
      }
      function k(t, r, e) {
        for (var i = t.slice(r, e), n = "", o = 0; o < i.length; o += 2)
          n += String.fromCharCode(i[o] + 256 * i[o + 1]);
        return n;
      }
      function R(t, r, e) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + r > e)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function O(t, r, e, i, n, o) {
        if (!h.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r > n || r < o)
          throw new RangeError('"value" argument is out of bounds');
        if (e + i > t.length) throw new RangeError("Index out of range");
      }
      function I(t, r, e, i) {
        r < 0 && (r = 65535 + r + 1);
        for (var n = 0, o = Math.min(t.length - e, 2); n < o; ++n)
          t[e + n] =
            (r & (255 << (8 * (i ? n : 1 - n)))) >>> (8 * (i ? n : 1 - n));
      }
      function C(t, r, e, i) {
        r < 0 && (r = 4294967295 + r + 1);
        for (var n = 0, o = Math.min(t.length - e, 4); n < o; ++n)
          t[e + n] = (r >>> (8 * (i ? n : 3 - n))) & 255;
      }
      function P(t, r, e, i, n, o) {
        if (e + i > t.length) throw new RangeError("Index out of range");
        if (e < 0) throw new RangeError("Index out of range");
      }
      function j(t, r, e, i, o) {
        return o || P(t, 0, e, 4), n.write(t, r, e, i, 23, 4), e + 4;
      }
      function F(t, r, e, i, o) {
        return o || P(t, 0, e, 8), n.write(t, r, e, i, 52, 8), e + 8;
      }
      (h.prototype.slice = function (t, r) {
        var e,
          i = this.length;
        if (
          ((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
          (r = void 0 === r ? i : ~~r) < 0
            ? (r += i) < 0 && (r = 0)
            : r > i && (r = i),
          r < t && (r = t),
          h.TYPED_ARRAY_SUPPORT)
        )
          (e = this.subarray(t, r)).__proto__ = h.prototype;
        else {
          var n = r - t;
          e = new h(n, void 0);
          for (var o = 0; o < n; ++o) e[o] = this[o + t];
        }
        return e;
      }),
        (h.prototype.readUIntLE = function (t, r, e) {
          (t |= 0), (r |= 0), e || R(t, r, this.length);
          for (var i = this[t], n = 1, o = 0; ++o < r && (n *= 256); )
            i += this[t + o] * n;
          return i;
        }),
        (h.prototype.readUIntBE = function (t, r, e) {
          (t |= 0), (r |= 0), e || R(t, r, this.length);
          for (var i = this[t + --r], n = 1; r > 0 && (n *= 256); )
            i += this[t + --r] * n;
          return i;
        }),
        (h.prototype.readUInt8 = function (t, r) {
          return r || R(t, 1, this.length), this[t];
        }),
        (h.prototype.readUInt16LE = function (t, r) {
          return r || R(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (h.prototype.readUInt16BE = function (t, r) {
          return r || R(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (h.prototype.readUInt32LE = function (t, r) {
          return (
            r || R(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
        (h.prototype.readUInt32BE = function (t, r) {
          return (
            r || R(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (h.prototype.readIntLE = function (t, r, e) {
          (t |= 0), (r |= 0), e || R(t, r, this.length);
          for (var i = this[t], n = 1, o = 0; ++o < r && (n *= 256); )
            i += this[t + o] * n;
          return i >= (n *= 128) && (i -= Math.pow(2, 8 * r)), i;
        }),
        (h.prototype.readIntBE = function (t, r, e) {
          (t |= 0), (r |= 0), e || R(t, r, this.length);
          for (var i = r, n = 1, o = this[t + --i]; i > 0 && (n *= 256); )
            o += this[t + --i] * n;
          return o >= (n *= 128) && (o -= Math.pow(2, 8 * r)), o;
        }),
        (h.prototype.readInt8 = function (t, r) {
          return (
            r || R(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (h.prototype.readInt16LE = function (t, r) {
          r || R(t, 2, this.length);
          var e = this[t] | (this[t + 1] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (h.prototype.readInt16BE = function (t, r) {
          r || R(t, 2, this.length);
          var e = this[t + 1] | (this[t] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (h.prototype.readInt32LE = function (t, r) {
          return (
            r || R(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (h.prototype.readInt32BE = function (t, r) {
          return (
            r || R(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (h.prototype.readFloatLE = function (t, r) {
          return r || R(t, 4, this.length), n.read(this, t, !0, 23, 4);
        }),
        (h.prototype.readFloatBE = function (t, r) {
          return r || R(t, 4, this.length), n.read(this, t, !1, 23, 4);
        }),
        (h.prototype.readDoubleLE = function (t, r) {
          return r || R(t, 8, this.length), n.read(this, t, !0, 52, 8);
        }),
        (h.prototype.readDoubleBE = function (t, r) {
          return r || R(t, 8, this.length), n.read(this, t, !1, 52, 8);
        }),
        (h.prototype.writeUIntLE = function (t, r, e, i) {
          ((t = +t), (r |= 0), (e |= 0), i) ||
            O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var n = 1,
            o = 0;
          for (this[r] = 255 & t; ++o < e && (n *= 256); )
            this[r + o] = (t / n) & 255;
          return r + e;
        }),
        (h.prototype.writeUIntBE = function (t, r, e, i) {
          ((t = +t), (r |= 0), (e |= 0), i) ||
            O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var n = e - 1,
            o = 1;
          for (this[r + n] = 255 & t; --n >= 0 && (o *= 256); )
            this[r + n] = (t / o) & 255;
          return r + e;
        }),
        (h.prototype.writeUInt8 = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 1, 255, 0),
            h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (h.prototype.writeUInt16LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 65535, 0),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : I(this, t, r, !0),
            r + 2
          );
        }),
        (h.prototype.writeUInt16BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 65535, 0),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : I(this, t, r, !1),
            r + 2
          );
        }),
        (h.prototype.writeUInt32LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 4294967295, 0),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r + 3] = t >>> 24),
                (this[r + 2] = t >>> 16),
                (this[r + 1] = t >>> 8),
                (this[r] = 255 & t))
              : C(this, t, r, !0),
            r + 4
          );
        }),
        (h.prototype.writeUInt32BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 4294967295, 0),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : C(this, t, r, !1),
            r + 4
          );
        }),
        (h.prototype.writeIntLE = function (t, r, e, i) {
          if (((t = +t), (r |= 0), !i)) {
            var n = Math.pow(2, 8 * e - 1);
            O(this, t, r, e, n - 1, -n);
          }
          var o = 0,
            s = 1,
            u = 0;
          for (this[r] = 255 & t; ++o < e && (s *= 256); )
            t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1),
              (this[r + o] = (((t / s) >> 0) - u) & 255);
          return r + e;
        }),
        (h.prototype.writeIntBE = function (t, r, e, i) {
          if (((t = +t), (r |= 0), !i)) {
            var n = Math.pow(2, 8 * e - 1);
            O(this, t, r, e, n - 1, -n);
          }
          var o = e - 1,
            s = 1,
            u = 0;
          for (this[r + o] = 255 & t; --o >= 0 && (s *= 256); )
            t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1),
              (this[r + o] = (((t / s) >> 0) - u) & 255);
          return r + e;
        }),
        (h.prototype.writeInt8 = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 1, 127, -128),
            h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (h.prototype.writeInt16LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 32767, -32768),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : I(this, t, r, !0),
            r + 2
          );
        }),
        (h.prototype.writeInt16BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 2, 32767, -32768),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : I(this, t, r, !1),
            r + 2
          );
        }),
        (h.prototype.writeInt32LE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 2147483647, -2147483648),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t),
                (this[r + 1] = t >>> 8),
                (this[r + 2] = t >>> 16),
                (this[r + 3] = t >>> 24))
              : C(this, t, r, !0),
            r + 4
          );
        }),
        (h.prototype.writeInt32BE = function (t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || O(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            h.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : C(this, t, r, !1),
            r + 4
          );
        }),
        (h.prototype.writeFloatLE = function (t, r, e) {
          return j(this, t, r, !0, e);
        }),
        (h.prototype.writeFloatBE = function (t, r, e) {
          return j(this, t, r, !1, e);
        }),
        (h.prototype.writeDoubleLE = function (t, r, e) {
          return F(this, t, r, !0, e);
        }),
        (h.prototype.writeDoubleBE = function (t, r, e) {
          return F(this, t, r, !1, e);
        }),
        (h.prototype.copy = function (t, r, e, i) {
          if (
            (e || (e = 0),
            i || 0 === i || (i = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            i > 0 && i < e && (i = e),
            i === e)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (r < 0) throw new RangeError("targetStart out of bounds");
          if (e < 0 || e >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (i < 0) throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
            t.length - r < i - e && (i = t.length - r + e);
          var n,
            o = i - e;
          if (this === t && e < r && r < i)
            for (n = o - 1; n >= 0; --n) t[n + r] = this[n + e];
          else if (o < 1e3 || !h.TYPED_ARRAY_SUPPORT)
            for (n = 0; n < o; ++n) t[n + r] = this[n + e];
          else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
          return o;
        }),
        (h.prototype.fill = function (t, r, e, i) {
          if ("string" == typeof t) {
            if (
              ("string" == typeof r
                ? ((i = r), (r = 0), (e = this.length))
                : "string" == typeof e && ((i = e), (e = this.length)),
              1 === t.length)
            ) {
              var n = t.charCodeAt(0);
              n < 256 && (t = n);
            }
            if (void 0 !== i && "string" != typeof i)
              throw new TypeError("encoding must be a string");
            if ("string" == typeof i && !h.isEncoding(i))
              throw new TypeError("Unknown encoding: " + i);
          } else "number" == typeof t && (t &= 255);
          if (r < 0 || this.length < r || this.length < e)
            throw new RangeError("Out of range index");
          if (e <= r) return this;
          var o;
          if (
            ((r >>>= 0),
            (e = void 0 === e ? this.length : e >>> 0),
            t || (t = 0),
            "number" == typeof t)
          )
            for (o = r; o < e; ++o) this[o] = t;
          else {
            var s = h.isBuffer(t) ? t : D(new h(t, i).toString()),
              u = s.length;
            for (o = 0; o < e - r; ++o) this[o + r] = s[o % u];
          }
          return this;
        });
      var U = /[^+\/0-9A-Za-z-_]/g;
      function L(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function D(t, r) {
        var e;
        r = r || 1 / 0;
        for (var i = t.length, n = null, o = [], s = 0; s < i; ++s) {
          if ((e = t.charCodeAt(s)) > 55295 && e < 57344) {
            if (!n) {
              if (e > 56319) {
                (r -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (s + 1 === i) {
                (r -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              n = e;
              continue;
            }
            if (e < 56320) {
              (r -= 3) > -1 && o.push(239, 191, 189), (n = e);
              continue;
            }
            e = 65536 + (((n - 55296) << 10) | (e - 56320));
          } else n && (r -= 3) > -1 && o.push(239, 191, 189);
          if (((n = null), e < 128)) {
            if ((r -= 1) < 0) break;
            o.push(e);
          } else if (e < 2048) {
            if ((r -= 2) < 0) break;
            o.push((e >> 6) | 192, (63 & e) | 128);
          } else if (e < 65536) {
            if ((r -= 3) < 0) break;
            o.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128);
          } else {
            if (!(e < 1114112)) throw new Error("Invalid code point");
            if ((r -= 4) < 0) break;
            o.push(
              (e >> 18) | 240,
              ((e >> 12) & 63) | 128,
              ((e >> 6) & 63) | 128,
              (63 & e) | 128
            );
          }
        }
        return o;
      }
      function z(t) {
        return i.toByteArray(
          (function (t) {
            if (
              (t = (function (t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              })(t).replace(U, "")).length < 2
            )
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function q(t, r, e, i) {
        for (var n = 0; n < i && !(n + e >= r.length || n >= t.length); ++n)
          r[n + e] = t[n];
        return n;
      }
    }.call(this, e(1)));
  },
  function (t, r, e) {
    (function (t, e) {
      var i;
      !(function () {
        var n =
            ("object" == typeof self && self.self === self && self) ||
            ("object" == typeof t && t.global === t && t) ||
            this ||
            {},
          o = n._,
          s = Array.prototype,
          u = Object.prototype,
          h = "undefined" != typeof Symbol ? Symbol.prototype : null,
          a = s.push,
          l = s.slice,
          f = u.toString,
          c = u.hasOwnProperty,
          m = Array.isArray,
          p = Object.keys,
          d = Object.create,
          g = function () {},
          v = function (t) {
            return t instanceof v
              ? t
              : this instanceof v
              ? void (this._wrapped = t)
              : new v(t);
          };
        r.nodeType
          ? (n._ = v)
          : (!e.nodeType && e.exports && (r = e.exports = v), (r._ = v)),
          (v.VERSION = "1.9.1");
        var y,
          w = function (t, r, e) {
            if (void 0 === r) return t;
            switch (null == e ? 3 : e) {
              case 1:
                return function (e) {
                  return t.call(r, e);
                };
              case 3:
                return function (e, i, n) {
                  return t.call(r, e, i, n);
                };
              case 4:
                return function (e, i, n, o) {
                  return t.call(r, e, i, n, o);
                };
            }
            return function () {
              return t.apply(r, arguments);
            };
          },
          M = function (t, r, e) {
            return v.iteratee !== y
              ? v.iteratee(t, r)
              : null == t
              ? v.identity
              : v.isFunction(t)
              ? w(t, r, e)
              : v.isObject(t) && !v.isArray(t)
              ? v.matcher(t)
              : v.property(t);
          };
        v.iteratee = y = function (t, r) {
          return M(t, r, 1 / 0);
        };
        var b = function (t, r) {
            return (
              (r = null == r ? t.length - 1 : +r),
              function () {
                for (
                  var e = Math.max(arguments.length - r, 0),
                    i = Array(e),
                    n = 0;
                  n < e;
                  n++
                )
                  i[n] = arguments[n + r];
                switch (r) {
                  case 0:
                    return t.call(this, i);
                  case 1:
                    return t.call(this, arguments[0], i);
                  case 2:
                    return t.call(this, arguments[0], arguments[1], i);
                }
                var o = Array(r + 1);
                for (n = 0; n < r; n++) o[n] = arguments[n];
                return (o[r] = i), t.apply(this, o);
              }
            );
          },
          _ = function (t) {
            if (!v.isObject(t)) return {};
            if (d) return d(t);
            g.prototype = t;
            var r = new g();
            return (g.prototype = null), r;
          },
          A = function (t) {
            return function (r) {
              return null == r ? void 0 : r[t];
            };
          },
          E = function (t, r) {
            return null != t && c.call(t, r);
          },
          x = function (t, r) {
            for (var e = r.length, i = 0; i < e; i++) {
              if (null == t) return;
              t = t[r[i]];
            }
            return e ? t : void 0;
          },
          S = Math.pow(2, 53) - 1,
          B = A("length"),
          N = function (t) {
            var r = B(t);
            return "number" == typeof r && r >= 0 && r <= S;
          };
        (v.each = v.forEach = function (t, r, e) {
          var i, n;
          if (((r = w(r, e)), N(t)))
            for (i = 0, n = t.length; i < n; i++) r(t[i], i, t);
          else {
            var o = v.keys(t);
            for (i = 0, n = o.length; i < n; i++) r(t[o[i]], o[i], t);
          }
          return t;
        }),
          (v.map = v.collect = function (t, r, e) {
            r = M(r, e);
            for (
              var i = !N(t) && v.keys(t),
                n = (i || t).length,
                o = Array(n),
                s = 0;
              s < n;
              s++
            ) {
              var u = i ? i[s] : s;
              o[s] = r(t[u], u, t);
            }
            return o;
          });
        var T = function (t) {
          var r = function (r, e, i, n) {
            var o = !N(r) && v.keys(r),
              s = (o || r).length,
              u = t > 0 ? 0 : s - 1;
            for (
              n || ((i = r[o ? o[u] : u]), (u += t));
              u >= 0 && u < s;
              u += t
            ) {
              var h = o ? o[u] : u;
              i = e(i, r[h], h, r);
            }
            return i;
          };
          return function (t, e, i, n) {
            var o = arguments.length >= 3;
            return r(t, w(e, n, 4), i, o);
          };
        };
        (v.reduce = v.foldl = v.inject = T(1)),
          (v.reduceRight = v.foldr = T(-1)),
          (v.find = v.detect = function (t, r, e) {
            var i = (N(t) ? v.findIndex : v.findKey)(t, r, e);
            if (void 0 !== i && -1 !== i) return t[i];
          }),
          (v.filter = v.select = function (t, r, e) {
            var i = [];
            return (
              (r = M(r, e)),
              v.each(t, function (t, e, n) {
                r(t, e, n) && i.push(t);
              }),
              i
            );
          }),
          (v.reject = function (t, r, e) {
            return v.filter(t, v.negate(M(r)), e);
          }),
          (v.every = v.all = function (t, r, e) {
            r = M(r, e);
            for (
              var i = !N(t) && v.keys(t), n = (i || t).length, o = 0;
              o < n;
              o++
            ) {
              var s = i ? i[o] : o;
              if (!r(t[s], s, t)) return !1;
            }
            return !0;
          }),
          (v.some = v.any = function (t, r, e) {
            r = M(r, e);
            for (
              var i = !N(t) && v.keys(t), n = (i || t).length, o = 0;
              o < n;
              o++
            ) {
              var s = i ? i[o] : o;
              if (r(t[s], s, t)) return !0;
            }
            return !1;
          }),
          (v.contains = v.includes = v.include = function (t, r, e, i) {
            return (
              N(t) || (t = v.values(t)),
              ("number" != typeof e || i) && (e = 0),
              v.indexOf(t, r, e) >= 0
            );
          }),
          (v.invoke = b(function (t, r, e) {
            var i, n;
            return (
              v.isFunction(r)
                ? (n = r)
                : v.isArray(r) && ((i = r.slice(0, -1)), (r = r[r.length - 1])),
              v.map(t, function (t) {
                var o = n;
                if (!o) {
                  if ((i && i.length && (t = x(t, i)), null == t)) return;
                  o = t[r];
                }
                return null == o ? o : o.apply(t, e);
              })
            );
          })),
          (v.pluck = function (t, r) {
            return v.map(t, v.property(r));
          }),
          (v.where = function (t, r) {
            return v.filter(t, v.matcher(r));
          }),
          (v.findWhere = function (t, r) {
            return v.find(t, v.matcher(r));
          }),
          (v.max = function (t, r, e) {
            var i,
              n,
              o = -1 / 0,
              s = -1 / 0;
            if (
              null == r ||
              ("number" == typeof r && "object" != typeof t[0] && null != t)
            )
              for (
                var u = 0, h = (t = N(t) ? t : v.values(t)).length;
                u < h;
                u++
              )
                null != (i = t[u]) && i > o && (o = i);
            else
              (r = M(r, e)),
                v.each(t, function (t, e, i) {
                  ((n = r(t, e, i)) > s || (n === -1 / 0 && o === -1 / 0)) &&
                    ((o = t), (s = n));
                });
            return o;
          }),
          (v.min = function (t, r, e) {
            var i,
              n,
              o = 1 / 0,
              s = 1 / 0;
            if (
              null == r ||
              ("number" == typeof r && "object" != typeof t[0] && null != t)
            )
              for (
                var u = 0, h = (t = N(t) ? t : v.values(t)).length;
                u < h;
                u++
              )
                null != (i = t[u]) && i < o && (o = i);
            else
              (r = M(r, e)),
                v.each(t, function (t, e, i) {
                  ((n = r(t, e, i)) < s || (n === 1 / 0 && o === 1 / 0)) &&
                    ((o = t), (s = n));
                });
            return o;
          }),
          (v.shuffle = function (t) {
            return v.sample(t, 1 / 0);
          }),
          (v.sample = function (t, r, e) {
            if (null == r || e)
              return N(t) || (t = v.values(t)), t[v.random(t.length - 1)];
            var i = N(t) ? v.clone(t) : v.values(t),
              n = B(i);
            r = Math.max(Math.min(r, n), 0);
            for (var o = n - 1, s = 0; s < r; s++) {
              var u = v.random(s, o),
                h = i[s];
              (i[s] = i[u]), (i[u] = h);
            }
            return i.slice(0, r);
          }),
          (v.sortBy = function (t, r, e) {
            var i = 0;
            return (
              (r = M(r, e)),
              v.pluck(
                v
                  .map(t, function (t, e, n) {
                    return { value: t, index: i++, criteria: r(t, e, n) };
                  })
                  .sort(function (t, r) {
                    var e = t.criteria,
                      i = r.criteria;
                    if (e !== i) {
                      if (e > i || void 0 === e) return 1;
                      if (e < i || void 0 === i) return -1;
                    }
                    return t.index - r.index;
                  }),
                "value"
              )
            );
          });
        var k = function (t, r) {
          return function (e, i, n) {
            var o = r ? [[], []] : {};
            return (
              (i = M(i, n)),
              v.each(e, function (r, n) {
                var s = i(r, n, e);
                t(o, r, s);
              }),
              o
            );
          };
        };
        (v.groupBy = k(function (t, r, e) {
          E(t, e) ? t[e].push(r) : (t[e] = [r]);
        })),
          (v.indexBy = k(function (t, r, e) {
            t[e] = r;
          })),
          (v.countBy = k(function (t, r, e) {
            E(t, e) ? t[e]++ : (t[e] = 1);
          }));
        var R = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        (v.toArray = function (t) {
          return t
            ? v.isArray(t)
              ? l.call(t)
              : v.isString(t)
              ? t.match(R)
              : N(t)
              ? v.map(t, v.identity)
              : v.values(t)
            : [];
        }),
          (v.size = function (t) {
            return null == t ? 0 : N(t) ? t.length : v.keys(t).length;
          }),
          (v.partition = k(function (t, r, e) {
            t[e ? 0 : 1].push(r);
          }, !0)),
          (v.first = v.head = v.take = function (t, r, e) {
            return null == t || t.length < 1
              ? null == r
                ? void 0
                : []
              : null == r || e
              ? t[0]
              : v.initial(t, t.length - r);
          }),
          (v.initial = function (t, r, e) {
            return l.call(
              t,
              0,
              Math.max(0, t.length - (null == r || e ? 1 : r))
            );
          }),
          (v.last = function (t, r, e) {
            return null == t || t.length < 1
              ? null == r
                ? void 0
                : []
              : null == r || e
              ? t[t.length - 1]
              : v.rest(t, Math.max(0, t.length - r));
          }),
          (v.rest = v.tail = v.drop = function (t, r, e) {
            return l.call(t, null == r || e ? 1 : r);
          }),
          (v.compact = function (t) {
            return v.filter(t, Boolean);
          });
        var O = function (t, r, e, i) {
          for (var n = (i = i || []).length, o = 0, s = B(t); o < s; o++) {
            var u = t[o];
            if (N(u) && (v.isArray(u) || v.isArguments(u)))
              if (r) for (var h = 0, a = u.length; h < a; ) i[n++] = u[h++];
              else O(u, r, e, i), (n = i.length);
            else e || (i[n++] = u);
          }
          return i;
        };
        (v.flatten = function (t, r) {
          return O(t, r, !1);
        }),
          (v.without = b(function (t, r) {
            return v.difference(t, r);
          })),
          (v.uniq = v.unique = function (t, r, e, i) {
            v.isBoolean(r) || ((i = e), (e = r), (r = !1)),
              null != e && (e = M(e, i));
            for (var n = [], o = [], s = 0, u = B(t); s < u; s++) {
              var h = t[s],
                a = e ? e(h, s, t) : h;
              r && !e
                ? ((s && o === a) || n.push(h), (o = a))
                : e
                ? v.contains(o, a) || (o.push(a), n.push(h))
                : v.contains(n, h) || n.push(h);
            }
            return n;
          }),
          (v.union = b(function (t) {
            return v.uniq(O(t, !0, !0));
          })),
          (v.intersection = function (t) {
            for (
              var r = [], e = arguments.length, i = 0, n = B(t);
              i < n;
              i++
            ) {
              var o = t[i];
              if (!v.contains(r, o)) {
                var s;
                for (s = 1; s < e && v.contains(arguments[s], o); s++);
                s === e && r.push(o);
              }
            }
            return r;
          }),
          (v.difference = b(function (t, r) {
            return (
              (r = O(r, !0, !0)),
              v.filter(t, function (t) {
                return !v.contains(r, t);
              })
            );
          })),
          (v.unzip = function (t) {
            for (
              var r = (t && v.max(t, B).length) || 0, e = Array(r), i = 0;
              i < r;
              i++
            )
              e[i] = v.pluck(t, i);
            return e;
          }),
          (v.zip = b(v.unzip)),
          (v.object = function (t, r) {
            for (var e = {}, i = 0, n = B(t); i < n; i++)
              r ? (e[t[i]] = r[i]) : (e[t[i][0]] = t[i][1]);
            return e;
          });
        var I = function (t) {
          return function (r, e, i) {
            e = M(e, i);
            for (var n = B(r), o = t > 0 ? 0 : n - 1; o >= 0 && o < n; o += t)
              if (e(r[o], o, r)) return o;
            return -1;
          };
        };
        (v.findIndex = I(1)),
          (v.findLastIndex = I(-1)),
          (v.sortedIndex = function (t, r, e, i) {
            for (var n = (e = M(e, i, 1))(r), o = 0, s = B(t); o < s; ) {
              var u = Math.floor((o + s) / 2);
              e(t[u]) < n ? (o = u + 1) : (s = u);
            }
            return o;
          });
        var C = function (t, r, e) {
          return function (i, n, o) {
            var s = 0,
              u = B(i);
            if ("number" == typeof o)
              t > 0
                ? (s = o >= 0 ? o : Math.max(o + u, s))
                : (u = o >= 0 ? Math.min(o + 1, u) : o + u + 1);
            else if (e && o && u) return i[(o = e(i, n))] === n ? o : -1;
            if (n != n)
              return (o = r(l.call(i, s, u), v.isNaN)) >= 0 ? o + s : -1;
            for (o = t > 0 ? s : u - 1; o >= 0 && o < u; o += t)
              if (i[o] === n) return o;
            return -1;
          };
        };
        (v.indexOf = C(1, v.findIndex, v.sortedIndex)),
          (v.lastIndexOf = C(-1, v.findLastIndex)),
          (v.range = function (t, r, e) {
            null == r && ((r = t || 0), (t = 0)), e || (e = r < t ? -1 : 1);
            for (
              var i = Math.max(Math.ceil((r - t) / e), 0), n = Array(i), o = 0;
              o < i;
              o++, t += e
            )
              n[o] = t;
            return n;
          }),
          (v.chunk = function (t, r) {
            if (null == r || r < 1) return [];
            for (var e = [], i = 0, n = t.length; i < n; )
              e.push(l.call(t, i, (i += r)));
            return e;
          });
        var P = function (t, r, e, i, n) {
          if (!(i instanceof r)) return t.apply(e, n);
          var o = _(t.prototype),
            s = t.apply(o, n);
          return v.isObject(s) ? s : o;
        };
        (v.bind = b(function (t, r, e) {
          if (!v.isFunction(t))
            throw new TypeError("Bind must be called on a function");
          var i = b(function (n) {
            return P(t, i, r, this, e.concat(n));
          });
          return i;
        })),
          (v.partial = b(function (t, r) {
            var e = v.partial.placeholder,
              i = function () {
                for (var n = 0, o = r.length, s = Array(o), u = 0; u < o; u++)
                  s[u] = r[u] === e ? arguments[n++] : r[u];
                for (; n < arguments.length; ) s.push(arguments[n++]);
                return P(t, i, this, this, s);
              };
            return i;
          })),
          (v.partial.placeholder = v),
          (v.bindAll = b(function (t, r) {
            var e = (r = O(r, !1, !1)).length;
            if (e < 1) throw new Error("bindAll must be passed function names");
            for (; e--; ) {
              var i = r[e];
              t[i] = v.bind(t[i], t);
            }
          })),
          (v.memoize = function (t, r) {
            var e = function (i) {
              var n = e.cache,
                o = "" + (r ? r.apply(this, arguments) : i);
              return E(n, o) || (n[o] = t.apply(this, arguments)), n[o];
            };
            return (e.cache = {}), e;
          }),
          (v.delay = b(function (t, r, e) {
            return setTimeout(function () {
              return t.apply(null, e);
            }, r);
          })),
          (v.defer = v.partial(v.delay, v, 1)),
          (v.throttle = function (t, r, e) {
            var i,
              n,
              o,
              s,
              u = 0;
            e || (e = {});
            var h = function () {
                (u = !1 === e.leading ? 0 : v.now()),
                  (i = null),
                  (s = t.apply(n, o)),
                  i || (n = o = null);
              },
              a = function () {
                var a = v.now();
                u || !1 !== e.leading || (u = a);
                var l = r - (a - u);
                return (
                  (n = this),
                  (o = arguments),
                  l <= 0 || l > r
                    ? (i && (clearTimeout(i), (i = null)),
                      (u = a),
                      (s = t.apply(n, o)),
                      i || (n = o = null))
                    : i || !1 === e.trailing || (i = setTimeout(h, l)),
                  s
                );
              };
            return (
              (a.cancel = function () {
                clearTimeout(i), (u = 0), (i = n = o = null);
              }),
              a
            );
          }),
          (v.debounce = function (t, r, e) {
            var i,
              n,
              o = function (r, e) {
                (i = null), e && (n = t.apply(r, e));
              },
              s = b(function (s) {
                if ((i && clearTimeout(i), e)) {
                  var u = !i;
                  (i = setTimeout(o, r)), u && (n = t.apply(this, s));
                } else i = v.delay(o, r, this, s);
                return n;
              });
            return (
              (s.cancel = function () {
                clearTimeout(i), (i = null);
              }),
              s
            );
          }),
          (v.wrap = function (t, r) {
            return v.partial(r, t);
          }),
          (v.negate = function (t) {
            return function () {
              return !t.apply(this, arguments);
            };
          }),
          (v.compose = function () {
            var t = arguments,
              r = t.length - 1;
            return function () {
              for (var e = r, i = t[r].apply(this, arguments); e--; )
                i = t[e].call(this, i);
              return i;
            };
          }),
          (v.after = function (t, r) {
            return function () {
              if (--t < 1) return r.apply(this, arguments);
            };
          }),
          (v.before = function (t, r) {
            var e;
            return function () {
              return (
                --t > 0 && (e = r.apply(this, arguments)),
                t <= 1 && (r = null),
                e
              );
            };
          }),
          (v.once = v.partial(v.before, 2)),
          (v.restArguments = b);
        var j = !{ toString: null }.propertyIsEnumerable("toString"),
          F = [
            "valueOf",
            "isPrototypeOf",
            "toString",
            "propertyIsEnumerable",
            "hasOwnProperty",
            "toLocaleString",
          ],
          U = function (t, r) {
            var e = F.length,
              i = t.constructor,
              n = (v.isFunction(i) && i.prototype) || u,
              o = "constructor";
            for (E(t, o) && !v.contains(r, o) && r.push(o); e--; )
              (o = F[e]) in t &&
                t[o] !== n[o] &&
                !v.contains(r, o) &&
                r.push(o);
          };
        (v.keys = function (t) {
          if (!v.isObject(t)) return [];
          if (p) return p(t);
          var r = [];
          for (var e in t) E(t, e) && r.push(e);
          return j && U(t, r), r;
        }),
          (v.allKeys = function (t) {
            if (!v.isObject(t)) return [];
            var r = [];
            for (var e in t) r.push(e);
            return j && U(t, r), r;
          }),
          (v.values = function (t) {
            for (
              var r = v.keys(t), e = r.length, i = Array(e), n = 0;
              n < e;
              n++
            )
              i[n] = t[r[n]];
            return i;
          }),
          (v.mapObject = function (t, r, e) {
            r = M(r, e);
            for (var i = v.keys(t), n = i.length, o = {}, s = 0; s < n; s++) {
              var u = i[s];
              o[u] = r(t[u], u, t);
            }
            return o;
          }),
          (v.pairs = function (t) {
            for (
              var r = v.keys(t), e = r.length, i = Array(e), n = 0;
              n < e;
              n++
            )
              i[n] = [r[n], t[r[n]]];
            return i;
          }),
          (v.invert = function (t) {
            for (var r = {}, e = v.keys(t), i = 0, n = e.length; i < n; i++)
              r[t[e[i]]] = e[i];
            return r;
          }),
          (v.functions = v.methods = function (t) {
            var r = [];
            for (var e in t) v.isFunction(t[e]) && r.push(e);
            return r.sort();
          });
        var L = function (t, r) {
          return function (e) {
            var i = arguments.length;
            if ((r && (e = Object(e)), i < 2 || null == e)) return e;
            for (var n = 1; n < i; n++)
              for (
                var o = arguments[n], s = t(o), u = s.length, h = 0;
                h < u;
                h++
              ) {
                var a = s[h];
                (r && void 0 !== e[a]) || (e[a] = o[a]);
              }
            return e;
          };
        };
        (v.extend = L(v.allKeys)),
          (v.extendOwn = v.assign = L(v.keys)),
          (v.findKey = function (t, r, e) {
            r = M(r, e);
            for (var i, n = v.keys(t), o = 0, s = n.length; o < s; o++)
              if (r(t[(i = n[o])], i, t)) return i;
          });
        var D,
          z,
          q = function (t, r, e) {
            return r in e;
          };
        (v.pick = b(function (t, r) {
          var e = {},
            i = r[0];
          if (null == t) return e;
          v.isFunction(i)
            ? (r.length > 1 && (i = w(i, r[1])), (r = v.allKeys(t)))
            : ((i = q), (r = O(r, !1, !1)), (t = Object(t)));
          for (var n = 0, o = r.length; n < o; n++) {
            var s = r[n],
              u = t[s];
            i(u, s, t) && (e[s] = u);
          }
          return e;
        })),
          (v.omit = b(function (t, r) {
            var e,
              i = r[0];
            return (
              v.isFunction(i)
                ? ((i = v.negate(i)), r.length > 1 && (e = r[1]))
                : ((r = v.map(O(r, !1, !1), String)),
                  (i = function (t, e) {
                    return !v.contains(r, e);
                  })),
              v.pick(t, i, e)
            );
          })),
          (v.defaults = L(v.allKeys, !0)),
          (v.create = function (t, r) {
            var e = _(t);
            return r && v.extendOwn(e, r), e;
          }),
          (v.clone = function (t) {
            return v.isObject(t)
              ? v.isArray(t)
                ? t.slice()
                : v.extend({}, t)
              : t;
          }),
          (v.tap = function (t, r) {
            return r(t), t;
          }),
          (v.isMatch = function (t, r) {
            var e = v.keys(r),
              i = e.length;
            if (null == t) return !i;
            for (var n = Object(t), o = 0; o < i; o++) {
              var s = e[o];
              if (r[s] !== n[s] || !(s in n)) return !1;
            }
            return !0;
          }),
          (D = function (t, r, e, i) {
            if (t === r) return 0 !== t || 1 / t == 1 / r;
            if (null == t || null == r) return !1;
            if (t != t) return r != r;
            var n = typeof t;
            return (
              ("function" === n || "object" === n || "object" == typeof r) &&
              z(t, r, e, i)
            );
          }),
          (z = function (t, r, e, i) {
            t instanceof v && (t = t._wrapped),
              r instanceof v && (r = r._wrapped);
            var n = f.call(t);
            if (n !== f.call(r)) return !1;
            switch (n) {
              case "[object RegExp]":
              case "[object String]":
                return "" + t == "" + r;
              case "[object Number]":
                return +t != +t
                  ? +r != +r
                  : 0 == +t
                  ? 1 / +t == 1 / r
                  : +t == +r;
              case "[object Date]":
              case "[object Boolean]":
                return +t == +r;
              case "[object Symbol]":
                return h.valueOf.call(t) === h.valueOf.call(r);
            }
            var o = "[object Array]" === n;
            if (!o) {
              if ("object" != typeof t || "object" != typeof r) return !1;
              var s = t.constructor,
                u = r.constructor;
              if (
                s !== u &&
                !(
                  v.isFunction(s) &&
                  s instanceof s &&
                  v.isFunction(u) &&
                  u instanceof u
                ) &&
                "constructor" in t &&
                "constructor" in r
              )
                return !1;
            }
            i = i || [];
            for (var a = (e = e || []).length; a--; )
              if (e[a] === t) return i[a] === r;
            if ((e.push(t), i.push(r), o)) {
              if ((a = t.length) !== r.length) return !1;
              for (; a--; ) if (!D(t[a], r[a], e, i)) return !1;
            } else {
              var l,
                c = v.keys(t);
              if (((a = c.length), v.keys(r).length !== a)) return !1;
              for (; a--; )
                if (((l = c[a]), !E(r, l) || !D(t[l], r[l], e, i))) return !1;
            }
            return e.pop(), i.pop(), !0;
          }),
          (v.isEqual = function (t, r) {
            return D(t, r);
          }),
          (v.isEmpty = function (t) {
            return (
              null == t ||
              (N(t) && (v.isArray(t) || v.isString(t) || v.isArguments(t))
                ? 0 === t.length
                : 0 === v.keys(t).length)
            );
          }),
          (v.isElement = function (t) {
            return !(!t || 1 !== t.nodeType);
          }),
          (v.isArray =
            m ||
            function (t) {
              return "[object Array]" === f.call(t);
            }),
          (v.isObject = function (t) {
            var r = typeof t;
            return "function" === r || ("object" === r && !!t);
          }),
          v.each(
            [
              "Arguments",
              "Function",
              "String",
              "Number",
              "Date",
              "RegExp",
              "Error",
              "Symbol",
              "Map",
              "WeakMap",
              "Set",
              "WeakSet",
            ],
            function (t) {
              v["is" + t] = function (r) {
                return f.call(r) === "[object " + t + "]";
              };
            }
          ),
          v.isArguments(arguments) ||
            (v.isArguments = function (t) {
              return E(t, "callee");
            });
        var Z = n.document && n.document.childNodes;
        "object" != typeof Int8Array &&
          "function" != typeof Z &&
          (v.isFunction = function (t) {
            return "function" == typeof t || !1;
          }),
          (v.isFinite = function (t) {
            return !v.isSymbol(t) && isFinite(t) && !isNaN(parseFloat(t));
          }),
          (v.isNaN = function (t) {
            return v.isNumber(t) && isNaN(t);
          }),
          (v.isBoolean = function (t) {
            return !0 === t || !1 === t || "[object Boolean]" === f.call(t);
          }),
          (v.isNull = function (t) {
            return null === t;
          }),
          (v.isUndefined = function (t) {
            return void 0 === t;
          }),
          (v.has = function (t, r) {
            if (!v.isArray(r)) return E(t, r);
            for (var e = r.length, i = 0; i < e; i++) {
              var n = r[i];
              if (null == t || !c.call(t, n)) return !1;
              t = t[n];
            }
            return !!e;
          }),
          (v.noConflict = function () {
            return (n._ = o), this;
          }),
          (v.identity = function (t) {
            return t;
          }),
          (v.constant = function (t) {
            return function () {
              return t;
            };
          }),
          (v.noop = function () {}),
          (v.property = function (t) {
            return v.isArray(t)
              ? function (r) {
                  return x(r, t);
                }
              : A(t);
          }),
          (v.propertyOf = function (t) {
            return null == t
              ? function () {}
              : function (r) {
                  return v.isArray(r) ? x(t, r) : t[r];
                };
          }),
          (v.matcher = v.matches = function (t) {
            return (
              (t = v.extendOwn({}, t)),
              function (r) {
                return v.isMatch(r, t);
              }
            );
          }),
          (v.times = function (t, r, e) {
            var i = Array(Math.max(0, t));
            r = w(r, e, 1);
            for (var n = 0; n < t; n++) i[n] = r(n);
            return i;
          }),
          (v.random = function (t, r) {
            return (
              null == r && ((r = t), (t = 0)),
              t + Math.floor(Math.random() * (r - t + 1))
            );
          }),
          (v.now =
            Date.now ||
            function () {
              return new Date().getTime();
            });
        var H = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
          },
          $ = v.invert(H),
          V = function (t) {
            var r = function (r) {
                return t[r];
              },
              e = "(?:" + v.keys(t).join("|") + ")",
              i = RegExp(e),
              n = RegExp(e, "g");
            return function (t) {
              return (
                (t = null == t ? "" : "" + t), i.test(t) ? t.replace(n, r) : t
              );
            };
          };
        (v.escape = V(H)),
          (v.unescape = V($)),
          (v.result = function (t, r, e) {
            v.isArray(r) || (r = [r]);
            var i = r.length;
            if (!i) return v.isFunction(e) ? e.call(t) : e;
            for (var n = 0; n < i; n++) {
              var o = null == t ? void 0 : t[r[n]];
              void 0 === o && ((o = e), (n = i)),
                (t = v.isFunction(o) ? o.call(t) : o);
            }
            return t;
          });
        var W = 0;
        (v.uniqueId = function (t) {
          var r = ++W + "";
          return t ? t + r : r;
        }),
          (v.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g,
          });
        var Y = /(.)^/,
          G = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029",
          },
          J = /\\|'|\r|\n|\u2028|\u2029/g,
          K = function (t) {
            return "\\" + G[t];
          };
        (v.template = function (t, r, e) {
          !r && e && (r = e), (r = v.defaults({}, r, v.templateSettings));
          var i,
            n = RegExp(
              [
                (r.escape || Y).source,
                (r.interpolate || Y).source,
                (r.evaluate || Y).source,
              ].join("|") + "|$",
              "g"
            ),
            o = 0,
            s = "__p+='";
          t.replace(n, function (r, e, i, n, u) {
            return (
              (s += t.slice(o, u).replace(J, K)),
              (o = u + r.length),
              e
                ? (s += "'+\n((__t=(" + e + "))==null?'':_.escape(__t))+\n'")
                : i
                ? (s += "'+\n((__t=(" + i + "))==null?'':__t)+\n'")
                : n && (s += "';\n" + n + "\n__p+='"),
              r
            );
          }),
            (s += "';\n"),
            r.variable || (s = "with(obj||{}){\n" + s + "}\n"),
            (s =
              "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
              s +
              "return __p;\n");
          try {
            i = new Function(r.variable || "obj", "_", s);
          } catch (t) {
            throw ((t.source = s), t);
          }
          var u = function (t) {
              return i.call(this, t, v);
            },
            h = r.variable || "obj";
          return (u.source = "function(" + h + "){\n" + s + "}"), u;
        }),
          (v.chain = function (t) {
            var r = v(t);
            return (r._chain = !0), r;
          });
        var X = function (t, r) {
          return t._chain ? v(r).chain() : r;
        };
        (v.mixin = function (t) {
          return (
            v.each(v.functions(t), function (r) {
              var e = (v[r] = t[r]);
              v.prototype[r] = function () {
                var t = [this._wrapped];
                return a.apply(t, arguments), X(this, e.apply(v, t));
              };
            }),
            v
          );
        }),
          v.mixin(v),
          v.each(
            ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
            function (t) {
              var r = s[t];
              v.prototype[t] = function () {
                var e = this._wrapped;
                return (
                  r.apply(e, arguments),
                  ("shift" !== t && "splice" !== t) ||
                    0 !== e.length ||
                    delete e[0],
                  X(this, e)
                );
              };
            }
          ),
          v.each(["concat", "join", "slice"], function (t) {
            var r = s[t];
            v.prototype[t] = function () {
              return X(this, r.apply(this._wrapped, arguments));
            };
          }),
          (v.prototype.value = function () {
            return this._wrapped;
          }),
          (v.prototype.valueOf = v.prototype.toJSON = v.prototype.value),
          (v.prototype.toString = function () {
            return String(this._wrapped);
          }),
          void 0 ===
            (i = function () {
              return v;
            }.apply(r, [])) || (e.exports = i);
      })();
    }.call(this, e(1), e(4)(t)));
  },
  function (t, r) {
    t.exports = function (t) {
      return (
        t.webpackPolyfill ||
          ((t.deprecate = function () {}),
          (t.paths = []),
          t.children || (t.children = []),
          Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function () {
              return t.l;
            },
          }),
          Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function () {
              return t.i;
            },
          }),
          (t.webpackPolyfill = 1)),
        t
      );
    };
  },
  function (t, r) {
    var e,
      i,
      n = (t.exports = {});
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function s() {
      throw new Error("clearTimeout has not been defined");
    }
    function u(t) {
      if (e === setTimeout) return setTimeout(t, 0);
      if ((e === o || !e) && setTimeout)
        return (e = setTimeout), setTimeout(t, 0);
      try {
        return e(t, 0);
      } catch (r) {
        try {
          return e.call(null, t, 0);
        } catch (r) {
          return e.call(this, t, 0);
        }
      }
    }
    !(function () {
      try {
        e = "function" == typeof setTimeout ? setTimeout : o;
      } catch (t) {
        e = o;
      }
      try {
        i = "function" == typeof clearTimeout ? clearTimeout : s;
      } catch (t) {
        i = s;
      }
    })();
    var h,
      a = [],
      l = !1,
      f = -1;
    function c() {
      l &&
        h &&
        ((l = !1), h.length ? (a = h.concat(a)) : (f = -1), a.length && m());
    }
    function m() {
      if (!l) {
        var t = u(c);
        l = !0;
        for (var r = a.length; r; ) {
          for (h = a, a = []; ++f < r; ) h && h[f].run();
          (f = -1), (r = a.length);
        }
        (h = null),
          (l = !1),
          (function (t) {
            if (i === clearTimeout) return clearTimeout(t);
            if ((i === s || !i) && clearTimeout)
              return (i = clearTimeout), clearTimeout(t);
            try {
              i(t);
            } catch (r) {
              try {
                return i.call(null, t);
              } catch (r) {
                return i.call(this, t);
              }
            }
          })(t);
      }
    }
    function p(t, r) {
      (this.fun = t), (this.array = r);
    }
    function d() {}
    (n.nextTick = function (t) {
      var r = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
      a.push(new p(t, r)), 1 !== a.length || l || u(m);
    }),
      (p.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (n.title = "browser"),
      (n.browser = !0),
      (n.env = {}),
      (n.argv = []),
      (n.version = ""),
      (n.versions = {}),
      (n.on = d),
      (n.addListener = d),
      (n.once = d),
      (n.off = d),
      (n.removeListener = d),
      (n.removeAllListeners = d),
      (n.emit = d),
      (n.prependListener = d),
      (n.prependOnceListener = d),
      (n.listeners = function (t) {
        return [];
      }),
      (n.binding = function (t) {
        throw new Error("process.binding is not supported");
      }),
      (n.cwd = function () {
        return "/";
      }),
      (n.chdir = function (t) {
        throw new Error("process.chdir is not supported");
      }),
      (n.umask = function () {
        return 0;
      });
  },
  function (t, r) {
    function e(r) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (t.exports = e = function (t) {
              return typeof t;
            })
          : (t.exports = e = function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
        e(r)
      );
    }
    t.exports = e;
  },
  function (t, r, e) {
    var i = e(3),
      n = e(14),
      o = e(9),
      s = e(29),
      u = e(30),
      h = function (t, r) {
        var e = [];
        return (
          r.forEach(function (r) {
            if ("object" == typeof r.components) {
              if ("tuple" !== r.type.substring(0, 5))
                throw new Error(
                  "components found but type is not tuple; report on GitHub"
                );
              var n = "",
                o = r.type.indexOf("[");
              o >= 0 && (n = r.type.substring(o));
              var s = h(t, r.components);
              i.isArray(s) && t
                ? e.push("tuple(" + s.join(",") + ")" + n)
                : t
                ? e.push("(" + s + ")")
                : e.push("(" + s.join(",") + ")" + n);
            } else e.push(r.type);
          }),
          e
        );
      },
      a = function (t) {
        if (!o.isHexStrict(t))
          throw new Error("The parameter must be a valid HEX string.");
        var r = "",
          e = 0,
          i = t.length;
        for ("0x" === t.substring(0, 2) && (e = 2); e < i; e += 2) {
          var n = parseInt(t.substr(e, 2), 16);
          r += String.fromCharCode(n);
        }
        return r;
      },
      l = function (t) {
        if (!t) return "0x00";
        for (var r = "", e = 0; e < t.length; e++) {
          var i = t.charCodeAt(e).toString(16);
          r += i.length < 2 ? "0" + i : i;
        }
        return "0x" + r;
      },
      f = function (t) {
        if (((t = t ? t.toLowerCase() : "ether"), !n.unitMap[t]))
          throw new Error(
            'This unit "' +
              t +
              "\" doesn't exist, please use the one of the following units" +
              JSON.stringify(n.unitMap, null, 2)
          );
        return t;
      };
    t.exports = {
      _fireError: function (t, r, e, n, o) {
        return (
          !i.isObject(t) ||
            t instanceof Error ||
            !t.data ||
            ((i.isObject(t.data) || i.isArray(t.data)) &&
              (t.data = JSON.stringify(t.data, null, 2)),
            (t = t.message + "\n" + t.data)),
          i.isString(t) && (t = new Error(t)),
          i.isFunction(n) && n(t, o),
          i.isFunction(e) &&
            (((r && i.isFunction(r.listeners) && r.listeners("error").length) ||
              i.isFunction(n)) &&
              r.catch(function () {}),
            setTimeout(function () {
              e(t);
            }, 1)),
          r &&
            i.isFunction(r.emit) &&
            setTimeout(function () {
              r.emit("error", t, o), r.removeAllListeners();
            }, 1),
          r
        );
      },
      _jsonInterfaceMethodToString: function (t) {
        return i.isObject(t) && t.name && -1 !== t.name.indexOf("(")
          ? t.name
          : t.name + "(" + h(!1, t.inputs).join(",") + ")";
      },
      _flattenTypes: h,
      randomHex: function (t) {
        return "0x" + u(t).toString("hex");
      },
      _: i,
      BN: o.BN,
      isBN: o.isBN,
      isBigNumber: o.isBigNumber,
      isHex: o.isHex,
      isHexStrict: o.isHexStrict,
      sha3: o.sha3,
      sha3Raw: o.sha3Raw,
      keccak256: o.sha3,
      soliditySha3: s.soliditySha3,
      soliditySha3Raw: s.soliditySha3Raw,
      isAddress: o.isAddress,
      checkAddressChecksum: o.checkAddressChecksum,
      toChecksumAddress: function (t) {
        if (void 0 === t) return "";
        if (!/^(0x)?[0-9a-f]{40}$/i.test(t))
          throw new Error(
            'Given address "' + t + '" is not a valid Ethereum address.'
          );
        t = t.toLowerCase().replace(/^0x/i, "");
        for (
          var r = o.sha3(t).replace(/^0x/i, ""), e = "0x", i = 0;
          i < t.length;
          i++
        )
          parseInt(r[i], 16) > 7 ? (e += t[i].toUpperCase()) : (e += t[i]);
        return e;
      },
      toHex: o.toHex,
      toBN: o.toBN,
      bytesToHex: o.bytesToHex,
      hexToBytes: o.hexToBytes,
      hexToNumberString: o.hexToNumberString,
      hexToNumber: o.hexToNumber,
      toDecimal: o.hexToNumber,
      numberToHex: o.numberToHex,
      fromDecimal: o.numberToHex,
      hexToUtf8: o.hexToUtf8,
      hexToString: o.hexToUtf8,
      toUtf8: o.hexToUtf8,
      utf8ToHex: o.utf8ToHex,
      stringToHex: o.utf8ToHex,
      fromUtf8: o.utf8ToHex,
      hexToAscii: a,
      toAscii: a,
      asciiToHex: l,
      fromAscii: l,
      unitMap: n.unitMap,
      toWei: function (t, r) {
        if (((r = f(r)), !o.isBN(t) && !i.isString(t)))
          throw new Error(
            "Please pass numbers as strings or BN objects to avoid precision errors."
          );
        return o.isBN(t) ? n.toWei(t, r) : n.toWei(t, r).toString(10);
      },
      fromWei: function (t, r) {
        if (((r = f(r)), !o.isBN(t) && !i.isString(t)))
          throw new Error(
            "Please pass numbers as strings or BN objects to avoid precision errors."
          );
        return o.isBN(t) ? n.fromWei(t, r) : n.fromWei(t, r).toString(10);
      },
      padLeft: o.leftPad,
      leftPad: o.leftPad,
      padRight: o.rightPad,
      rightPad: o.rightPad,
      toTwosComplement: o.toTwosComplement,
      isBloom: o.isBloom,
      isUserEthereumAddressInBloom: o.isUserEthereumAddressInBloom,
      isContractAddressInBloom: o.isContractAddressInBloom,
      isTopic: o.isTopic,
      isTopicInBloom: o.isTopicInBloom,
      isInBloom: o.isInBloom,
    };
  },
  function (t, r, e) {
    var i = e(19),
      n = e(20);
    t.exports = function (t) {
      if ("string" == typeof t || "number" == typeof t) {
        var r = new i(1),
          e = String(t).toLowerCase().trim(),
          o = "0x" === e.substr(0, 2) || "-0x" === e.substr(0, 3),
          s = n(e);
        if (
          ("-" === s.substr(0, 1) && ((s = n(s.slice(1))), (r = new i(-1, 10))),
          (!(s = "" === s ? "0" : s).match(/^-?[0-9]+$/) &&
            s.match(/^[0-9A-Fa-f]+$/)) ||
            s.match(/^[a-fA-F]+$/) ||
            (!0 === o && s.match(/^[0-9A-Fa-f]+$/)))
        )
          return new i(s, 16).mul(r);
        if ((s.match(/^-?[0-9]+$/) || "" === s) && !1 === o)
          return new i(s, 10).mul(r);
      } else if (
        "object" == typeof t &&
        t.toString &&
        !t.pop &&
        !t.push &&
        t.toString(10).match(/^-?[0-9]+$/) &&
        (t.mul || t.dividedToIntegerBy)
      )
        return new i(t.toString(10), 10);
      throw new Error(
        "[number-to-bn] while converting number " +
          JSON.stringify(t) +
          " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported."
      );
    };
  },
  function (t, r, e) {
    (function (r) {
      var i = e(3),
        n = e(0),
        o = e(8),
        s = e(23),
        u = e(24),
        h = e(25),
        a = function (t) {
          return n.isBN(t);
        },
        l = function (t) {
          return t && t.constructor && "BigNumber" === t.constructor.name;
        },
        f = function (t) {
          try {
            return o.apply(null, arguments);
          } catch (r) {
            throw new Error(r + ' Given value: "' + t + '"');
          }
        },
        c = function (t) {
          return (
            !!/^(0x)?[0-9a-f]{40}$/i.test(t) &&
            (!(
              !/^(0x|0X)?[0-9a-f]{40}$/.test(t) &&
              !/^(0x|0X)?[0-9A-F]{40}$/.test(t)
            ) ||
              m(t))
          );
        },
        m = function (t) {
          t = t.replace(/^0x/i, "");
          for (
            var r = w(t.toLowerCase()).replace(/^0x/i, ""), e = 0;
            e < 40;
            e++
          )
            if (
              (parseInt(r[e], 16) > 7 && t[e].toUpperCase() !== t[e]) ||
              (parseInt(r[e], 16) <= 7 && t[e].toLowerCase() !== t[e])
            )
              return !1;
          return !0;
        },
        p = function (t) {
          var r = "";
          t = (t = (t = (t = (t = s.encode(t)).replace(/^(?:\u0000)*/, ""))
            .split("")
            .reverse()
            .join("")).replace(/^(?:\u0000)*/, ""))
            .split("")
            .reverse()
            .join("");
          for (var e = 0; e < t.length; e++) {
            var i = t.charCodeAt(e).toString(16);
            r += i.length < 2 ? "0" + i : i;
          }
          return "0x" + r;
        },
        d = function (t) {
          if (i.isNull(t) || i.isUndefined(t)) return t;
          if (!isFinite(t) && !v(t))
            throw new Error('Given input "' + t + '" is not a number.');
          var r = f(t),
            e = r.toString(16);
          return r.lt(new n(0)) ? "-0x" + e.substr(1) : "0x" + e;
        },
        g = function (t) {
          if (((t = t.toString(16)), !v(t)))
            throw new Error(
              'Given value "' + t + '" is not a valid hex string.'
            );
          t = t.replace(/^0x/i, "");
          for (var r = [], e = 0; e < t.length; e += 2)
            r.push(parseInt(t.substr(e, 2), 16));
          return r;
        },
        v = function (t) {
          return (
            (i.isString(t) || i.isNumber(t)) && /^(-)?0x[0-9a-f]*$/i.test(t)
          );
        },
        y =
          "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
        w = function (t) {
          a(t) && (t = t.toString()),
            v(t) && /^0x/i.test(t.toString()) && (t = g(t));
          var r = u.keccak256(t);
          return r === y ? null : r;
        };
      w._Hash = u;
      t.exports = {
        BN: n,
        isBN: a,
        isBigNumber: l,
        toBN: f,
        isAddress: c,
        isBloom: function (t) {
          return h.isBloom(t);
        },
        isUserEthereumAddressInBloom: function (t, r) {
          return h.isUserEthereumAddressInBloom(t, r);
        },
        isContractAddressInBloom: function (t, r) {
          return h.isContractAddressInBloom(t, r);
        },
        isTopic: function (t) {
          return h.isTopic(t);
        },
        isTopicInBloom: function (t, r) {
          return h.isTopicInBloom(t, r);
        },
        isInBloom: function (t, r) {
          return h.isInBloom(t, r);
        },
        checkAddressChecksum: m,
        utf8ToHex: p,
        hexToUtf8: function (t) {
          if (!v(t))
            throw new Error(
              'The parameter "' + t + '" must be a valid HEX string.'
            );
          for (
            var r = "",
              e = 0,
              i = (t = (t = (t = (t = (t = t.replace(/^0x/i, "")).replace(
                /^(?:00)*/,
                ""
              ))
                .split("")
                .reverse()
                .join("")).replace(/^(?:00)*/, ""))
                .split("")
                .reverse()
                .join("")).length,
              n = 0;
            n < i;
            n += 2
          )
            (e = parseInt(t.substr(n, 2), 16)), (r += String.fromCharCode(e));
          return s.decode(r);
        },
        hexToNumber: function (t) {
          if (!t) return t;
          if (i.isString(t) && !v(t))
            throw new Error(
              'Given value "' + t + '" is not a valid hex string.'
            );
          return f(t).toNumber();
        },
        hexToNumberString: function (t) {
          if (!t) return t;
          if (i.isString(t) && !v(t))
            throw new Error(
              'Given value "' + t + '" is not a valid hex string.'
            );
          return f(t).toString(10);
        },
        numberToHex: d,
        toHex: function (t, e) {
          if (c(t))
            return e ? "address" : "0x" + t.toLowerCase().replace(/^0x/i, "");
          if (i.isBoolean(t)) return e ? "bool" : t ? "0x01" : "0x00";
          if (r.isBuffer(t)) return "0x" + t.toString("hex");
          if (i.isObject(t) && !l(t) && !a(t))
            return e ? "string" : p(JSON.stringify(t));
          if (i.isString(t)) {
            if (0 === t.indexOf("-0x") || 0 === t.indexOf("-0X"))
              return e ? "int256" : d(t);
            if (0 === t.indexOf("0x") || 0 === t.indexOf("0X"))
              return e ? "bytes" : t;
            if (!isFinite(t)) return e ? "string" : p(t);
          }
          return e ? (t < 0 ? "int256" : "uint256") : d(t);
        },
        hexToBytes: g,
        bytesToHex: function (t) {
          for (var r = [], e = 0; e < t.length; e++)
            r.push((t[e] >>> 4).toString(16)), r.push((15 & t[e]).toString(16));
          return "0x" + r.join("");
        },
        isHex: function (t) {
          return (
            (i.isString(t) || i.isNumber(t)) && /^(-0x|0x)?[0-9a-f]*$/i.test(t)
          );
        },
        isHexStrict: v,
        leftPad: function (t, r, e) {
          var i = /^0x/i.test(t) || "number" == typeof t,
            n =
              r - (t = t.toString(16).replace(/^0x/i, "")).length + 1 >= 0
                ? r - t.length + 1
                : 0;
          return (i ? "0x" : "") + new Array(n).join(e || "0") + t;
        },
        rightPad: function (t, r, e) {
          var i = /^0x/i.test(t) || "number" == typeof t,
            n =
              r - (t = t.toString(16).replace(/^0x/i, "")).length + 1 >= 0
                ? r - t.length + 1
                : 0;
          return (i ? "0x" : "") + t + new Array(n).join(e || "0");
        },
        toTwosComplement: function (t) {
          return "0x" + f(t).toTwos(256).toString(16, 64);
        },
        sha3: w,
        sha3Raw: function (t) {
          return null === (t = w(t)) ? y : t;
        },
      };
    }.call(this, e(2).Buffer));
  },
  function (t, r, e) {
    "use strict";
    e.r(r),
      e.d(r, "ConstructorFragment", function () {
        return Q;
      }),
      e.d(r, "EventFragment", function () {
        return G;
      }),
      e.d(r, "Fragment", function () {
        return Y;
      }),
      e.d(r, "FunctionFragment", function () {
        return tt;
      }),
      e.d(r, "ParamType", function () {
        return V;
      }),
      e.d(r, "FormatTypes", function () {
        return H;
      }),
      e.d(r, "AbiCoder", function () {
        return Xt;
      }),
      e.d(r, "defaultAbiCoder", function () {
        return Qt;
      }),
      e.d(r, "Interface", function () {
        return ur;
      }),
      e.d(r, "Indexed", function () {
        return nr;
      }),
      e.d(r, "checkResultErrors", function () {
        return st;
      }),
      e.d(r, "LogDescription", function () {
        return er;
      }),
      e.d(r, "TransactionDescription", function () {
        return ir;
      });
    var i = e(0);
    let n = !1,
      o = !1;
    const s = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
    let u = s.default,
      h = null;
    const a = (function () {
      try {
        const t = [];
        if (
          (["NFD", "NFC", "NFKD", "NFKC"].forEach((r) => {
            try {
              if ("test" !== "test".normalize(r))
                throw new Error("bad normalize");
            } catch (e) {
              t.push(r);
            }
          }),
          t.length)
        )
          throw new Error("missing " + t.join(", "));
        if (
          String.fromCharCode(233).normalize("NFD") !==
          String.fromCharCode(101, 769)
        )
          throw new Error("broken implementation");
      } catch (t) {
        return t.message;
      }
      return null;
    })();
    var l, f;
    !(function (t) {
      (t.DEBUG = "DEBUG"),
        (t.INFO = "INFO"),
        (t.WARNING = "WARNING"),
        (t.ERROR = "ERROR"),
        (t.OFF = "OFF");
    })(l || (l = {})),
      (function (t) {
        (t.UNKNOWN_ERROR = "UNKNOWN_ERROR"),
          (t.NOT_IMPLEMENTED = "NOT_IMPLEMENTED"),
          (t.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION"),
          (t.NETWORK_ERROR = "NETWORK_ERROR"),
          (t.SERVER_ERROR = "SERVER_ERROR"),
          (t.TIMEOUT = "TIMEOUT"),
          (t.BUFFER_OVERRUN = "BUFFER_OVERRUN"),
          (t.NUMERIC_FAULT = "NUMERIC_FAULT"),
          (t.MISSING_NEW = "MISSING_NEW"),
          (t.INVALID_ARGUMENT = "INVALID_ARGUMENT"),
          (t.MISSING_ARGUMENT = "MISSING_ARGUMENT"),
          (t.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT"),
          (t.CALL_EXCEPTION = "CALL_EXCEPTION"),
          (t.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS"),
          (t.NONCE_EXPIRED = "NONCE_EXPIRED"),
          (t.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED"),
          (t.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT");
      })(f || (f = {}));
    class c {
      constructor(t) {
        Object.defineProperty(this, "version", {
          enumerable: !0,
          value: t,
          writable: !1,
        });
      }
      _log(t, r) {
        const e = t.toLowerCase();
        null == s[e] &&
          this.throwArgumentError("invalid log level name", "logLevel", t),
          u > s[e] || console.log.apply(console, r);
      }
      debug(...t) {
        this._log(c.levels.DEBUG, t);
      }
      info(...t) {
        this._log(c.levels.INFO, t);
      }
      warn(...t) {
        this._log(c.levels.WARNING, t);
      }
      makeError(t, r, e) {
        if (o) return this.makeError("censored error", r, {});
        r || (r = c.errors.UNKNOWN_ERROR), e || (e = {});
        const i = [];
        Object.keys(e).forEach((t) => {
          try {
            i.push(t + "=" + JSON.stringify(e[t]));
          } catch (r) {
            i.push(t + "=" + JSON.stringify(e[t].toString()));
          }
        }),
          i.push("code=" + r),
          i.push("version=" + this.version);
        const n = t;
        i.length && (t += " (" + i.join(", ") + ")");
        const s = new Error(t);
        return (
          (s.reason = n),
          (s.code = r),
          Object.keys(e).forEach(function (t) {
            s[t] = e[t];
          }),
          s
        );
      }
      throwError(t, r, e) {
        throw this.makeError(t, r, e);
      }
      throwArgumentError(t, r, e) {
        return this.throwError(t, c.errors.INVALID_ARGUMENT, {
          argument: r,
          value: e,
        });
      }
      assert(t, r, e, i) {
        t || this.throwError(r, e, i);
      }
      assertArgument(t, r, e, i) {
        t || this.throwArgumentError(r, e, i);
      }
      checkNormalize(t) {
        null == t && (t = "platform missing String.prototype.normalize"),
          a &&
            this.throwError(
              "platform missing String.prototype.normalize",
              c.errors.UNSUPPORTED_OPERATION,
              { operation: "String.prototype.normalize", form: a }
            );
      }
      checkSafeUint53(t, r) {
        "number" == typeof t &&
          (null == r && (r = "value not safe"),
          (t < 0 || t >= 9007199254740991) &&
            this.throwError(r, c.errors.NUMERIC_FAULT, {
              operation: "checkSafeInteger",
              fault: "out-of-safe-range",
              value: t,
            }),
          t % 1 &&
            this.throwError(r, c.errors.NUMERIC_FAULT, {
              operation: "checkSafeInteger",
              fault: "non-integer",
              value: t,
            }));
      }
      checkArgumentCount(t, r, e) {
        (e = e ? ": " + e : ""),
          t < r &&
            this.throwError("missing argument" + e, c.errors.MISSING_ARGUMENT, {
              count: t,
              expectedCount: r,
            }),
          t > r &&
            this.throwError(
              "too many arguments" + e,
              c.errors.UNEXPECTED_ARGUMENT,
              { count: t, expectedCount: r }
            );
      }
      checkNew(t, r) {
        (t !== Object && null != t) ||
          this.throwError("missing new", c.errors.MISSING_NEW, {
            name: r.name,
          });
      }
      checkAbstract(t, r) {
        t === r
          ? this.throwError(
              "cannot instantiate abstract class " +
                JSON.stringify(r.name) +
                " directly; use a sub-class",
              c.errors.UNSUPPORTED_OPERATION,
              { name: t.name, operation: "new" }
            )
          : (t !== Object && null != t) ||
            this.throwError("missing new", c.errors.MISSING_NEW, {
              name: r.name,
            });
      }
      static globalLogger() {
        return h || (h = new c("logger/5.0.5")), h;
      }
      static setCensorship(t, r) {
        if (
          (!t &&
            r &&
            this.globalLogger().throwError(
              "cannot permanently disable censorship",
              c.errors.UNSUPPORTED_OPERATION,
              { operation: "setCensorship" }
            ),
          n)
        ) {
          if (!t) return;
          this.globalLogger().throwError(
            "error censorship permanent",
            c.errors.UNSUPPORTED_OPERATION,
            { operation: "setCensorship" }
          );
        }
        (o = !!t), (n = !!r);
      }
      static setLogLevel(t) {
        const r = s[t.toLowerCase()];
        null != r ? (u = r) : c.globalLogger().warn("invalid log level - " + t);
      }
    }
    (c.errors = f), (c.levels = l);
    const m = new c("bytes/5.0.4");
    function p(t) {
      return !!t.toHexString;
    }
    function d(t) {
      return (
        t.slice ||
          (t.slice = function () {
            const r = Array.prototype.slice.call(arguments);
            return d(new Uint8Array(Array.prototype.slice.apply(t, r)));
          }),
        t
      );
    }
    function g(t) {
      if (null == t) return !1;
      if (t.constructor === Uint8Array) return !0;
      if ("string" == typeof t) return !1;
      if (null == t.length) return !1;
      for (let r = 0; r < t.length; r++) {
        const e = t[r];
        if (e < 0 || e >= 256 || e % 1) return !1;
      }
      return !0;
    }
    function v(t, r) {
      if ((r || (r = {}), "number" == typeof t)) {
        m.checkSafeUint53(t, "invalid arrayify value");
        const r = [];
        for (; t; ) r.unshift(255 & t), (t = parseInt(String(t / 256)));
        return 0 === r.length && r.push(0), d(new Uint8Array(r));
      }
      if (
        (r.allowMissingPrefix &&
          "string" == typeof t &&
          "0x" !== t.substring(0, 2) &&
          (t = "0x" + t),
        p(t) && (t = t.toHexString()),
        w(t))
      ) {
        let e = t.substring(2);
        e.length % 2 &&
          ("left" === r.hexPad
            ? (e = "0x0" + e.substring(2))
            : "right" === r.hexPad
            ? (e += "0")
            : m.throwArgumentError("hex data is odd-length", "value", t));
        const i = [];
        for (let t = 0; t < e.length; t += 2)
          i.push(parseInt(e.substring(t, t + 2), 16));
        return d(new Uint8Array(i));
      }
      return g(t)
        ? d(new Uint8Array(t))
        : m.throwArgumentError("invalid arrayify value", "value", t);
    }
    function y(t) {
      const r = t.map((t) => v(t)),
        e = r.reduce((t, r) => t + r.length, 0),
        i = new Uint8Array(e);
      return r.reduce((t, r) => (i.set(r, t), t + r.length), 0), d(i);
    }
    function w(t, r) {
      return (
        !("string" != typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) &&
        (!r || t.length === 2 + 2 * r)
      );
    }
    function M(t, r) {
      if ((r || (r = {}), "number" == typeof t)) {
        m.checkSafeUint53(t, "invalid hexlify value");
        let r = "";
        for (; t; )
          (r = "0123456789abcdef"[15 & t] + r), (t = Math.floor(t / 16));
        return r.length ? (r.length % 2 && (r = "0" + r), "0x" + r) : "0x00";
      }
      if (
        (r.allowMissingPrefix &&
          "string" == typeof t &&
          "0x" !== t.substring(0, 2) &&
          (t = "0x" + t),
        p(t))
      )
        return t.toHexString();
      if (w(t))
        return (
          t.length % 2 &&
            ("left" === r.hexPad
              ? (t = "0x0" + t.substring(2))
              : "right" === r.hexPad
              ? (t += "0")
              : m.throwArgumentError("hex data is odd-length", "value", t)),
          t.toLowerCase()
        );
      if (g(t)) {
        let r = "0x";
        for (let e = 0; e < t.length; e++) {
          let i = t[e];
          r += "0123456789abcdef"[(240 & i) >> 4] + "0123456789abcdef"[15 & i];
        }
        return r;
      }
      return m.throwArgumentError("invalid hexlify value", "value", t);
    }
    function b(t, r, e) {
      return (
        "string" != typeof t
          ? (t = M(t))
          : (!w(t) || t.length % 2) &&
            m.throwArgumentError("invalid hexData", "value", t),
        (r = 2 + 2 * r),
        null != e ? "0x" + t.substring(r, 2 + 2 * e) : "0x" + t.substring(r)
      );
    }
    function _(t, r) {
      for (
        "string" != typeof t
          ? (t = M(t))
          : w(t) || m.throwArgumentError("invalid hex string", "value", t),
          t.length > 2 * r + 2 &&
            m.throwArgumentError("value out of range", "value", arguments[1]);
        t.length < 2 * r + 2;

      )
        t = "0x0" + t.substring(2);
      return t;
    }
    const A = new c("bignumber/5.0.6"),
      E = {};
    class x {
      constructor(t, r) {
        A.checkNew(new.target, x),
          t !== E &&
            A.throwError(
              "cannot call constructor directly; use BigNumber.from",
              c.errors.UNSUPPORTED_OPERATION,
              { operation: "new (BigNumber)" }
            ),
          (this._hex = r),
          (this._isBigNumber = !0),
          Object.freeze(this);
      }
      fromTwos(t) {
        return B(N(this).fromTwos(t));
      }
      toTwos(t) {
        return B(N(this).toTwos(t));
      }
      abs() {
        return "-" === this._hex[0] ? x.from(this._hex.substring(1)) : this;
      }
      add(t) {
        return B(N(this).add(N(t)));
      }
      sub(t) {
        return B(N(this).sub(N(t)));
      }
      div(t) {
        return (
          x.from(t).isZero() && T("division by zero", "div"),
          B(N(this).div(N(t)))
        );
      }
      mul(t) {
        return B(N(this).mul(N(t)));
      }
      mod(t) {
        const r = N(t);
        return (
          r.isNeg() && T("cannot modulo negative values", "mod"),
          B(N(this).umod(r))
        );
      }
      pow(t) {
        const r = N(t);
        return (
          r.isNeg() && T("cannot raise to negative values", "pow"),
          B(N(this).pow(r))
        );
      }
      and(t) {
        const r = N(t);
        return (
          (this.isNegative() || r.isNeg()) &&
            T("cannot 'and' negative values", "and"),
          B(N(this).and(r))
        );
      }
      or(t) {
        const r = N(t);
        return (
          (this.isNegative() || r.isNeg()) &&
            T("cannot 'or' negative values", "or"),
          B(N(this).or(r))
        );
      }
      xor(t) {
        const r = N(t);
        return (
          (this.isNegative() || r.isNeg()) &&
            T("cannot 'xor' negative values", "xor"),
          B(N(this).xor(r))
        );
      }
      mask(t) {
        return (
          (this.isNegative() || t < 0) &&
            T("cannot mask negative values", "mask"),
          B(N(this).maskn(t))
        );
      }
      shl(t) {
        return (
          (this.isNegative() || t < 0) &&
            T("cannot shift negative values", "shl"),
          B(N(this).shln(t))
        );
      }
      shr(t) {
        return (
          (this.isNegative() || t < 0) &&
            T("cannot shift negative values", "shr"),
          B(N(this).shrn(t))
        );
      }
      eq(t) {
        return N(this).eq(N(t));
      }
      lt(t) {
        return N(this).lt(N(t));
      }
      lte(t) {
        return N(this).lte(N(t));
      }
      gt(t) {
        return N(this).gt(N(t));
      }
      gte(t) {
        return N(this).gte(N(t));
      }
      isNegative() {
        return "-" === this._hex[0];
      }
      isZero() {
        return N(this).isZero();
      }
      toNumber() {
        try {
          return N(this).toNumber();
        } catch (t) {
          T("overflow", "toNumber", this.toString());
        }
        return null;
      }
      toString() {
        return (
          0 !== arguments.length &&
            A.throwError(
              "bigNumber.toString does not accept parameters",
              c.errors.UNEXPECTED_ARGUMENT,
              {}
            ),
          N(this).toString(10)
        );
      }
      toHexString() {
        return this._hex;
      }
      toJSON(t) {
        return { type: "BigNumber", hex: this.toHexString() };
      }
      static from(t) {
        if (t instanceof x) return t;
        if ("string" == typeof t)
          return t.match(/^-?0x[0-9a-f]+$/i)
            ? new x(E, S(t))
            : t.match(/^-?[0-9]+$/)
            ? new x(E, S(new i.BN(t)))
            : A.throwArgumentError("invalid BigNumber string", "value", t);
        if ("number" == typeof t)
          return (
            t % 1 && T("underflow", "BigNumber.from", t),
            (t >= 9007199254740991 || t <= -9007199254740991) &&
              T("overflow", "BigNumber.from", t),
            x.from(String(t))
          );
        const r = t;
        if ("bigint" == typeof r) return x.from(r.toString());
        if (g(r)) return x.from(M(r));
        if (r)
          if (r.toHexString) {
            const t = r.toHexString();
            if ("string" == typeof t) return x.from(t);
          } else {
            let t = r._hex;
            if (
              (null == t && "BigNumber" === r.type && (t = r.hex),
              "string" == typeof t &&
                (w(t) || ("-" === t[0] && w(t.substring(1)))))
            )
              return x.from(t);
          }
        return A.throwArgumentError("invalid BigNumber value", "value", t);
      }
      static isBigNumber(t) {
        return !(!t || !t._isBigNumber);
      }
    }
    function S(t) {
      if ("string" != typeof t) return S(t.toString(16));
      if ("-" === t[0])
        return (
          "-" === (t = t.substring(1))[0] &&
            A.throwArgumentError("invalid hex", "value", t),
          "0x00" === (t = S(t)) ? t : "-" + t
        );
      if (("0x" !== t.substring(0, 2) && (t = "0x" + t), "0x" === t))
        return "0x00";
      for (
        t.length % 2 && (t = "0x0" + t.substring(2));
        t.length > 4 && "0x00" === t.substring(0, 4);

      )
        t = "0x" + t.substring(4);
      return t;
    }
    function B(t) {
      return x.from(S(t));
    }
    function N(t) {
      const r = x.from(t).toHexString();
      return "-" === r[0]
        ? new i.BN("-" + r.substring(3), 16)
        : new i.BN(r.substring(2), 16);
    }
    function T(t, r, e) {
      const i = { fault: t, operation: r };
      return (
        null != e && (i.value = e), A.throwError(t, c.errors.NUMERIC_FAULT, i)
      );
    }
    new c("bignumber/5.0.6"), x.from(0), x.from(-1);
    let k = "0";
    for (; k.length < 256; ) k += k;
    const R = new c("properties/5.0.3");
    function O(t, r, e) {
      Object.defineProperty(t, r, { enumerable: !0, value: e, writable: !1 });
    }
    function I(t, r) {
      for (let e = 0; e < 32; e++) {
        if (t[r]) return t[r];
        if (!t.prototype || "object" != typeof t.prototype) break;
        t = Object.getPrototypeOf(t.prototype).constructor;
      }
      return null;
    }
    const C = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
    function P(t) {
      if (
        (function t(r) {
          if (null == r || C[typeof r]) return !0;
          if (Array.isArray(r) || "object" == typeof r) {
            if (!Object.isFrozen(r)) return !1;
            const e = Object.keys(r);
            for (let i = 0; i < e.length; i++) if (!t(r[e[i]])) return !1;
            return !0;
          }
          return R.throwArgumentError(
            "Cannot deepCopy " + typeof r,
            "object",
            r
          );
        })(t)
      )
        return t;
      if (Array.isArray(t)) return Object.freeze(t.map((t) => j(t)));
      if ("object" == typeof t) {
        const r = {};
        for (const e in t) {
          const i = t[e];
          void 0 !== i && O(r, e, j(i));
        }
        return r;
      }
      return R.throwArgumentError("Cannot deepCopy " + typeof t, "object", t);
    }
    function j(t) {
      return P(t);
    }
    class F {
      constructor(t) {
        for (const r in t) this[r] = j(t[r]);
      }
    }
    const U = new c("abi/5.0.0-beta.153"),
      L = {};
    let D = { calldata: !0, memory: !0, storage: !0 },
      z = { calldata: !0, memory: !0 };
    function q(t, r) {
      if ("bytes" === t || "string" === t) {
        if (D[r]) return !0;
      } else if ("address" === t) {
        if ("payable" === r) return !0;
      } else if ((t.indexOf("[") >= 0 || "tuple" === t) && z[r]) return !0;
      return (
        (D[r] || "payable" === r) &&
          U.throwArgumentError("invalid modifier", "name", r),
        !1
      );
    }
    function Z(t, r) {
      for (let e in r) O(t, e, r[e]);
    }
    const H = Object.freeze({
        sighash: "sighash",
        minimal: "minimal",
        full: "full",
        json: "json",
      }),
      $ = new RegExp(/^(.*)\[([0-9]*)\]$/);
    class V {
      constructor(t, r) {
        t !== L &&
          U.throwError("use fromString", c.errors.UNSUPPORTED_OPERATION, {
            operation: "new ParamType()",
          }),
          Z(this, r);
        let e = this.type.match($);
        Z(
          this,
          e
            ? {
                arrayLength: parseInt(e[2] || "-1"),
                arrayChildren: V.fromObject({
                  type: e[1],
                  components: this.components,
                }),
                baseType: "array",
              }
            : {
                arrayLength: null,
                arrayChildren: null,
                baseType: null != this.components ? "tuple" : this.type,
              }
        ),
          (this._isParamType = !0),
          Object.freeze(this);
      }
      format(t) {
        if (
          (t || (t = H.sighash),
          H[t] || U.throwArgumentError("invalid format type", "format", t),
          t === H.json)
        ) {
          let r = {
            type: "tuple" === this.baseType ? "tuple" : this.type,
            name: this.name || void 0,
          };
          return (
            "boolean" == typeof this.indexed && (r.indexed = this.indexed),
            this.components &&
              (r.components = this.components.map((r) =>
                JSON.parse(r.format(t))
              )),
            JSON.stringify(r)
          );
        }
        let r = "";
        return (
          "array" === this.baseType
            ? ((r += this.arrayChildren.format(t)),
              (r +=
                "[" +
                (this.arrayLength < 0 ? "" : String(this.arrayLength)) +
                "]"))
            : "tuple" === this.baseType
            ? (t !== H.sighash && (r += this.type),
              (r +=
                "(" +
                this.components
                  .map((r) => r.format(t))
                  .join(t === H.full ? ", " : ",") +
                ")"))
            : (r += this.type),
          t !== H.sighash &&
            (!0 === this.indexed && (r += " indexed"),
            t === H.full && this.name && (r += " " + this.name)),
          r
        );
      }
      static from(t, r) {
        return "string" == typeof t ? V.fromString(t, r) : V.fromObject(t);
      }
      static fromObject(t) {
        return V.isParamType(t)
          ? t
          : new V(L, {
              name: t.name || null,
              type: rt(t.type),
              indexed: null == t.indexed ? null : !!t.indexed,
              components: t.components ? t.components.map(V.fromObject) : null,
            });
      }
      static fromString(t, r) {
        return (function (t) {
          return V.fromObject({
            name: t.name,
            type: t.type,
            indexed: t.indexed,
            components: t.components,
          });
        })(
          (function (t, r) {
            let e = t;
            function i(r) {
              U.throwArgumentError(
                "unexpected character at position " + r,
                "param",
                t
              );
            }
            function n(t) {
              let e = {
                type: "",
                name: "",
                parent: t,
                state: { allowType: !0 },
              };
              return r && (e.indexed = !1), e;
            }
            t = t.replace(/\s/g, " ");
            let o = { type: "", name: "", state: { allowType: !0 } },
              s = o;
            for (let e = 0; e < t.length; e++) {
              let o = t[e];
              switch (o) {
                case "(":
                  s.state.allowType && "" === s.type
                    ? (s.type = "tuple")
                    : s.state.allowParams || i(e),
                    (s.state.allowType = !1),
                    (s.type = rt(s.type)),
                    (s.components = [n(s)]),
                    (s = s.components[0]);
                  break;
                case ")":
                  delete s.state,
                    "indexed" === s.name &&
                      (r || i(e), (s.indexed = !0), (s.name = "")),
                    q(s.type, s.name) && (s.name = ""),
                    (s.type = rt(s.type));
                  let t = s;
                  (s = s.parent),
                    s || i(e),
                    delete t.parent,
                    (s.state.allowParams = !1),
                    (s.state.allowName = !0),
                    (s.state.allowArray = !0);
                  break;
                case ",":
                  delete s.state,
                    "indexed" === s.name &&
                      (r || i(e), (s.indexed = !0), (s.name = "")),
                    q(s.type, s.name) && (s.name = ""),
                    (s.type = rt(s.type));
                  let u = n(s.parent);
                  s.parent.components.push(u), delete s.parent, (s = u);
                  break;
                case " ":
                  s.state.allowType &&
                    "" !== s.type &&
                    ((s.type = rt(s.type)),
                    delete s.state.allowType,
                    (s.state.allowName = !0),
                    (s.state.allowParams = !0)),
                    s.state.allowName &&
                      "" !== s.name &&
                      ("indexed" === s.name
                        ? (r || i(e),
                          s.indexed && i(e),
                          (s.indexed = !0),
                          (s.name = ""))
                        : q(s.type, s.name)
                        ? (s.name = "")
                        : (s.state.allowName = !1));
                  break;
                case "[":
                  s.state.allowArray || i(e),
                    (s.type += o),
                    (s.state.allowArray = !1),
                    (s.state.allowName = !1),
                    (s.state.readArray = !0);
                  break;
                case "]":
                  s.state.readArray || i(e),
                    (s.type += o),
                    (s.state.readArray = !1),
                    (s.state.allowArray = !0),
                    (s.state.allowName = !0);
                  break;
                default:
                  s.state.allowType
                    ? ((s.type += o),
                      (s.state.allowParams = !0),
                      (s.state.allowArray = !0))
                    : s.state.allowName
                    ? ((s.name += o), delete s.state.allowArray)
                    : s.state.readArray
                    ? (s.type += o)
                    : i(e);
              }
            }
            return (
              s.parent && U.throwArgumentError("unexpected eof", "param", t),
              delete o.state,
              "indexed" === s.name
                ? (r || i(e.length - 7),
                  s.indexed && i(e.length - 7),
                  (s.indexed = !0),
                  (s.name = ""))
                : q(s.type, s.name) && (s.name = ""),
              (o.type = rt(o.type)),
              o
            );
          })(t, !!r)
        );
      }
      static isParamType(t) {
        return !(null == t || !t._isParamType);
      }
    }
    function W(t, r) {
      return (function (t) {
        t = t.trim();
        let r = [],
          e = "",
          i = 0;
        for (let n = 0; n < t.length; n++) {
          let o = t[n];
          "," === o && 0 === i
            ? (r.push(e), (e = ""))
            : ((e += o),
              "(" === o
                ? i++
                : ")" === o &&
                  (i--,
                  -1 === i &&
                    U.throwArgumentError(
                      "unbalanced parenthesis",
                      "value",
                      t
                    )));
        }
        e && r.push(e);
        return r;
      })(t).map((t) => V.fromString(t, r));
    }
    class Y {
      constructor(t, r) {
        t !== L &&
          U.throwError(
            "use a static from method",
            c.errors.UNSUPPORTED_OPERATION,
            { operation: "new Fragment()" }
          ),
          Z(this, r),
          (this._isFragment = !0),
          Object.freeze(this);
      }
      static from(t) {
        return Y.isFragment(t)
          ? t
          : "string" == typeof t
          ? Y.fromString(t)
          : Y.fromObject(t);
      }
      static fromObject(t) {
        if (Y.isFragment(t)) return t;
        switch (t.type) {
          case "function":
            return tt.fromObject(t);
          case "event":
            return G.fromObject(t);
          case "constructor":
            return Q.fromObject(t);
          case "fallback":
          case "receive":
            return null;
        }
        return U.throwArgumentError("invalid fragment object", "value", t);
      }
      static fromString(t) {
        return "event" ===
          (t = (t = (t = t.replace(/\s/g, " "))
            .replace(/\(/g, " (")
            .replace(/\)/g, ") ")
            .replace(/\s+/g, " ")).trim()).split(" ")[0]
          ? G.fromString(t.substring(5).trim())
          : "function" === t.split(" ")[0]
          ? tt.fromString(t.substring(8).trim())
          : "constructor" === t.split("(")[0].trim()
          ? Q.fromString(t.trim())
          : U.throwArgumentError("unsupported fragment", "value", t);
      }
      static isFragment(t) {
        return !(!t || !t._isFragment);
      }
    }
    class G extends Y {
      format(t) {
        if (
          (t || (t = H.sighash),
          H[t] || U.throwArgumentError("invalid format type", "format", t),
          t === H.json)
        )
          return JSON.stringify({
            type: "event",
            anonymous: this.anonymous,
            name: this.name,
            inputs: this.inputs.map((r) => JSON.parse(r.format(t))),
          });
        let r = "";
        return (
          t !== H.sighash && (r += "event "),
          (r +=
            this.name +
            "(" +
            this.inputs
              .map((r) => r.format(t))
              .join(t === H.full ? ", " : ",") +
            ") "),
          t !== H.sighash && this.anonymous && (r += "anonymous "),
          r.trim()
        );
      }
      static from(t) {
        return "string" == typeof t ? G.fromString(t) : G.fromObject(t);
      }
      static fromObject(t) {
        if (G.isEventFragment(t)) return t;
        "event" !== t.type &&
          U.throwArgumentError("invalid event object", "value", t);
        const r = {
          name: it(t.name),
          anonymous: t.anonymous,
          inputs: t.inputs ? t.inputs.map(V.fromObject) : [],
          type: "event",
        };
        return new G(L, r);
      }
      static fromString(t) {
        let r = t.match(nt);
        r || U.throwArgumentError("invalid event string", "value", t);
        let e = !1;
        return (
          r[3].split(" ").forEach((t) => {
            switch (t.trim()) {
              case "anonymous":
                e = !0;
                break;
              case "":
                break;
              default:
                U.warn("unknown modifier: " + t);
            }
          }),
          G.fromObject({
            name: r[1].trim(),
            anonymous: e,
            inputs: W(r[2], !0),
            type: "event",
          })
        );
      }
      static isEventFragment(t) {
        return t && t._isFragment && "event" === t.type;
      }
    }
    function J(t, r) {
      r.gas = null;
      let e = t.split("@");
      return 1 !== e.length
        ? (e.length > 2 &&
            U.throwArgumentError(
              "invalid human-readable ABI signature",
              "value",
              t
            ),
          e[1].match(/^[0-9]+$/) ||
            U.throwArgumentError(
              "invalid human-readable ABI signature gas",
              "value",
              t
            ),
          (r.gas = x.from(e[1])),
          e[0])
        : t;
    }
    function K(t, r) {
      (r.constant = !1),
        (r.payable = !1),
        (r.stateMutability = "nonpayable"),
        t.split(" ").forEach((t) => {
          switch (t.trim()) {
            case "constant":
              r.constant = !0;
              break;
            case "payable":
              (r.payable = !0), (r.stateMutability = "payable");
              break;
            case "pure":
              (r.constant = !0), (r.stateMutability = "pure");
              break;
            case "view":
              (r.constant = !0), (r.stateMutability = "view");
              break;
            case "external":
            case "public":
            case "":
              break;
            default:
              console.log("unknown modifier: " + t);
          }
        });
    }
    function X(t) {
      let r = { constant: !1, payable: !0, stateMutability: "payable" };
      return (
        null != t.stateMutability
          ? ((r.stateMutability = t.stateMutability),
            (r.constant =
              "view" === r.stateMutability || "pure" === r.stateMutability),
            null != t.constant &&
              !!t.constant !== r.constant &&
              U.throwArgumentError(
                "cannot have constant function with mutability " +
                  r.stateMutability,
                "value",
                t
              ),
            (r.payable = "payable" === r.stateMutability),
            null != t.payable &&
              !!t.payable !== r.payable &&
              U.throwArgumentError(
                "cannot have payable function with mutability " +
                  r.stateMutability,
                "value",
                t
              ))
          : null != t.payable
          ? ((r.payable = !!t.payable),
            null != t.constant ||
              r.payable ||
              "constructor" === t.type ||
              U.throwArgumentError(
                "unable to determine stateMutability",
                "value",
                t
              ),
            (r.constant = !!t.constant),
            r.constant
              ? (r.stateMutability = "view")
              : (r.stateMutability = r.payable ? "payable" : "nonpayable"),
            r.payable &&
              r.constant &&
              U.throwArgumentError(
                "cannot have constant payable function",
                "value",
                t
              ))
          : null != t.constant
          ? ((r.constant = !!t.constant),
            (r.payable = !r.constant),
            (r.stateMutability = r.constant ? "view" : "payable"))
          : "constructor" !== t.type &&
            U.throwArgumentError(
              "unable to determine stateMutability",
              "value",
              t
            ),
        r
      );
    }
    class Q extends Y {
      format(t) {
        if (
          (t || (t = H.sighash),
          H[t] || U.throwArgumentError("invalid format type", "format", t),
          t === H.json)
        )
          return JSON.stringify({
            type: "constructor",
            stateMutability:
              "nonpayable" !== this.stateMutability
                ? this.stateMutability
                : void 0,
            payble: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((r) => JSON.parse(r.format(t))),
          });
        t === H.sighash &&
          U.throwError(
            "cannot format a constructor for sighash",
            c.errors.UNSUPPORTED_OPERATION,
            { operation: "format(sighash)" }
          );
        let r =
          "constructor(" +
          this.inputs.map((r) => r.format(t)).join(t === H.full ? ", " : ",") +
          ") ";
        return (
          this.stateMutability &&
            "nonpayable" !== this.stateMutability &&
            (r += this.stateMutability + " "),
          r.trim()
        );
      }
      static from(t) {
        return "string" == typeof t ? Q.fromString(t) : Q.fromObject(t);
      }
      static fromObject(t) {
        if (Q.isConstructorFragment(t)) return t;
        "constructor" !== t.type &&
          U.throwArgumentError("invalid constructor object", "value", t);
        let r = X(t);
        r.constant &&
          U.throwArgumentError("constructor cannot be constant", "value", t);
        const e = {
          name: null,
          type: t.type,
          inputs: t.inputs ? t.inputs.map(V.fromObject) : [],
          payable: r.payable,
          stateMutability: r.stateMutability,
          gas: t.gas ? x.from(t.gas) : null,
        };
        return new Q(L, e);
      }
      static fromString(t) {
        let r = { type: "constructor" },
          e = (t = J(t, r)).match(nt);
        return (
          (e && "constructor" === e[1].trim()) ||
            U.throwArgumentError("invalid constructor string", "value", t),
          (r.inputs = W(e[2].trim(), !1)),
          K(e[3].trim(), r),
          Q.fromObject(r)
        );
      }
      static isConstructorFragment(t) {
        return t && t._isFragment && "constructor" === t.type;
      }
    }
    class tt extends Q {
      format(t) {
        if (
          (t || (t = H.sighash),
          H[t] || U.throwArgumentError("invalid format type", "format", t),
          t === H.json)
        )
          return JSON.stringify({
            type: "function",
            name: this.name,
            constant: this.constant,
            stateMutability:
              "nonpayable" !== this.stateMutability
                ? this.stateMutability
                : void 0,
            payble: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((r) => JSON.parse(r.format(t))),
            ouputs: this.outputs.map((r) => JSON.parse(r.format(t))),
          });
        let r = "";
        return (
          t !== H.sighash && (r += "function "),
          (r +=
            this.name +
            "(" +
            this.inputs
              .map((r) => r.format(t))
              .join(t === H.full ? ", " : ",") +
            ") "),
          t !== H.sighash &&
            (this.stateMutability
              ? "nonpayable" !== this.stateMutability &&
                (r += this.stateMutability + " ")
              : this.constant && (r += "view "),
            this.outputs &&
              this.outputs.length &&
              (r +=
                "returns (" +
                this.outputs.map((r) => r.format(t)).join(", ") +
                ") "),
            null != this.gas && (r += "@" + this.gas.toString() + " ")),
          r.trim()
        );
      }
      static from(t) {
        return "string" == typeof t ? tt.fromString(t) : tt.fromObject(t);
      }
      static fromObject(t) {
        if (tt.isFunctionFragment(t)) return t;
        "function" !== t.type &&
          U.throwArgumentError("invalid function object", "value", t);
        let r = X(t);
        const e = {
          type: t.type,
          name: it(t.name),
          constant: r.constant,
          inputs: t.inputs ? t.inputs.map(V.fromObject) : [],
          outputs: t.outputs ? t.outputs.map(V.fromObject) : [],
          payable: r.payable,
          stateMutability: r.stateMutability,
          gas: t.gas ? x.from(t.gas) : null,
        };
        return new tt(L, e);
      }
      static fromString(t) {
        let r = { type: "function" },
          e = (t = J(t, r)).split(" returns ");
        e.length > 2 &&
          U.throwArgumentError("invalid function string", "value", t);
        let i = e[0].match(nt);
        if (
          (i || U.throwArgumentError("invalid function signature", "value", t),
          (r.name = i[1].trim()),
          r.name && it(r.name),
          (r.inputs = W(i[2], !1)),
          K(i[3].trim(), r),
          e.length > 1)
        ) {
          let i = e[1].match(nt);
          ("" == i[1].trim() && "" == i[3].trim()) ||
            U.throwArgumentError("unexpected tokens", "value", t),
            (r.outputs = W(i[2], !1));
        } else r.outputs = [];
        return tt.fromObject(r);
      }
      static isFunctionFragment(t) {
        return t && t._isFragment && "function" === t.type;
      }
    }
    function rt(t) {
      return (
        t.match(/^uint($|[^1-9])/)
          ? (t = "uint256" + t.substring(4))
          : t.match(/^int($|[^1-9])/) && (t = "int256" + t.substring(3)),
        t
      );
    }
    const et = new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");
    function it(t) {
      return (
        (t && t.match(et)) ||
          U.throwArgumentError(`invalid identifier "${t}"`, "value", t),
        t
      );
    }
    const nt = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
    const ot = new c("abi/5.0.0-beta.153");
    function st(t) {
      const r = [],
        e = function (t, i) {
          if (Array.isArray(i))
            for (let n in i) {
              const o = t.slice();
              o.push(n);
              try {
                e(o, i[n]);
              } catch (t) {
                r.push({ path: o, error: t });
              }
            }
        };
      return e([], t), r;
    }
    class ut {
      constructor(t, r, e, i) {
        (this.name = t),
          (this.type = r),
          (this.localName = e),
          (this.dynamic = i);
      }
      _throwError(t, r) {
        ot.throwArgumentError(t, this.localName, r);
      }
    }
    class ht {
      constructor(t) {
        O(this, "wordSize", t || 32),
          (this._data = v([])),
          (this._padding = new Uint8Array(t));
      }
      get data() {
        return M(this._data);
      }
      get length() {
        return this._data.length;
      }
      _writeData(t) {
        return (this._data = y([this._data, t])), t.length;
      }
      writeBytes(t) {
        let r = v(t);
        return (
          r.length % this.wordSize &&
            (r = y([r, this._padding.slice(r.length % this.wordSize)])),
          this._writeData(r)
        );
      }
      _getValue(t) {
        let r = v(x.from(t));
        return (
          r.length > this.wordSize &&
            ot.throwError("value out-of-bounds", c.errors.BUFFER_OVERRUN, {
              length: this.wordSize,
              offset: r.length,
            }),
          r.length % this.wordSize &&
            (r = y([this._padding.slice(r.length % this.wordSize), r])),
          r
        );
      }
      writeValue(t) {
        return this._writeData(this._getValue(t));
      }
      writeUpdatableValue() {
        let t = this.length;
        return (
          this.writeValue(0),
          (r) => {
            this._data.set(this._getValue(r), t);
          }
        );
      }
    }
    class at {
      constructor(t, r, e) {
        O(this, "_data", v(t)),
          O(this, "wordSize", r || 32),
          O(this, "_coerceFunc", e),
          (this._offset = 0);
      }
      get data() {
        return M(this._data);
      }
      get consumed() {
        return this._offset;
      }
      static coerce(t, r) {
        let e = t.match("^u?int([0-9]+)$");
        return e && parseInt(e[1]) <= 48 && (r = r.toNumber()), r;
      }
      coerce(t, r) {
        return this._coerceFunc ? this._coerceFunc(t, r) : at.coerce(t, r);
      }
      _peekBytes(t, r) {
        let e = Math.ceil(r / this.wordSize) * this.wordSize;
        return (
          this._offset + e > this._data.length &&
            ot.throwError("data out-of-bounds", c.errors.BUFFER_OVERRUN, {
              length: this._data.length,
              offset: this._offset + e,
            }),
          this._data.slice(this._offset, this._offset + e)
        );
      }
      subReader(t) {
        return new at(
          this._data.slice(this._offset + t),
          this.wordSize,
          this._coerceFunc
        );
      }
      readBytes(t) {
        let r = this._peekBytes(0, t);
        return (this._offset += r.length), r.slice(0, t);
      }
      readValue() {
        return x.from(this.readBytes(this.wordSize));
      }
    }
    var lt = e(11),
      ft = e.n(lt);
    function ct(t) {
      return "0x" + ft.a.keccak_256(v(t));
    }
    new c("rlp/5.0.3");
    const mt = new c("address/5.0.3");
    function pt(t) {
      w(t, 20) || mt.throwArgumentError("invalid address", "address", t);
      const r = (t = t.toLowerCase()).substring(2).split(""),
        e = new Uint8Array(40);
      for (let t = 0; t < 40; t++) e[t] = r[t].charCodeAt(0);
      const i = v(ct(e));
      for (let t = 0; t < 40; t += 2)
        i[t >> 1] >> 4 >= 8 && (r[t] = r[t].toUpperCase()),
          (15 & i[t >> 1]) >= 8 && (r[t + 1] = r[t + 1].toUpperCase());
      return "0x" + r.join("");
    }
    const dt = {};
    for (let t = 0; t < 10; t++) dt[String(t)] = String(t);
    for (let t = 0; t < 26; t++)
      dt[String.fromCharCode(65 + t)] = String(10 + t);
    const gt = Math.floor(
      ((vt = 9007199254740991),
      Math.log10 ? Math.log10(vt) : Math.log(vt) / Math.LN10)
    );
    var vt;
    function yt(t) {
      let r = (t =
        (t = t.toUpperCase()).substring(4) + t.substring(0, 2) + "00")
        .split("")
        .map((t) => dt[t])
        .join("");
      for (; r.length >= gt; ) {
        let t = r.substring(0, gt);
        r = (parseInt(t, 10) % 97) + r.substring(t.length);
      }
      let e = String(98 - (parseInt(r, 10) % 97));
      for (; e.length < 2; ) e = "0" + e;
      return e;
    }
    function wt(t) {
      let r = null;
      if (
        ("string" != typeof t &&
          mt.throwArgumentError("invalid address", "address", t),
        t.match(/^(0x)?[0-9a-fA-F]{40}$/))
      )
        "0x" !== t.substring(0, 2) && (t = "0x" + t),
          (r = pt(t)),
          t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) &&
            r !== t &&
            mt.throwArgumentError("bad address checksum", "address", t);
      else if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        for (
          t.substring(2, 4) !== yt(t) &&
            mt.throwArgumentError("bad icap checksum", "address", t),
            r = new i.BN(t.substring(4), 36).toString(16);
          r.length < 40;

        )
          r = "0" + r;
        r = pt("0x" + r);
      } else mt.throwArgumentError("invalid address", "address", t);
      return r;
    }
    class Mt extends ut {
      constructor(t) {
        super("address", "address", t, !1);
      }
      encode(t, r) {
        try {
          wt(r);
        } catch (t) {
          this._throwError(t.message, r);
        }
        return t.writeValue(r);
      }
      decode(t) {
        return wt(_(t.readValue().toHexString(), 20));
      }
    }
    class bt extends ut {
      constructor(t) {
        super(t.name, t.type, void 0, t.dynamic), (this.coder = t);
      }
      encode(t, r) {
        return this.coder.encode(t, r);
      }
      decode(t) {
        return this.coder.decode(t);
      }
    }
    const _t = new c("abi/5.0.0-beta.153");
    function At(t, r, e) {
      if (Array.isArray(e));
      else if (e && "object" == typeof e) {
        let t = [];
        r.forEach(function (r) {
          t.push(e[r.localName]);
        }),
          (e = t);
      } else _t.throwArgumentError("invalid tuple value", "tuple", e);
      r.length !== e.length &&
        _t.throwArgumentError("types/value length mismatch", "tuple", e);
      let i = new ht(t.wordSize),
        n = new ht(t.wordSize),
        o = [];
      r.forEach((t, r) => {
        let s = e[r];
        if (t.dynamic) {
          let r = n.length;
          t.encode(n, s);
          let e = i.writeUpdatableValue();
          o.push((t) => {
            e(t + r);
          });
        } else t.encode(i, s);
      }),
        o.forEach((t) => {
          t(i.length);
        });
      let s = t.writeBytes(i.data);
      return (s += t.writeBytes(n.data)), s;
    }
    function Et(t, r) {
      let e = [],
        i = t.subReader(0),
        n = 0;
      r.forEach((r) => {
        let o = null;
        if (r.dynamic) {
          let e = t.readValue(),
            s = i.subReader(e.toNumber());
          try {
            o = r.decode(s);
          } catch (t) {
            if (t.code === c.errors.BUFFER_OVERRUN) throw t;
            (o = t),
              (o.baseType = r.name),
              (o.name = r.localName),
              (o.type = r.type);
          }
          n += s.consumed;
        } else
          try {
            o = r.decode(t);
          } catch (t) {
            if (t.code === c.errors.BUFFER_OVERRUN) throw t;
            (o = t),
              (o.baseType = r.name),
              (o.name = r.localName),
              (o.type = r.type);
          }
        null != o && e.push(o);
      }),
        t.readBytes(n),
        r.forEach((t, r) => {
          let i = t.localName;
          if (!i) return;
          if (("length" === i && (i = "_length"), null != e[i])) return;
          const n = e[r];
          n instanceof Error
            ? Object.defineProperty(e, i, {
                get: () => {
                  throw n;
                },
              })
            : (e[i] = n);
        });
      for (let t = 0; t < e.length; t++) {
        const r = e[t];
        r instanceof Error &&
          Object.defineProperty(e, t, {
            get: () => {
              throw r;
            },
          });
      }
      return Object.freeze(e);
    }
    class xt extends ut {
      constructor(t, r, e) {
        super(
          "array",
          t.type + "[" + (r >= 0 ? r : "") + "]",
          e,
          -1 === r || t.dynamic
        ),
          (this.coder = t),
          (this.length = r);
      }
      encode(t, r) {
        Array.isArray(r) || this._throwError("expected array value", r);
        let e = this.length;
        -1 === e && ((e = r.length), t.writeValue(r.length)),
          _t.checkArgumentCount(
            e,
            r.length,
            "coder array" + (this.localName ? " " + this.localName : "")
          );
        let i = [];
        for (let t = 0; t < r.length; t++) i.push(this.coder);
        return At(t, i, r);
      }
      decode(t) {
        let r = this.length;
        -1 === r && (r = t.readValue().toNumber());
        let e = [];
        for (let t = 0; t < r; t++) e.push(new bt(this.coder));
        return t.coerce(this.name, Et(t, e));
      }
    }
    class St extends ut {
      constructor(t) {
        super("bool", "bool", t, !1);
      }
      encode(t, r) {
        return t.writeValue(r ? 1 : 0);
      }
      decode(t) {
        return t.coerce(this.type, !t.readValue().isZero());
      }
    }
    class Bt extends ut {
      constructor(t, r) {
        super(t, t, r, !0);
      }
      encode(t, r) {
        r = v(r);
        let e = t.writeValue(r.length);
        return (e += t.writeBytes(r)), e;
      }
      decode(t) {
        return t.readBytes(t.readValue().toNumber());
      }
    }
    class Nt extends Bt {
      constructor(t) {
        super("bytes", t);
      }
      decode(t) {
        return t.coerce(this.name, M(super.decode(t)));
      }
    }
    class Tt extends ut {
      constructor(t, r) {
        let e = "bytes" + String(t);
        super(e, e, r, !1), (this.size = t);
      }
      encode(t, r) {
        let e = v(r);
        return (
          e.length !== this.size &&
            this._throwError("incorrect data length", r),
          t.writeBytes(e)
        );
      }
      decode(t) {
        return t.coerce(this.name, M(t.readBytes(this.size)));
      }
    }
    class kt extends ut {
      constructor(t) {
        super("null", "", t, !1);
      }
      encode(t, r) {
        return null != r && this._throwError("not null", r), t.writeBytes([]);
      }
      decode(t) {
        return t.readBytes(0), t.coerce(this.name, null);
      }
    }
    const Rt = x.from(-1),
      Ot = x.from(0),
      It = x.from(1),
      Ct =
        (x.from(2),
        x.from("1000000000000000000"),
        x.from(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ));
    class Pt extends ut {
      constructor(t, r, e) {
        const i = (r ? "int" : "uint") + 8 * t;
        super(i, i, e, !1), (this.size = t), (this.signed = r);
      }
      encode(t, r) {
        let e = x.from(r),
          i = Ct.mask(8 * t.wordSize);
        if (this.signed) {
          let t = i.mask(8 * this.size - 1);
          (e.gt(t) || e.lt(t.add(It).mul(Rt))) &&
            this._throwError("value out-of-bounds", r);
        } else
          (e.lt(Ot) || e.gt(i.mask(8 * this.size))) &&
            this._throwError("value out-of-bounds", r);
        return (
          (e = e.toTwos(8 * this.size).mask(8 * this.size)),
          this.signed && (e = e.fromTwos(8 * this.size).toTwos(8 * t.wordSize)),
          t.writeValue(e)
        );
      }
      decode(t) {
        let r = t.readValue().mask(8 * this.size);
        return (
          this.signed && (r = r.fromTwos(8 * this.size)), t.coerce(this.name, r)
        );
      }
    }
    const jt = new c("strings/5.0.3");
    var Ft, Ut;
    function Lt(t, r, e, i, n) {
      if (t === Ut.BAD_PREFIX || t === Ut.UNEXPECTED_CONTINUE) {
        let t = 0;
        for (let i = r + 1; i < e.length && e[i] >> 6 == 2; i++) t++;
        return t;
      }
      return t === Ut.OVERRUN ? e.length - r - 1 : 0;
    }
    !(function (t) {
      (t.current = ""),
        (t.NFC = "NFC"),
        (t.NFD = "NFD"),
        (t.NFKC = "NFKC"),
        (t.NFKD = "NFKD");
    })(Ft || (Ft = {})),
      (function (t) {
        (t.UNEXPECTED_CONTINUE = "unexpected continuation byte"),
          (t.BAD_PREFIX = "bad codepoint prefix"),
          (t.OVERRUN = "string overrun"),
          (t.MISSING_CONTINUE = "missing continuation byte"),
          (t.OUT_OF_RANGE = "out of UTF-8 range"),
          (t.UTF16_SURROGATE = "UTF-16 surrogate"),
          (t.OVERLONG = "overlong representation");
      })(Ut || (Ut = {}));
    const Dt = Object.freeze({
      error: function (t, r, e, i, n) {
        return jt.throwArgumentError(
          `invalid codepoint at offset ${r}; ${t}`,
          "bytes",
          e
        );
      },
      ignore: Lt,
      replace: function (t, r, e, i, n) {
        return t === Ut.OVERLONG
          ? (i.push(n), 0)
          : (i.push(65533), Lt(t, r, e));
      },
    });
    function zt(t, r) {
      null == r && (r = Dt.error), (t = v(t));
      const e = [];
      let i = 0;
      for (; i < t.length; ) {
        const n = t[i++];
        if (n >> 7 == 0) {
          e.push(n);
          continue;
        }
        let o = null,
          s = null;
        if (192 == (224 & n)) (o = 1), (s = 127);
        else if (224 == (240 & n)) (o = 2), (s = 2047);
        else {
          if (240 != (248 & n)) {
            i += r(
              128 == (192 & n) ? Ut.UNEXPECTED_CONTINUE : Ut.BAD_PREFIX,
              i - 1,
              t,
              e
            );
            continue;
          }
          (o = 3), (s = 65535);
        }
        if (i - 1 + o >= t.length) {
          i += r(Ut.OVERRUN, i - 1, t, e);
          continue;
        }
        let u = n & ((1 << (8 - o - 1)) - 1);
        for (let n = 0; n < o; n++) {
          let n = t[i];
          if (128 != (192 & n)) {
            (i += r(Ut.MISSING_CONTINUE, i, t, e)), (u = null);
            break;
          }
          (u = (u << 6) | (63 & n)), i++;
        }
        null !== u &&
          (u > 1114111
            ? (i += r(Ut.OUT_OF_RANGE, i - 1 - o, t, e, u))
            : u >= 55296 && u <= 57343
            ? (i += r(Ut.UTF16_SURROGATE, i - 1 - o, t, e, u))
            : u <= s
            ? (i += r(Ut.OVERLONG, i - 1 - o, t, e, u))
            : e.push(u));
      }
      return e;
    }
    function qt(t, r = Ft.current) {
      r != Ft.current && (jt.checkNormalize(), (t = t.normalize(r)));
      let e = [];
      for (let r = 0; r < t.length; r++) {
        const i = t.charCodeAt(r);
        if (i < 128) e.push(i);
        else if (i < 2048) e.push((i >> 6) | 192), e.push((63 & i) | 128);
        else if (55296 == (64512 & i)) {
          r++;
          const n = t.charCodeAt(r);
          if (r >= t.length || 56320 != (64512 & n))
            throw new Error("invalid utf-8 string");
          const o = 65536 + ((1023 & i) << 10) + (1023 & n);
          e.push((o >> 18) | 240),
            e.push(((o >> 12) & 63) | 128),
            e.push(((o >> 6) & 63) | 128),
            e.push((63 & o) | 128);
        } else
          e.push((i >> 12) | 224),
            e.push(((i >> 6) & 63) | 128),
            e.push((63 & i) | 128);
      }
      return v(e);
    }
    function Zt(t) {
      return t
        .map((t) =>
          t <= 65535
            ? String.fromCharCode(t)
            : ((t -= 65536),
              String.fromCharCode(
                55296 + ((t >> 10) & 1023),
                56320 + (1023 & t)
              ))
        )
        .join("");
    }
    function Ht(t, r) {
      return Zt(zt(t, r));
    }
    function $t(t, r) {
      r ||
        (r = function (t) {
          return [parseInt(t, 16)];
        });
      let e = 0,
        i = {};
      return (
        t.split(",").forEach((t) => {
          let n = t.split(":");
          (e += parseInt(n[0], 16)), (i[e] = r(n[1]));
        }),
        i
      );
    }
    function Vt(t) {
      let r = 0;
      return t.split(",").map((t) => {
        let e = t.split("-");
        1 === e.length ? (e[1] = "0") : "" === e[1] && (e[1] = "1");
        let i = r + parseInt(e[0], 16);
        return (r = parseInt(e[1], 16)), { l: i, h: r };
      });
    }
    Vt(
      "221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"
    ),
      "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff"
        .split(",")
        .map((t) => parseInt(t, 16)),
      $t(
        "b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"
      ),
      $t(
        "179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"
      ),
      $t(
        "df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D",
        function (t) {
          if (t.length % 4 != 0) throw new Error("bad data");
          let r = [];
          for (let e = 0; e < t.length; e += 4)
            r.push(parseInt(t.substring(e, e + 4), 16));
          return r;
        }
      ),
      Vt(
        "80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001"
      );
    class Wt extends Bt {
      constructor(t) {
        super("string", t);
      }
      encode(t, r) {
        return super.encode(t, qt(r));
      }
      decode(t) {
        return Ht(super.decode(t));
      }
    }
    class Yt extends ut {
      constructor(t, r) {
        let e = !1;
        const i = [];
        t.forEach((t) => {
          t.dynamic && (e = !0), i.push(t.type);
        });
        super("tuple", "tuple(" + i.join(",") + ")", r, e), (this.coders = t);
      }
      encode(t, r) {
        return At(t, this.coders, r);
      }
      decode(t) {
        return t.coerce(this.name, Et(t, this.coders));
      }
    }
    const Gt = new c("abi/5.0.0-beta.153"),
      Jt = new RegExp(/^bytes([0-9]*)$/),
      Kt = new RegExp(/^(u?int)([0-9]*)$/);
    class Xt {
      constructor(t) {
        Gt.checkNew(new.target, Xt), O(this, "coerceFunc", t || null);
      }
      _getCoder(t) {
        switch (t.baseType) {
          case "address":
            return new Mt(t.name);
          case "bool":
            return new St(t.name);
          case "string":
            return new Wt(t.name);
          case "bytes":
            return new Nt(t.name);
          case "array":
            return new xt(
              this._getCoder(t.arrayChildren),
              t.arrayLength,
              t.name
            );
          case "tuple":
            return new Yt(
              (t.components || []).map((t) => this._getCoder(t)),
              t.name
            );
          case "":
            return new kt(t.name);
        }
        let r = t.type.match(Kt);
        if (r) {
          let e = parseInt(r[2] || "256");
          return (
            (0 === e || e > 256 || e % 8 != 0) &&
              Gt.throwArgumentError(
                "invalid " + r[1] + " bit length",
                "param",
                t
              ),
            new Pt(e / 8, "int" === r[1], t.name)
          );
        }
        if (((r = t.type.match(Jt)), r)) {
          let e = parseInt(r[1]);
          return (
            (0 === e || e > 32) &&
              Gt.throwArgumentError("invalid bytes length", "param", t),
            new Tt(e, t.name)
          );
        }
        return Gt.throwArgumentError("invalid type", "type", t.type);
      }
      _getWordSize() {
        return 32;
      }
      _getReader(t) {
        return new at(t, this._getWordSize(), this.coerceFunc);
      }
      _getWriter() {
        return new ht(this._getWordSize());
      }
      encode(t, r) {
        t.length !== r.length &&
          Gt.throwError(
            "types/values length mismatch",
            c.errors.INVALID_ARGUMENT,
            {
              count: { types: t.length, values: r.length },
              value: { types: t, values: r },
            }
          );
        const e = t.map((t) => this._getCoder(V.from(t))),
          i = new Yt(e, "_"),
          n = this._getWriter();
        return i.encode(n, r), n.data;
      }
      decode(t, r) {
        const e = t.map((t) => this._getCoder(V.from(t)));
        return new Yt(e, "_").decode(this._getReader(v(r)));
      }
    }
    const Qt = new Xt();
    new c("hash/5.0.3"),
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]),
      new RegExp("^((.*)\\.)?([^.]+)$");
    function tr(t) {
      return ct(qt(t));
    }
    const rr = new c("abi/5.0.0-beta.153");
    class er extends F {}
    class ir extends F {}
    class nr extends F {
      static isIndexed(t) {
        return !(!t || !t._isIndexed);
      }
    }
    function or(t, r) {
      const e = new Error(
        "deferred error during ABI decoding triggered accessing " + t
      );
      return (e.error = r), e;
    }
    function sr(t, r, e) {
      e.reduce(
        (e, i) => (
          i.name &&
            (e[i.name] &&
              rr.throwArgumentError(
                `duplicate ${r} parameter ${JSON.stringify(
                  i.name
                )} in ${t.format("full")}`,
                "fragment",
                t
              ),
            (e[i.name] = !0)),
          e
        ),
        {}
      );
    }
    class ur {
      constructor(t) {
        rr.checkNew(new.target, ur);
        let r = [];
        (r = "string" == typeof t ? JSON.parse(t) : t),
          O(
            this,
            "fragments",
            r.map((t) => Y.from(t)).filter((t) => null != t)
          ),
          O(this, "_abiCoder", I(new.target, "getAbiCoder")()),
          O(this, "functions", {}),
          O(this, "errors", {}),
          O(this, "events", {}),
          O(this, "structs", {}),
          this.fragments.forEach((t) => {
            let r = null;
            switch (t.type) {
              case "constructor":
                return this.deploy
                  ? void rr.warn("duplicate definition - constructor")
                  : (sr(t, "input", t.inputs), void O(this, "deploy", t));
              case "function":
                sr(t, "input", t.inputs),
                  sr(t, "output", t.outputs),
                  (r = this.functions);
                break;
              case "event":
                sr(t, "input", t.inputs), (r = this.events);
                break;
              default:
                return;
            }
            let e = t.format();
            r[e] ? rr.warn("duplicate definition - " + e) : (r[e] = t);
          }),
          this.deploy ||
            O(this, "deploy", Q.from({ payable: !1, type: "constructor" })),
          O(this, "_isInterface", !0);
      }
      format(t) {
        t || (t = H.full),
          t === H.sighash &&
            rr.throwArgumentError(
              "interface does not support formatting sighash",
              "format",
              t
            );
        const r = this.fragments.map((r) => r.format(t));
        return t === H.json ? JSON.stringify(r.map((t) => JSON.parse(t))) : r;
      }
      static getAbiCoder() {
        return Qt;
      }
      static getAddress(t) {
        return wt(t);
      }
      static getSighash(t) {
        return b(tr(t.format()), 0, 4);
      }
      static getEventTopic(t) {
        return tr(t.format());
      }
      getFunction(t) {
        if (w(t)) {
          for (const r in this.functions)
            if (t === this.getSighash(r)) return this.functions[r];
          rr.throwArgumentError("no matching function", "sighash", t);
        }
        if (-1 === t.indexOf("(")) {
          const r = t.trim(),
            e = Object.keys(this.functions).filter(
              (t) => t.split("(")[0] === r
            );
          return (
            0 === e.length
              ? rr.throwArgumentError("no matching function", "name", r)
              : e.length > 1 &&
                rr.throwArgumentError("multiple matching functions", "name", r),
            this.functions[e[0]]
          );
        }
        const r = this.functions[tt.fromString(t).format()];
        return (
          r || rr.throwArgumentError("no matching function", "signature", t), r
        );
      }
      getEvent(t) {
        if (w(t)) {
          const r = t.toLowerCase();
          for (const t in this.events)
            if (r === this.getEventTopic(t)) return this.events[t];
          rr.throwArgumentError("no matching event", "topichash", r);
        }
        if (-1 === t.indexOf("(")) {
          const r = t.trim(),
            e = Object.keys(this.events).filter((t) => t.split("(")[0] === r);
          return (
            0 === e.length
              ? rr.throwArgumentError("no matching event", "name", r)
              : e.length > 1 &&
                rr.throwArgumentError("multiple matching events", "name", r),
            this.events[e[0]]
          );
        }
        const r = this.events[G.fromString(t).format()];
        return (
          r || rr.throwArgumentError("no matching event", "signature", t), r
        );
      }
      getSighash(t) {
        return (
          "string" == typeof t && (t = this.getFunction(t)),
          I(this.constructor, "getSighash")(t)
        );
      }
      getEventTopic(t) {
        return (
          "string" == typeof t && (t = this.getEvent(t)),
          I(this.constructor, "getEventTopic")(t)
        );
      }
      _decodeParams(t, r) {
        return this._abiCoder.decode(t, r);
      }
      _encodeParams(t, r) {
        return this._abiCoder.encode(t, r);
      }
      encodeDeploy(t) {
        return this._encodeParams(this.deploy.inputs, t || []);
      }
      decodeFunctionData(t, r) {
        "string" == typeof t && (t = this.getFunction(t));
        const e = v(r);
        return (
          M(e.slice(0, 4)) !== this.getSighash(t) &&
            rr.throwArgumentError(
              `data signature does not match function ${t.name}.`,
              "data",
              M(e)
            ),
          this._decodeParams(t.inputs, e.slice(4))
        );
      }
      encodeFunctionData(t, r) {
        return (
          "string" == typeof t && (t = this.getFunction(t)),
          M(y([this.getSighash(t), this._encodeParams(t.inputs, r || [])]))
        );
      }
      decodeFunctionResult(t, r) {
        "string" == typeof t && (t = this.getFunction(t));
        let e = v(r),
          i = null,
          n = null;
        switch (e.length % this._abiCoder._getWordSize()) {
          case 0:
            try {
              return this._abiCoder.decode(t.outputs, e);
            } catch (t) {}
            break;
          case 4:
            "0x08c379a0" === M(e.slice(0, 4)) &&
              ((n = "Error(string)"),
              (i = this._abiCoder.decode(["string"], e.slice(4))[0]));
        }
        return rr.throwError("call revert exception", c.errors.CALL_EXCEPTION, {
          method: t.format(),
          errorSignature: n,
          errorArgs: [i],
          reason: i,
        });
      }
      encodeFunctionResult(t, r) {
        return (
          "string" == typeof t && (t = this.getFunction(t)),
          M(this._abiCoder.encode(t.outputs, r || []))
        );
      }
      encodeFilterTopics(t, r) {
        "string" == typeof t && (t = this.getEvent(t)),
          r.length > t.inputs.length &&
            rr.throwError(
              "too many arguments for " + t.format(),
              c.errors.UNEXPECTED_ARGUMENT,
              { argument: "values", value: r }
            );
        let e = [];
        t.anonymous || e.push(this.getEventTopic(t));
        const i = (t, r) =>
          "string" === t.type
            ? tr(r)
            : "bytes" === t.type
            ? ct(M(r))
            : ("address" === t.type && this._abiCoder.encode(["address"], [r]),
              _(M(r), 32));
        for (
          r.forEach((r, n) => {
            let o = t.inputs[n];
            o.indexed
              ? null == r
                ? e.push(null)
                : "array" === o.baseType || "tuple" === o.baseType
                ? rr.throwArgumentError(
                    "filtering with tuples or arrays not supported",
                    "contract." + o.name,
                    r
                  )
                : Array.isArray(r)
                ? e.push(r.map((t) => i(o, t)))
                : e.push(i(o, r))
              : null != r &&
                rr.throwArgumentError(
                  "cannot filter non-indexed parameters; must be null",
                  "contract." + o.name,
                  r
                );
          });
          e.length && null === e[e.length - 1];

        )
          e.pop();
        return e;
      }
      encodeEventLog(t, r) {
        "string" == typeof t && (t = this.getEvent(t));
        const e = [],
          i = [],
          n = [];
        return (
          t.anonymous || e.push(this.getEventTopic(t)),
          r.length !== t.inputs.length &&
            rr.throwArgumentError(
              "event arguments/values mismatch",
              "values",
              r
            ),
          t.inputs.forEach((t, o) => {
            const s = r[o];
            if (t.indexed)
              if ("string" === t.type) e.push(tr(s));
              else if ("bytes" === t.type) e.push(ct(s));
              else {
                if ("tuple" === t.baseType || "array" === t.baseType)
                  throw new Error("not implemented");
                e.push(this._abiCoder.encode([t.type], [s]));
              }
            else i.push(t), n.push(s);
          }),
          { data: this._abiCoder.encode(i, n), topics: e }
        );
      }
      decodeEventLog(t, r, e) {
        if (
          ("string" == typeof t && (t = this.getEvent(t)),
          null != e && !t.anonymous)
        ) {
          let r = this.getEventTopic(t);
          (w(e[0], 32) && e[0].toLowerCase() === r) ||
            rr.throwError(
              "fragment/topic mismatch",
              c.errors.INVALID_ARGUMENT,
              { argument: "topics[0]", expected: r, value: e[0] }
            ),
            (e = e.slice(1));
        }
        let i = [],
          n = [],
          o = [];
        t.inputs.forEach((t, r) => {
          t.indexed
            ? "string" === t.type ||
              "bytes" === t.type ||
              "tuple" === t.baseType ||
              "array" === t.baseType
              ? (i.push(V.fromObject({ type: "bytes32", name: t.name })),
                o.push(!0))
              : (i.push(t), o.push(!1))
            : (n.push(t), o.push(!1));
        });
        let s = null != e ? this._abiCoder.decode(i, y(e)) : null,
          u = this._abiCoder.decode(n, r),
          h = [],
          a = 0,
          l = 0;
        t.inputs.forEach((t, r) => {
          if (t.indexed)
            if (null == s) h[r] = new nr({ _isIndexed: !0, hash: null });
            else if (o[r]) h[r] = new nr({ _isIndexed: !0, hash: s[l++] });
            else
              try {
                h[r] = s[l++];
              } catch (t) {
                h[r] = t;
              }
          else
            try {
              h[r] = u[a++];
            } catch (t) {
              h[r] = t;
            }
          if (t.name && null == h[t.name]) {
            const e = h[r];
            e instanceof Error
              ? Object.defineProperty(h, t.name, {
                  get: () => {
                    throw or("property " + JSON.stringify(t.name), e);
                  },
                })
              : (h[t.name] = e);
          }
        });
        for (let t = 0; t < h.length; t++) {
          const r = h[t];
          r instanceof Error &&
            Object.defineProperty(h, t, {
              get: () => {
                throw or("index " + t, r);
              },
            });
        }
        return Object.freeze(h);
      }
      parseTransaction(t) {
        let r = this.getFunction(t.data.substring(0, 10).toLowerCase());
        return r
          ? new ir({
              args: this._abiCoder.decode(
                r.inputs,
                "0x" + t.data.substring(10)
              ),
              functionFragment: r,
              name: r.name,
              signature: r.format(),
              sighash: this.getSighash(r),
              value: x.from(t.value || "0"),
            })
          : null;
      }
      parseLog(t) {
        let r = this.getEvent(t.topics[0]);
        return !r || r.anonymous
          ? null
          : new er({
              eventFragment: r,
              name: r.name,
              signature: r.format(),
              topic: this.getEventTopic(r),
              args: this.decodeEventLog(r, t.data, t.topics),
            });
      }
      static isInterface(t) {
        return !(!t || !t._isInterface);
      }
    }
  },
  function (t, r, e) {
    (function (r, e) {
      /**
       * [js-sha3]{@link https://github.com/emn178/js-sha3}
       *
       * @version 0.5.7
       * @author Chen, Yi-Cyuan [emn178@gmail.com]
       * @copyright Chen, Yi-Cyuan 2015-2016
       * @license MIT
       */
      !(function () {
        "use strict";
        var i = "object" == typeof window ? window : {};
        !i.JS_SHA3_NO_NODE_JS &&
          "object" == typeof r &&
          r.versions &&
          r.versions.node &&
          (i = e);
        for (
          var n = !i.JS_SHA3_NO_COMMON_JS && "object" == typeof t && t.exports,
            o = "0123456789abcdef".split(""),
            s = [0, 8, 16, 24],
            u = [
              1,
              0,
              32898,
              0,
              32906,
              2147483648,
              2147516416,
              2147483648,
              32907,
              0,
              2147483649,
              0,
              2147516545,
              2147483648,
              32777,
              2147483648,
              138,
              0,
              136,
              0,
              2147516425,
              0,
              2147483658,
              0,
              2147516555,
              0,
              139,
              2147483648,
              32905,
              2147483648,
              32771,
              2147483648,
              32770,
              2147483648,
              128,
              2147483648,
              32778,
              0,
              2147483658,
              2147483648,
              2147516545,
              2147483648,
              32896,
              2147483648,
              2147483649,
              0,
              2147516424,
              2147483648,
            ],
            h = [224, 256, 384, 512],
            a = ["hex", "buffer", "arrayBuffer", "array"],
            l = function (t, r, e) {
              return function (i) {
                return new b(t, r, t).update(i)[e]();
              };
            },
            f = function (t, r, e) {
              return function (i, n) {
                return new b(t, r, n).update(i)[e]();
              };
            },
            c = function (t, r) {
              var e = l(t, r, "hex");
              (e.create = function () {
                return new b(t, r, t);
              }),
                (e.update = function (t) {
                  return e.create().update(t);
                });
              for (var i = 0; i < a.length; ++i) {
                var n = a[i];
                e[n] = l(t, r, n);
              }
              return e;
            },
            m = [
              {
                name: "keccak",
                padding: [1, 256, 65536, 16777216],
                bits: h,
                createMethod: c,
              },
              {
                name: "sha3",
                padding: [6, 1536, 393216, 100663296],
                bits: h,
                createMethod: c,
              },
              {
                name: "shake",
                padding: [31, 7936, 2031616, 520093696],
                bits: [128, 256],
                createMethod: function (t, r) {
                  var e = f(t, r, "hex");
                  (e.create = function (e) {
                    return new b(t, r, e);
                  }),
                    (e.update = function (t, r) {
                      return e.create(r).update(t);
                    });
                  for (var i = 0; i < a.length; ++i) {
                    var n = a[i];
                    e[n] = f(t, r, n);
                  }
                  return e;
                },
              },
            ],
            p = {},
            d = [],
            g = 0;
          g < m.length;
          ++g
        )
          for (var v = m[g], y = v.bits, w = 0; w < y.length; ++w) {
            var M = v.name + "_" + y[w];
            d.push(M), (p[M] = v.createMethod(y[w], v.padding));
          }
        function b(t, r, e) {
          (this.blocks = []),
            (this.s = []),
            (this.padding = r),
            (this.outputBits = e),
            (this.reset = !0),
            (this.block = 0),
            (this.start = 0),
            (this.blockCount = (1600 - (t << 1)) >> 5),
            (this.byteCount = this.blockCount << 2),
            (this.outputBlocks = e >> 5),
            (this.extraBytes = (31 & e) >> 3);
          for (var i = 0; i < 50; ++i) this.s[i] = 0;
        }
        (b.prototype.update = function (t) {
          var r = "string" != typeof t;
          r && t.constructor === ArrayBuffer && (t = new Uint8Array(t));
          for (
            var e,
              i,
              n = t.length,
              o = this.blocks,
              u = this.byteCount,
              h = this.blockCount,
              a = 0,
              l = this.s;
            a < n;

          ) {
            if (this.reset)
              for (this.reset = !1, o[0] = this.block, e = 1; e < h + 1; ++e)
                o[e] = 0;
            if (r)
              for (e = this.start; a < n && e < u; ++a)
                o[e >> 2] |= t[a] << s[3 & e++];
            else
              for (e = this.start; a < n && e < u; ++a)
                (i = t.charCodeAt(a)) < 128
                  ? (o[e >> 2] |= i << s[3 & e++])
                  : i < 2048
                  ? ((o[e >> 2] |= (192 | (i >> 6)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | (63 & i)) << s[3 & e++]))
                  : i < 55296 || i >= 57344
                  ? ((o[e >> 2] |= (224 | (i >> 12)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | ((i >> 6) & 63)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | (63 & i)) << s[3 & e++]))
                  : ((i =
                      65536 +
                      (((1023 & i) << 10) | (1023 & t.charCodeAt(++a)))),
                    (o[e >> 2] |= (240 | (i >> 18)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | ((i >> 12) & 63)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | ((i >> 6) & 63)) << s[3 & e++]),
                    (o[e >> 2] |= (128 | (63 & i)) << s[3 & e++]));
            if (((this.lastByteIndex = e), e >= u)) {
              for (this.start = e - u, this.block = o[h], e = 0; e < h; ++e)
                l[e] ^= o[e];
              _(l), (this.reset = !0);
            } else this.start = e;
          }
          return this;
        }),
          (b.prototype.finalize = function () {
            var t = this.blocks,
              r = this.lastByteIndex,
              e = this.blockCount,
              i = this.s;
            if (
              ((t[r >> 2] |= this.padding[3 & r]),
              this.lastByteIndex === this.byteCount)
            )
              for (t[0] = t[e], r = 1; r < e + 1; ++r) t[r] = 0;
            for (t[e - 1] |= 2147483648, r = 0; r < e; ++r) i[r] ^= t[r];
            _(i);
          }),
          (b.prototype.toString = b.prototype.hex = function () {
            this.finalize();
            for (
              var t,
                r = this.blockCount,
                e = this.s,
                i = this.outputBlocks,
                n = this.extraBytes,
                s = 0,
                u = 0,
                h = "";
              u < i;

            ) {
              for (s = 0; s < r && u < i; ++s, ++u)
                (t = e[s]),
                  (h +=
                    o[(t >> 4) & 15] +
                    o[15 & t] +
                    o[(t >> 12) & 15] +
                    o[(t >> 8) & 15] +
                    o[(t >> 20) & 15] +
                    o[(t >> 16) & 15] +
                    o[(t >> 28) & 15] +
                    o[(t >> 24) & 15]);
              u % r == 0 && (_(e), (s = 0));
            }
            return (
              n &&
                ((t = e[s]),
                n > 0 && (h += o[(t >> 4) & 15] + o[15 & t]),
                n > 1 && (h += o[(t >> 12) & 15] + o[(t >> 8) & 15]),
                n > 2 && (h += o[(t >> 20) & 15] + o[(t >> 16) & 15])),
              h
            );
          }),
          (b.prototype.arrayBuffer = function () {
            this.finalize();
            var t,
              r = this.blockCount,
              e = this.s,
              i = this.outputBlocks,
              n = this.extraBytes,
              o = 0,
              s = 0,
              u = this.outputBits >> 3;
            t = n ? new ArrayBuffer((i + 1) << 2) : new ArrayBuffer(u);
            for (var h = new Uint32Array(t); s < i; ) {
              for (o = 0; o < r && s < i; ++o, ++s) h[s] = e[o];
              s % r == 0 && _(e);
            }
            return n && ((h[o] = e[o]), (t = t.slice(0, u))), t;
          }),
          (b.prototype.buffer = b.prototype.arrayBuffer),
          (b.prototype.digest = b.prototype.array = function () {
            this.finalize();
            for (
              var t,
                r,
                e = this.blockCount,
                i = this.s,
                n = this.outputBlocks,
                o = this.extraBytes,
                s = 0,
                u = 0,
                h = [];
              u < n;

            ) {
              for (s = 0; s < e && u < n; ++s, ++u)
                (t = u << 2),
                  (r = i[s]),
                  (h[t] = 255 & r),
                  (h[t + 1] = (r >> 8) & 255),
                  (h[t + 2] = (r >> 16) & 255),
                  (h[t + 3] = (r >> 24) & 255);
              u % e == 0 && _(i);
            }
            return (
              o &&
                ((t = u << 2),
                (r = i[s]),
                o > 0 && (h[t] = 255 & r),
                o > 1 && (h[t + 1] = (r >> 8) & 255),
                o > 2 && (h[t + 2] = (r >> 16) & 255)),
              h
            );
          });
        var _ = function (t) {
          var r,
            e,
            i,
            n,
            o,
            s,
            h,
            a,
            l,
            f,
            c,
            m,
            p,
            d,
            g,
            v,
            y,
            w,
            M,
            b,
            _,
            A,
            E,
            x,
            S,
            B,
            N,
            T,
            k,
            R,
            O,
            I,
            C,
            P,
            j,
            F,
            U,
            L,
            D,
            z,
            q,
            Z,
            H,
            $,
            V,
            W,
            Y,
            G,
            J,
            K,
            X,
            Q,
            tt,
            rt,
            et,
            it,
            nt,
            ot,
            st,
            ut,
            ht,
            at,
            lt;
          for (i = 0; i < 48; i += 2)
            (n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
              (o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
              (s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]),
              (h = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]),
              (a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
              (l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
              (f = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
              (c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
              (r =
                (m = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
                ((s << 1) | (h >>> 31))),
              (e =
                (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
                ((h << 1) | (s >>> 31))),
              (t[0] ^= r),
              (t[1] ^= e),
              (t[10] ^= r),
              (t[11] ^= e),
              (t[20] ^= r),
              (t[21] ^= e),
              (t[30] ^= r),
              (t[31] ^= e),
              (t[40] ^= r),
              (t[41] ^= e),
              (r = n ^ ((a << 1) | (l >>> 31))),
              (e = o ^ ((l << 1) | (a >>> 31))),
              (t[2] ^= r),
              (t[3] ^= e),
              (t[12] ^= r),
              (t[13] ^= e),
              (t[22] ^= r),
              (t[23] ^= e),
              (t[32] ^= r),
              (t[33] ^= e),
              (t[42] ^= r),
              (t[43] ^= e),
              (r = s ^ ((f << 1) | (c >>> 31))),
              (e = h ^ ((c << 1) | (f >>> 31))),
              (t[4] ^= r),
              (t[5] ^= e),
              (t[14] ^= r),
              (t[15] ^= e),
              (t[24] ^= r),
              (t[25] ^= e),
              (t[34] ^= r),
              (t[35] ^= e),
              (t[44] ^= r),
              (t[45] ^= e),
              (r = a ^ ((m << 1) | (p >>> 31))),
              (e = l ^ ((p << 1) | (m >>> 31))),
              (t[6] ^= r),
              (t[7] ^= e),
              (t[16] ^= r),
              (t[17] ^= e),
              (t[26] ^= r),
              (t[27] ^= e),
              (t[36] ^= r),
              (t[37] ^= e),
              (t[46] ^= r),
              (t[47] ^= e),
              (r = f ^ ((n << 1) | (o >>> 31))),
              (e = c ^ ((o << 1) | (n >>> 31))),
              (t[8] ^= r),
              (t[9] ^= e),
              (t[18] ^= r),
              (t[19] ^= e),
              (t[28] ^= r),
              (t[29] ^= e),
              (t[38] ^= r),
              (t[39] ^= e),
              (t[48] ^= r),
              (t[49] ^= e),
              (d = t[0]),
              (g = t[1]),
              (W = (t[11] << 4) | (t[10] >>> 28)),
              (Y = (t[10] << 4) | (t[11] >>> 28)),
              (T = (t[20] << 3) | (t[21] >>> 29)),
              (k = (t[21] << 3) | (t[20] >>> 29)),
              (ut = (t[31] << 9) | (t[30] >>> 23)),
              (ht = (t[30] << 9) | (t[31] >>> 23)),
              (Z = (t[40] << 18) | (t[41] >>> 14)),
              (H = (t[41] << 18) | (t[40] >>> 14)),
              (P = (t[2] << 1) | (t[3] >>> 31)),
              (j = (t[3] << 1) | (t[2] >>> 31)),
              (v = (t[13] << 12) | (t[12] >>> 20)),
              (y = (t[12] << 12) | (t[13] >>> 20)),
              (G = (t[22] << 10) | (t[23] >>> 22)),
              (J = (t[23] << 10) | (t[22] >>> 22)),
              (R = (t[33] << 13) | (t[32] >>> 19)),
              (O = (t[32] << 13) | (t[33] >>> 19)),
              (at = (t[42] << 2) | (t[43] >>> 30)),
              (lt = (t[43] << 2) | (t[42] >>> 30)),
              (rt = (t[5] << 30) | (t[4] >>> 2)),
              (et = (t[4] << 30) | (t[5] >>> 2)),
              (F = (t[14] << 6) | (t[15] >>> 26)),
              (U = (t[15] << 6) | (t[14] >>> 26)),
              (w = (t[25] << 11) | (t[24] >>> 21)),
              (M = (t[24] << 11) | (t[25] >>> 21)),
              (K = (t[34] << 15) | (t[35] >>> 17)),
              (X = (t[35] << 15) | (t[34] >>> 17)),
              (I = (t[45] << 29) | (t[44] >>> 3)),
              (C = (t[44] << 29) | (t[45] >>> 3)),
              (x = (t[6] << 28) | (t[7] >>> 4)),
              (S = (t[7] << 28) | (t[6] >>> 4)),
              (it = (t[17] << 23) | (t[16] >>> 9)),
              (nt = (t[16] << 23) | (t[17] >>> 9)),
              (L = (t[26] << 25) | (t[27] >>> 7)),
              (D = (t[27] << 25) | (t[26] >>> 7)),
              (b = (t[36] << 21) | (t[37] >>> 11)),
              (_ = (t[37] << 21) | (t[36] >>> 11)),
              (Q = (t[47] << 24) | (t[46] >>> 8)),
              (tt = (t[46] << 24) | (t[47] >>> 8)),
              ($ = (t[8] << 27) | (t[9] >>> 5)),
              (V = (t[9] << 27) | (t[8] >>> 5)),
              (B = (t[18] << 20) | (t[19] >>> 12)),
              (N = (t[19] << 20) | (t[18] >>> 12)),
              (ot = (t[29] << 7) | (t[28] >>> 25)),
              (st = (t[28] << 7) | (t[29] >>> 25)),
              (z = (t[38] << 8) | (t[39] >>> 24)),
              (q = (t[39] << 8) | (t[38] >>> 24)),
              (A = (t[48] << 14) | (t[49] >>> 18)),
              (E = (t[49] << 14) | (t[48] >>> 18)),
              (t[0] = d ^ (~v & w)),
              (t[1] = g ^ (~y & M)),
              (t[10] = x ^ (~B & T)),
              (t[11] = S ^ (~N & k)),
              (t[20] = P ^ (~F & L)),
              (t[21] = j ^ (~U & D)),
              (t[30] = $ ^ (~W & G)),
              (t[31] = V ^ (~Y & J)),
              (t[40] = rt ^ (~it & ot)),
              (t[41] = et ^ (~nt & st)),
              (t[2] = v ^ (~w & b)),
              (t[3] = y ^ (~M & _)),
              (t[12] = B ^ (~T & R)),
              (t[13] = N ^ (~k & O)),
              (t[22] = F ^ (~L & z)),
              (t[23] = U ^ (~D & q)),
              (t[32] = W ^ (~G & K)),
              (t[33] = Y ^ (~J & X)),
              (t[42] = it ^ (~ot & ut)),
              (t[43] = nt ^ (~st & ht)),
              (t[4] = w ^ (~b & A)),
              (t[5] = M ^ (~_ & E)),
              (t[14] = T ^ (~R & I)),
              (t[15] = k ^ (~O & C)),
              (t[24] = L ^ (~z & Z)),
              (t[25] = D ^ (~q & H)),
              (t[34] = G ^ (~K & Q)),
              (t[35] = J ^ (~X & tt)),
              (t[44] = ot ^ (~ut & at)),
              (t[45] = st ^ (~ht & lt)),
              (t[6] = b ^ (~A & d)),
              (t[7] = _ ^ (~E & g)),
              (t[16] = R ^ (~I & x)),
              (t[17] = O ^ (~C & S)),
              (t[26] = z ^ (~Z & P)),
              (t[27] = q ^ (~H & j)),
              (t[36] = K ^ (~Q & $)),
              (t[37] = X ^ (~tt & V)),
              (t[46] = ut ^ (~at & rt)),
              (t[47] = ht ^ (~lt & et)),
              (t[8] = A ^ (~d & v)),
              (t[9] = E ^ (~g & y)),
              (t[18] = I ^ (~x & B)),
              (t[19] = C ^ (~S & N)),
              (t[28] = Z ^ (~P & F)),
              (t[29] = H ^ (~j & U)),
              (t[38] = Q ^ (~$ & W)),
              (t[39] = tt ^ (~V & Y)),
              (t[48] = at ^ (~rt & it)),
              (t[49] = lt ^ (~et & nt)),
              (t[0] ^= u[i]),
              (t[1] ^= u[i + 1]);
        };
        if (n) t.exports = p;
        else for (g = 0; g < d.length; ++g) i[d[g]] = p[d[g]];
      })();
    }.call(this, e(5), e(1)));
  },
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__),
      function (module) {
        var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            6
          ),
          _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
            _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__
          ),
          _require = __webpack_require__(7),
          sha3 = _require.sha3,
          BN = _require.BN,
          abiCoder = __webpack_require__(32),
          state = { savedABIs: [], methodIDs: {} };
        function _getABIs() {
          return state.savedABIs;
        }
        function _typeToString(t) {
          return "tuple" === t.type
            ? "(" + t.components.map(_typeToString).join(",") + ")"
            : t.type;
        }
        function _addABI(t) {
          if (!Array.isArray(t))
            throw new Error(
              "Expected ABI array, got " +
                _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(
                  t
                )
            );
          t.map(function (t) {
            if (t.name) {
              var r = sha3(
                t.name + "(" + t.inputs.map(_typeToString).join(",") + ")"
              );
              "event" === t.type
                ? (state.methodIDs[r.slice(2)] = t)
                : (state.methodIDs[r.slice(2, 10)] = t);
            }
          }),
            (state.savedABIs = state.savedABIs.concat(t));
        }
        function _removeABI(t) {
          if (!Array.isArray(t))
            throw new Error(
              "Expected ABI array, got " +
                _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(
                  t
                )
            );
          t.map(function (t) {
            if (t.name) {
              var r = sha3(
                t.name +
                  "(" +
                  t.inputs
                    .map(function (t) {
                      return t.type;
                    })
                    .join(",") +
                  ")"
              );
              "event" === t.type
                ? state.methodIDs[r.slice(2)] &&
                  delete state.methodIDs[r.slice(2)]
                : state.methodIDs[r.slice(2, 10)] &&
                  delete state.methodIDs[r.slice(2, 10)];
            }
          });
        }
        function _getMethodIDs() {
          return state.methodIDs;
        }
        function _decodeMethod(data) {
          var methodID = data.slice(2, 10),
            abiItem = state.methodIDs[methodID];
          if (abiItem) {
            for (
              var decoded = abiCoder.decodeParameters(
                  abiItem.inputs,
                  data.slice(10)
                ),
                retData = { name: abiItem.name, params: [] },
                i = 0;
              i < decoded.__length__;
              i++
            ) {
              var param = decoded[i],
                parsedParam = param,
                isUint = 0 === abiItem.inputs[i].type.indexOf("uint"),
                isInt = 0 === abiItem.inputs[i].type.indexOf("int"),
                isAddress = 0 === abiItem.inputs[i].type.indexOf("address");
              if (isUint || isInt) {
                var isArray = Array.isArray(param);
                parsedParam = isArray
                  ? param.map(function (t) {
                      return new BN(t).toString();
                    })
                  : new BN(param).toString();
              }
              if (isAddress) {
                var _isArray = Array.isArray(param);
                parsedParam = _isArray
                  ? param[0].constructor === Array
                    ? eval(param.toString().toLowerCase())
                    : param.map(function (t) {
                        return t.toLowerCase();
                      })
                  : param.toLowerCase();
              }
              retData.params.push({
                name: abiItem.inputs[i].name,
                value: parsedParam,
                type: abiItem.inputs[i].type,
              });
            }
            return retData;
          }
        }
        function _decodeLogs(t) {
          return t
            .filter(function (t) {
              return t.topics.length > 0;
            })
            .map(function (t) {
              var r = t.topics[0].slice(2),
                e = state.methodIDs[r];
              if (e) {
                var i = t.data,
                  n = [],
                  o = 0,
                  s = 1,
                  u = [];
                e.inputs.map(function (t) {
                  t.indexed || u.push(t.type);
                });
                var h = abiCoder.decodeParameters(u, i.slice(2));
                return (
                  e.inputs.map(function (r) {
                    var e = { name: r.name, type: r.type };
                    if (
                      (r.indexed
                        ? ((e.value = t.topics[s]), s++)
                        : ((e.value = h[o]), o++),
                      "address" === r.type &&
                        e.value &&
                        ((e.value = e.value.toLowerCase()),
                        e.value.length > 42))
                    ) {
                      var i = e.value.length - 42,
                        u = e.value.split("");
                      u.splice(2, i), (e.value = u.join(""));
                    }
                    ("uint256" !== r.type &&
                      "uint8" !== r.type &&
                      "int" !== r.type) ||
                      ("string" == typeof e.value && e.value.startsWith("0x")
                        ? (e.value = new BN(e.value.slice(2), 16).toString(10))
                        : (e.value = new BN(e.value).toString(10))),
                      n.push(e);
                  }),
                  { name: e.name, events: n, address: t.address }
                );
              }
            });
        }
        module.exports = {
          getABIs: _getABIs,
          addABI: _addABI,
          getMethodIDs: _getMethodIDs,
          decodeMethod: _decodeMethod,
          decodeLogs: _decodeLogs,
          removeABI: _removeABI,
        };
      }.call(this, __webpack_require__(13)(module));
  },
  function (t, r) {
    t.exports = function (t) {
      if (!t.webpackPolyfill) {
        var r = Object.create(t);
        r.children || (r.children = []),
          Object.defineProperty(r, "loaded", {
            enumerable: !0,
            get: function () {
              return r.l;
            },
          }),
          Object.defineProperty(r, "id", {
            enumerable: !0,
            get: function () {
              return r.i;
            },
          }),
          Object.defineProperty(r, "exports", { enumerable: !0 }),
          (r.webpackPolyfill = 1);
      }
      return r;
    };
  },
  function (t, r, e) {
    "use strict";
    var i = e(15),
      n = e(8),
      o = new i(0),
      s = new i(-1),
      u = {
        noether: "0",
        wei: "1",
        kwei: "1000",
        Kwei: "1000",
        babbage: "1000",
        femtoether: "1000",
        mwei: "1000000",
        Mwei: "1000000",
        lovelace: "1000000",
        picoether: "1000000",
        gwei: "1000000000",
        Gwei: "1000000000",
        shannon: "1000000000",
        nanoether: "1000000000",
        nano: "1000000000",
        szabo: "1000000000000",
        microether: "1000000000000",
        micro: "1000000000000",
        finney: "1000000000000000",
        milliether: "1000000000000000",
        milli: "1000000000000000",
        ether: "1000000000000000000",
        kether: "1000000000000000000000",
        grand: "1000000000000000000000",
        mether: "1000000000000000000000000",
        gether: "1000000000000000000000000000",
        tether: "1000000000000000000000000000000",
      };
    function h(t) {
      var r = t ? t.toLowerCase() : "ether",
        e = u[r];
      if ("string" != typeof e)
        throw new Error(
          "[ethjs-unit] the unit provided " +
            t +
            " doesn't exists, please use the one of the following units " +
            JSON.stringify(u, null, 2)
        );
      return new i(e, 10);
    }
    function a(t) {
      if ("string" == typeof t) {
        if (!t.match(/^-?[0-9.]+$/))
          throw new Error(
            "while converting number to string, invalid number value '" +
              t +
              "', should be a number matching (^-?[0-9.]+)."
          );
        return t;
      }
      if ("number" == typeof t) return String(t);
      if (
        "object" == typeof t &&
        t.toString &&
        (t.toTwos || t.dividedToIntegerBy)
      )
        return t.toPrecision ? String(t.toPrecision()) : t.toString(10);
      throw new Error(
        "while converting number to string, invalid number value '" +
          t +
          "' type " +
          typeof t +
          "."
      );
    }
    t.exports = {
      unitMap: u,
      numberToString: a,
      getValueOfUnit: h,
      fromWei: function (t, r, e) {
        var i = n(t),
          a = i.lt(o),
          l = h(r),
          f = u[r].length - 1 || 1,
          c = e || {};
        a && (i = i.mul(s));
        for (var m = i.mod(l).toString(10); m.length < f; ) m = "0" + m;
        c.pad || (m = m.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
        var p = i.div(l).toString(10);
        c.commify && (p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        var d = p + ("0" == m ? "" : "." + m);
        return a && (d = "-" + d), d;
      },
      toWei: function (t, r) {
        var e = a(t),
          n = h(r),
          o = u[r].length - 1 || 1,
          l = "-" === e.substring(0, 1);
        if ((l && (e = e.substring(1)), "." === e))
          throw new Error(
            "[ethjs-unit] while converting number " +
              t +
              " to wei, invalid value"
          );
        var f = e.split(".");
        if (f.length > 2)
          throw new Error(
            "[ethjs-unit] while converting number " +
              t +
              " to wei,  too many decimal points"
          );
        var c = f[0],
          m = f[1];
        if ((c || (c = "0"), m || (m = "0"), m.length > o))
          throw new Error(
            "[ethjs-unit] while converting number " +
              t +
              " to wei, too many decimal places"
          );
        for (; m.length < o; ) m += "0";
        (c = new i(c)), (m = new i(m));
        var p = c.mul(n).add(m);
        return l && (p = p.mul(s)), new i(p.toString(10), 10);
      },
    };
  },
  function (t, r, e) {
    (function (t) {
      !(function (t, r) {
        "use strict";
        function i(t, r) {
          if (!t) throw new Error(r || "Assertion failed");
        }
        function n(t, r) {
          t.super_ = r;
          var e = function () {};
          (e.prototype = r.prototype),
            (t.prototype = new e()),
            (t.prototype.constructor = t);
        }
        function o(t, r, e) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== r && "be" !== r) || ((e = r), (r = 10)),
              this._init(t || 0, r || 10, e || "be"));
        }
        var s;
        "object" == typeof t ? (t.exports = o) : (r.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          s = e(2).Buffer;
        } catch (t) {}
        function u(t, r, e) {
          for (var i = 0, n = Math.min(t.length, e), o = r; o < n; o++) {
            var s = t.charCodeAt(o) - 48;
            (i <<= 4),
              (i |=
                s >= 49 && s <= 54
                  ? s - 49 + 10
                  : s >= 17 && s <= 22
                  ? s - 17 + 10
                  : 15 & s);
          }
          return i;
        }
        function h(t, r, e, i) {
          for (var n = 0, o = Math.min(t.length, e), s = r; s < o; s++) {
            var u = t.charCodeAt(s) - 48;
            (n *= i), (n += u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u);
          }
          return n;
        }
        (o.isBN = function (t) {
          return (
            t instanceof o ||
            (null !== t &&
              "object" == typeof t &&
              t.constructor.wordSize === o.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (o.max = function (t, r) {
            return t.cmp(r) > 0 ? t : r;
          }),
          (o.min = function (t, r) {
            return t.cmp(r) < 0 ? t : r;
          }),
          (o.prototype._init = function (t, r, e) {
            if ("number" == typeof t) return this._initNumber(t, r, e);
            if ("object" == typeof t) return this._initArray(t, r, e);
            "hex" === r && (r = 16), i(r === (0 | r) && r >= 2 && r <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++,
              16 === r ? this._parseHex(t, n) : this._parseBase(t, r, n),
              "-" === t[0] && (this.negative = 1),
              this.strip(),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initNumber = function (t, r, e) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initArray = function (t, r, e) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var o,
              s,
              u = 0;
            if ("be" === e)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            else if ("le" === e)
              for (n = 0, o = 0; n < t.length; n += 3)
                (s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            return this.strip();
          }),
          (o.prototype._parseHex = function (t, r) {
            (this.length = Math.ceil((t.length - r) / 6)),
              (this.words = new Array(this.length));
            for (var e = 0; e < this.length; e++) this.words[e] = 0;
            var i,
              n,
              o = 0;
            for (e = t.length - 6, i = 0; e >= r; e -= 6)
              (n = u(t, e, e + 6)),
                (this.words[i] |= (n << o) & 67108863),
                (this.words[i + 1] |= (n >>> (26 - o)) & 4194303),
                (o += 24) >= 26 && ((o -= 26), i++);
            e + 6 !== r &&
              ((n = u(t, r, e + 6)),
              (this.words[i] |= (n << o) & 67108863),
              (this.words[i + 1] |= (n >>> (26 - o)) & 4194303)),
              this.strip();
          }),
          (o.prototype._parseBase = function (t, r, e) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= r) i++;
            i--, (n = (n / r) | 0);
            for (
              var o = t.length - e,
                s = o % i,
                u = Math.min(o, o - s) + e,
                a = 0,
                l = e;
              l < u;
              l += i
            )
              (a = h(t, l, l + i, r)),
                this.imuln(n),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            if (0 !== s) {
              var f = 1;
              for (a = h(t, l, t.length, r), l = 0; l < s; l++) f *= r;
              this.imuln(f),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            }
          }),
          (o.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var r = 0; r < this.length; r++) t.words[r] = this.words[r];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (o.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var a = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          l = [
            0,
            0,
            25,
            16,
            12,
            11,
            10,
            9,
            8,
            8,
            7,
            7,
            7,
            7,
            6,
            6,
            6,
            6,
            6,
            6,
            6,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
          ],
          f = [
            0,
            0,
            33554432,
            43046721,
            16777216,
            48828125,
            60466176,
            40353607,
            16777216,
            43046721,
            1e7,
            19487171,
            35831808,
            62748517,
            7529536,
            11390625,
            16777216,
            24137569,
            34012224,
            47045881,
            64e6,
            4084101,
            5153632,
            6436343,
            7962624,
            9765625,
            11881376,
            14348907,
            17210368,
            20511149,
            243e5,
            28629151,
            33554432,
            39135393,
            45435424,
            52521875,
            60466176,
          ];
        function c(t, r, e) {
          e.negative = r.negative ^ t.negative;
          var i = (t.length + r.length) | 0;
          (e.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            o = 0 | r.words[0],
            s = n * o,
            u = 67108863 & s,
            h = (s / 67108864) | 0;
          e.words[0] = u;
          for (var a = 1; a < i; a++) {
            for (
              var l = h >>> 26,
                f = 67108863 & h,
                c = Math.min(a, r.length - 1),
                m = Math.max(0, a - t.length + 1);
              m <= c;
              m++
            ) {
              var p = (a - m) | 0;
              (l +=
                ((s = (n = 0 | t.words[p]) * (o = 0 | r.words[m]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s);
            }
            (e.words[a] = 0 | f), (h = 0 | l);
          }
          return 0 !== h ? (e.words[a] = 0 | h) : e.length--, e.strip();
        }
        (o.prototype.toString = function (t, r) {
          var e;
          if (((r = 0 | r || 1), 16 === (t = t || 10) || "hex" === t)) {
            e = "";
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var u = this.words[s],
                h = (16777215 & ((u << n) | o)).toString(16);
              (e =
                0 !== (o = (u >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? a[6 - h.length] + h + e
                  : h + e),
                (n += 2) >= 26 && ((n -= 26), s--);
            }
            for (0 !== o && (e = o.toString(16) + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var c = l[t],
              m = f[t];
            e = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero(); ) {
              var d = p.modn(m).toString(t);
              e = (p = p.idivn(m)).isZero() ? d + e : a[c - d.length] + d + e;
            }
            for (this.isZero() && (e = "0" + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (o.prototype.toBuffer = function (t, r) {
            return i(void 0 !== s), this.toArrayLike(s, t, r);
          }),
          (o.prototype.toArray = function (t, r) {
            return this.toArrayLike(Array, t, r);
          }),
          (o.prototype.toArrayLike = function (t, r, e) {
            var n = this.byteLength(),
              o = e || Math.max(1, n);
            i(n <= o, "byte array longer than desired length"),
              i(o > 0, "Requested array length <= 0"),
              this.strip();
            var s,
              u,
              h = "le" === r,
              a = new t(o),
              l = this.clone();
            if (h) {
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[u] = s);
              for (; u < o; u++) a[u] = 0;
            } else {
              for (u = 0; u < o - n; u++) a[u] = 0;
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[o - u - 1] = s);
            }
            return a;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var r = t,
                  e = 0;
                return (
                  r >= 4096 && ((e += 13), (r >>>= 13)),
                  r >= 64 && ((e += 7), (r >>>= 7)),
                  r >= 8 && ((e += 4), (r >>>= 4)),
                  r >= 2 && ((e += 2), (r >>>= 2)),
                  e + r
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var r = t,
              e = 0;
            return (
              0 == (8191 & r) && ((e += 13), (r >>>= 13)),
              0 == (127 & r) && ((e += 7), (r >>>= 7)),
              0 == (15 & r) && ((e += 4), (r >>>= 4)),
              0 == (3 & r) && ((e += 2), (r >>>= 2)),
              0 == (1 & r) && e++,
              e
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              r = this._countBits(t);
            return 26 * (this.length - 1) + r;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, r = 0; r < this.length; r++) {
              var e = this._zeroBits(this.words[r]);
              if (((t += e), 26 !== e)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var r = 0; r < t.length; r++)
              this.words[r] = this.words[r] | t.words[r];
            return this.strip();
          }),
          (o.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var r;
            r = this.length > t.length ? t : this;
            for (var e = 0; e < r.length; e++)
              this.words[e] = this.words[e] & t.words[e];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            var r, e;
            this.length > t.length
              ? ((r = this), (e = t))
              : ((r = t), (e = this));
            for (var i = 0; i < e.length; i++)
              this.words[i] = r.words[i] ^ e.words[i];
            if (this !== r)
              for (; i < r.length; i++) this.words[i] = r.words[i];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = 0 | Math.ceil(t / 26),
              e = t % 26;
            this._expand(r), e > 0 && r--;
            for (var n = 0; n < r; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              e > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - e))),
              this.strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, r) {
            i("number" == typeof t && t >= 0);
            var e = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(e + 1),
              (this.words[e] = r
                ? this.words[e] | (1 << n)
                : this.words[e] & ~(1 << n)),
              this.strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            var r, e, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (r = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (r = this.isub(t)),
                (t.negative = 1),
                r._normSign()
              );
            this.length > t.length
              ? ((e = this), (i = t))
              : ((e = t), (i = this));
            for (var n = 0, o = 0; o < i.length; o++)
              (r = (0 | e.words[o]) + (0 | i.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            for (; 0 !== n && o < e.length; o++)
              (r = (0 | e.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            if (((this.length = e.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (e !== this)
              for (; o < e.length; o++) this.words[o] = e.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var r;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (r = this.sub(t)), (t.negative ^= 1), r)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (r = t.sub(this)), (this.negative = 1), r)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var r = this.iadd(t);
              return (t.negative = 1), r._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var e,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((e = this), (i = t)) : ((e = t), (i = this));
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (r = (0 | e.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            for (; 0 !== o && s < e.length; s++)
              (o = (r = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var m = function (t, r, e) {
          var i,
            n,
            o,
            s = t.words,
            u = r.words,
            h = e.words,
            a = 0,
            l = 0 | s[0],
            f = 8191 & l,
            c = l >>> 13,
            m = 0 | s[1],
            p = 8191 & m,
            d = m >>> 13,
            g = 0 | s[2],
            v = 8191 & g,
            y = g >>> 13,
            w = 0 | s[3],
            M = 8191 & w,
            b = w >>> 13,
            _ = 0 | s[4],
            A = 8191 & _,
            E = _ >>> 13,
            x = 0 | s[5],
            S = 8191 & x,
            B = x >>> 13,
            N = 0 | s[6],
            T = 8191 & N,
            k = N >>> 13,
            R = 0 | s[7],
            O = 8191 & R,
            I = R >>> 13,
            C = 0 | s[8],
            P = 8191 & C,
            j = C >>> 13,
            F = 0 | s[9],
            U = 8191 & F,
            L = F >>> 13,
            D = 0 | u[0],
            z = 8191 & D,
            q = D >>> 13,
            Z = 0 | u[1],
            H = 8191 & Z,
            $ = Z >>> 13,
            V = 0 | u[2],
            W = 8191 & V,
            Y = V >>> 13,
            G = 0 | u[3],
            J = 8191 & G,
            K = G >>> 13,
            X = 0 | u[4],
            Q = 8191 & X,
            tt = X >>> 13,
            rt = 0 | u[5],
            et = 8191 & rt,
            it = rt >>> 13,
            nt = 0 | u[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            ut = 0 | u[7],
            ht = 8191 & ut,
            at = ut >>> 13,
            lt = 0 | u[8],
            ft = 8191 & lt,
            ct = lt >>> 13,
            mt = 0 | u[9],
            pt = 8191 & mt,
            dt = mt >>> 13;
          (e.negative = t.negative ^ r.negative), (e.length = 19);
          var gt =
            (((a + (i = Math.imul(f, z))) | 0) +
              ((8191 & (n = ((n = Math.imul(f, q)) + Math.imul(c, z)) | 0)) <<
                13)) |
            0;
          (a = ((((o = Math.imul(c, q)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (i = Math.imul(p, z)),
            (n = ((n = Math.imul(p, q)) + Math.imul(d, z)) | 0),
            (o = Math.imul(d, q));
          var vt =
            (((a + (i = (i + Math.imul(f, H)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, $)) | 0) + Math.imul(c, H)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, $)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(v, z)),
            (n = ((n = Math.imul(v, q)) + Math.imul(y, z)) | 0),
            (o = Math.imul(y, q)),
            (i = (i + Math.imul(p, H)) | 0),
            (n = ((n = (n + Math.imul(p, $)) | 0) + Math.imul(d, H)) | 0),
            (o = (o + Math.imul(d, $)) | 0);
          var yt =
            (((a + (i = (i + Math.imul(f, W)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, Y)) | 0) + Math.imul(c, W)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, Y)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(M, z)),
            (n = ((n = Math.imul(M, q)) + Math.imul(b, z)) | 0),
            (o = Math.imul(b, q)),
            (i = (i + Math.imul(v, H)) | 0),
            (n = ((n = (n + Math.imul(v, $)) | 0) + Math.imul(y, H)) | 0),
            (o = (o + Math.imul(y, $)) | 0),
            (i = (i + Math.imul(p, W)) | 0),
            (n = ((n = (n + Math.imul(p, Y)) | 0) + Math.imul(d, W)) | 0),
            (o = (o + Math.imul(d, Y)) | 0);
          var wt =
            (((a + (i = (i + Math.imul(f, J)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, K)) | 0) + Math.imul(c, J)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, K)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(A, z)),
            (n = ((n = Math.imul(A, q)) + Math.imul(E, z)) | 0),
            (o = Math.imul(E, q)),
            (i = (i + Math.imul(M, H)) | 0),
            (n = ((n = (n + Math.imul(M, $)) | 0) + Math.imul(b, H)) | 0),
            (o = (o + Math.imul(b, $)) | 0),
            (i = (i + Math.imul(v, W)) | 0),
            (n = ((n = (n + Math.imul(v, Y)) | 0) + Math.imul(y, W)) | 0),
            (o = (o + Math.imul(y, Y)) | 0),
            (i = (i + Math.imul(p, J)) | 0),
            (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(d, J)) | 0),
            (o = (o + Math.imul(d, K)) | 0);
          var Mt =
            (((a + (i = (i + Math.imul(f, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, tt)) | 0) + Math.imul(c, Q)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, tt)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(S, z)),
            (n = ((n = Math.imul(S, q)) + Math.imul(B, z)) | 0),
            (o = Math.imul(B, q)),
            (i = (i + Math.imul(A, H)) | 0),
            (n = ((n = (n + Math.imul(A, $)) | 0) + Math.imul(E, H)) | 0),
            (o = (o + Math.imul(E, $)) | 0),
            (i = (i + Math.imul(M, W)) | 0),
            (n = ((n = (n + Math.imul(M, Y)) | 0) + Math.imul(b, W)) | 0),
            (o = (o + Math.imul(b, Y)) | 0),
            (i = (i + Math.imul(v, J)) | 0),
            (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(y, J)) | 0),
            (o = (o + Math.imul(y, K)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(d, Q)) | 0),
            (o = (o + Math.imul(d, tt)) | 0);
          var bt =
            (((a + (i = (i + Math.imul(f, et)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, it)) | 0) + Math.imul(c, et)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, it)) | 0) + (n >>> 13)) | 0) +
              (bt >>> 26)) |
            0),
            (bt &= 67108863),
            (i = Math.imul(T, z)),
            (n = ((n = Math.imul(T, q)) + Math.imul(k, z)) | 0),
            (o = Math.imul(k, q)),
            (i = (i + Math.imul(S, H)) | 0),
            (n = ((n = (n + Math.imul(S, $)) | 0) + Math.imul(B, H)) | 0),
            (o = (o + Math.imul(B, $)) | 0),
            (i = (i + Math.imul(A, W)) | 0),
            (n = ((n = (n + Math.imul(A, Y)) | 0) + Math.imul(E, W)) | 0),
            (o = (o + Math.imul(E, Y)) | 0),
            (i = (i + Math.imul(M, J)) | 0),
            (n = ((n = (n + Math.imul(M, K)) | 0) + Math.imul(b, J)) | 0),
            (o = (o + Math.imul(b, K)) | 0),
            (i = (i + Math.imul(v, Q)) | 0),
            (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(y, Q)) | 0),
            (o = (o + Math.imul(y, tt)) | 0),
            (i = (i + Math.imul(p, et)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(d, et)) | 0),
            (o = (o + Math.imul(d, it)) | 0);
          var _t =
            (((a + (i = (i + Math.imul(f, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, st)) | 0) + Math.imul(c, ot)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(O, z)),
            (n = ((n = Math.imul(O, q)) + Math.imul(I, z)) | 0),
            (o = Math.imul(I, q)),
            (i = (i + Math.imul(T, H)) | 0),
            (n = ((n = (n + Math.imul(T, $)) | 0) + Math.imul(k, H)) | 0),
            (o = (o + Math.imul(k, $)) | 0),
            (i = (i + Math.imul(S, W)) | 0),
            (n = ((n = (n + Math.imul(S, Y)) | 0) + Math.imul(B, W)) | 0),
            (o = (o + Math.imul(B, Y)) | 0),
            (i = (i + Math.imul(A, J)) | 0),
            (n = ((n = (n + Math.imul(A, K)) | 0) + Math.imul(E, J)) | 0),
            (o = (o + Math.imul(E, K)) | 0),
            (i = (i + Math.imul(M, Q)) | 0),
            (n = ((n = (n + Math.imul(M, tt)) | 0) + Math.imul(b, Q)) | 0),
            (o = (o + Math.imul(b, tt)) | 0),
            (i = (i + Math.imul(v, et)) | 0),
            (n = ((n = (n + Math.imul(v, it)) | 0) + Math.imul(y, et)) | 0),
            (o = (o + Math.imul(y, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(d, ot)) | 0),
            (o = (o + Math.imul(d, st)) | 0);
          var At =
            (((a + (i = (i + Math.imul(f, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, at)) | 0) + Math.imul(c, ht)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, at)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(P, z)),
            (n = ((n = Math.imul(P, q)) + Math.imul(j, z)) | 0),
            (o = Math.imul(j, q)),
            (i = (i + Math.imul(O, H)) | 0),
            (n = ((n = (n + Math.imul(O, $)) | 0) + Math.imul(I, H)) | 0),
            (o = (o + Math.imul(I, $)) | 0),
            (i = (i + Math.imul(T, W)) | 0),
            (n = ((n = (n + Math.imul(T, Y)) | 0) + Math.imul(k, W)) | 0),
            (o = (o + Math.imul(k, Y)) | 0),
            (i = (i + Math.imul(S, J)) | 0),
            (n = ((n = (n + Math.imul(S, K)) | 0) + Math.imul(B, J)) | 0),
            (o = (o + Math.imul(B, K)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(M, et)) | 0),
            (n = ((n = (n + Math.imul(M, it)) | 0) + Math.imul(b, et)) | 0),
            (o = (o + Math.imul(b, it)) | 0),
            (i = (i + Math.imul(v, ot)) | 0),
            (n = ((n = (n + Math.imul(v, st)) | 0) + Math.imul(y, ot)) | 0),
            (o = (o + Math.imul(y, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(d, ht)) | 0),
            (o = (o + Math.imul(d, at)) | 0);
          var Et =
            (((a + (i = (i + Math.imul(f, ft)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, ct)) | 0) + Math.imul(c, ft)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, ct)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(U, z)),
            (n = ((n = Math.imul(U, q)) + Math.imul(L, z)) | 0),
            (o = Math.imul(L, q)),
            (i = (i + Math.imul(P, H)) | 0),
            (n = ((n = (n + Math.imul(P, $)) | 0) + Math.imul(j, H)) | 0),
            (o = (o + Math.imul(j, $)) | 0),
            (i = (i + Math.imul(O, W)) | 0),
            (n = ((n = (n + Math.imul(O, Y)) | 0) + Math.imul(I, W)) | 0),
            (o = (o + Math.imul(I, Y)) | 0),
            (i = (i + Math.imul(T, J)) | 0),
            (n = ((n = (n + Math.imul(T, K)) | 0) + Math.imul(k, J)) | 0),
            (o = (o + Math.imul(k, K)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(B, Q)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (i = (i + Math.imul(A, et)) | 0),
            (n = ((n = (n + Math.imul(A, it)) | 0) + Math.imul(E, et)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(M, ot)) | 0),
            (n = ((n = (n + Math.imul(M, st)) | 0) + Math.imul(b, ot)) | 0),
            (o = (o + Math.imul(b, st)) | 0),
            (i = (i + Math.imul(v, ht)) | 0),
            (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(y, ht)) | 0),
            (o = (o + Math.imul(y, at)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = ((n = (n + Math.imul(p, ct)) | 0) + Math.imul(d, ft)) | 0),
            (o = (o + Math.imul(d, ct)) | 0);
          var xt =
            (((a + (i = (i + Math.imul(f, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, dt)) | 0) + Math.imul(c, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, dt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(U, H)),
            (n = ((n = Math.imul(U, $)) + Math.imul(L, H)) | 0),
            (o = Math.imul(L, $)),
            (i = (i + Math.imul(P, W)) | 0),
            (n = ((n = (n + Math.imul(P, Y)) | 0) + Math.imul(j, W)) | 0),
            (o = (o + Math.imul(j, Y)) | 0),
            (i = (i + Math.imul(O, J)) | 0),
            (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(I, J)) | 0),
            (o = (o + Math.imul(I, K)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(k, Q)) | 0),
            (o = (o + Math.imul(k, tt)) | 0),
            (i = (i + Math.imul(S, et)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(B, et)) | 0),
            (o = (o + Math.imul(B, it)) | 0),
            (i = (i + Math.imul(A, ot)) | 0),
            (n = ((n = (n + Math.imul(A, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(M, ht)) | 0),
            (n = ((n = (n + Math.imul(M, at)) | 0) + Math.imul(b, ht)) | 0),
            (o = (o + Math.imul(b, at)) | 0),
            (i = (i + Math.imul(v, ft)) | 0),
            (n = ((n = (n + Math.imul(v, ct)) | 0) + Math.imul(y, ft)) | 0),
            (o = (o + Math.imul(y, ct)) | 0);
          var St =
            (((a + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, dt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(d, dt)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(U, W)),
            (n = ((n = Math.imul(U, Y)) + Math.imul(L, W)) | 0),
            (o = Math.imul(L, Y)),
            (i = (i + Math.imul(P, J)) | 0),
            (n = ((n = (n + Math.imul(P, K)) | 0) + Math.imul(j, J)) | 0),
            (o = (o + Math.imul(j, K)) | 0),
            (i = (i + Math.imul(O, Q)) | 0),
            (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(T, et)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(k, et)) | 0),
            (o = (o + Math.imul(k, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(B, ot)) | 0),
            (o = (o + Math.imul(B, st)) | 0),
            (i = (i + Math.imul(A, ht)) | 0),
            (n = ((n = (n + Math.imul(A, at)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, at)) | 0),
            (i = (i + Math.imul(M, ft)) | 0),
            (n = ((n = (n + Math.imul(M, ct)) | 0) + Math.imul(b, ft)) | 0),
            (o = (o + Math.imul(b, ct)) | 0);
          var Bt =
            (((a + (i = (i + Math.imul(v, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(v, dt)) | 0) + Math.imul(y, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(y, dt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(U, J)),
            (n = ((n = Math.imul(U, K)) + Math.imul(L, J)) | 0),
            (o = Math.imul(L, K)),
            (i = (i + Math.imul(P, Q)) | 0),
            (n = ((n = (n + Math.imul(P, tt)) | 0) + Math.imul(j, Q)) | 0),
            (o = (o + Math.imul(j, tt)) | 0),
            (i = (i + Math.imul(O, et)) | 0),
            (n = ((n = (n + Math.imul(O, it)) | 0) + Math.imul(I, et)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(k, ot)) | 0),
            (o = (o + Math.imul(k, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, at)) | 0) + Math.imul(B, ht)) | 0),
            (o = (o + Math.imul(B, at)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = ((n = (n + Math.imul(A, ct)) | 0) + Math.imul(E, ft)) | 0),
            (o = (o + Math.imul(E, ct)) | 0);
          var Nt =
            (((a + (i = (i + Math.imul(M, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(M, dt)) | 0) + Math.imul(b, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(b, dt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(U, Q)),
            (n = ((n = Math.imul(U, tt)) + Math.imul(L, Q)) | 0),
            (o = Math.imul(L, tt)),
            (i = (i + Math.imul(P, et)) | 0),
            (n = ((n = (n + Math.imul(P, it)) | 0) + Math.imul(j, et)) | 0),
            (o = (o + Math.imul(j, it)) | 0),
            (i = (i + Math.imul(O, ot)) | 0),
            (n = ((n = (n + Math.imul(O, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, at)) | 0) + Math.imul(k, ht)) | 0),
            (o = (o + Math.imul(k, at)) | 0),
            (i = (i + Math.imul(S, ft)) | 0),
            (n = ((n = (n + Math.imul(S, ct)) | 0) + Math.imul(B, ft)) | 0),
            (o = (o + Math.imul(B, ct)) | 0);
          var Tt =
            (((a + (i = (i + Math.imul(A, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, dt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(E, dt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(U, et)),
            (n = ((n = Math.imul(U, it)) + Math.imul(L, et)) | 0),
            (o = Math.imul(L, it)),
            (i = (i + Math.imul(P, ot)) | 0),
            (n = ((n = (n + Math.imul(P, st)) | 0) + Math.imul(j, ot)) | 0),
            (o = (o + Math.imul(j, st)) | 0),
            (i = (i + Math.imul(O, ht)) | 0),
            (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, at)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = ((n = (n + Math.imul(T, ct)) | 0) + Math.imul(k, ft)) | 0),
            (o = (o + Math.imul(k, ct)) | 0);
          var kt =
            (((a + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, dt)) | 0) + Math.imul(B, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(B, dt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(U, ot)),
            (n = ((n = Math.imul(U, st)) + Math.imul(L, ot)) | 0),
            (o = Math.imul(L, st)),
            (i = (i + Math.imul(P, ht)) | 0),
            (n = ((n = (n + Math.imul(P, at)) | 0) + Math.imul(j, ht)) | 0),
            (o = (o + Math.imul(j, at)) | 0),
            (i = (i + Math.imul(O, ft)) | 0),
            (n = ((n = (n + Math.imul(O, ct)) | 0) + Math.imul(I, ft)) | 0),
            (o = (o + Math.imul(I, ct)) | 0);
          var Rt =
            (((a + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, dt)) | 0) + Math.imul(k, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(k, dt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(U, ht)),
            (n = ((n = Math.imul(U, at)) + Math.imul(L, ht)) | 0),
            (o = Math.imul(L, at)),
            (i = (i + Math.imul(P, ft)) | 0),
            (n = ((n = (n + Math.imul(P, ct)) | 0) + Math.imul(j, ft)) | 0),
            (o = (o + Math.imul(j, ct)) | 0);
          var Ot =
            (((a + (i = (i + Math.imul(O, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(O, dt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(I, dt)) | 0) + (n >>> 13)) | 0) +
              (Ot >>> 26)) |
            0),
            (Ot &= 67108863),
            (i = Math.imul(U, ft)),
            (n = ((n = Math.imul(U, ct)) + Math.imul(L, ft)) | 0),
            (o = Math.imul(L, ct));
          var It =
            (((a + (i = (i + Math.imul(P, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(P, dt)) | 0) + Math.imul(j, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(j, dt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863);
          var Ct =
            (((a + (i = Math.imul(U, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(U, dt)) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0;
          return (
            (a =
              ((((o = Math.imul(L, dt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (h[0] = gt),
            (h[1] = vt),
            (h[2] = yt),
            (h[3] = wt),
            (h[4] = Mt),
            (h[5] = bt),
            (h[6] = _t),
            (h[7] = At),
            (h[8] = Et),
            (h[9] = xt),
            (h[10] = St),
            (h[11] = Bt),
            (h[12] = Nt),
            (h[13] = Tt),
            (h[14] = kt),
            (h[15] = Rt),
            (h[16] = Ot),
            (h[17] = It),
            (h[18] = Ct),
            0 !== a && ((h[19] = a), e.length++),
            e
          );
        };
        function p(t, r, e) {
          return new d().mulp(t, r, e);
        }
        function d(t, r) {
          (this.x = t), (this.y = r);
        }
        Math.imul || (m = c),
          (o.prototype.mulTo = function (t, r) {
            var e = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? m(this, t, r)
              : e < 63
              ? c(this, t, r)
              : e < 1024
              ? (function (t, r, e) {
                  (e.negative = r.negative ^ t.negative),
                    (e.length = t.length + r.length);
                  for (var i = 0, n = 0, o = 0; o < e.length - 1; o++) {
                    var s = n;
                    n = 0;
                    for (
                      var u = 67108863 & i,
                        h = Math.min(o, r.length - 1),
                        a = Math.max(0, o - t.length + 1);
                      a <= h;
                      a++
                    ) {
                      var l = o - a,
                        f = (0 | t.words[l]) * (0 | r.words[a]),
                        c = 67108863 & f;
                      (u = 67108863 & (c = (c + u) | 0)),
                        (n +=
                          (s =
                            ((s = (s + ((f / 67108864) | 0)) | 0) +
                              (c >>> 26)) |
                            0) >>> 26),
                        (s &= 67108863);
                    }
                    (e.words[o] = u), (i = s), (s = n);
                  }
                  return 0 !== i ? (e.words[o] = i) : e.length--, e.strip();
                })(this, t, r)
              : p(this, t, r);
          }),
          (d.prototype.makeRBT = function (t) {
            for (
              var r = new Array(t), e = o.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              r[i] = this.revBin(i, e, t);
            return r;
          }),
          (d.prototype.revBin = function (t, r, e) {
            if (0 === t || t === e - 1) return t;
            for (var i = 0, n = 0; n < r; n++)
              (i |= (1 & t) << (r - n - 1)), (t >>= 1);
            return i;
          }),
          (d.prototype.permute = function (t, r, e, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = r[t[s]]), (n[s] = e[t[s]]);
          }),
          (d.prototype.transform = function (t, r, e, i, n, o) {
            this.permute(o, t, r, e, i, n);
            for (var s = 1; s < n; s <<= 1)
              for (
                var u = s << 1,
                  h = Math.cos((2 * Math.PI) / u),
                  a = Math.sin((2 * Math.PI) / u),
                  l = 0;
                l < n;
                l += u
              )
                for (var f = h, c = a, m = 0; m < s; m++) {
                  var p = e[l + m],
                    d = i[l + m],
                    g = e[l + m + s],
                    v = i[l + m + s],
                    y = f * g - c * v;
                  (v = f * v + c * g),
                    (g = y),
                    (e[l + m] = p + g),
                    (i[l + m] = d + v),
                    (e[l + m + s] = p - g),
                    (i[l + m + s] = d - v),
                    m !== u &&
                      ((y = h * f - a * c), (c = h * c + a * f), (f = y));
                }
          }),
          (d.prototype.guessLen13b = function (t, r) {
            var e = 1 | Math.max(r, t),
              i = 1 & e,
              n = 0;
            for (e = (e / 2) | 0; e; e >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (d.prototype.conjugate = function (t, r, e) {
            if (!(e <= 1))
              for (var i = 0; i < e / 2; i++) {
                var n = t[i];
                (t[i] = t[e - i - 1]),
                  (t[e - i - 1] = n),
                  (n = r[i]),
                  (r[i] = -r[e - i - 1]),
                  (r[e - i - 1] = -n);
              }
          }),
          (d.prototype.normalize13b = function (t, r) {
            for (var e = 0, i = 0; i < r / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / r) +
                Math.round(t[2 * i] / r) +
                e;
              (t[i] = 67108863 & n),
                (e = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (d.prototype.convert13b = function (t, r, e, n) {
            for (var o = 0, s = 0; s < r; s++)
              (o += 0 | t[s]),
                (e[2 * s] = 8191 & o),
                (o >>>= 13),
                (e[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * r; s < n; ++s) e[s] = 0;
            i(0 === o), i(0 == (-8192 & o));
          }),
          (d.prototype.stub = function (t) {
            for (var r = new Array(t), e = 0; e < t; e++) r[e] = 0;
            return r;
          }),
          (d.prototype.mulp = function (t, r, e) {
            var i = 2 * this.guessLen13b(t.length, r.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              u = new Array(i),
              h = new Array(i),
              a = new Array(i),
              l = new Array(i),
              f = new Array(i),
              c = e.words;
            (c.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(r.words, r.length, a, i),
              this.transform(s, o, u, h, i, n),
              this.transform(a, o, l, f, i, n);
            for (var m = 0; m < i; m++) {
              var p = u[m] * l[m] - h[m] * f[m];
              (h[m] = u[m] * f[m] + h[m] * l[m]), (u[m] = p);
            }
            return (
              this.conjugate(u, h, i),
              this.transform(u, h, c, o, i, n),
              this.conjugate(c, o, i),
              this.normalize13b(c, i),
              (e.negative = t.negative ^ r.negative),
              (e.length = t.length + r.length),
              e.strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var r = new o(null);
            return (
              (r.words = new Array(this.length + t.length)), this.mulTo(t, r)
            );
          }),
          (o.prototype.mulf = function (t) {
            var r = new o(null);
            return (r.words = new Array(this.length + t.length)), p(this, t, r);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            i("number" == typeof t), i(t < 67108864);
            for (var r = 0, e = 0; e < this.length; e++) {
              var n = (0 | this.words[e]) * t,
                o = (67108863 & n) + (67108863 & r);
              (r >>= 26),
                (r += (n / 67108864) | 0),
                (r += o >>> 26),
                (this.words[e] = 67108863 & o);
            }
            return 0 !== r && ((this.words[e] = r), this.length++), this;
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var r = (function (t) {
              for (var r = new Array(t.bitLength()), e = 0; e < r.length; e++) {
                var i = (e / 26) | 0,
                  n = e % 26;
                r[e] = (t.words[i] & (1 << n)) >>> n;
              }
              return r;
            })(t);
            if (0 === r.length) return new o(1);
            for (
              var e = this, i = 0;
              i < r.length && 0 === r[i];
              i++, e = e.sqr()
            );
            if (++i < r.length)
              for (var n = e.sqr(); i < r.length; i++, n = n.sqr())
                0 !== r[i] && (e = e.mul(n));
            return e;
          }),
          (o.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var r,
              e = t % 26,
              n = (t - e) / 26,
              o = (67108863 >>> (26 - e)) << (26 - e);
            if (0 !== e) {
              var s = 0;
              for (r = 0; r < this.length; r++) {
                var u = this.words[r] & o,
                  h = ((0 | this.words[r]) - u) << e;
                (this.words[r] = h | s), (s = u >>> (26 - e));
              }
              s && ((this.words[r] = s), this.length++);
            }
            if (0 !== n) {
              for (r = this.length - 1; r >= 0; r--)
                this.words[r + n] = this.words[r];
              for (r = 0; r < n; r++) this.words[r] = 0;
              this.length += n;
            }
            return this.strip();
          }),
          (o.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, r, e) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = r ? (r - (r % 26)) / 26 : 0);
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              u = 67108863 ^ ((67108863 >>> o) << o),
              h = e;
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var a = 0; a < s; a++) h.words[a] = this.words[a];
              h.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, a = 0; a < this.length; a++)
                this.words[a] = this.words[a + s];
            else (this.words[0] = 0), (this.length = 1);
            var l = 0;
            for (a = this.length - 1; a >= 0 && (0 !== l || a >= n); a--) {
              var f = 0 | this.words[a];
              (this.words[a] = (l << (26 - o)) | (f >>> o)), (l = f & u);
            }
            return (
              h && 0 !== l && (h.words[h.length++] = l),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (o.prototype.ishrn = function (t, r, e) {
            return i(0 === this.negative), this.iushrn(t, r, e);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            return !(this.length <= e) && !!(this.words[e] & n);
          }),
          (o.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= e)
            )
              return this;
            if (
              (0 !== r && e++,
              (this.length = Math.min(e, this.length)),
              0 !== r)
            ) {
              var n = 67108863 ^ ((67108863 >>> r) << r);
              this.words[this.length - 1] &= n;
            }
            return this.strip();
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var r = 0; r < this.length && this.words[r] >= 67108864; r++)
              (this.words[r] -= 67108864),
                r === this.length - 1
                  ? (this.words[r + 1] = 1)
                  : this.words[r + 1]++;
            return (this.length = Math.max(this.length, r + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var r = 0; r < this.length && this.words[r] < 0; r++)
                (this.words[r] += 67108864), (this.words[r + 1] -= 1);
            return this.strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, r, e) {
            var n,
              o,
              s = t.length + e;
            this._expand(s);
            var u = 0;
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + e]) + u;
              var h = (0 | t.words[n]) * r;
              (u = ((o -= 67108863 & h) >> 26) - ((h / 67108864) | 0)),
                (this.words[n + e] = 67108863 & o);
            }
            for (; n < this.length - e; n++)
              (u = (o = (0 | this.words[n + e]) + u) >> 26),
                (this.words[n + e] = 67108863 & o);
            if (0 === u) return this.strip();
            for (i(-1 === u), u = 0, n = 0; n < this.length; n++)
              (u = (o = -(0 | this.words[n]) + u) >> 26),
                (this.words[n] = 67108863 & o);
            return (this.negative = 1), this.strip();
          }),
          (o.prototype._wordDiv = function (t, r) {
            var e = (this.length, t.length),
              i = this.clone(),
              n = t,
              s = 0 | n.words[n.length - 1];
            0 !== (e = 26 - this._countBits(s)) &&
              ((n = n.ushln(e)), i.iushln(e), (s = 0 | n.words[n.length - 1]));
            var u,
              h = i.length - n.length;
            if ("mod" !== r) {
              ((u = new o(null)).length = h + 1),
                (u.words = new Array(u.length));
              for (var a = 0; a < u.length; a++) u.words[a] = 0;
            }
            var l = i.clone()._ishlnsubmul(n, 1, h);
            0 === l.negative && ((i = l), u && (u.words[h] = 1));
            for (var f = h - 1; f >= 0; f--) {
              var c =
                67108864 * (0 | i.words[n.length + f]) +
                (0 | i.words[n.length + f - 1]);
              for (
                c = Math.min((c / s) | 0, 67108863), i._ishlnsubmul(n, c, f);
                0 !== i.negative;

              )
                c--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, f),
                  i.isZero() || (i.negative ^= 1);
              u && (u.words[f] = c);
            }
            return (
              u && u.strip(),
              i.strip(),
              "div" !== r && 0 !== e && i.iushrn(e),
              { div: u || null, mod: i }
            );
          }),
          (o.prototype.divmod = function (t, r, e) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new o(0), mod: new o(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((u = this.neg().divmod(t, r)),
                  "mod" !== r && (n = u.div.neg()),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.iadd(t)),
                  { div: n, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((u = this.divmod(t.neg(), r)),
                  "mod" !== r && (n = u.div.neg()),
                  { div: n, mod: u.mod })
                : 0 != (this.negative & t.negative)
                ? ((u = this.neg().divmod(t.neg(), r)),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.isub(t)),
                  { div: u.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new o(0), mod: this }
                : 1 === t.length
                ? "div" === r
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === r
                  ? { div: null, mod: new o(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new o(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, r)
            );
            var n, s, u;
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var r = this.divmod(t);
            if (r.mod.isZero()) return r.div;
            var e = 0 !== r.div.negative ? r.mod.isub(t) : r.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = e.cmp(i);
            return o < 0 || (1 === n && 0 === o)
              ? r.div
              : 0 !== r.div.negative
              ? r.div.isubn(1)
              : r.div.iaddn(1);
          }),
          (o.prototype.modn = function (t) {
            i(t <= 67108863);
            for (var r = (1 << 26) % t, e = 0, n = this.length - 1; n >= 0; n--)
              e = (r * e + (0 | this.words[n])) % t;
            return e;
          }),
          (o.prototype.idivn = function (t) {
            i(t <= 67108863);
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var n = (0 | this.words[e]) + 67108864 * r;
              (this.words[e] = (n / t) | 0), (r = n % t);
            }
            return this.strip();
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0;
              r.isEven() && e.isEven();

            )
              r.iushrn(1), e.iushrn(1), ++a;
            for (var l = e.clone(), f = r.clone(); !r.isZero(); ) {
              for (
                var c = 0, m = 1;
                0 == (r.words[0] & m) && c < 26;
                ++c, m <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  (n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(f)),
                    n.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, d = 1;
                0 == (e.words[0] & d) && p < 26;
                ++p, d <<= 1
              );
              if (p > 0)
                for (e.iushrn(p); p-- > 0; )
                  (u.isOdd() || h.isOdd()) && (u.iadd(l), h.isub(f)),
                    u.iushrn(1),
                    h.iushrn(1);
              r.cmp(e) >= 0
                ? (r.isub(e), n.isub(u), s.isub(h))
                : (e.isub(r), u.isub(n), h.isub(s));
            }
            return { a: u, b: h, gcd: e.iushln(a) };
          }),
          (o.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n, s = new o(1), u = new o(0), h = e.clone();
              r.cmpn(1) > 0 && e.cmpn(1) > 0;

            ) {
              for (
                var a = 0, l = 1;
                0 == (r.words[0] & l) && a < 26;
                ++a, l <<= 1
              );
              if (a > 0)
                for (r.iushrn(a); a-- > 0; )
                  s.isOdd() && s.iadd(h), s.iushrn(1);
              for (
                var f = 0, c = 1;
                0 == (e.words[0] & c) && f < 26;
                ++f, c <<= 1
              );
              if (f > 0)
                for (e.iushrn(f); f-- > 0; )
                  u.isOdd() && u.iadd(h), u.iushrn(1);
              r.cmp(e) >= 0 ? (r.isub(e), s.isub(u)) : (e.isub(r), u.isub(s));
            }
            return (n = 0 === r.cmpn(1) ? s : u).cmpn(0) < 0 && n.iadd(t), n;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var r = this.clone(),
              e = t.clone();
            (r.negative = 0), (e.negative = 0);
            for (var i = 0; r.isEven() && e.isEven(); i++)
              r.iushrn(1), e.iushrn(1);
            for (;;) {
              for (; r.isEven(); ) r.iushrn(1);
              for (; e.isEven(); ) e.iushrn(1);
              var n = r.cmp(e);
              if (n < 0) {
                var o = r;
                (r = e), (e = o);
              } else if (0 === n || 0 === e.cmpn(1)) break;
              r.isub(e);
            }
            return e.iushln(i);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (o.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            i("number" == typeof t);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            if (this.length <= e)
              return this._expand(e + 1), (this.words[e] |= n), this;
            for (var o = n, s = e; 0 !== o && s < this.length; s++) {
              var u = 0 | this.words[s];
              (o = (u += o) >>> 26), (u &= 67108863), (this.words[s] = u);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var r,
              e = t < 0;
            if (0 !== this.negative && !e) return -1;
            if (0 === this.negative && e) return 1;
            if ((this.strip(), this.length > 1)) r = 1;
            else {
              e && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              r = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var r = this.ucmp(t);
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var i = 0 | this.words[e],
                n = 0 | t.words[e];
              if (i !== n) {
                i < n ? (r = -1) : i > n && (r = 1);
                break;
              }
            }
            return r;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (o.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new _(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var g = { k256: null, p224: null, p192: null, p25519: null };
        function v(t, r) {
          (this.name = t),
            (this.p = new o(r, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function y() {
          v.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function w() {
          v.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function M() {
          v.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function b() {
          v.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function _(t) {
          if ("string" == typeof t) {
            var r = o._prime(t);
            (this.m = r.p), (this.prime = r);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (v.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (v.prototype.ireduce = function (t) {
            var r,
              e = t;
            do {
              this.split(e, this.tmp),
                (r = (e = (e = this.imulK(e)).iadd(this.tmp)).bitLength());
            } while (r > this.n);
            var i = r < this.n ? -1 : e.ucmp(this.p);
            return (
              0 === i
                ? ((e.words[0] = 0), (e.length = 1))
                : i > 0
                ? e.isub(this.p)
                : e.strip(),
              e
            );
          }),
          (v.prototype.split = function (t, r) {
            t.iushrn(this.n, 0, r);
          }),
          (v.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(y, v),
          (y.prototype.split = function (t, r) {
            for (var e = Math.min(t.length, 9), i = 0; i < e; i++)
              r.words[i] = t.words[i];
            if (((r.length = e), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var n = t.words[9];
            for (r.words[r.length++] = 4194303 & n, i = 10; i < t.length; i++) {
              var o = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & o) << 4) | (n >>> 22)), (n = o);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (y.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 0 | t.words[e];
              (r += 977 * i),
                (t.words[e] = 67108863 & r),
                (r = 64 * i + ((r / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(w, v),
          n(M, v),
          n(b, v),
          (b.prototype.imulK = function (t) {
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 19 * (0 | t.words[e]) + r,
                n = 67108863 & i;
              (i >>>= 26), (t.words[e] = n), (r = i);
            }
            return 0 !== r && (t.words[t.length++] = r), t;
          }),
          (o._prime = function (t) {
            if (g[t]) return g[t];
            var r;
            if ("k256" === t) r = new y();
            else if ("p224" === t) r = new w();
            else if ("p192" === t) r = new M();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              r = new b();
            }
            return (g[t] = r), r;
          }),
          (_.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (_.prototype._verify2 = function (t, r) {
            i(0 == (t.negative | r.negative), "red works only with positives"),
              i(t.red && t.red === r.red, "red works only with red numbers");
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (_.prototype.add = function (t, r) {
            this._verify2(t, r);
            var e = t.add(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
          }),
          (_.prototype.iadd = function (t, r) {
            this._verify2(t, r);
            var e = t.iadd(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e;
          }),
          (_.prototype.sub = function (t, r) {
            this._verify2(t, r);
            var e = t.sub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
          }),
          (_.prototype.isub = function (t, r) {
            this._verify2(t, r);
            var e = t.isub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e;
          }),
          (_.prototype.shl = function (t, r) {
            return this._verify1(t), this.imod(t.ushln(r));
          }),
          (_.prototype.imul = function (t, r) {
            return this._verify2(t, r), this.imod(t.imul(r));
          }),
          (_.prototype.mul = function (t, r) {
            return this._verify2(t, r), this.imod(t.mul(r));
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var r = this.m.andln(3);
            if ((i(r % 2 == 1), 3 === r)) {
              var e = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, e);
            }
            for (
              var n = this.m.subn(1), s = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              s++, n.iushrn(1);
            i(!n.isZero());
            var u = new o(1).toRed(this),
              h = u.redNeg(),
              a = this.m.subn(1).iushrn(1),
              l = this.m.bitLength();
            for (
              l = new o(2 * l * l).toRed(this);
              0 !== this.pow(l, a).cmp(h);

            )
              l.redIAdd(h);
            for (
              var f = this.pow(l, n),
                c = this.pow(t, n.addn(1).iushrn(1)),
                m = this.pow(t, n),
                p = s;
              0 !== m.cmp(u);

            ) {
              for (var d = m, g = 0; 0 !== d.cmp(u); g++) d = d.redSqr();
              i(g < p);
              var v = this.pow(f, new o(1).iushln(p - g - 1));
              (c = c.redMul(v)), (f = v.redSqr()), (m = m.redMul(f)), (p = g);
            }
            return c;
          }),
          (_.prototype.invm = function (t) {
            var r = t._invmp(this.m);
            return 0 !== r.negative
              ? ((r.negative = 0), this.imod(r).redNeg())
              : this.imod(r);
          }),
          (_.prototype.pow = function (t, r) {
            if (r.isZero()) return new o(1);
            if (0 === r.cmpn(1)) return t.clone();
            var e = new Array(16);
            (e[0] = new o(1).toRed(this)), (e[1] = t);
            for (var i = 2; i < e.length; i++) e[i] = this.mul(e[i - 1], t);
            var n = e[0],
              s = 0,
              u = 0,
              h = r.bitLength() % 26;
            for (0 === h && (h = 26), i = r.length - 1; i >= 0; i--) {
              for (var a = r.words[i], l = h - 1; l >= 0; l--) {
                var f = (a >> l) & 1;
                n !== e[0] && (n = this.sqr(n)),
                  0 !== f || 0 !== s
                    ? ((s <<= 1),
                      (s |= f),
                      (4 === ++u || (0 === i && 0 === l)) &&
                        ((n = this.mul(n, e[s])), (u = 0), (s = 0)))
                    : (u = 0);
              }
              h = 26;
            }
            return n;
          }),
          (_.prototype.convertTo = function (t) {
            var r = t.umod(this.m);
            return r === t ? r.clone() : r;
          }),
          (_.prototype.convertFrom = function (t) {
            var r = t.clone();
            return (r.red = null), r;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          n(A, _),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var r = this.imod(t.mul(this.rinv));
            return (r.red = null), r;
          }),
          (A.prototype.imul = function (t, r) {
            if (t.isZero() || r.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var e = t.imul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, r) {
            if (t.isZero() || r.isZero()) return new o(0)._forceRed(this);
            var e = t.mul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })(t, this);
    }.call(this, e(4)(t)));
  },
  function (t, r, e) {
    "use strict";
    (r.byteLength = function (t) {
      var r = a(t),
        e = r[0],
        i = r[1];
      return (3 * (e + i)) / 4 - i;
    }),
      (r.toByteArray = function (t) {
        var r,
          e,
          i = a(t),
          s = i[0],
          u = i[1],
          h = new o(
            (function (t, r, e) {
              return (3 * (r + e)) / 4 - e;
            })(0, s, u)
          ),
          l = 0,
          f = u > 0 ? s - 4 : s;
        for (e = 0; e < f; e += 4)
          (r =
            (n[t.charCodeAt(e)] << 18) |
            (n[t.charCodeAt(e + 1)] << 12) |
            (n[t.charCodeAt(e + 2)] << 6) |
            n[t.charCodeAt(e + 3)]),
            (h[l++] = (r >> 16) & 255),
            (h[l++] = (r >> 8) & 255),
            (h[l++] = 255 & r);
        2 === u &&
          ((r = (n[t.charCodeAt(e)] << 2) | (n[t.charCodeAt(e + 1)] >> 4)),
          (h[l++] = 255 & r));
        1 === u &&
          ((r =
            (n[t.charCodeAt(e)] << 10) |
            (n[t.charCodeAt(e + 1)] << 4) |
            (n[t.charCodeAt(e + 2)] >> 2)),
          (h[l++] = (r >> 8) & 255),
          (h[l++] = 255 & r));
        return h;
      }),
      (r.fromByteArray = function (t) {
        for (
          var r, e = t.length, n = e % 3, o = [], s = 0, u = e - n;
          s < u;
          s += 16383
        )
          o.push(l(t, s, s + 16383 > u ? u : s + 16383));
        1 === n
          ? ((r = t[e - 1]), o.push(i[r >> 2] + i[(r << 4) & 63] + "=="))
          : 2 === n &&
            ((r = (t[e - 2] << 8) + t[e - 1]),
            o.push(i[r >> 10] + i[(r >> 4) & 63] + i[(r << 2) & 63] + "="));
        return o.join("");
      });
    for (
      var i = [],
        n = [],
        o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        u = 0,
        h = s.length;
      u < h;
      ++u
    )
      (i[u] = s[u]), (n[s.charCodeAt(u)] = u);
    function a(t) {
      var r = t.length;
      if (r % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var e = t.indexOf("=");
      return -1 === e && (e = r), [e, e === r ? 0 : 4 - (e % 4)];
    }
    function l(t, r, e) {
      for (var n, o, s = [], u = r; u < e; u += 3)
        (n =
          ((t[u] << 16) & 16711680) +
          ((t[u + 1] << 8) & 65280) +
          (255 & t[u + 2])),
          s.push(
            i[((o = n) >> 18) & 63] +
              i[(o >> 12) & 63] +
              i[(o >> 6) & 63] +
              i[63 & o]
          );
      return s.join("");
    }
    (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
  },
  function (t, r) {
    (r.read = function (t, r, e, i, n) {
      var o,
        s,
        u = 8 * n - i - 1,
        h = (1 << u) - 1,
        a = h >> 1,
        l = -7,
        f = e ? n - 1 : 0,
        c = e ? -1 : 1,
        m = t[r + f];
      for (
        f += c, o = m & ((1 << -l) - 1), m >>= -l, l += u;
        l > 0;
        o = 256 * o + t[r + f], f += c, l -= 8
      );
      for (
        s = o & ((1 << -l) - 1), o >>= -l, l += i;
        l > 0;
        s = 256 * s + t[r + f], f += c, l -= 8
      );
      if (0 === o) o = 1 - a;
      else {
        if (o === h) return s ? NaN : (1 / 0) * (m ? -1 : 1);
        (s += Math.pow(2, i)), (o -= a);
      }
      return (m ? -1 : 1) * s * Math.pow(2, o - i);
    }),
      (r.write = function (t, r, e, i, n, o) {
        var s,
          u,
          h,
          a = 8 * o - n - 1,
          l = (1 << a) - 1,
          f = l >> 1,
          c = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          m = i ? 0 : o - 1,
          p = i ? 1 : -1,
          d = r < 0 || (0 === r && 1 / r < 0) ? 1 : 0;
        for (
          r = Math.abs(r),
            isNaN(r) || r === 1 / 0
              ? ((u = isNaN(r) ? 1 : 0), (s = l))
              : ((s = Math.floor(Math.log(r) / Math.LN2)),
                r * (h = Math.pow(2, -s)) < 1 && (s--, (h *= 2)),
                (r += s + f >= 1 ? c / h : c * Math.pow(2, 1 - f)) * h >= 2 &&
                  (s++, (h /= 2)),
                s + f >= l
                  ? ((u = 0), (s = l))
                  : s + f >= 1
                  ? ((u = (r * h - 1) * Math.pow(2, n)), (s += f))
                  : ((u = r * Math.pow(2, f - 1) * Math.pow(2, n)), (s = 0)));
          n >= 8;
          t[e + m] = 255 & u, m += p, u /= 256, n -= 8
        );
        for (
          s = (s << n) | u, a += n;
          a > 0;
          t[e + m] = 255 & s, m += p, s /= 256, a -= 8
        );
        t[e + m - p] |= 128 * d;
      });
  },
  function (t, r) {
    var e = {}.toString;
    t.exports =
      Array.isArray ||
      function (t) {
        return "[object Array]" == e.call(t);
      };
  },
  function (t, r, e) {
    (function (t) {
      !(function (t, r) {
        "use strict";
        function i(t, r) {
          if (!t) throw new Error(r || "Assertion failed");
        }
        function n(t, r) {
          t.super_ = r;
          var e = function () {};
          (e.prototype = r.prototype),
            (t.prototype = new e()),
            (t.prototype.constructor = t);
        }
        function o(t, r, e) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== r && "be" !== r) || ((e = r), (r = 10)),
              this._init(t || 0, r || 10, e || "be"));
        }
        var s;
        "object" == typeof t ? (t.exports = o) : (r.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          s = e(2).Buffer;
        } catch (t) {}
        function u(t, r, e) {
          for (var i = 0, n = Math.min(t.length, e), o = r; o < n; o++) {
            var s = t.charCodeAt(o) - 48;
            (i <<= 4),
              (i |=
                s >= 49 && s <= 54
                  ? s - 49 + 10
                  : s >= 17 && s <= 22
                  ? s - 17 + 10
                  : 15 & s);
          }
          return i;
        }
        function h(t, r, e, i) {
          for (var n = 0, o = Math.min(t.length, e), s = r; s < o; s++) {
            var u = t.charCodeAt(s) - 48;
            (n *= i), (n += u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u);
          }
          return n;
        }
        (o.isBN = function (t) {
          return (
            t instanceof o ||
            (null !== t &&
              "object" == typeof t &&
              t.constructor.wordSize === o.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (o.max = function (t, r) {
            return t.cmp(r) > 0 ? t : r;
          }),
          (o.min = function (t, r) {
            return t.cmp(r) < 0 ? t : r;
          }),
          (o.prototype._init = function (t, r, e) {
            if ("number" == typeof t) return this._initNumber(t, r, e);
            if ("object" == typeof t) return this._initArray(t, r, e);
            "hex" === r && (r = 16), i(r === (0 | r) && r >= 2 && r <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++,
              16 === r ? this._parseHex(t, n) : this._parseBase(t, r, n),
              "-" === t[0] && (this.negative = 1),
              this.strip(),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initNumber = function (t, r, e) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === e && this._initArray(this.toArray(), r, e);
          }),
          (o.prototype._initArray = function (t, r, e) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var o,
              s,
              u = 0;
            if ("be" === e)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            else if ("le" === e)
              for (n = 0, o = 0; n < t.length; n += 3)
                (s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[o] |= (s << u) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), o++);
            return this.strip();
          }),
          (o.prototype._parseHex = function (t, r) {
            (this.length = Math.ceil((t.length - r) / 6)),
              (this.words = new Array(this.length));
            for (var e = 0; e < this.length; e++) this.words[e] = 0;
            var i,
              n,
              o = 0;
            for (e = t.length - 6, i = 0; e >= r; e -= 6)
              (n = u(t, e, e + 6)),
                (this.words[i] |= (n << o) & 67108863),
                (this.words[i + 1] |= (n >>> (26 - o)) & 4194303),
                (o += 24) >= 26 && ((o -= 26), i++);
            e + 6 !== r &&
              ((n = u(t, r, e + 6)),
              (this.words[i] |= (n << o) & 67108863),
              (this.words[i + 1] |= (n >>> (26 - o)) & 4194303)),
              this.strip();
          }),
          (o.prototype._parseBase = function (t, r, e) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= r) i++;
            i--, (n = (n / r) | 0);
            for (
              var o = t.length - e,
                s = o % i,
                u = Math.min(o, o - s) + e,
                a = 0,
                l = e;
              l < u;
              l += i
            )
              (a = h(t, l, l + i, r)),
                this.imuln(n),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            if (0 !== s) {
              var f = 1;
              for (a = h(t, l, t.length, r), l = 0; l < s; l++) f *= r;
              this.imuln(f),
                this.words[0] + a < 67108864
                  ? (this.words[0] += a)
                  : this._iaddn(a);
            }
          }),
          (o.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var r = 0; r < this.length; r++) t.words[r] = this.words[r];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (o.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var a = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          l = [
            0,
            0,
            25,
            16,
            12,
            11,
            10,
            9,
            8,
            8,
            7,
            7,
            7,
            7,
            6,
            6,
            6,
            6,
            6,
            6,
            6,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
          ],
          f = [
            0,
            0,
            33554432,
            43046721,
            16777216,
            48828125,
            60466176,
            40353607,
            16777216,
            43046721,
            1e7,
            19487171,
            35831808,
            62748517,
            7529536,
            11390625,
            16777216,
            24137569,
            34012224,
            47045881,
            64e6,
            4084101,
            5153632,
            6436343,
            7962624,
            9765625,
            11881376,
            14348907,
            17210368,
            20511149,
            243e5,
            28629151,
            33554432,
            39135393,
            45435424,
            52521875,
            60466176,
          ];
        function c(t, r, e) {
          e.negative = r.negative ^ t.negative;
          var i = (t.length + r.length) | 0;
          (e.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            o = 0 | r.words[0],
            s = n * o,
            u = 67108863 & s,
            h = (s / 67108864) | 0;
          e.words[0] = u;
          for (var a = 1; a < i; a++) {
            for (
              var l = h >>> 26,
                f = 67108863 & h,
                c = Math.min(a, r.length - 1),
                m = Math.max(0, a - t.length + 1);
              m <= c;
              m++
            ) {
              var p = (a - m) | 0;
              (l +=
                ((s = (n = 0 | t.words[p]) * (o = 0 | r.words[m]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s);
            }
            (e.words[a] = 0 | f), (h = 0 | l);
          }
          return 0 !== h ? (e.words[a] = 0 | h) : e.length--, e.strip();
        }
        (o.prototype.toString = function (t, r) {
          var e;
          if (((r = 0 | r || 1), 16 === (t = t || 10) || "hex" === t)) {
            e = "";
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var u = this.words[s],
                h = (16777215 & ((u << n) | o)).toString(16);
              (e =
                0 !== (o = (u >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? a[6 - h.length] + h + e
                  : h + e),
                (n += 2) >= 26 && ((n -= 26), s--);
            }
            for (0 !== o && (e = o.toString(16) + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var c = l[t],
              m = f[t];
            e = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero(); ) {
              var d = p.modn(m).toString(t);
              e = (p = p.idivn(m)).isZero() ? d + e : a[c - d.length] + d + e;
            }
            for (this.isZero() && (e = "0" + e); e.length % r != 0; )
              e = "0" + e;
            return 0 !== this.negative && (e = "-" + e), e;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (o.prototype.toBuffer = function (t, r) {
            return i(void 0 !== s), this.toArrayLike(s, t, r);
          }),
          (o.prototype.toArray = function (t, r) {
            return this.toArrayLike(Array, t, r);
          }),
          (o.prototype.toArrayLike = function (t, r, e) {
            var n = this.byteLength(),
              o = e || Math.max(1, n);
            i(n <= o, "byte array longer than desired length"),
              i(o > 0, "Requested array length <= 0"),
              this.strip();
            var s,
              u,
              h = "le" === r,
              a = new t(o),
              l = this.clone();
            if (h) {
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[u] = s);
              for (; u < o; u++) a[u] = 0;
            } else {
              for (u = 0; u < o - n; u++) a[u] = 0;
              for (u = 0; !l.isZero(); u++)
                (s = l.andln(255)), l.iushrn(8), (a[o - u - 1] = s);
            }
            return a;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var r = t,
                  e = 0;
                return (
                  r >= 4096 && ((e += 13), (r >>>= 13)),
                  r >= 64 && ((e += 7), (r >>>= 7)),
                  r >= 8 && ((e += 4), (r >>>= 4)),
                  r >= 2 && ((e += 2), (r >>>= 2)),
                  e + r
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var r = t,
              e = 0;
            return (
              0 == (8191 & r) && ((e += 13), (r >>>= 13)),
              0 == (127 & r) && ((e += 7), (r >>>= 7)),
              0 == (15 & r) && ((e += 4), (r >>>= 4)),
              0 == (3 & r) && ((e += 2), (r >>>= 2)),
              0 == (1 & r) && e++,
              e
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              r = this._countBits(t);
            return 26 * (this.length - 1) + r;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, r = 0; r < this.length; r++) {
              var e = this._zeroBits(this.words[r]);
              if (((t += e), 26 !== e)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var r = 0; r < t.length; r++)
              this.words[r] = this.words[r] | t.words[r];
            return this.strip();
          }),
          (o.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var r;
            r = this.length > t.length ? t : this;
            for (var e = 0; e < r.length; e++)
              this.words[e] = this.words[e] & t.words[e];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            var r, e;
            this.length > t.length
              ? ((r = this), (e = t))
              : ((r = t), (e = this));
            for (var i = 0; i < e.length; i++)
              this.words[i] = r.words[i] ^ e.words[i];
            if (this !== r)
              for (; i < r.length; i++) this.words[i] = r.words[i];
            return (this.length = r.length), this.strip();
          }),
          (o.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = 0 | Math.ceil(t / 26),
              e = t % 26;
            this._expand(r), e > 0 && r--;
            for (var n = 0; n < r; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              e > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - e))),
              this.strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, r) {
            i("number" == typeof t && t >= 0);
            var e = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(e + 1),
              (this.words[e] = r
                ? this.words[e] | (1 << n)
                : this.words[e] & ~(1 << n)),
              this.strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            var r, e, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (r = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (r = this.isub(t)),
                (t.negative = 1),
                r._normSign()
              );
            this.length > t.length
              ? ((e = this), (i = t))
              : ((e = t), (i = this));
            for (var n = 0, o = 0; o < i.length; o++)
              (r = (0 | e.words[o]) + (0 | i.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            for (; 0 !== n && o < e.length; o++)
              (r = (0 | e.words[o]) + n),
                (this.words[o] = 67108863 & r),
                (n = r >>> 26);
            if (((this.length = e.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (e !== this)
              for (; o < e.length; o++) this.words[o] = e.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var r;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (r = this.sub(t)), (t.negative ^= 1), r)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (r = t.sub(this)), (this.negative = 1), r)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var r = this.iadd(t);
              return (t.negative = 1), r._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var e,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((e = this), (i = t)) : ((e = t), (i = this));
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (r = (0 | e.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            for (; 0 !== o && s < e.length; s++)
              (o = (r = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & r);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var m = function (t, r, e) {
          var i,
            n,
            o,
            s = t.words,
            u = r.words,
            h = e.words,
            a = 0,
            l = 0 | s[0],
            f = 8191 & l,
            c = l >>> 13,
            m = 0 | s[1],
            p = 8191 & m,
            d = m >>> 13,
            g = 0 | s[2],
            v = 8191 & g,
            y = g >>> 13,
            w = 0 | s[3],
            M = 8191 & w,
            b = w >>> 13,
            _ = 0 | s[4],
            A = 8191 & _,
            E = _ >>> 13,
            x = 0 | s[5],
            S = 8191 & x,
            B = x >>> 13,
            N = 0 | s[6],
            T = 8191 & N,
            k = N >>> 13,
            R = 0 | s[7],
            O = 8191 & R,
            I = R >>> 13,
            C = 0 | s[8],
            P = 8191 & C,
            j = C >>> 13,
            F = 0 | s[9],
            U = 8191 & F,
            L = F >>> 13,
            D = 0 | u[0],
            z = 8191 & D,
            q = D >>> 13,
            Z = 0 | u[1],
            H = 8191 & Z,
            $ = Z >>> 13,
            V = 0 | u[2],
            W = 8191 & V,
            Y = V >>> 13,
            G = 0 | u[3],
            J = 8191 & G,
            K = G >>> 13,
            X = 0 | u[4],
            Q = 8191 & X,
            tt = X >>> 13,
            rt = 0 | u[5],
            et = 8191 & rt,
            it = rt >>> 13,
            nt = 0 | u[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            ut = 0 | u[7],
            ht = 8191 & ut,
            at = ut >>> 13,
            lt = 0 | u[8],
            ft = 8191 & lt,
            ct = lt >>> 13,
            mt = 0 | u[9],
            pt = 8191 & mt,
            dt = mt >>> 13;
          (e.negative = t.negative ^ r.negative), (e.length = 19);
          var gt =
            (((a + (i = Math.imul(f, z))) | 0) +
              ((8191 & (n = ((n = Math.imul(f, q)) + Math.imul(c, z)) | 0)) <<
                13)) |
            0;
          (a = ((((o = Math.imul(c, q)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (i = Math.imul(p, z)),
            (n = ((n = Math.imul(p, q)) + Math.imul(d, z)) | 0),
            (o = Math.imul(d, q));
          var vt =
            (((a + (i = (i + Math.imul(f, H)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, $)) | 0) + Math.imul(c, H)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, $)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(v, z)),
            (n = ((n = Math.imul(v, q)) + Math.imul(y, z)) | 0),
            (o = Math.imul(y, q)),
            (i = (i + Math.imul(p, H)) | 0),
            (n = ((n = (n + Math.imul(p, $)) | 0) + Math.imul(d, H)) | 0),
            (o = (o + Math.imul(d, $)) | 0);
          var yt =
            (((a + (i = (i + Math.imul(f, W)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, Y)) | 0) + Math.imul(c, W)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, Y)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(M, z)),
            (n = ((n = Math.imul(M, q)) + Math.imul(b, z)) | 0),
            (o = Math.imul(b, q)),
            (i = (i + Math.imul(v, H)) | 0),
            (n = ((n = (n + Math.imul(v, $)) | 0) + Math.imul(y, H)) | 0),
            (o = (o + Math.imul(y, $)) | 0),
            (i = (i + Math.imul(p, W)) | 0),
            (n = ((n = (n + Math.imul(p, Y)) | 0) + Math.imul(d, W)) | 0),
            (o = (o + Math.imul(d, Y)) | 0);
          var wt =
            (((a + (i = (i + Math.imul(f, J)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, K)) | 0) + Math.imul(c, J)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, K)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(A, z)),
            (n = ((n = Math.imul(A, q)) + Math.imul(E, z)) | 0),
            (o = Math.imul(E, q)),
            (i = (i + Math.imul(M, H)) | 0),
            (n = ((n = (n + Math.imul(M, $)) | 0) + Math.imul(b, H)) | 0),
            (o = (o + Math.imul(b, $)) | 0),
            (i = (i + Math.imul(v, W)) | 0),
            (n = ((n = (n + Math.imul(v, Y)) | 0) + Math.imul(y, W)) | 0),
            (o = (o + Math.imul(y, Y)) | 0),
            (i = (i + Math.imul(p, J)) | 0),
            (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(d, J)) | 0),
            (o = (o + Math.imul(d, K)) | 0);
          var Mt =
            (((a + (i = (i + Math.imul(f, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, tt)) | 0) + Math.imul(c, Q)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, tt)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(S, z)),
            (n = ((n = Math.imul(S, q)) + Math.imul(B, z)) | 0),
            (o = Math.imul(B, q)),
            (i = (i + Math.imul(A, H)) | 0),
            (n = ((n = (n + Math.imul(A, $)) | 0) + Math.imul(E, H)) | 0),
            (o = (o + Math.imul(E, $)) | 0),
            (i = (i + Math.imul(M, W)) | 0),
            (n = ((n = (n + Math.imul(M, Y)) | 0) + Math.imul(b, W)) | 0),
            (o = (o + Math.imul(b, Y)) | 0),
            (i = (i + Math.imul(v, J)) | 0),
            (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(y, J)) | 0),
            (o = (o + Math.imul(y, K)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(d, Q)) | 0),
            (o = (o + Math.imul(d, tt)) | 0);
          var bt =
            (((a + (i = (i + Math.imul(f, et)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, it)) | 0) + Math.imul(c, et)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, it)) | 0) + (n >>> 13)) | 0) +
              (bt >>> 26)) |
            0),
            (bt &= 67108863),
            (i = Math.imul(T, z)),
            (n = ((n = Math.imul(T, q)) + Math.imul(k, z)) | 0),
            (o = Math.imul(k, q)),
            (i = (i + Math.imul(S, H)) | 0),
            (n = ((n = (n + Math.imul(S, $)) | 0) + Math.imul(B, H)) | 0),
            (o = (o + Math.imul(B, $)) | 0),
            (i = (i + Math.imul(A, W)) | 0),
            (n = ((n = (n + Math.imul(A, Y)) | 0) + Math.imul(E, W)) | 0),
            (o = (o + Math.imul(E, Y)) | 0),
            (i = (i + Math.imul(M, J)) | 0),
            (n = ((n = (n + Math.imul(M, K)) | 0) + Math.imul(b, J)) | 0),
            (o = (o + Math.imul(b, K)) | 0),
            (i = (i + Math.imul(v, Q)) | 0),
            (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(y, Q)) | 0),
            (o = (o + Math.imul(y, tt)) | 0),
            (i = (i + Math.imul(p, et)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(d, et)) | 0),
            (o = (o + Math.imul(d, it)) | 0);
          var _t =
            (((a + (i = (i + Math.imul(f, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, st)) | 0) + Math.imul(c, ot)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(O, z)),
            (n = ((n = Math.imul(O, q)) + Math.imul(I, z)) | 0),
            (o = Math.imul(I, q)),
            (i = (i + Math.imul(T, H)) | 0),
            (n = ((n = (n + Math.imul(T, $)) | 0) + Math.imul(k, H)) | 0),
            (o = (o + Math.imul(k, $)) | 0),
            (i = (i + Math.imul(S, W)) | 0),
            (n = ((n = (n + Math.imul(S, Y)) | 0) + Math.imul(B, W)) | 0),
            (o = (o + Math.imul(B, Y)) | 0),
            (i = (i + Math.imul(A, J)) | 0),
            (n = ((n = (n + Math.imul(A, K)) | 0) + Math.imul(E, J)) | 0),
            (o = (o + Math.imul(E, K)) | 0),
            (i = (i + Math.imul(M, Q)) | 0),
            (n = ((n = (n + Math.imul(M, tt)) | 0) + Math.imul(b, Q)) | 0),
            (o = (o + Math.imul(b, tt)) | 0),
            (i = (i + Math.imul(v, et)) | 0),
            (n = ((n = (n + Math.imul(v, it)) | 0) + Math.imul(y, et)) | 0),
            (o = (o + Math.imul(y, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(d, ot)) | 0),
            (o = (o + Math.imul(d, st)) | 0);
          var At =
            (((a + (i = (i + Math.imul(f, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, at)) | 0) + Math.imul(c, ht)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, at)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(P, z)),
            (n = ((n = Math.imul(P, q)) + Math.imul(j, z)) | 0),
            (o = Math.imul(j, q)),
            (i = (i + Math.imul(O, H)) | 0),
            (n = ((n = (n + Math.imul(O, $)) | 0) + Math.imul(I, H)) | 0),
            (o = (o + Math.imul(I, $)) | 0),
            (i = (i + Math.imul(T, W)) | 0),
            (n = ((n = (n + Math.imul(T, Y)) | 0) + Math.imul(k, W)) | 0),
            (o = (o + Math.imul(k, Y)) | 0),
            (i = (i + Math.imul(S, J)) | 0),
            (n = ((n = (n + Math.imul(S, K)) | 0) + Math.imul(B, J)) | 0),
            (o = (o + Math.imul(B, K)) | 0),
            (i = (i + Math.imul(A, Q)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(M, et)) | 0),
            (n = ((n = (n + Math.imul(M, it)) | 0) + Math.imul(b, et)) | 0),
            (o = (o + Math.imul(b, it)) | 0),
            (i = (i + Math.imul(v, ot)) | 0),
            (n = ((n = (n + Math.imul(v, st)) | 0) + Math.imul(y, ot)) | 0),
            (o = (o + Math.imul(y, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(d, ht)) | 0),
            (o = (o + Math.imul(d, at)) | 0);
          var Et =
            (((a + (i = (i + Math.imul(f, ft)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, ct)) | 0) + Math.imul(c, ft)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, ct)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(U, z)),
            (n = ((n = Math.imul(U, q)) + Math.imul(L, z)) | 0),
            (o = Math.imul(L, q)),
            (i = (i + Math.imul(P, H)) | 0),
            (n = ((n = (n + Math.imul(P, $)) | 0) + Math.imul(j, H)) | 0),
            (o = (o + Math.imul(j, $)) | 0),
            (i = (i + Math.imul(O, W)) | 0),
            (n = ((n = (n + Math.imul(O, Y)) | 0) + Math.imul(I, W)) | 0),
            (o = (o + Math.imul(I, Y)) | 0),
            (i = (i + Math.imul(T, J)) | 0),
            (n = ((n = (n + Math.imul(T, K)) | 0) + Math.imul(k, J)) | 0),
            (o = (o + Math.imul(k, K)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(B, Q)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (i = (i + Math.imul(A, et)) | 0),
            (n = ((n = (n + Math.imul(A, it)) | 0) + Math.imul(E, et)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(M, ot)) | 0),
            (n = ((n = (n + Math.imul(M, st)) | 0) + Math.imul(b, ot)) | 0),
            (o = (o + Math.imul(b, st)) | 0),
            (i = (i + Math.imul(v, ht)) | 0),
            (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(y, ht)) | 0),
            (o = (o + Math.imul(y, at)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = ((n = (n + Math.imul(p, ct)) | 0) + Math.imul(d, ft)) | 0),
            (o = (o + Math.imul(d, ct)) | 0);
          var xt =
            (((a + (i = (i + Math.imul(f, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(f, dt)) | 0) + Math.imul(c, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(c, dt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(U, H)),
            (n = ((n = Math.imul(U, $)) + Math.imul(L, H)) | 0),
            (o = Math.imul(L, $)),
            (i = (i + Math.imul(P, W)) | 0),
            (n = ((n = (n + Math.imul(P, Y)) | 0) + Math.imul(j, W)) | 0),
            (o = (o + Math.imul(j, Y)) | 0),
            (i = (i + Math.imul(O, J)) | 0),
            (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(I, J)) | 0),
            (o = (o + Math.imul(I, K)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(k, Q)) | 0),
            (o = (o + Math.imul(k, tt)) | 0),
            (i = (i + Math.imul(S, et)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(B, et)) | 0),
            (o = (o + Math.imul(B, it)) | 0),
            (i = (i + Math.imul(A, ot)) | 0),
            (n = ((n = (n + Math.imul(A, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(M, ht)) | 0),
            (n = ((n = (n + Math.imul(M, at)) | 0) + Math.imul(b, ht)) | 0),
            (o = (o + Math.imul(b, at)) | 0),
            (i = (i + Math.imul(v, ft)) | 0),
            (n = ((n = (n + Math.imul(v, ct)) | 0) + Math.imul(y, ft)) | 0),
            (o = (o + Math.imul(y, ct)) | 0);
          var St =
            (((a + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, dt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(d, dt)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(U, W)),
            (n = ((n = Math.imul(U, Y)) + Math.imul(L, W)) | 0),
            (o = Math.imul(L, Y)),
            (i = (i + Math.imul(P, J)) | 0),
            (n = ((n = (n + Math.imul(P, K)) | 0) + Math.imul(j, J)) | 0),
            (o = (o + Math.imul(j, K)) | 0),
            (i = (i + Math.imul(O, Q)) | 0),
            (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(T, et)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(k, et)) | 0),
            (o = (o + Math.imul(k, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(B, ot)) | 0),
            (o = (o + Math.imul(B, st)) | 0),
            (i = (i + Math.imul(A, ht)) | 0),
            (n = ((n = (n + Math.imul(A, at)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, at)) | 0),
            (i = (i + Math.imul(M, ft)) | 0),
            (n = ((n = (n + Math.imul(M, ct)) | 0) + Math.imul(b, ft)) | 0),
            (o = (o + Math.imul(b, ct)) | 0);
          var Bt =
            (((a + (i = (i + Math.imul(v, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(v, dt)) | 0) + Math.imul(y, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(y, dt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(U, J)),
            (n = ((n = Math.imul(U, K)) + Math.imul(L, J)) | 0),
            (o = Math.imul(L, K)),
            (i = (i + Math.imul(P, Q)) | 0),
            (n = ((n = (n + Math.imul(P, tt)) | 0) + Math.imul(j, Q)) | 0),
            (o = (o + Math.imul(j, tt)) | 0),
            (i = (i + Math.imul(O, et)) | 0),
            (n = ((n = (n + Math.imul(O, it)) | 0) + Math.imul(I, et)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(k, ot)) | 0),
            (o = (o + Math.imul(k, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, at)) | 0) + Math.imul(B, ht)) | 0),
            (o = (o + Math.imul(B, at)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = ((n = (n + Math.imul(A, ct)) | 0) + Math.imul(E, ft)) | 0),
            (o = (o + Math.imul(E, ct)) | 0);
          var Nt =
            (((a + (i = (i + Math.imul(M, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(M, dt)) | 0) + Math.imul(b, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(b, dt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(U, Q)),
            (n = ((n = Math.imul(U, tt)) + Math.imul(L, Q)) | 0),
            (o = Math.imul(L, tt)),
            (i = (i + Math.imul(P, et)) | 0),
            (n = ((n = (n + Math.imul(P, it)) | 0) + Math.imul(j, et)) | 0),
            (o = (o + Math.imul(j, it)) | 0),
            (i = (i + Math.imul(O, ot)) | 0),
            (n = ((n = (n + Math.imul(O, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, at)) | 0) + Math.imul(k, ht)) | 0),
            (o = (o + Math.imul(k, at)) | 0),
            (i = (i + Math.imul(S, ft)) | 0),
            (n = ((n = (n + Math.imul(S, ct)) | 0) + Math.imul(B, ft)) | 0),
            (o = (o + Math.imul(B, ct)) | 0);
          var Tt =
            (((a + (i = (i + Math.imul(A, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, dt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(E, dt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(U, et)),
            (n = ((n = Math.imul(U, it)) + Math.imul(L, et)) | 0),
            (o = Math.imul(L, it)),
            (i = (i + Math.imul(P, ot)) | 0),
            (n = ((n = (n + Math.imul(P, st)) | 0) + Math.imul(j, ot)) | 0),
            (o = (o + Math.imul(j, st)) | 0),
            (i = (i + Math.imul(O, ht)) | 0),
            (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, at)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = ((n = (n + Math.imul(T, ct)) | 0) + Math.imul(k, ft)) | 0),
            (o = (o + Math.imul(k, ct)) | 0);
          var kt =
            (((a + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, dt)) | 0) + Math.imul(B, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(B, dt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(U, ot)),
            (n = ((n = Math.imul(U, st)) + Math.imul(L, ot)) | 0),
            (o = Math.imul(L, st)),
            (i = (i + Math.imul(P, ht)) | 0),
            (n = ((n = (n + Math.imul(P, at)) | 0) + Math.imul(j, ht)) | 0),
            (o = (o + Math.imul(j, at)) | 0),
            (i = (i + Math.imul(O, ft)) | 0),
            (n = ((n = (n + Math.imul(O, ct)) | 0) + Math.imul(I, ft)) | 0),
            (o = (o + Math.imul(I, ct)) | 0);
          var Rt =
            (((a + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, dt)) | 0) + Math.imul(k, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(k, dt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(U, ht)),
            (n = ((n = Math.imul(U, at)) + Math.imul(L, ht)) | 0),
            (o = Math.imul(L, at)),
            (i = (i + Math.imul(P, ft)) | 0),
            (n = ((n = (n + Math.imul(P, ct)) | 0) + Math.imul(j, ft)) | 0),
            (o = (o + Math.imul(j, ct)) | 0);
          var Ot =
            (((a + (i = (i + Math.imul(O, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(O, dt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(I, dt)) | 0) + (n >>> 13)) | 0) +
              (Ot >>> 26)) |
            0),
            (Ot &= 67108863),
            (i = Math.imul(U, ft)),
            (n = ((n = Math.imul(U, ct)) + Math.imul(L, ft)) | 0),
            (o = Math.imul(L, ct));
          var It =
            (((a + (i = (i + Math.imul(P, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(P, dt)) | 0) + Math.imul(j, pt)) | 0)) <<
                13)) |
            0;
          (a =
            ((((o = (o + Math.imul(j, dt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863);
          var Ct =
            (((a + (i = Math.imul(U, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(U, dt)) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0;
          return (
            (a =
              ((((o = Math.imul(L, dt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (h[0] = gt),
            (h[1] = vt),
            (h[2] = yt),
            (h[3] = wt),
            (h[4] = Mt),
            (h[5] = bt),
            (h[6] = _t),
            (h[7] = At),
            (h[8] = Et),
            (h[9] = xt),
            (h[10] = St),
            (h[11] = Bt),
            (h[12] = Nt),
            (h[13] = Tt),
            (h[14] = kt),
            (h[15] = Rt),
            (h[16] = Ot),
            (h[17] = It),
            (h[18] = Ct),
            0 !== a && ((h[19] = a), e.length++),
            e
          );
        };
        function p(t, r, e) {
          return new d().mulp(t, r, e);
        }
        function d(t, r) {
          (this.x = t), (this.y = r);
        }
        Math.imul || (m = c),
          (o.prototype.mulTo = function (t, r) {
            var e = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? m(this, t, r)
              : e < 63
              ? c(this, t, r)
              : e < 1024
              ? (function (t, r, e) {
                  (e.negative = r.negative ^ t.negative),
                    (e.length = t.length + r.length);
                  for (var i = 0, n = 0, o = 0; o < e.length - 1; o++) {
                    var s = n;
                    n = 0;
                    for (
                      var u = 67108863 & i,
                        h = Math.min(o, r.length - 1),
                        a = Math.max(0, o - t.length + 1);
                      a <= h;
                      a++
                    ) {
                      var l = o - a,
                        f = (0 | t.words[l]) * (0 | r.words[a]),
                        c = 67108863 & f;
                      (u = 67108863 & (c = (c + u) | 0)),
                        (n +=
                          (s =
                            ((s = (s + ((f / 67108864) | 0)) | 0) +
                              (c >>> 26)) |
                            0) >>> 26),
                        (s &= 67108863);
                    }
                    (e.words[o] = u), (i = s), (s = n);
                  }
                  return 0 !== i ? (e.words[o] = i) : e.length--, e.strip();
                })(this, t, r)
              : p(this, t, r);
          }),
          (d.prototype.makeRBT = function (t) {
            for (
              var r = new Array(t), e = o.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              r[i] = this.revBin(i, e, t);
            return r;
          }),
          (d.prototype.revBin = function (t, r, e) {
            if (0 === t || t === e - 1) return t;
            for (var i = 0, n = 0; n < r; n++)
              (i |= (1 & t) << (r - n - 1)), (t >>= 1);
            return i;
          }),
          (d.prototype.permute = function (t, r, e, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = r[t[s]]), (n[s] = e[t[s]]);
          }),
          (d.prototype.transform = function (t, r, e, i, n, o) {
            this.permute(o, t, r, e, i, n);
            for (var s = 1; s < n; s <<= 1)
              for (
                var u = s << 1,
                  h = Math.cos((2 * Math.PI) / u),
                  a = Math.sin((2 * Math.PI) / u),
                  l = 0;
                l < n;
                l += u
              )
                for (var f = h, c = a, m = 0; m < s; m++) {
                  var p = e[l + m],
                    d = i[l + m],
                    g = e[l + m + s],
                    v = i[l + m + s],
                    y = f * g - c * v;
                  (v = f * v + c * g),
                    (g = y),
                    (e[l + m] = p + g),
                    (i[l + m] = d + v),
                    (e[l + m + s] = p - g),
                    (i[l + m + s] = d - v),
                    m !== u &&
                      ((y = h * f - a * c), (c = h * c + a * f), (f = y));
                }
          }),
          (d.prototype.guessLen13b = function (t, r) {
            var e = 1 | Math.max(r, t),
              i = 1 & e,
              n = 0;
            for (e = (e / 2) | 0; e; e >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (d.prototype.conjugate = function (t, r, e) {
            if (!(e <= 1))
              for (var i = 0; i < e / 2; i++) {
                var n = t[i];
                (t[i] = t[e - i - 1]),
                  (t[e - i - 1] = n),
                  (n = r[i]),
                  (r[i] = -r[e - i - 1]),
                  (r[e - i - 1] = -n);
              }
          }),
          (d.prototype.normalize13b = function (t, r) {
            for (var e = 0, i = 0; i < r / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / r) +
                Math.round(t[2 * i] / r) +
                e;
              (t[i] = 67108863 & n),
                (e = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (d.prototype.convert13b = function (t, r, e, n) {
            for (var o = 0, s = 0; s < r; s++)
              (o += 0 | t[s]),
                (e[2 * s] = 8191 & o),
                (o >>>= 13),
                (e[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * r; s < n; ++s) e[s] = 0;
            i(0 === o), i(0 == (-8192 & o));
          }),
          (d.prototype.stub = function (t) {
            for (var r = new Array(t), e = 0; e < t; e++) r[e] = 0;
            return r;
          }),
          (d.prototype.mulp = function (t, r, e) {
            var i = 2 * this.guessLen13b(t.length, r.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              u = new Array(i),
              h = new Array(i),
              a = new Array(i),
              l = new Array(i),
              f = new Array(i),
              c = e.words;
            (c.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(r.words, r.length, a, i),
              this.transform(s, o, u, h, i, n),
              this.transform(a, o, l, f, i, n);
            for (var m = 0; m < i; m++) {
              var p = u[m] * l[m] - h[m] * f[m];
              (h[m] = u[m] * f[m] + h[m] * l[m]), (u[m] = p);
            }
            return (
              this.conjugate(u, h, i),
              this.transform(u, h, c, o, i, n),
              this.conjugate(c, o, i),
              this.normalize13b(c, i),
              (e.negative = t.negative ^ r.negative),
              (e.length = t.length + r.length),
              e.strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var r = new o(null);
            return (
              (r.words = new Array(this.length + t.length)), this.mulTo(t, r)
            );
          }),
          (o.prototype.mulf = function (t) {
            var r = new o(null);
            return (r.words = new Array(this.length + t.length)), p(this, t, r);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            i("number" == typeof t), i(t < 67108864);
            for (var r = 0, e = 0; e < this.length; e++) {
              var n = (0 | this.words[e]) * t,
                o = (67108863 & n) + (67108863 & r);
              (r >>= 26),
                (r += (n / 67108864) | 0),
                (r += o >>> 26),
                (this.words[e] = 67108863 & o);
            }
            return 0 !== r && ((this.words[e] = r), this.length++), this;
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var r = (function (t) {
              for (var r = new Array(t.bitLength()), e = 0; e < r.length; e++) {
                var i = (e / 26) | 0,
                  n = e % 26;
                r[e] = (t.words[i] & (1 << n)) >>> n;
              }
              return r;
            })(t);
            if (0 === r.length) return new o(1);
            for (
              var e = this, i = 0;
              i < r.length && 0 === r[i];
              i++, e = e.sqr()
            );
            if (++i < r.length)
              for (var n = e.sqr(); i < r.length; i++, n = n.sqr())
                0 !== r[i] && (e = e.mul(n));
            return e;
          }),
          (o.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var r,
              e = t % 26,
              n = (t - e) / 26,
              o = (67108863 >>> (26 - e)) << (26 - e);
            if (0 !== e) {
              var s = 0;
              for (r = 0; r < this.length; r++) {
                var u = this.words[r] & o,
                  h = ((0 | this.words[r]) - u) << e;
                (this.words[r] = h | s), (s = u >>> (26 - e));
              }
              s && ((this.words[r] = s), this.length++);
            }
            if (0 !== n) {
              for (r = this.length - 1; r >= 0; r--)
                this.words[r + n] = this.words[r];
              for (r = 0; r < n; r++) this.words[r] = 0;
              this.length += n;
            }
            return this.strip();
          }),
          (o.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, r, e) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = r ? (r - (r % 26)) / 26 : 0);
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              u = 67108863 ^ ((67108863 >>> o) << o),
              h = e;
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var a = 0; a < s; a++) h.words[a] = this.words[a];
              h.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, a = 0; a < this.length; a++)
                this.words[a] = this.words[a + s];
            else (this.words[0] = 0), (this.length = 1);
            var l = 0;
            for (a = this.length - 1; a >= 0 && (0 !== l || a >= n); a--) {
              var f = 0 | this.words[a];
              (this.words[a] = (l << (26 - o)) | (f >>> o)), (l = f & u);
            }
            return (
              h && 0 !== l && (h.words[h.length++] = l),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (o.prototype.ishrn = function (t, r, e) {
            return i(0 === this.negative), this.iushrn(t, r, e);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            return !(this.length <= e) && !!(this.words[e] & n);
          }),
          (o.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var r = t % 26,
              e = (t - r) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= e)
            )
              return this;
            if (
              (0 !== r && e++,
              (this.length = Math.min(e, this.length)),
              0 !== r)
            ) {
              var n = 67108863 ^ ((67108863 >>> r) << r);
              this.words[this.length - 1] &= n;
            }
            return this.strip();
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var r = 0; r < this.length && this.words[r] >= 67108864; r++)
              (this.words[r] -= 67108864),
                r === this.length - 1
                  ? (this.words[r + 1] = 1)
                  : this.words[r + 1]++;
            return (this.length = Math.max(this.length, r + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var r = 0; r < this.length && this.words[r] < 0; r++)
                (this.words[r] += 67108864), (this.words[r + 1] -= 1);
            return this.strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, r, e) {
            var n,
              o,
              s = t.length + e;
            this._expand(s);
            var u = 0;
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + e]) + u;
              var h = (0 | t.words[n]) * r;
              (u = ((o -= 67108863 & h) >> 26) - ((h / 67108864) | 0)),
                (this.words[n + e] = 67108863 & o);
            }
            for (; n < this.length - e; n++)
              (u = (o = (0 | this.words[n + e]) + u) >> 26),
                (this.words[n + e] = 67108863 & o);
            if (0 === u) return this.strip();
            for (i(-1 === u), u = 0, n = 0; n < this.length; n++)
              (u = (o = -(0 | this.words[n]) + u) >> 26),
                (this.words[n] = 67108863 & o);
            return (this.negative = 1), this.strip();
          }),
          (o.prototype._wordDiv = function (t, r) {
            var e = (this.length, t.length),
              i = this.clone(),
              n = t,
              s = 0 | n.words[n.length - 1];
            0 !== (e = 26 - this._countBits(s)) &&
              ((n = n.ushln(e)), i.iushln(e), (s = 0 | n.words[n.length - 1]));
            var u,
              h = i.length - n.length;
            if ("mod" !== r) {
              ((u = new o(null)).length = h + 1),
                (u.words = new Array(u.length));
              for (var a = 0; a < u.length; a++) u.words[a] = 0;
            }
            var l = i.clone()._ishlnsubmul(n, 1, h);
            0 === l.negative && ((i = l), u && (u.words[h] = 1));
            for (var f = h - 1; f >= 0; f--) {
              var c =
                67108864 * (0 | i.words[n.length + f]) +
                (0 | i.words[n.length + f - 1]);
              for (
                c = Math.min((c / s) | 0, 67108863), i._ishlnsubmul(n, c, f);
                0 !== i.negative;

              )
                c--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, f),
                  i.isZero() || (i.negative ^= 1);
              u && (u.words[f] = c);
            }
            return (
              u && u.strip(),
              i.strip(),
              "div" !== r && 0 !== e && i.iushrn(e),
              { div: u || null, mod: i }
            );
          }),
          (o.prototype.divmod = function (t, r, e) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new o(0), mod: new o(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((u = this.neg().divmod(t, r)),
                  "mod" !== r && (n = u.div.neg()),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.iadd(t)),
                  { div: n, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((u = this.divmod(t.neg(), r)),
                  "mod" !== r && (n = u.div.neg()),
                  { div: n, mod: u.mod })
                : 0 != (this.negative & t.negative)
                ? ((u = this.neg().divmod(t.neg(), r)),
                  "div" !== r &&
                    ((s = u.mod.neg()), e && 0 !== s.negative && s.isub(t)),
                  { div: u.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new o(0), mod: this }
                : 1 === t.length
                ? "div" === r
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === r
                  ? { div: null, mod: new o(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new o(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, r)
            );
            var n, s, u;
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var r = this.divmod(t);
            if (r.mod.isZero()) return r.div;
            var e = 0 !== r.div.negative ? r.mod.isub(t) : r.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = e.cmp(i);
            return o < 0 || (1 === n && 0 === o)
              ? r.div
              : 0 !== r.div.negative
              ? r.div.isubn(1)
              : r.div.iaddn(1);
          }),
          (o.prototype.modn = function (t) {
            i(t <= 67108863);
            for (var r = (1 << 26) % t, e = 0, n = this.length - 1; n >= 0; n--)
              e = (r * e + (0 | this.words[n])) % t;
            return e;
          }),
          (o.prototype.idivn = function (t) {
            i(t <= 67108863);
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var n = (0 | this.words[e]) + 67108864 * r;
              (this.words[e] = (n / t) | 0), (r = n % t);
            }
            return this.strip();
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0;
              r.isEven() && e.isEven();

            )
              r.iushrn(1), e.iushrn(1), ++a;
            for (var l = e.clone(), f = r.clone(); !r.isZero(); ) {
              for (
                var c = 0, m = 1;
                0 == (r.words[0] & m) && c < 26;
                ++c, m <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  (n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(f)),
                    n.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, d = 1;
                0 == (e.words[0] & d) && p < 26;
                ++p, d <<= 1
              );
              if (p > 0)
                for (e.iushrn(p); p-- > 0; )
                  (u.isOdd() || h.isOdd()) && (u.iadd(l), h.isub(f)),
                    u.iushrn(1),
                    h.iushrn(1);
              r.cmp(e) >= 0
                ? (r.isub(e), n.isub(u), s.isub(h))
                : (e.isub(r), u.isub(n), h.isub(s));
            }
            return { a: u, b: h, gcd: e.iushln(a) };
          }),
          (o.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var r = this,
              e = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var n, s = new o(1), u = new o(0), h = e.clone();
              r.cmpn(1) > 0 && e.cmpn(1) > 0;

            ) {
              for (
                var a = 0, l = 1;
                0 == (r.words[0] & l) && a < 26;
                ++a, l <<= 1
              );
              if (a > 0)
                for (r.iushrn(a); a-- > 0; )
                  s.isOdd() && s.iadd(h), s.iushrn(1);
              for (
                var f = 0, c = 1;
                0 == (e.words[0] & c) && f < 26;
                ++f, c <<= 1
              );
              if (f > 0)
                for (e.iushrn(f); f-- > 0; )
                  u.isOdd() && u.iadd(h), u.iushrn(1);
              r.cmp(e) >= 0 ? (r.isub(e), s.isub(u)) : (e.isub(r), u.isub(s));
            }
            return (n = 0 === r.cmpn(1) ? s : u).cmpn(0) < 0 && n.iadd(t), n;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var r = this.clone(),
              e = t.clone();
            (r.negative = 0), (e.negative = 0);
            for (var i = 0; r.isEven() && e.isEven(); i++)
              r.iushrn(1), e.iushrn(1);
            for (;;) {
              for (; r.isEven(); ) r.iushrn(1);
              for (; e.isEven(); ) e.iushrn(1);
              var n = r.cmp(e);
              if (n < 0) {
                var o = r;
                (r = e), (e = o);
              } else if (0 === n || 0 === e.cmpn(1)) break;
              r.isub(e);
            }
            return e.iushln(i);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (o.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            i("number" == typeof t);
            var r = t % 26,
              e = (t - r) / 26,
              n = 1 << r;
            if (this.length <= e)
              return this._expand(e + 1), (this.words[e] |= n), this;
            for (var o = n, s = e; 0 !== o && s < this.length; s++) {
              var u = 0 | this.words[s];
              (o = (u += o) >>> 26), (u &= 67108863), (this.words[s] = u);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var r,
              e = t < 0;
            if (0 !== this.negative && !e) return -1;
            if (0 === this.negative && e) return 1;
            if ((this.strip(), this.length > 1)) r = 1;
            else {
              e && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              r = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var r = this.ucmp(t);
            return 0 !== this.negative ? 0 | -r : r;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var r = 0, e = this.length - 1; e >= 0; e--) {
              var i = 0 | this.words[e],
                n = 0 | t.words[e];
              if (i !== n) {
                i < n ? (r = -1) : i > n && (r = 1);
                break;
              }
            }
            return r;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (o.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new _(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var g = { k256: null, p224: null, p192: null, p25519: null };
        function v(t, r) {
          (this.name = t),
            (this.p = new o(r, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function y() {
          v.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function w() {
          v.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function M() {
          v.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function b() {
          v.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function _(t) {
          if ("string" == typeof t) {
            var r = o._prime(t);
            (this.m = r.p), (this.prime = r);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (v.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (v.prototype.ireduce = function (t) {
            var r,
              e = t;
            do {
              this.split(e, this.tmp),
                (r = (e = (e = this.imulK(e)).iadd(this.tmp)).bitLength());
            } while (r > this.n);
            var i = r < this.n ? -1 : e.ucmp(this.p);
            return (
              0 === i
                ? ((e.words[0] = 0), (e.length = 1))
                : i > 0
                ? e.isub(this.p)
                : e.strip(),
              e
            );
          }),
          (v.prototype.split = function (t, r) {
            t.iushrn(this.n, 0, r);
          }),
          (v.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(y, v),
          (y.prototype.split = function (t, r) {
            for (var e = Math.min(t.length, 9), i = 0; i < e; i++)
              r.words[i] = t.words[i];
            if (((r.length = e), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var n = t.words[9];
            for (r.words[r.length++] = 4194303 & n, i = 10; i < t.length; i++) {
              var o = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & o) << 4) | (n >>> 22)), (n = o);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (y.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 0 | t.words[e];
              (r += 977 * i),
                (t.words[e] = 67108863 & r),
                (r = 64 * i + ((r / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(w, v),
          n(M, v),
          n(b, v),
          (b.prototype.imulK = function (t) {
            for (var r = 0, e = 0; e < t.length; e++) {
              var i = 19 * (0 | t.words[e]) + r,
                n = 67108863 & i;
              (i >>>= 26), (t.words[e] = n), (r = i);
            }
            return 0 !== r && (t.words[t.length++] = r), t;
          }),
          (o._prime = function (t) {
            if (g[t]) return g[t];
            var r;
            if ("k256" === t) r = new y();
            else if ("p224" === t) r = new w();
            else if ("p192" === t) r = new M();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              r = new b();
            }
            return (g[t] = r), r;
          }),
          (_.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (_.prototype._verify2 = function (t, r) {
            i(0 == (t.negative | r.negative), "red works only with positives"),
              i(t.red && t.red === r.red, "red works only with red numbers");
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (_.prototype.add = function (t, r) {
            this._verify2(t, r);
            var e = t.add(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
          }),
          (_.prototype.iadd = function (t, r) {
            this._verify2(t, r);
            var e = t.iadd(r);
            return e.cmp(this.m) >= 0 && e.isub(this.m), e;
          }),
          (_.prototype.sub = function (t, r) {
            this._verify2(t, r);
            var e = t.sub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
          }),
          (_.prototype.isub = function (t, r) {
            this._verify2(t, r);
            var e = t.isub(r);
            return e.cmpn(0) < 0 && e.iadd(this.m), e;
          }),
          (_.prototype.shl = function (t, r) {
            return this._verify1(t), this.imod(t.ushln(r));
          }),
          (_.prototype.imul = function (t, r) {
            return this._verify2(t, r), this.imod(t.imul(r));
          }),
          (_.prototype.mul = function (t, r) {
            return this._verify2(t, r), this.imod(t.mul(r));
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var r = this.m.andln(3);
            if ((i(r % 2 == 1), 3 === r)) {
              var e = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, e);
            }
            for (
              var n = this.m.subn(1), s = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              s++, n.iushrn(1);
            i(!n.isZero());
            var u = new o(1).toRed(this),
              h = u.redNeg(),
              a = this.m.subn(1).iushrn(1),
              l = this.m.bitLength();
            for (
              l = new o(2 * l * l).toRed(this);
              0 !== this.pow(l, a).cmp(h);

            )
              l.redIAdd(h);
            for (
              var f = this.pow(l, n),
                c = this.pow(t, n.addn(1).iushrn(1)),
                m = this.pow(t, n),
                p = s;
              0 !== m.cmp(u);

            ) {
              for (var d = m, g = 0; 0 !== d.cmp(u); g++) d = d.redSqr();
              i(g < p);
              var v = this.pow(f, new o(1).iushln(p - g - 1));
              (c = c.redMul(v)), (f = v.redSqr()), (m = m.redMul(f)), (p = g);
            }
            return c;
          }),
          (_.prototype.invm = function (t) {
            var r = t._invmp(this.m);
            return 0 !== r.negative
              ? ((r.negative = 0), this.imod(r).redNeg())
              : this.imod(r);
          }),
          (_.prototype.pow = function (t, r) {
            if (r.isZero()) return new o(1);
            if (0 === r.cmpn(1)) return t.clone();
            var e = new Array(16);
            (e[0] = new o(1).toRed(this)), (e[1] = t);
            for (var i = 2; i < e.length; i++) e[i] = this.mul(e[i - 1], t);
            var n = e[0],
              s = 0,
              u = 0,
              h = r.bitLength() % 26;
            for (0 === h && (h = 26), i = r.length - 1; i >= 0; i--) {
              for (var a = r.words[i], l = h - 1; l >= 0; l--) {
                var f = (a >> l) & 1;
                n !== e[0] && (n = this.sqr(n)),
                  0 !== f || 0 !== s
                    ? ((s <<= 1),
                      (s |= f),
                      (4 === ++u || (0 === i && 0 === l)) &&
                        ((n = this.mul(n, e[s])), (u = 0), (s = 0)))
                    : (u = 0);
              }
              h = 26;
            }
            return n;
          }),
          (_.prototype.convertTo = function (t) {
            var r = t.umod(this.m);
            return r === t ? r.clone() : r;
          }),
          (_.prototype.convertFrom = function (t) {
            var r = t.clone();
            return (r.red = null), r;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          n(A, _),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var r = this.imod(t.mul(this.rinv));
            return (r.red = null), r;
          }),
          (A.prototype.imul = function (t, r) {
            if (t.isZero() || r.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var e = t.imul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, r) {
            if (t.isZero() || r.isZero()) return new o(0)._forceRed(this);
            var e = t.mul(r),
              i = e
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = e.isub(i).iushrn(this.shift),
              s = n;
            return (
              n.cmp(this.m) >= 0
                ? (s = n.isub(this.m))
                : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })(t, this);
    }.call(this, e(4)(t)));
  },
  function (t, r, e) {
    var i = e(21);
    t.exports = function (t) {
      return "string" != typeof t ? t : i(t) ? t.slice(2) : t;
    };
  },
  function (t, r) {
    t.exports = function (t) {
      if ("string" != typeof t)
        throw new Error(
          "[is-hex-prefixed] value must be type 'string', is currently type " +
            typeof t +
            ", while checking isHexPrefixed."
        );
      return "0x" === t.slice(0, 2);
    };
  },
  function (t, r) {},
  function (t, r, e) {
    !(function (t) {
      var r,
        e,
        i,
        n = String.fromCharCode;
      function o(t) {
        for (var r, e, i = [], n = 0, o = t.length; n < o; )
          (r = t.charCodeAt(n++)) >= 55296 && r <= 56319 && n < o
            ? 56320 == (64512 & (e = t.charCodeAt(n++)))
              ? i.push(((1023 & r) << 10) + (1023 & e) + 65536)
              : (i.push(r), n--)
            : i.push(r);
        return i;
      }
      function s(t) {
        if (t >= 55296 && t <= 57343)
          throw Error(
            "Lone surrogate U+" +
              t.toString(16).toUpperCase() +
              " is not a scalar value"
          );
      }
      function u(t, r) {
        return n(((t >> r) & 63) | 128);
      }
      function h(t) {
        if (0 == (4294967168 & t)) return n(t);
        var r = "";
        return (
          0 == (4294965248 & t)
            ? (r = n(((t >> 6) & 31) | 192))
            : 0 == (4294901760 & t)
            ? (s(t), (r = n(((t >> 12) & 15) | 224)), (r += u(t, 6)))
            : 0 == (4292870144 & t) &&
              ((r = n(((t >> 18) & 7) | 240)), (r += u(t, 12)), (r += u(t, 6))),
          (r += n((63 & t) | 128))
        );
      }
      function a() {
        if (i >= e) throw Error("Invalid byte index");
        var t = 255 & r[i];
        if ((i++, 128 == (192 & t))) return 63 & t;
        throw Error("Invalid continuation byte");
      }
      function l() {
        var t, n;
        if (i > e) throw Error("Invalid byte index");
        if (i == e) return !1;
        if (((t = 255 & r[i]), i++, 0 == (128 & t))) return t;
        if (192 == (224 & t)) {
          if ((n = ((31 & t) << 6) | a()) >= 128) return n;
          throw Error("Invalid continuation byte");
        }
        if (224 == (240 & t)) {
          if ((n = ((15 & t) << 12) | (a() << 6) | a()) >= 2048) return s(n), n;
          throw Error("Invalid continuation byte");
        }
        if (
          240 == (248 & t) &&
          (n = ((7 & t) << 18) | (a() << 12) | (a() << 6) | a()) >= 65536 &&
          n <= 1114111
        )
          return n;
        throw Error("Invalid UTF-8 detected");
      }
      (t.version = "3.0.0"),
        (t.encode = function (t) {
          for (var r = o(t), e = r.length, i = -1, n = ""; ++i < e; )
            n += h(r[i]);
          return n;
        }),
        (t.decode = function (t) {
          (r = o(t)), (e = r.length), (i = 0);
          for (var s, u = []; !1 !== (s = l()); ) u.push(s);
          return (function (t) {
            for (var r, e = t.length, i = -1, o = ""; ++i < e; )
              (r = t[i]) > 65535 &&
                ((o += n((((r -= 65536) >>> 10) & 1023) | 55296)),
                (r = 56320 | (1023 & r))),
                (o += n(r));
            return o;
          })(u);
        });
    })(r);
  },
  function (t, r) {
    const e = "0123456789abcdef".split(""),
      i = [1, 256, 65536, 16777216],
      n = [0, 8, 16, 24],
      o = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648,
      ],
      s = (t) => {
        var r,
          e,
          i,
          n,
          s,
          u,
          h,
          a,
          l,
          f,
          c,
          m,
          p,
          d,
          g,
          v,
          y,
          w,
          M,
          b,
          _,
          A,
          E,
          x,
          S,
          B,
          N,
          T,
          k,
          R,
          O,
          I,
          C,
          P,
          j,
          F,
          U,
          L,
          D,
          z,
          q,
          Z,
          H,
          $,
          V,
          W,
          Y,
          G,
          J,
          K,
          X,
          Q,
          tt,
          rt,
          et,
          it,
          nt,
          ot,
          st,
          ut,
          ht,
          at,
          lt;
        for (i = 0; i < 48; i += 2)
          (n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
            (s = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
            (u = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]),
            (h = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]),
            (a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
            (l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
            (f = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
            (c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
            (r =
              (m = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
              ((u << 1) | (h >>> 31))),
            (e =
              (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
              ((h << 1) | (u >>> 31))),
            (t[0] ^= r),
            (t[1] ^= e),
            (t[10] ^= r),
            (t[11] ^= e),
            (t[20] ^= r),
            (t[21] ^= e),
            (t[30] ^= r),
            (t[31] ^= e),
            (t[40] ^= r),
            (t[41] ^= e),
            (r = n ^ ((a << 1) | (l >>> 31))),
            (e = s ^ ((l << 1) | (a >>> 31))),
            (t[2] ^= r),
            (t[3] ^= e),
            (t[12] ^= r),
            (t[13] ^= e),
            (t[22] ^= r),
            (t[23] ^= e),
            (t[32] ^= r),
            (t[33] ^= e),
            (t[42] ^= r),
            (t[43] ^= e),
            (r = u ^ ((f << 1) | (c >>> 31))),
            (e = h ^ ((c << 1) | (f >>> 31))),
            (t[4] ^= r),
            (t[5] ^= e),
            (t[14] ^= r),
            (t[15] ^= e),
            (t[24] ^= r),
            (t[25] ^= e),
            (t[34] ^= r),
            (t[35] ^= e),
            (t[44] ^= r),
            (t[45] ^= e),
            (r = a ^ ((m << 1) | (p >>> 31))),
            (e = l ^ ((p << 1) | (m >>> 31))),
            (t[6] ^= r),
            (t[7] ^= e),
            (t[16] ^= r),
            (t[17] ^= e),
            (t[26] ^= r),
            (t[27] ^= e),
            (t[36] ^= r),
            (t[37] ^= e),
            (t[46] ^= r),
            (t[47] ^= e),
            (r = f ^ ((n << 1) | (s >>> 31))),
            (e = c ^ ((s << 1) | (n >>> 31))),
            (t[8] ^= r),
            (t[9] ^= e),
            (t[18] ^= r),
            (t[19] ^= e),
            (t[28] ^= r),
            (t[29] ^= e),
            (t[38] ^= r),
            (t[39] ^= e),
            (t[48] ^= r),
            (t[49] ^= e),
            (d = t[0]),
            (g = t[1]),
            (W = (t[11] << 4) | (t[10] >>> 28)),
            (Y = (t[10] << 4) | (t[11] >>> 28)),
            (T = (t[20] << 3) | (t[21] >>> 29)),
            (k = (t[21] << 3) | (t[20] >>> 29)),
            (ut = (t[31] << 9) | (t[30] >>> 23)),
            (ht = (t[30] << 9) | (t[31] >>> 23)),
            (Z = (t[40] << 18) | (t[41] >>> 14)),
            (H = (t[41] << 18) | (t[40] >>> 14)),
            (P = (t[2] << 1) | (t[3] >>> 31)),
            (j = (t[3] << 1) | (t[2] >>> 31)),
            (v = (t[13] << 12) | (t[12] >>> 20)),
            (y = (t[12] << 12) | (t[13] >>> 20)),
            (G = (t[22] << 10) | (t[23] >>> 22)),
            (J = (t[23] << 10) | (t[22] >>> 22)),
            (R = (t[33] << 13) | (t[32] >>> 19)),
            (O = (t[32] << 13) | (t[33] >>> 19)),
            (at = (t[42] << 2) | (t[43] >>> 30)),
            (lt = (t[43] << 2) | (t[42] >>> 30)),
            (rt = (t[5] << 30) | (t[4] >>> 2)),
            (et = (t[4] << 30) | (t[5] >>> 2)),
            (F = (t[14] << 6) | (t[15] >>> 26)),
            (U = (t[15] << 6) | (t[14] >>> 26)),
            (w = (t[25] << 11) | (t[24] >>> 21)),
            (M = (t[24] << 11) | (t[25] >>> 21)),
            (K = (t[34] << 15) | (t[35] >>> 17)),
            (X = (t[35] << 15) | (t[34] >>> 17)),
            (I = (t[45] << 29) | (t[44] >>> 3)),
            (C = (t[44] << 29) | (t[45] >>> 3)),
            (x = (t[6] << 28) | (t[7] >>> 4)),
            (S = (t[7] << 28) | (t[6] >>> 4)),
            (it = (t[17] << 23) | (t[16] >>> 9)),
            (nt = (t[16] << 23) | (t[17] >>> 9)),
            (L = (t[26] << 25) | (t[27] >>> 7)),
            (D = (t[27] << 25) | (t[26] >>> 7)),
            (b = (t[36] << 21) | (t[37] >>> 11)),
            (_ = (t[37] << 21) | (t[36] >>> 11)),
            (Q = (t[47] << 24) | (t[46] >>> 8)),
            (tt = (t[46] << 24) | (t[47] >>> 8)),
            ($ = (t[8] << 27) | (t[9] >>> 5)),
            (V = (t[9] << 27) | (t[8] >>> 5)),
            (B = (t[18] << 20) | (t[19] >>> 12)),
            (N = (t[19] << 20) | (t[18] >>> 12)),
            (ot = (t[29] << 7) | (t[28] >>> 25)),
            (st = (t[28] << 7) | (t[29] >>> 25)),
            (z = (t[38] << 8) | (t[39] >>> 24)),
            (q = (t[39] << 8) | (t[38] >>> 24)),
            (A = (t[48] << 14) | (t[49] >>> 18)),
            (E = (t[49] << 14) | (t[48] >>> 18)),
            (t[0] = d ^ (~v & w)),
            (t[1] = g ^ (~y & M)),
            (t[10] = x ^ (~B & T)),
            (t[11] = S ^ (~N & k)),
            (t[20] = P ^ (~F & L)),
            (t[21] = j ^ (~U & D)),
            (t[30] = $ ^ (~W & G)),
            (t[31] = V ^ (~Y & J)),
            (t[40] = rt ^ (~it & ot)),
            (t[41] = et ^ (~nt & st)),
            (t[2] = v ^ (~w & b)),
            (t[3] = y ^ (~M & _)),
            (t[12] = B ^ (~T & R)),
            (t[13] = N ^ (~k & O)),
            (t[22] = F ^ (~L & z)),
            (t[23] = U ^ (~D & q)),
            (t[32] = W ^ (~G & K)),
            (t[33] = Y ^ (~J & X)),
            (t[42] = it ^ (~ot & ut)),
            (t[43] = nt ^ (~st & ht)),
            (t[4] = w ^ (~b & A)),
            (t[5] = M ^ (~_ & E)),
            (t[14] = T ^ (~R & I)),
            (t[15] = k ^ (~O & C)),
            (t[24] = L ^ (~z & Z)),
            (t[25] = D ^ (~q & H)),
            (t[34] = G ^ (~K & Q)),
            (t[35] = J ^ (~X & tt)),
            (t[44] = ot ^ (~ut & at)),
            (t[45] = st ^ (~ht & lt)),
            (t[6] = b ^ (~A & d)),
            (t[7] = _ ^ (~E & g)),
            (t[16] = R ^ (~I & x)),
            (t[17] = O ^ (~C & S)),
            (t[26] = z ^ (~Z & P)),
            (t[27] = q ^ (~H & j)),
            (t[36] = K ^ (~Q & $)),
            (t[37] = X ^ (~tt & V)),
            (t[46] = ut ^ (~at & rt)),
            (t[47] = ht ^ (~lt & et)),
            (t[8] = A ^ (~d & v)),
            (t[9] = E ^ (~g & y)),
            (t[18] = I ^ (~x & B)),
            (t[19] = C ^ (~S & N)),
            (t[28] = Z ^ (~P & F)),
            (t[29] = H ^ (~j & U)),
            (t[38] = Q ^ (~$ & W)),
            (t[39] = tt ^ (~V & Y)),
            (t[48] = at ^ (~rt & it)),
            (t[49] = lt ^ (~et & nt)),
            (t[0] ^= o[i]),
            (t[1] ^= o[i + 1]);
      },
      u = (t) => (r) => {
        var o;
        if ("0x" === r.slice(0, 2)) {
          o = [];
          for (var u = 2, h = r.length; u < h; u += 2)
            o.push(parseInt(r.slice(u, u + 2), 16));
        } else o = r;
        return ((t, r) => {
          for (
            var o,
              u = r.length,
              h = t.blocks,
              a = t.blockCount << 2,
              l = t.blockCount,
              f = t.outputBlocks,
              c = t.s,
              m = 0;
            m < u;

          ) {
            if (t.reset)
              for (t.reset = !1, h[0] = t.block, g = 1; g < l + 1; ++g)
                h[g] = 0;
            if ("string" != typeof r)
              for (g = t.start; m < u && g < a; ++m)
                h[g >> 2] |= r[m] << n[3 & g++];
            else
              for (g = t.start; m < u && g < a; ++m)
                (o = r.charCodeAt(m)) < 128
                  ? (h[g >> 2] |= o << n[3 & g++])
                  : o < 2048
                  ? ((h[g >> 2] |= (192 | (o >> 6)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | (63 & o)) << n[3 & g++]))
                  : o < 55296 || o >= 57344
                  ? ((h[g >> 2] |= (224 | (o >> 12)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | ((o >> 6) & 63)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | (63 & o)) << n[3 & g++]))
                  : ((o =
                      65536 +
                      (((1023 & o) << 10) | (1023 & r.charCodeAt(++m)))),
                    (h[g >> 2] |= (240 | (o >> 18)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | ((o >> 12) & 63)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | ((o >> 6) & 63)) << n[3 & g++]),
                    (h[g >> 2] |= (128 | (63 & o)) << n[3 & g++]));
            if (((t.lastByteIndex = g), g >= a)) {
              for (t.start = g - a, t.block = h[l], g = 0; g < l; ++g)
                c[g] ^= h[g];
              s(c), (t.reset = !0);
            } else t.start = g;
          }
          if (
            ((h[(g = t.lastByteIndex) >> 2] |= i[3 & g]), t.lastByteIndex === a)
          )
            for (h[0] = h[l], g = 1; g < l + 1; ++g) h[g] = 0;
          for (h[l - 1] |= 2147483648, g = 0; g < l; ++g) c[g] ^= h[g];
          s(c);
          for (var p, d = "", g = 0, v = 0; v < f; ) {
            for (g = 0; g < l && v < f; ++g, ++v)
              (p = c[g]),
                (d +=
                  e[(p >> 4) & 15] +
                  e[15 & p] +
                  e[(p >> 12) & 15] +
                  e[(p >> 8) & 15] +
                  e[(p >> 20) & 15] +
                  e[(p >> 16) & 15] +
                  e[(p >> 28) & 15] +
                  e[(p >> 24) & 15]);
            v % l == 0 && (s(c), (g = 0));
          }
          return "0x" + d;
        })(
          ((t) => {
            return {
              blocks: [],
              reset: !0,
              block: 0,
              start: 0,
              blockCount: (1600 - (t << 1)) >> 5,
              outputBlocks: t >> 5,
              s:
                ((r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                [].concat(r, r, r, r, r)),
            };
            var r;
          })(t),
          o
        );
      };
    t.exports = {
      keccak256: u(256),
      keccak512: u(512),
      keccak256s: u(256),
      keccak512s: u(512),
    };
  },
  function (t, r, e) {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    const i = e(26);
    function n(t) {
      return (
        "string" == typeof t &&
        !!/^(0x)?[0-9a-f]{512}$/i.test(t) &&
        !(!/^(0x)?[0-9a-f]{512}$/.test(t) && !/^(0x)?[0-9A-F]{512}$/.test(t))
      );
    }
    function o(t, r) {
      "object" == typeof r &&
        r.constructor === Uint8Array &&
        (r = i.bytesToHex(r));
      const e = i.keccak256(r).replace("0x", "");
      for (let r = 0; r < 12; r += 4) {
        const i =
            ((parseInt(e.substr(r, 2), 16) << 8) +
              parseInt(e.substr(r + 2, 2), 16)) &
            2047,
          n = 1 << i % 4;
        if ((s(t.charCodeAt(t.length - 1 - Math.floor(i / 4))) & n) !== n)
          return !1;
      }
      return !0;
    }
    function s(t) {
      if (t >= 48 && t <= 57) return t - 48;
      if (t >= 65 && t <= 70) return t - 55;
      if (t >= 97 && t <= 102) return t - 87;
      throw new Error("invalid bloom");
    }
    function u(t) {
      return (
        "string" == typeof t &&
        !!/^(0x)?[0-9a-f]{64}$/i.test(t) &&
        !(!/^(0x)?[0-9a-f]{64}$/.test(t) && !/^(0x)?[0-9A-F]{64}$/.test(t))
      );
    }
    function h(t) {
      return (
        "string" == typeof t &&
        (!!t.match(/^(0x)?[0-9a-fA-F]{40}$/) ||
          !!t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/))
      );
    }
    (r.isBloom = n),
      (r.isInBloom = o),
      (r.isUserEthereumAddressInBloom = function (t, r) {
        if (!n(t)) throw new Error("Invalid bloom given");
        if (!h(r)) throw new Error(`Invalid ethereum address given: "${r}"`);
        return o(t, i.padLeft(r, 64));
      }),
      (r.isContractAddressInBloom = function (t, r) {
        if (!n(t)) throw new Error("Invalid bloom given");
        if (!h(r)) throw new Error(`Invalid contract address given: "${r}"`);
        return o(t, r);
      }),
      (r.isTopicInBloom = function (t, r) {
        if (!n(t)) throw new Error("Invalid bloom given");
        if (!u(r)) throw new Error("Invalid topic");
        return o(t, r);
      }),
      (r.isTopic = u),
      (r.isAddress = h);
  },
  function (t, r, e) {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    const i = e(27);
    function n(t) {
      if (null == t) throw new Error("cannot convert null value to array");
      if ("string" == typeof t) {
        const r = t.match(/^(0x)?[0-9a-fA-F]*$/);
        if (!r) throw new Error("invalid hexidecimal string");
        if ("0x" !== r[1]) throw new Error("hex string must have 0x prefix");
        (t = t.substring(2)).length % 2 && (t = "0" + t);
        const e = [];
        for (let r = 0; r < t.length; r += 2)
          e.push(parseInt(t.substr(r, 2), 16));
        return o(new Uint8Array(e));
      }
      if (
        (function (t) {
          if (
            !t ||
            parseInt(String(t.length)) != t.length ||
            "string" == typeof t
          )
            return !1;
          for (let r = 0; r < t.length; r++) {
            const e = t[r];
            if (e < 0 || e >= 256 || parseInt(String(e)) != e) return !1;
          }
          return !0;
        })(t)
      )
        return o(new Uint8Array(t));
      throw new Error("invalid arrayify value");
    }
    function o(t) {
      return (
        void 0 !== t.slice ||
          (t.slice = () => {
            const r = Array.prototype.slice.call(arguments);
            return o(new Uint8Array(Array.prototype.slice.apply(t, r)));
          }),
        t
      );
    }
    (r.keccak256 = function (t) {
      return "0x" + i.keccak_256(n(t));
    }),
      (r.padLeft = (t, r) => {
        const e = /^0x/i.test(t) || "number" == typeof t,
          i =
            r - (t = t.toString().replace(/^0x/i, "")).length + 1 >= 0
              ? r - t.length + 1
              : 0;
        return (e ? "0x" : "") + new Array(i).join("0") + t;
      }),
      (r.bytesToHex = function (t) {
        const r = [];
        for (let e = 0; e < t.length; e++)
          r.push((t[e] >>> 4).toString(16)), r.push((15 & t[e]).toString(16));
        return "0x" + r.join("").replace(/^0+/, "");
      }),
      (r.toByteArray = n);
  },
  function (t, r, e) {
    (function (i, n) {
      var o;
      /**
       * [js-sha3]{@link https://github.com/emn178/js-sha3}
       *
       * @version 0.8.0
       * @author Chen, Yi-Cyuan [emn178@gmail.com]
       * @copyright Chen, Yi-Cyuan 2015-2018
       * @license MIT
       */ !(function () {
        "use strict";
        var s = "input is invalid type",
          u = "object" == typeof window,
          h = u ? window : {};
        h.JS_SHA3_NO_WINDOW && (u = !1);
        var a = !u && "object" == typeof self;
        !h.JS_SHA3_NO_NODE_JS &&
        "object" == typeof i &&
        i.versions &&
        i.versions.node
          ? (h = n)
          : a && (h = self);
        var l = !h.JS_SHA3_NO_COMMON_JS && "object" == typeof t && t.exports,
          f = e(28),
          c = !h.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
          m = "0123456789abcdef".split(""),
          p = [4, 1024, 262144, 67108864],
          d = [0, 8, 16, 24],
          g = [
            1,
            0,
            32898,
            0,
            32906,
            2147483648,
            2147516416,
            2147483648,
            32907,
            0,
            2147483649,
            0,
            2147516545,
            2147483648,
            32777,
            2147483648,
            138,
            0,
            136,
            0,
            2147516425,
            0,
            2147483658,
            0,
            2147516555,
            0,
            139,
            2147483648,
            32905,
            2147483648,
            32771,
            2147483648,
            32770,
            2147483648,
            128,
            2147483648,
            32778,
            0,
            2147483658,
            2147483648,
            2147516545,
            2147483648,
            32896,
            2147483648,
            2147483649,
            0,
            2147516424,
            2147483648,
          ],
          v = [224, 256, 384, 512],
          y = [128, 256],
          w = ["hex", "buffer", "arrayBuffer", "array", "digest"],
          M = { 128: 168, 256: 136 };
        (!h.JS_SHA3_NO_NODE_JS && Array.isArray) ||
          (Array.isArray = function (t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          }),
          !c ||
            (!h.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
            (ArrayBuffer.isView = function (t) {
              return (
                "object" == typeof t &&
                t.buffer &&
                t.buffer.constructor === ArrayBuffer
              );
            });
        for (
          var b = function (t, r, e) {
              return function (i) {
                return new j(t, r, t).update(i)[e]();
              };
            },
            _ = function (t, r, e) {
              return function (i, n) {
                return new j(t, r, n).update(i)[e]();
              };
            },
            A = function (t, r, e) {
              return function (r, i, n, o) {
                return N["cshake" + t].update(r, i, n, o)[e]();
              };
            },
            E = function (t, r, e) {
              return function (r, i, n, o) {
                return N["kmac" + t].update(r, i, n, o)[e]();
              };
            },
            x = function (t, r, e, i) {
              for (var n = 0; n < w.length; ++n) {
                var o = w[n];
                t[o] = r(e, i, o);
              }
              return t;
            },
            S = function (t, r) {
              var e = b(t, r, "hex");
              return (
                (e.create = function () {
                  return new j(t, r, t);
                }),
                (e.update = function (t) {
                  return e.create().update(t);
                }),
                x(e, b, t, r)
              );
            },
            B = [
              {
                name: "keccak",
                padding: [1, 256, 65536, 16777216],
                bits: v,
                createMethod: S,
              },
              {
                name: "sha3",
                padding: [6, 1536, 393216, 100663296],
                bits: v,
                createMethod: S,
              },
              {
                name: "shake",
                padding: [31, 7936, 2031616, 520093696],
                bits: y,
                createMethod: function (t, r) {
                  var e = _(t, r, "hex");
                  return (
                    (e.create = function (e) {
                      return new j(t, r, e);
                    }),
                    (e.update = function (t, r) {
                      return e.create(r).update(t);
                    }),
                    x(e, _, t, r)
                  );
                },
              },
              {
                name: "cshake",
                padding: p,
                bits: y,
                createMethod: function (t, r) {
                  var e = M[t],
                    i = A(t, 0, "hex");
                  return (
                    (i.create = function (i, n, o) {
                      return n || o
                        ? new j(t, r, i).bytepad([n, o], e)
                        : N["shake" + t].create(i);
                    }),
                    (i.update = function (t, r, e, n) {
                      return i.create(r, e, n).update(t);
                    }),
                    x(i, A, t, r)
                  );
                },
              },
              {
                name: "kmac",
                padding: p,
                bits: y,
                createMethod: function (t, r) {
                  var e = M[t],
                    i = E(t, 0, "hex");
                  return (
                    (i.create = function (i, n, o) {
                      return new F(t, r, n)
                        .bytepad(["KMAC", o], e)
                        .bytepad([i], e);
                    }),
                    (i.update = function (t, r, e, n) {
                      return i.create(t, e, n).update(r);
                    }),
                    x(i, E, t, r)
                  );
                },
              },
            ],
            N = {},
            T = [],
            k = 0;
          k < B.length;
          ++k
        )
          for (var R = B[k], O = R.bits, I = 0; I < O.length; ++I) {
            var C = R.name + "_" + O[I];
            if (
              (T.push(C),
              (N[C] = R.createMethod(O[I], R.padding)),
              "sha3" !== R.name)
            ) {
              var P = R.name + O[I];
              T.push(P), (N[P] = N[C]);
            }
          }
        function j(t, r, e) {
          (this.blocks = []),
            (this.s = []),
            (this.padding = r),
            (this.outputBits = e),
            (this.reset = !0),
            (this.finalized = !1),
            (this.block = 0),
            (this.start = 0),
            (this.blockCount = (1600 - (t << 1)) >> 5),
            (this.byteCount = this.blockCount << 2),
            (this.outputBlocks = e >> 5),
            (this.extraBytes = (31 & e) >> 3);
          for (var i = 0; i < 50; ++i) this.s[i] = 0;
        }
        function F(t, r, e) {
          j.call(this, t, r, e);
        }
        (j.prototype.update = function (t) {
          if (this.finalized) throw new Error("finalize already called");
          var r,
            e = typeof t;
          if ("string" !== e) {
            if ("object" !== e) throw new Error(s);
            if (null === t) throw new Error(s);
            if (c && t.constructor === ArrayBuffer) t = new Uint8Array(t);
            else if (!(Array.isArray(t) || (c && ArrayBuffer.isView(t))))
              throw new Error(s);
            r = !0;
          }
          for (
            var i,
              n,
              o = this.blocks,
              u = this.byteCount,
              h = t.length,
              a = this.blockCount,
              l = 0,
              f = this.s;
            l < h;

          ) {
            if (this.reset)
              for (this.reset = !1, o[0] = this.block, i = 1; i < a + 1; ++i)
                o[i] = 0;
            if (r)
              for (i = this.start; l < h && i < u; ++l)
                o[i >> 2] |= t[l] << d[3 & i++];
            else
              for (i = this.start; l < h && i < u; ++l)
                (n = t.charCodeAt(l)) < 128
                  ? (o[i >> 2] |= n << d[3 & i++])
                  : n < 2048
                  ? ((o[i >> 2] |= (192 | (n >> 6)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | (63 & n)) << d[3 & i++]))
                  : n < 55296 || n >= 57344
                  ? ((o[i >> 2] |= (224 | (n >> 12)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | ((n >> 6) & 63)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | (63 & n)) << d[3 & i++]))
                  : ((n =
                      65536 +
                      (((1023 & n) << 10) | (1023 & t.charCodeAt(++l)))),
                    (o[i >> 2] |= (240 | (n >> 18)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | ((n >> 12) & 63)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | ((n >> 6) & 63)) << d[3 & i++]),
                    (o[i >> 2] |= (128 | (63 & n)) << d[3 & i++]));
            if (((this.lastByteIndex = i), i >= u)) {
              for (this.start = i - u, this.block = o[a], i = 0; i < a; ++i)
                f[i] ^= o[i];
              U(f), (this.reset = !0);
            } else this.start = i;
          }
          return this;
        }),
          (j.prototype.encode = function (t, r) {
            var e = 255 & t,
              i = 1,
              n = [e];
            for (e = 255 & (t >>= 8); e > 0; )
              n.unshift(e), (e = 255 & (t >>= 8)), ++i;
            return r ? n.push(i) : n.unshift(i), this.update(n), n.length;
          }),
          (j.prototype.encodeString = function (t) {
            var r,
              e = typeof t;
            if ("string" !== e) {
              if ("object" !== e) throw new Error(s);
              if (null === t) throw new Error(s);
              if (c && t.constructor === ArrayBuffer) t = new Uint8Array(t);
              else if (!(Array.isArray(t) || (c && ArrayBuffer.isView(t))))
                throw new Error(s);
              r = !0;
            }
            var i = 0,
              n = t.length;
            if (r) i = n;
            else
              for (var o = 0; o < t.length; ++o) {
                var u = t.charCodeAt(o);
                u < 128
                  ? (i += 1)
                  : u < 2048
                  ? (i += 2)
                  : u < 55296 || u >= 57344
                  ? (i += 3)
                  : ((u =
                      65536 +
                      (((1023 & u) << 10) | (1023 & t.charCodeAt(++o)))),
                    (i += 4));
              }
            return (i += this.encode(8 * i)), this.update(t), i;
          }),
          (j.prototype.bytepad = function (t, r) {
            for (var e = this.encode(r), i = 0; i < t.length; ++i)
              e += this.encodeString(t[i]);
            var n = r - (e % r),
              o = [];
            return (o.length = n), this.update(o), this;
          }),
          (j.prototype.finalize = function () {
            if (!this.finalized) {
              this.finalized = !0;
              var t = this.blocks,
                r = this.lastByteIndex,
                e = this.blockCount,
                i = this.s;
              if (
                ((t[r >> 2] |= this.padding[3 & r]),
                this.lastByteIndex === this.byteCount)
              )
                for (t[0] = t[e], r = 1; r < e + 1; ++r) t[r] = 0;
              for (t[e - 1] |= 2147483648, r = 0; r < e; ++r) i[r] ^= t[r];
              U(i);
            }
          }),
          (j.prototype.toString = j.prototype.hex = function () {
            this.finalize();
            for (
              var t,
                r = this.blockCount,
                e = this.s,
                i = this.outputBlocks,
                n = this.extraBytes,
                o = 0,
                s = 0,
                u = "";
              s < i;

            ) {
              for (o = 0; o < r && s < i; ++o, ++s)
                (t = e[o]),
                  (u +=
                    m[(t >> 4) & 15] +
                    m[15 & t] +
                    m[(t >> 12) & 15] +
                    m[(t >> 8) & 15] +
                    m[(t >> 20) & 15] +
                    m[(t >> 16) & 15] +
                    m[(t >> 28) & 15] +
                    m[(t >> 24) & 15]);
              s % r == 0 && (U(e), (o = 0));
            }
            return (
              n &&
                ((t = e[o]),
                (u += m[(t >> 4) & 15] + m[15 & t]),
                n > 1 && (u += m[(t >> 12) & 15] + m[(t >> 8) & 15]),
                n > 2 && (u += m[(t >> 20) & 15] + m[(t >> 16) & 15])),
              u
            );
          }),
          (j.prototype.arrayBuffer = function () {
            this.finalize();
            var t,
              r = this.blockCount,
              e = this.s,
              i = this.outputBlocks,
              n = this.extraBytes,
              o = 0,
              s = 0,
              u = this.outputBits >> 3;
            t = n ? new ArrayBuffer((i + 1) << 2) : new ArrayBuffer(u);
            for (var h = new Uint32Array(t); s < i; ) {
              for (o = 0; o < r && s < i; ++o, ++s) h[s] = e[o];
              s % r == 0 && U(e);
            }
            return n && ((h[o] = e[o]), (t = t.slice(0, u))), t;
          }),
          (j.prototype.buffer = j.prototype.arrayBuffer),
          (j.prototype.digest = j.prototype.array = function () {
            this.finalize();
            for (
              var t,
                r,
                e = this.blockCount,
                i = this.s,
                n = this.outputBlocks,
                o = this.extraBytes,
                s = 0,
                u = 0,
                h = [];
              u < n;

            ) {
              for (s = 0; s < e && u < n; ++s, ++u)
                (t = u << 2),
                  (r = i[s]),
                  (h[t] = 255 & r),
                  (h[t + 1] = (r >> 8) & 255),
                  (h[t + 2] = (r >> 16) & 255),
                  (h[t + 3] = (r >> 24) & 255);
              u % e == 0 && U(i);
            }
            return (
              o &&
                ((t = u << 2),
                (r = i[s]),
                (h[t] = 255 & r),
                o > 1 && (h[t + 1] = (r >> 8) & 255),
                o > 2 && (h[t + 2] = (r >> 16) & 255)),
              h
            );
          }),
          (F.prototype = new j()),
          (F.prototype.finalize = function () {
            return (
              this.encode(this.outputBits, !0), j.prototype.finalize.call(this)
            );
          });
        var U = function (t) {
          var r,
            e,
            i,
            n,
            o,
            s,
            u,
            h,
            a,
            l,
            f,
            c,
            m,
            p,
            d,
            v,
            y,
            w,
            M,
            b,
            _,
            A,
            E,
            x,
            S,
            B,
            N,
            T,
            k,
            R,
            O,
            I,
            C,
            P,
            j,
            F,
            U,
            L,
            D,
            z,
            q,
            Z,
            H,
            $,
            V,
            W,
            Y,
            G,
            J,
            K,
            X,
            Q,
            tt,
            rt,
            et,
            it,
            nt,
            ot,
            st,
            ut,
            ht,
            at,
            lt;
          for (i = 0; i < 48; i += 2)
            (n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
              (o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
              (s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]),
              (u = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]),
              (h = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
              (a = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
              (l = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
              (f = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
              (r =
                (c = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
                ((s << 1) | (u >>> 31))),
              (e =
                (m = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
                ((u << 1) | (s >>> 31))),
              (t[0] ^= r),
              (t[1] ^= e),
              (t[10] ^= r),
              (t[11] ^= e),
              (t[20] ^= r),
              (t[21] ^= e),
              (t[30] ^= r),
              (t[31] ^= e),
              (t[40] ^= r),
              (t[41] ^= e),
              (r = n ^ ((h << 1) | (a >>> 31))),
              (e = o ^ ((a << 1) | (h >>> 31))),
              (t[2] ^= r),
              (t[3] ^= e),
              (t[12] ^= r),
              (t[13] ^= e),
              (t[22] ^= r),
              (t[23] ^= e),
              (t[32] ^= r),
              (t[33] ^= e),
              (t[42] ^= r),
              (t[43] ^= e),
              (r = s ^ ((l << 1) | (f >>> 31))),
              (e = u ^ ((f << 1) | (l >>> 31))),
              (t[4] ^= r),
              (t[5] ^= e),
              (t[14] ^= r),
              (t[15] ^= e),
              (t[24] ^= r),
              (t[25] ^= e),
              (t[34] ^= r),
              (t[35] ^= e),
              (t[44] ^= r),
              (t[45] ^= e),
              (r = h ^ ((c << 1) | (m >>> 31))),
              (e = a ^ ((m << 1) | (c >>> 31))),
              (t[6] ^= r),
              (t[7] ^= e),
              (t[16] ^= r),
              (t[17] ^= e),
              (t[26] ^= r),
              (t[27] ^= e),
              (t[36] ^= r),
              (t[37] ^= e),
              (t[46] ^= r),
              (t[47] ^= e),
              (r = l ^ ((n << 1) | (o >>> 31))),
              (e = f ^ ((o << 1) | (n >>> 31))),
              (t[8] ^= r),
              (t[9] ^= e),
              (t[18] ^= r),
              (t[19] ^= e),
              (t[28] ^= r),
              (t[29] ^= e),
              (t[38] ^= r),
              (t[39] ^= e),
              (t[48] ^= r),
              (t[49] ^= e),
              (p = t[0]),
              (d = t[1]),
              (W = (t[11] << 4) | (t[10] >>> 28)),
              (Y = (t[10] << 4) | (t[11] >>> 28)),
              (T = (t[20] << 3) | (t[21] >>> 29)),
              (k = (t[21] << 3) | (t[20] >>> 29)),
              (ut = (t[31] << 9) | (t[30] >>> 23)),
              (ht = (t[30] << 9) | (t[31] >>> 23)),
              (Z = (t[40] << 18) | (t[41] >>> 14)),
              (H = (t[41] << 18) | (t[40] >>> 14)),
              (P = (t[2] << 1) | (t[3] >>> 31)),
              (j = (t[3] << 1) | (t[2] >>> 31)),
              (v = (t[13] << 12) | (t[12] >>> 20)),
              (y = (t[12] << 12) | (t[13] >>> 20)),
              (G = (t[22] << 10) | (t[23] >>> 22)),
              (J = (t[23] << 10) | (t[22] >>> 22)),
              (R = (t[33] << 13) | (t[32] >>> 19)),
              (O = (t[32] << 13) | (t[33] >>> 19)),
              (at = (t[42] << 2) | (t[43] >>> 30)),
              (lt = (t[43] << 2) | (t[42] >>> 30)),
              (rt = (t[5] << 30) | (t[4] >>> 2)),
              (et = (t[4] << 30) | (t[5] >>> 2)),
              (F = (t[14] << 6) | (t[15] >>> 26)),
              (U = (t[15] << 6) | (t[14] >>> 26)),
              (w = (t[25] << 11) | (t[24] >>> 21)),
              (M = (t[24] << 11) | (t[25] >>> 21)),
              (K = (t[34] << 15) | (t[35] >>> 17)),
              (X = (t[35] << 15) | (t[34] >>> 17)),
              (I = (t[45] << 29) | (t[44] >>> 3)),
              (C = (t[44] << 29) | (t[45] >>> 3)),
              (x = (t[6] << 28) | (t[7] >>> 4)),
              (S = (t[7] << 28) | (t[6] >>> 4)),
              (it = (t[17] << 23) | (t[16] >>> 9)),
              (nt = (t[16] << 23) | (t[17] >>> 9)),
              (L = (t[26] << 25) | (t[27] >>> 7)),
              (D = (t[27] << 25) | (t[26] >>> 7)),
              (b = (t[36] << 21) | (t[37] >>> 11)),
              (_ = (t[37] << 21) | (t[36] >>> 11)),
              (Q = (t[47] << 24) | (t[46] >>> 8)),
              (tt = (t[46] << 24) | (t[47] >>> 8)),
              ($ = (t[8] << 27) | (t[9] >>> 5)),
              (V = (t[9] << 27) | (t[8] >>> 5)),
              (B = (t[18] << 20) | (t[19] >>> 12)),
              (N = (t[19] << 20) | (t[18] >>> 12)),
              (ot = (t[29] << 7) | (t[28] >>> 25)),
              (st = (t[28] << 7) | (t[29] >>> 25)),
              (z = (t[38] << 8) | (t[39] >>> 24)),
              (q = (t[39] << 8) | (t[38] >>> 24)),
              (A = (t[48] << 14) | (t[49] >>> 18)),
              (E = (t[49] << 14) | (t[48] >>> 18)),
              (t[0] = p ^ (~v & w)),
              (t[1] = d ^ (~y & M)),
              (t[10] = x ^ (~B & T)),
              (t[11] = S ^ (~N & k)),
              (t[20] = P ^ (~F & L)),
              (t[21] = j ^ (~U & D)),
              (t[30] = $ ^ (~W & G)),
              (t[31] = V ^ (~Y & J)),
              (t[40] = rt ^ (~it & ot)),
              (t[41] = et ^ (~nt & st)),
              (t[2] = v ^ (~w & b)),
              (t[3] = y ^ (~M & _)),
              (t[12] = B ^ (~T & R)),
              (t[13] = N ^ (~k & O)),
              (t[22] = F ^ (~L & z)),
              (t[23] = U ^ (~D & q)),
              (t[32] = W ^ (~G & K)),
              (t[33] = Y ^ (~J & X)),
              (t[42] = it ^ (~ot & ut)),
              (t[43] = nt ^ (~st & ht)),
              (t[4] = w ^ (~b & A)),
              (t[5] = M ^ (~_ & E)),
              (t[14] = T ^ (~R & I)),
              (t[15] = k ^ (~O & C)),
              (t[24] = L ^ (~z & Z)),
              (t[25] = D ^ (~q & H)),
              (t[34] = G ^ (~K & Q)),
              (t[35] = J ^ (~X & tt)),
              (t[44] = ot ^ (~ut & at)),
              (t[45] = st ^ (~ht & lt)),
              (t[6] = b ^ (~A & p)),
              (t[7] = _ ^ (~E & d)),
              (t[16] = R ^ (~I & x)),
              (t[17] = O ^ (~C & S)),
              (t[26] = z ^ (~Z & P)),
              (t[27] = q ^ (~H & j)),
              (t[36] = K ^ (~Q & $)),
              (t[37] = X ^ (~tt & V)),
              (t[46] = ut ^ (~at & rt)),
              (t[47] = ht ^ (~lt & et)),
              (t[8] = A ^ (~p & v)),
              (t[9] = E ^ (~d & y)),
              (t[18] = I ^ (~x & B)),
              (t[19] = C ^ (~S & N)),
              (t[28] = Z ^ (~P & F)),
              (t[29] = H ^ (~j & U)),
              (t[38] = Q ^ (~$ & W)),
              (t[39] = tt ^ (~V & Y)),
              (t[48] = at ^ (~rt & it)),
              (t[49] = lt ^ (~et & nt)),
              (t[0] ^= g[i]),
              (t[1] ^= g[i + 1]);
        };
        if (l) t.exports = N;
        else {
          for (k = 0; k < T.length; ++k) h[T[k]] = N[T[k]];
          f &&
            (void 0 ===
              (o = function () {
                return N;
              }.call(r, e, r, t)) ||
              (t.exports = o));
        }
      })();
    }.call(this, e(5), e(1)));
  },
  function (t, r) {
    (function (r) {
      t.exports = r;
    }.call(this, {}));
  },
  function (t, r, e) {
    var i = e(3),
      n = e(0),
      o = e(9),
      s = function (t) {
        var r = typeof t;
        if ("string" === r)
          return o.isHexStrict(t)
            ? new n(t.replace(/0x/i, ""), 16)
            : new n(t, 10);
        if ("number" === r) return new n(t);
        if (o.isBigNumber(t)) return new n(t.toString(10));
        if (o.isBN(t)) return t;
        throw new Error(t + " is not a number");
      },
      u = function (t, r, e) {
        var i, u, h;
        if (
          "bytes" ===
          (t = (h = t).startsWith("int[")
            ? "int256" + h.slice(3)
            : "int" === h
            ? "int256"
            : h.startsWith("uint[")
            ? "uint256" + h.slice(4)
            : "uint" === h
            ? "uint256"
            : h.startsWith("fixed[")
            ? "fixed128x128" + h.slice(5)
            : "fixed" === h
            ? "fixed128x128"
            : h.startsWith("ufixed[")
            ? "ufixed128x128" + h.slice(6)
            : "ufixed" === h
            ? "ufixed128x128"
            : h)
        ) {
          if (r.replace(/^0x/i, "").length % 2 != 0)
            throw new Error("Invalid bytes characters " + r.length);
          return r;
        }
        if ("string" === t) return o.utf8ToHex(r);
        if ("bool" === t) return r ? "01" : "00";
        if (t.startsWith("address")) {
          if (((i = e ? 64 : 40), !o.isAddress(r)))
            throw new Error(
              r + " is not a valid address, or the checksum is invalid."
            );
          return o.leftPad(r.toLowerCase(), i);
        }
        if (
          ((i = (function (t) {
            var r = /^\D+(\d+).*$/.exec(t);
            return r ? parseInt(r[1], 10) : null;
          })(t)),
          t.startsWith("bytes"))
        ) {
          if (!i) throw new Error("bytes[] not yet supported in solidity");
          if (
            (e && (i = 32),
            i < 1 || i > 32 || i < r.replace(/^0x/i, "").length / 2)
          )
            throw new Error("Invalid bytes" + i + " for " + r);
          return o.rightPad(r, 2 * i);
        }
        if (t.startsWith("uint")) {
          if (i % 8 || i < 8 || i > 256)
            throw new Error("Invalid uint" + i + " size");
          if ((u = s(r)).bitLength() > i)
            throw new Error(
              "Supplied uint exceeds width: " + i + " vs " + u.bitLength()
            );
          if (u.lt(new n(0)))
            throw new Error("Supplied uint " + u.toString() + " is negative");
          return i ? o.leftPad(u.toString("hex"), (i / 8) * 2) : u;
        }
        if (t.startsWith("int")) {
          if (i % 8 || i < 8 || i > 256)
            throw new Error("Invalid int" + i + " size");
          if ((u = s(r)).bitLength() > i)
            throw new Error(
              "Supplied int exceeds width: " + i + " vs " + u.bitLength()
            );
          return u.lt(new n(0))
            ? u.toTwos(i).toString("hex")
            : i
            ? o.leftPad(u.toString("hex"), (i / 8) * 2)
            : u;
        }
        throw new Error("Unsupported or invalid type: " + t);
      },
      h = function (t) {
        if (i.isArray(t))
          throw new Error("Autodetection of array types is not supported.");
        var r,
          e,
          s = "";
        if (
          (i.isObject(t) &&
          (t.hasOwnProperty("v") ||
            t.hasOwnProperty("t") ||
            t.hasOwnProperty("value") ||
            t.hasOwnProperty("type"))
            ? ((r = t.hasOwnProperty("t") ? t.t : t.type),
              (s = t.hasOwnProperty("v") ? t.v : t.value))
            : ((r = o.toHex(t, !0)),
              (s = o.toHex(t)),
              r.startsWith("int") || r.startsWith("uint") || (r = "bytes")),
          (!r.startsWith("int") && !r.startsWith("uint")) ||
            "string" != typeof s ||
            /^(-)?0x/i.test(s) ||
            (s = new n(s)),
          i.isArray(s))
        ) {
          if (
            (e = (function (t) {
              var r = /^\D+\d*\[(\d+)\]$/.exec(t);
              return r ? parseInt(r[1], 10) : null;
            })(r)) &&
            s.length !== e
          )
            throw new Error(
              r + " is not matching the given array " + JSON.stringify(s)
            );
          e = s.length;
        }
        return i.isArray(s)
          ? s
              .map(function (t) {
                return u(r, t, e).toString("hex").replace("0x", "");
              })
              .join("")
          : u(r, s, e).toString("hex").replace("0x", "");
      };
    t.exports = {
      soliditySha3: function () {
        var t = Array.prototype.slice.call(arguments),
          r = i.map(t, h);
        return o.sha3("0x" + r.join(""));
      },
      soliditySha3Raw: function () {
        return o.sha3Raw(
          "0x" + i.map(Array.prototype.slice.call(arguments), h).join("")
        );
      },
    };
  },
  function (t, r, e) {
    "use strict";
    (function (r, i) {
      var n = e(31).Buffer,
        o = r.crypto || r.msCrypto;
      o && o.getRandomValues
        ? (t.exports = function (t, r) {
            if (t > 4294967295)
              throw new RangeError("requested too many random bytes");
            var e = n.allocUnsafe(t);
            if (t > 0)
              if (t > 65536)
                for (var s = 0; s < t; s += 65536)
                  o.getRandomValues(e.slice(s, s + 65536));
              else o.getRandomValues(e);
            if ("function" == typeof r)
              return i.nextTick(function () {
                r(null, e);
              });
            return e;
          })
        : (t.exports = function () {
            throw new Error(
              "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11"
            );
          });
    }.call(this, e(1), e(5)));
  },
  function (t, r, e) {
    /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
    var i = e(2),
      n = i.Buffer;
    function o(t, r) {
      for (var e in t) r[e] = t[e];
    }
    function s(t, r, e) {
      return n(t, r, e);
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
      ? (t.exports = i)
      : (o(i, r), (r.Buffer = s)),
      (s.prototype = Object.create(n.prototype)),
      o(n, s),
      (s.from = function (t, r, e) {
        if ("number" == typeof t)
          throw new TypeError("Argument must not be a number");
        return n(t, r, e);
      }),
      (s.alloc = function (t, r, e) {
        if ("number" != typeof t)
          throw new TypeError("Argument must be a number");
        var i = n(t);
        return (
          void 0 !== r
            ? "string" == typeof e
              ? i.fill(r, e)
              : i.fill(r)
            : i.fill(0),
          i
        );
      }),
      (s.allocUnsafe = function (t) {
        if ("number" != typeof t)
          throw new TypeError("Argument must be a number");
        return n(t);
      }),
      (s.allocUnsafeSlow = function (t) {
        if ("number" != typeof t)
          throw new TypeError("Argument must be a number");
        return i.SlowBuffer(t);
      });
  },
  function (t, r, e) {
    var i = e(2).Buffer,
      n = e(3),
      o = e(7),
      s = e(10).AbiCoder,
      u = e(10).ParamType,
      h = new s(function (t, r) {
        return !t.match(/^u?int/) ||
          n.isArray(r) ||
          (n.isObject(r) && "BN" === r.constructor.name)
          ? r
          : r.toString();
      });
    function a() {}
    var l = function () {};
    (l.prototype.encodeFunctionSignature = function (t) {
      return (
        n.isObject(t) && (t = o._jsonInterfaceMethodToString(t)),
        o.sha3(t).slice(0, 10)
      );
    }),
      (l.prototype.encodeEventSignature = function (t) {
        return (
          n.isObject(t) && (t = o._jsonInterfaceMethodToString(t)), o.sha3(t)
        );
      }),
      (l.prototype.encodeParameter = function (t, r) {
        return this.encodeParameters([t], [r]);
      }),
      (l.prototype.encodeParameters = function (t, r) {
        var e = this;
        return (
          (t = e.mapTypes(t)),
          (r = r.map(function (r, i) {
            let n = t[i];
            if (
              ("object" == typeof n && n.type && (n = n.type),
              (r = e.formatParam(n, r)),
              "string" == typeof n && n.includes("tuple"))
            ) {
              const t = h._getCoder(u.from(n)),
                i = (t, r) => {
                  if ("array" === t.name)
                    return r.map((r) =>
                      i(h._getCoder(u.from(t.type.replace("[]", ""))), r)
                    );
                  t.coders.forEach((t, n) => {
                    "tuple" === t.name
                      ? i(t, r[n])
                      : (r[n] = e.formatParam(t.name, r[n]));
                  });
                };
              i(t, r);
            }
            return r;
          })),
          h.encode(t, r)
        );
      }),
      (l.prototype.mapTypes = function (t) {
        var r = this,
          e = [];
        return (
          t.forEach(function (t) {
            if (
              ("object" == typeof t &&
                "function" === t.type &&
                (t.type = "bytes24"),
              r.isSimplifiedStructFormat(t))
            ) {
              var i = Object.keys(t)[0];
              e.push(
                Object.assign(r.mapStructNameAndType(i), {
                  components: r.mapStructToCoderFormat(t[i]),
                })
              );
            } else e.push(t);
          }),
          e
        );
      }),
      (l.prototype.isSimplifiedStructFormat = function (t) {
        return (
          "object" == typeof t && void 0 === t.components && void 0 === t.name
        );
      }),
      (l.prototype.mapStructNameAndType = function (t) {
        var r = "tuple";
        return (
          t.indexOf("[]") > -1 && ((r = "tuple[]"), (t = t.slice(0, -2))),
          { type: r, name: t }
        );
      }),
      (l.prototype.mapStructToCoderFormat = function (t) {
        var r = this,
          e = [];
        return (
          Object.keys(t).forEach(function (i) {
            "object" != typeof t[i]
              ? e.push({ name: i, type: t[i] })
              : e.push(
                  Object.assign(r.mapStructNameAndType(i), {
                    components: r.mapStructToCoderFormat(t[i]),
                  })
                );
          }),
          e
        );
      }),
      (l.prototype.formatParam = function (t, r) {
        const e = new RegExp(/^bytes([0-9]*)$/),
          n = new RegExp(/^bytes([0-9]*)\[\]$/),
          s = new RegExp(/^(u?int)([0-9]*)$/),
          u = new RegExp(/^(u?int)([0-9]*)\[\]$/);
        if (o.isBN(r) || o.isBigNumber(r)) return r.toString(10);
        if (t.match(n) || t.match(u))
          return r.map((r) => this.formatParam(t.replace("[]", ""), r));
        let h = t.match(s);
        if (h) {
          let t = parseInt(h[2] || "256");
          t / 8 < r.length && (r = o.leftPad(r, t));
        }
        if (((h = t.match(e)), h)) {
          i.isBuffer(r) && (r = o.toHex(r));
          let t = parseInt(h[1]);
          if (t) {
            let e = 2 * t;
            "0x" === r.substring(0, 2) && (e += 2),
              r.length < e && (r = o.rightPad(r, 2 * t));
          }
          r.length % 2 == 1 && (r = "0x0" + r.substring(2));
        }
        return r;
      }),
      (l.prototype.encodeFunctionCall = function (t, r) {
        return (
          this.encodeFunctionSignature(t) +
          this.encodeParameters(t.inputs, r).replace("0x", "")
        );
      }),
      (l.prototype.decodeParameter = function (t, r) {
        return this.decodeParameters([t], r)[0];
      }),
      (l.prototype.decodeParameters = function (t, r) {
        if (t.length > 0 && (!r || "0x" === r || "0X" === r))
          throw new Error(
            "Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced."
          );
        var e = h.decode(this.mapTypes(t), "0x" + r.replace(/0x/i, "")),
          i = new a();
        return (
          (i.__length__ = 0),
          t.forEach(function (t, r) {
            var o = e[i.__length__];
            (o = "0x" === o ? null : o),
              (i[r] = o),
              n.isObject(t) && t.name && (i[t.name] = o),
              i.__length__++;
          }),
          i
        );
      }),
      (l.prototype.decodeLog = function (t, r, e) {
        var i = this;
        (e = n.isArray(e) ? e : [e]), (r = r || "");
        var o = [],
          s = [],
          u = 0;
        t.forEach(function (t, r) {
          t.indexed
            ? ((s[r] = [
                "bool",
                "int",
                "uint",
                "address",
                "fixed",
                "ufixed",
              ].find(function (r) {
                return -1 !== t.type.indexOf(r);
              })
                ? i.decodeParameter(t.type, e[u])
                : e[u]),
              u++)
            : (o[r] = t);
        });
        var h = r,
          l = h ? this.decodeParameters(o, h) : [],
          f = new a();
        return (
          (f.__length__ = 0),
          t.forEach(function (t, r) {
            (f[r] = "string" === t.type ? "" : null),
              void 0 !== l[r] && (f[r] = l[r]),
              void 0 !== s[r] && (f[r] = s[r]),
              t.name && (f[t.name] = f[r]),
              f.__length__++;
          }),
          f
        );
      });
    var f = new l();
    t.exports = f;
  },
]);
