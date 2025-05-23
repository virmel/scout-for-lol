/* esm.sh - remeda@2.21.2 */
var ar = { done: !0, hasNext: !1 },
  m = { done: !1, hasNext: !1 },
  S = () => ar,
  y = (r) => ({ hasNext: !0, next: r, done: !1 });
function b(r, ...t) {
  let o = r, a = t.map((i) => "lazy" in i ? er(i) : void 0), n = 0;
  for (; n < t.length;) {
    if (a[n] === void 0 || !nr(o)) {
      let u = t[n];
      o = u(o), n += 1;
      continue;
    }
    let i = [];
    for (let u = n; u < t.length; u++) {
      let p = a[u];
      if (p === void 0 || (i.push(p), p.isSingle)) break;
    }
    let s = [];
    for (let u of o) if (R(u, s, i)) break;
    let { isSingle: f } = i.at(-1);
    o = f ? s[0] : s, n += i.length;
  }
  return o;
}
function R(r, t, o) {
  if (o.length === 0) return t.push(r), !1;
  let a = r, n = m, i = !1;
  for (let [s, f] of o.entries()) {
    let { index: u, items: p } = f;
    if (p.push(a), n = f(a, u, p), f.index += 1, n.hasNext) {
      if (n.hasMany ?? !1) {
        for (let x of n.next) if (R(x, t, o.slice(s + 1))) return !0;
        return i;
      }
      a = n.next;
    }
    if (!n.hasNext) break;
    n.done && (i = !0);
  }
  return n.hasNext && t.push(a), i;
}
function er(r) {
  let { lazy: t, lazyArgs: o } = r, a = t(...o);
  return Object.assign(a, { isSingle: t.single ?? !1, index: 0, items: [] });
}
function nr(r) {
  return typeof r == "string" ||
    typeof r == "object" && r !== null && Symbol.iterator in r;
}
function c(r, t) {
  let o = t.length - r.length;
  if (o === 1) {
    let [a, ...n] = t;
    return b(a, { lazy: r, lazyArgs: n });
  }
  if (o === 0) {
    let a = { lazy: r, lazyArgs: t };
    return Object.assign((n) => b(n, a), a);
  }
  throw new Error("Wrong number of arguments");
}
function ir(...r) {
  return c(sr, r);
}
function sr(r) {
  let t = r, o = new Set();
  return (a, n, i) => {
    let s = t(a, n, i);
    return o.has(s) ? m : (o.add(s), { done: !1, hasNext: !0, next: a });
  };
}
function fr(...r) {
  return c(ur, r);
}
var ur = (r) => (t, o, a) =>
  a.findIndex((n, i) => o === i || r(t, n)) === o
    ? { done: !1, hasNext: !0, next: t }
    : m;
function j(r, t, o) {
  let a = (n) => r(n, ...t);
  return o === void 0 ? a : Object.assign(a, { lazy: o, lazyArgs: t });
}
function e(r, t, o) {
  let a = r.length - t.length;
  if (a === 0) return r(...t);
  if (a === 1) return j(r, t, o);
  throw new Error("Wrong number of arguments");
}
function mr(...r) {
  return e(Object.values, r);
}
function pr(...r) {
  return r.length === 2 ? (t, ...o) => U(t, ...r, ...o) : U(...r);
}
var U = (r, t, o, ...a) =>
  t(r, ...a)
    ? typeof o == "function" ? o(r, ...a) : o.onTrue(r, ...a)
    : typeof o == "function"
    ? r
    : o.onFalse(r, ...a);
function lr(...r) {
  return e(cr, r, xr);
}
var cr = (r, t) =>
    r.length < t.length
      ? r.map((o, a) => [o, t[a]])
      : t.map((o, a) => [r[a], o]),
  xr = (r) => (t, o) => ({
    hasNext: !0,
    next: [t, r[o]],
    done: o >= r.length - 1,
  });
function dr(r, t, o) {
  return typeof r == "function"
    ? (a, n) => I(a, n, r)
    : typeof t == "function"
    ? j(I, [r, t], hr)
    : I(r, t, o);
}
function I(r, t, o) {
  let a = [r, t];
  return r.length < t.length
    ? r.map((n, i) => o(n, t[i], i, a))
    : t.map((n, i) => o(r[i], n, i, a));
}
var hr = (r, t) => (o, a, n) => ({
  next: t(o, r[a], a, [n, r]),
  hasNext: !0,
  done: a >= r.length - 1,
});
function gr(...r) {
  return e(vr, r);
}
function vr(r, t) {
  if (r < 1) return [];
  let o = Number.isInteger(r) ? r : Math.floor(r), a = new Array(o);
  for (let n = 0; n < o; n++) a[n] = t(n);
  return a;
}
var yr = [
    "	",
    `
`,
    "\v",
    "\f",
    "\r",
    " ",
    "\x85",
    "\xA0",
    "\u1680",
    "\u2000",
    "\u2001",
    "\u2002",
    "\u2003",
    "\u2004",
    "\u2005",
    "\u2006",
    "\u2007",
    "\u2008",
    "\u2009",
    "\u200A",
    "\u2028",
    "\u2029",
    "\u202F",
    "\u205F",
    "\u3000",
    "\uFEFF",
  ],
  br = new Set(["-", "_", ...yr]),
  N = (r) => {
    let t = [],
      o = "",
      a = () => {
        o.length > 0 && (t.push(o), o = "");
      };
    for (let n of r) {
      if (br.has(n)) {
        a();
        continue;
      }
      if (/[a-z]$/u.test(o) && /[A-Z]/u.test(n)) a();
      else if (/[A-Z][A-Z]$/u.test(o) && /[a-z]/u.test(n)) {
        let i = o.slice(-1);
        o = o.slice(0, -1), a(), o = i;
      } else /\d$/u.test(o) !== /\d/u.test(n) && a();
      o += n;
    }
    return a(), t;
  };
var jr = /[a-z]/u, Nr = { preserveConsecutiveUppercase: !0 };
function wr(r, t) {
  return typeof r == "string" ? q(r, t) : (o) => q(o, r);
}
var q = (
  r,
  { preserveConsecutiveUppercase: t = Nr.preserveConsecutiveUppercase } = {},
) =>
  N(jr.test(r) ? r : r.toLowerCase()).map((o, a) =>
    `${(a === 0 ? o[0]?.toLowerCase() : o[0]?.toUpperCase()) ?? ""}${
      t ? o.slice(1) : o.slice(1).toLowerCase()
    }`
  ).join("");
function Or(...r) {
  return e(Mr, r);
}
var Mr = (r) => N(r).join("-").toLowerCase();
function Ar(...r) {
  return e(Tr, r);
}
var Tr = (r) => r.toLowerCase();
function Sr(...r) {
  return e(Er, r);
}
var Er = (r) => N(r).join("_").toLowerCase();
function kr(...r) {
  return e(zr, r);
}
var zr = (r) => r.toUpperCase();
function Br(...r) {
  return e(Cr, r);
}
var Cr = (r) => `${r[0]?.toLowerCase() ?? ""}${r.slice(1)}`;
function Ir(...r) {
  return c(Wr, r);
}
function Wr() {
  let r = new Set();
  return (t) => r.has(t) ? m : (r.add(t), { done: !1, hasNext: !0, next: t });
}
function Lr(...r) {
  return e($r, r);
}
var $r = (r, t, o) =>
  typeof r == "string" ? K([...r], t, o).join("") : K(r, t, o);
function K(r, t, o) {
  let a = [...r];
  if (Number.isNaN(t) || Number.isNaN(o)) return a;
  let n = t < 0 ? r.length + t : t, i = o < 0 ? r.length + o : o;
  return n < 0 || n > r.length || i < 0 || i > r.length ||
    (a[n] = r[i], a[i] = r[n]),
    a;
}
function Pr(...r) {
  return e(Fr, r);
}
function Fr(r, t, o) {
  let { [t]: a, [o]: n } = r;
  return { ...r, [t]: n, [o]: a };
}
function Dr(...r) {
  return e(Rr, r, Ur);
}
var Rr = (r, t) => t < 0 ? [] : r.slice(0, t);
function Ur(r) {
  if (r <= 0) return S;
  let t = r;
  return (o) => (t -= 1, { done: t <= 0, hasNext: !0, next: o });
}
function O(r, t, o) {
  [r[t], r[o]] = [r[o], r[t]];
}
function h(...r) {
  return e(qr, r);
}
var qr = (r, t) => r.length >= t;
function E(r, t) {
  for (let o = Math.floor(r.length / 2) - 1; o >= 0; o--) V(r, o, t);
}
function k(r, t, o) {
  if (!h(r, 1)) return;
  let [a] = r;
  if (!(t(o, a) >= 0)) return r[0] = o, V(r, 0, t), a;
}
function V(r, t, o) {
  let a = t;
  for (; a * 2 + 1 < r.length;) {
    let n = a * 2 + 1, i = o(r[a], r[n]) < 0 ? n : a, s = n + 1;
    if (s < r.length && o(r[i], r[s]) < 0 && (i = s), i === a) return;
    O(r, a, i), a = i;
  }
}
var G = { asc: (r, t) => r > t, desc: (r, t) => r < t };
function M(r, t) {
  let [o, ...a] = t;
  if (!Q(o)) {
    let i = W(...a);
    return r(o, i);
  }
  let n = W(o, ...a);
  return (i) => r(i, n);
}
function g(r, [t, o, ...a]) {
  let n, i;
  return Q(o) ? (n = t, i = [o, ...a]) : (n = o, i = [t, ...a]),
    M((...s) => r(...s, n), i);
}
function W(r, t, ...o) {
  let a = typeof r == "function" ? r : r[0],
    n = typeof r == "function" ? "asc" : r[1],
    { [n]: i } = G,
    s = t === void 0 ? void 0 : W(t, ...o);
  return (f, u) => {
    let p = a(f), x = a(u);
    return i(p, x) ? 1 : i(x, p) ? -1 : s?.(f, u) ?? 0;
  };
}
function Q(r) {
  if (Z(r)) return !0;
  if (typeof r != "object" || !Array.isArray(r)) return !1;
  let [t, o, ...a] = r;
  return Z(t) && typeof o == "string" && o in G && a.length === 0;
}
var Z = (r) => typeof r == "function" && r.length === 1;
function Kr(...r) {
  return g(Vr, r);
}
function Vr(r, t, o) {
  if (o <= 0) return [];
  if (o >= r.length) return [...r];
  let a = r.slice(0, o);
  E(a, t);
  let n = r.slice(o);
  for (let i of n) k(a, t, i);
  return a;
}
function Zr(...r) {
  return e(Gr, r);
}
var Gr = (r, t) => t > 0 ? r.slice(Math.max(0, r.length - t)) : [];
function Qr(...r) {
  return e(Hr, r);
}
function Hr(r, t) {
  for (let o = r.length - 1; o >= 0; o--) {
    if (!t(r[o], o, r)) return r.slice(o + 1);
  }
  return [...r];
}
function Jr(...r) {
  return e(Xr, r);
}
function Xr(r, t) {
  let o = [];
  for (let [a, n] of r.entries()) {
    if (!t(n, a, r)) break;
    o.push(n);
  }
  return o;
}
function _r(...r) {
  return e(Yr, r);
}
function Yr(r, t) {
  return t(r), r;
}
function rt(r, t, o) {
  return typeof t == "number" || t === void 0
    ? (a) => a.split(r, t)
    : r.split(t, o);
}
function tt(...r) {
  return e(ot, r);
}
function ot(r, t) {
  let o = Math.max(Math.min(t < 0 ? r.length + t : t, r.length), 0);
  return [r.slice(0, o), r.slice(o)];
}
function at(...r) {
  return e(et, r);
}
function et(r, t) {
  let o = r.findIndex(t);
  return o === -1 ? [[...r], []] : [r.slice(0, o), r.slice(o)];
}
function nt(...r) {
  return e(it, r);
}
var it = (r, t) => r.startsWith(t);
var st = /^(?:\.?(?<propName>[^.[\]]+)|\[(?<index>.+?)\])(?<rest>.*)$/u;
function H(r) {
  if (r.length === 0) return [];
  let t = st.exec(r);
  return t?.groups === void 0
    ? [r]
    : [t.groups.index ?? t.groups.propName, ...H(t.groups.rest)];
}
function ft(...r) {
  return e(ut, r);
}
var ut = (r, t) => r - t;
function mt(...r) {
  return e(pt, r);
}
var pt = (r, t) => {
  let o = r.entries(), a = o.next();
  if (a.done ?? !1) return 0;
  let { value: [, n] } = a, i = t(n, 0, r);
  for (let [s, f] of o) {
    let u = t(f, s, r);
    i += u;
  }
  return i;
};
function lt(...r) {
  return e(ct, r);
}
function ct(r, t) {
  let o = [...r];
  return o.sort(t), o;
}
function xt(...r) {
  return M(dt, r);
}
var dt = (r, t) => [...r].sort(t);
function d(r, t) {
  let o = 0, a = r.length;
  for (; o < a;) {
    let n = o + a >>> 1, i = r[n];
    t(i, n, r) ? o = n + 1 : a = n;
  }
  return a;
}
function ht(...r) {
  return e(gt, r);
}
var gt = (r, t) => d(r, (o) => o < t);
function vt(...r) {
  return e(yt, r);
}
function yt(r, t, o) {
  let a = o(t, void 0, r);
  return d(r, (n, i) => o(n, i, r) < a);
}
function bt(...r) {
  return e(d, r);
}
function jt(...r) {
  return e(Nt, r);
}
var Nt = (r, t) => d(r, (o) => o <= t);
function wt(...r) {
  return e(Ot, r);
}
function Ot(r, t, o) {
  let a = o(t, void 0, r);
  return d(r, (n, i) => o(n, i, r) <= a);
}
function Mt(...r) {
  return e(At, r);
}
function At(r, t, o, a) {
  let n = [...r];
  return n.splice(t, o, ...a), n;
}
function Tt(...r) {
  return e(St, r);
}
var St = (r, t, o) => r.reduce(t, o);
function Et(...r) {
  return e(kt, r);
}
function kt(r) {
  return [...r].reverse();
}
var w = (r) => (t, o) => {
  if (o === 0) return r(t);
  if (!Number.isInteger(o)) {
    throw new TypeError(`precision must be an integer: ${o.toString()}`);
  }
  if (o > 15 || o < -15) {
    throw new RangeError("precision must be between -15 and 15");
  }
  if (Number.isNaN(t) || !Number.isFinite(t)) return r(t);
  let a = J(t, o), n = r(a);
  return J(n, -o);
};
function J(r, t) {
  let o = r.toString(),
    [a, n] = o.split("e"),
    i = (n === void 0 ? 0 : Number.parseInt(n, 10)) + t,
    s = `${a}e${i.toString()}`;
  return Number.parseFloat(s);
}
function zt(...r) {
  return e(w(Math.round), r);
}
function Bt(...r) {
  return e(Ct, r);
}
function Ct(r, t) {
  if (t <= 0) return [];
  if (t >= r.length) return [...r];
  let o = Math.min(t, r.length - t), a = new Set();
  for (; a.size < o;) {
    let n = Math.floor(Math.random() * r.length);
    a.add(n);
  }
  return t === o
    ? [...a].sort((n, i) => n - i).map((n) => r[n])
    : r.filter((n, i) => !a.has(i));
}
function It(...r) {
  return e(Wt, r);
}
var Wt = (r, t, o) => ({ ...r, [t]: o });
function Lt(...r) {
  return e(L, r);
}
function L(r, t, o) {
  let [a, ...n] = t;
  if (a === void 0) return o;
  if (Array.isArray(r)) {
    let f = [...r];
    return f[a] = L(r[a], n, o), f;
  }
  let { [a]: i, ...s } = r;
  return { ...s, [a]: L(i, n, o) };
}
function $t(...r) {
  return e(Pt, r);
}
function Pt(r) {
  let t = [...r];
  for (let o = 0; o < r.length; o++) {
    let a = o + Math.floor(Math.random() * (r.length - o)), n = t[a];
    t[a] = t[o], t[o] = n;
  }
  return t;
}
function Ft(r, t, o) {
  return typeof r == "string" ? r.slice(t, o) : (a) => a.slice(r, t);
}
function Dt(...r) {
  return e(Rt, r);
}
var Rt = (r, t) => r[t];
function Ut(...r) {
  return e(qt, r);
}
function qt(r, t, o) {
  let a = {};
  for (let [n, i] of r.entries()) {
    let s = t(i, n, r), f = o(i, n, r);
    a[s] = f;
  }
  return a;
}
function Kt(r, t) {
  if (t < r) {
    throw new RangeError(
      `randomBigInt: The range [${r.toString()},${t.toString()}] is empty.`,
    );
  }
  let o = t - r,
    { length: a } = o.toString(2),
    n = Math.ceil(a / 8),
    i = BigInt(8 - a % 8);
  for (;;) {
    let s = Zt(n), f = Vt(s) >> i;
    if (f <= o) return f + r;
  }
}
function Vt(r) {
  let t = 0n;
  for (let o of r) t = (t << 8n) + BigInt(o);
  return t;
}
function Zt(r) {
  let t = new Uint8Array(r);
  if (typeof crypto > "u") {
    for (let o = 0; o < r; o += 1) t[o] = Math.floor(Math.random() * 256);
  } else crypto.getRandomValues(t);
  return t;
}
function Gt(r, t) {
  let o = Math.ceil(r), a = Math.floor(t);
  if (a < o) {
    throw new RangeError(
      `randomInteger: The range [${r.toString()},${t.toString()}] contains no integer`,
    );
  }
  return Math.floor(Math.random() * (a - o + 1) + o);
}
var X = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function Qt(...r) {
  return e(Ht, r);
}
function Ht(r) {
  let t = [];
  for (let o = 0; o < r; o++) {
    let a = X[Math.floor(Math.random() * X.length)];
    t.push(a);
  }
  return t.join("");
}
function Jt(...r) {
  return e(Xt, r);
}
function Xt(r, t) {
  let o = [];
  for (let a = r; a < t; a++) o.push(a);
  return o;
}
function _t(...r) {
  return g(Yt, r);
}
function Yt(r, t, o) {
  let a = 0;
  for (let n of r) t(o, n) > 0 && (a += 1);
  return a;
}
function ro(r, ...t) {
  return (...o) => r(...o, ...t);
}
function to(...r) {
  return e(oo, r);
}
var oo = (r, t) => {
  let o = [[], []];
  for (let [a, n] of r.entries()) t(n, a, r) ? o[0].push(n) : o[1].push(n);
  return o;
};
function ao(...r) {
  return e(eo, r);
}
function eo(r, t, o) {
  let a = r;
  for (let n of t) {
    if (a == null) break;
    a = a[n];
  }
  return a ?? o;
}
function no(...r) {
  return e(io, r);
}
function io(r, t) {
  let o = {};
  for (let a of t) a in r && (o[a] = r[a]);
  return o;
}
function so(...r) {
  return e(fo, r);
}
function fo(r, t) {
  let o = {};
  for (let [a, n] of Object.entries(r)) t(n, a, r) && (o[a] = n);
  return o;
}
function uo(...r) {
  return (t) => b(t, ...r);
}
function mo(...r) {
  return e(po, r);
}
function po(r) {
  let t = typeof r[0] == "bigint" ? 1n : 1;
  for (let o of r) t *= o;
  return t;
}
function lo(...r) {
  return e(co, r);
}
var co = (r, t) => r * t;
var xo = (r, t, o) =>
  t < 0 || t >= r.length ? void 0 : _([...r], 0, r.length - 1, t, o);
function _(r, t, o, a, n) {
  if (t === o) return r[t];
  let i = ho(r, t, o, n);
  return a === i ? r[a] : _(r, a < i ? t : i + 1, a < i ? i - 1 : o, a, n);
}
function ho(r, t, o, a) {
  let n = r[o], i = t;
  for (let s = t; s < o; s++) a(r[s], n) < 0 && (O(r, i, s), i += 1);
  return O(r, i, o), i;
}
function go(...r) {
  return g(vo, r);
}
var vo = (r, t, o) => xo(r, o >= 0 ? o : r.length + o, t);
function yo(...r) {
  return e(bo, r);
}
var bo = (r, t) => ({ [t]: r });
function jo(...r) {
  return e(No, r);
}
function No(r, t) {
  if (!h(t, 1)) return { ...r };
  if (!h(t, 2)) {
    let { [t[0]]: a, ...n } = r;
    return n;
  }
  let o = { ...r };
  for (let a of t) delete o[a];
  return o;
}
function wo(...r) {
  return e(Oo, r);
}
function Oo(r, t) {
  let o = { ...r };
  for (let [a, n] of Object.entries(o)) t(n, a, r) && delete o[a];
  return o;
}
function Mo(r) {
  let t = !1, o;
  return () => (t || (o = r(), t = !0), o);
}
function Ao(...r) {
  return e(To, r);
}
var To = (r) => r.length === 1 ? r[0] : void 0;
function So(r, ...t) {
  return (...o) => r(...t, ...o);
}
function Eo(...r) {
  return e(ko, r);
}
function ko(r, t) {
  let o = {};
  for (let [a, n] of Object.entries(r)) {
    let i = t(n, a, r);
    o[a] = i;
  }
  return o;
}
function zo(...r) {
  return c(Bo, r);
}
var Bo = (r, t) => {
  let o = t;
  return (a, n, i) => (o = r(o, a, n, i), { done: !1, hasNext: !0, next: o });
};
function $(...r) {
  return e(Co, r);
}
function Co(r) {
  let t = typeof r[0] == "bigint" ? 0n : 0;
  for (let o of r) t += o;
  return t;
}
function Io(...r) {
  return e(Wo, r);
}
function Wo(r) {
  if (r.length !== 0) return $(r) / r.length;
}
function Lo(...r) {
  return e($o, r);
}
var $o = (r, t) => {
  if (r.length === 0) return Number.NaN;
  let o = 0;
  for (let [a, n] of r.entries()) o += t(n, a, r);
  return o / r.length;
};
function Po(...r) {
  return e(Do, r);
}
var Fo = (r, t) => r - t;
function Do(r) {
  if (r.length === 0) return;
  let t = [...r].sort(Fo);
  if (t.length % 2 !== 0) return t[(t.length - 1) / 2];
  let o = t.length / 2;
  return (t[o] + t[o - 1]) / 2;
}
function Ro(...r) {
  return e(Uo, r);
}
var Uo = (r, t) => ({ ...r, ...t });
function qo(r) {
  let t = {};
  for (let o of r) t = { ...t, ...o };
  return t;
}
function z(r) {
  if (typeof r != "object" || r === null) return !1;
  let t = Object.getPrototypeOf(r);
  return t === null || t === Object.prototype;
}
function Ko(...r) {
  return e(Y, r);
}
function Y(r, t) {
  let o = { ...r, ...t };
  for (let a in t) {
    if (!(a in r)) continue;
    let { [a]: n } = r;
    if (!z(n)) continue;
    let { [a]: i } = t;
    z(i) && (o[a] = Y(n, i));
  }
  return o;
}
function Vo(r) {
  return !!r;
}
function Zo(...r) {
  return e(Go, r);
}
var Go = (r, t) => r.join(t);
function Qo(...r) {
  return e(Object.keys, r);
}
function Ho(...r) {
  return e(Jo, r);
}
var Jo = (r) => r.at(-1);
function Xo(...r) {
  return e(_o, r);
}
var _o = (r) => "length" in r ? r.length : [...r].length;
function Yo(...r) {
  return e(ra, r, ta);
}
var ra = (r, t) => r.map(t),
  ta = (r) => (t, o, a) => ({ done: !1, hasNext: !0, next: r(t, o, a) });
function oa(...r) {
  return e(aa, r);
}
function aa(r, t) {
  let o = {};
  for (let [a, n] of Object.entries(r)) {
    let i = t(a, n, r);
    o[i] = n;
  }
  return o;
}
function ea(...r) {
  return e(na, r);
}
function na(r, t) {
  let o = {};
  for (let [a, n] of r.entries()) {
    let [i, s] = t(n, a, r);
    o[i] = s;
  }
  return o;
}
function ia(r) {
  return typeof r == "number" && !Number.isNaN(r);
}
function sa(r) {
  return typeof r == "object" && r !== null;
}
function fa(r) {
  return r instanceof Promise;
}
function ua(...r) {
  return e(ma, r);
}
function ma(r, t) {
  if (r === t || Object.is(r, t)) return !0;
  if (
    typeof r != "object" || r === null || typeof t != "object" || t === null
  ) return !1;
  if (r instanceof Map && t instanceof Map) return pa(r, t);
  if (r instanceof Set && t instanceof Set) return la(r, t);
  let o = Object.keys(r);
  if (o.length !== Object.keys(t).length) return !1;
  for (let a of o) {
    if (!Object.hasOwn(t, a)) return !1;
    let { [a]: n } = r, { [a]: i } = t;
    if (n !== i || !Object.is(n, i)) return !1;
  }
  return !0;
}
function pa(r, t) {
  if (r.size !== t.size) return !1;
  for (let [o, a] of r) {
    let n = t.get(o);
    if (a !== n || !Object.is(a, n)) return !1;
  }
  return !0;
}
function la(r, t) {
  if (r.size !== t.size) return !1;
  for (let o of r) if (!t.has(o)) return !1;
  return !0;
}
function ca(...r) {
  return e(xa, r);
}
var xa = (r, t) => r === t || Object.is(r, t);
function da(r) {
  return typeof r == "string";
}
function ha(r) {
  return typeof r == "symbol";
}
function ga(r) {
  return r === void 0
    ? !0
    : typeof r == "string" || Array.isArray(r)
    ? r.length === 0
    : Object.keys(r).length === 0;
}
function va(r) {
  return r instanceof Error;
}
function ya(r) {
  return typeof r == "function";
}
function ba(r, t) {
  if (t === void 0) {
    let o = new Set(r);
    return (a) => o.has(a);
  }
  return t.includes(r);
}
function ja(r) {
  return r !== null;
}
function Na(r) {
  return r != null;
}
function wa(r) {
  return (t) => !r(t);
}
function Oa(r) {
  return r == null;
}
function Ma(...r) {
  return c(Aa, r);
}
var Aa = (r, t) => (o) =>
  r.some((a) => t(o, a)) ? { done: !1, hasNext: !0, next: o } : m;
function Ta(...r) {
  return e(Sa, r);
}
function Sa(r) {
  let t = {};
  for (let [o, a] of Object.entries(r)) t[a] = o;
  return t;
}
function Ea(r) {
  return Array.isArray(r);
}
function ka(r) {
  return typeof r == "bigint";
}
function za(r) {
  return typeof r == "boolean";
}
function Ba(r) {
  return r instanceof Date;
}
function Ca(r) {
  return r !== void 0;
}
function Ia(
  r,
  {
    triggerAt: t = "end",
    minQuietPeriodMs: o,
    maxBurstDurationMs: a,
    minGapMs: n,
    reducer: i = Wa,
  },
) {
  let s,
    f,
    u,
    p,
    x = () => {
      let T = u;
      T !== void 0 &&
        (u = void 0, r(T), n !== void 0 && (f = setTimeout(l, n)));
    },
    l = () => {
      clearTimeout(f), f = void 0, s === void 0 && x();
    },
    v = () => {
      clearTimeout(s), s = void 0, p = void 0, f === void 0 && x();
    };
  return {
    call: (...T) => {
      let C = s === void 0 && f === void 0;
      if ((t !== "start" || C) && (u = i(u, ...T)), !(s === void 0 && !C)) {
        if (o !== void 0 || a !== void 0 || n === void 0) {
          clearTimeout(s);
          let D = Date.now();
          p ??= D;
          let or = a === void 0 ? o ?? 0 : Math.min(o ?? a, a - (D - p));
          s = setTimeout(v, or);
        }
        t !== "end" && C && x();
      }
    },
    cancel: () => {
      clearTimeout(s),
        s = void 0,
        p = void 0,
        clearTimeout(f),
        f = void 0,
        u = void 0;
    },
    flush: () => {
      v(), l();
    },
    get isIdle() {
      return s === void 0 && f === void 0;
    },
  };
}
var Wa = () => "";
function La(...r) {
  return e($a, r);
}
var $a = (r, t) => {
  let o = new Map();
  for (let [a, n] of r.entries()) {
    let i = t(n, a, r);
    if (i !== void 0) {
      let s = o.get(i);
      s === void 0 && (s = [], o.set(i, s)), s.push(n);
    }
  }
  return Object.fromEntries(o);
};
function P(...r) {
  return e(A, r);
}
function A(r, t) {
  if (r === t || Object.is(r, t)) return !0;
  if (
    typeof r != "object" || typeof t != "object" || r === null || t === null ||
    Object.getPrototypeOf(r) !== Object.getPrototypeOf(t)
  ) return !1;
  if (Array.isArray(r)) return Pa(r, t);
  if (r instanceof Map) return Fa(r, t);
  if (r instanceof Set) return Da(r, t);
  if (r instanceof Date) return r.getTime() === t.getTime();
  if (r instanceof RegExp) return r.toString() === t.toString();
  if (Object.keys(r).length !== Object.keys(t).length) return !1;
  for (let [o, a] of Object.entries(r)) if (!(o in t) || !A(a, t[o])) return !1;
  return !0;
}
function Pa(r, t) {
  if (r.length !== t.length) return !1;
  for (let [o, a] of r.entries()) if (!A(a, t[o])) return !1;
  return !0;
}
function Fa(r, t) {
  if (r.size !== t.size) return !1;
  for (let [o, a] of r.entries()) if (!t.has(o) || !A(a, t.get(o))) return !1;
  return !0;
}
function Da(r, t) {
  if (r.size !== t.size) return !1;
  let o = [...t];
  for (let a of r) {
    let n = !1;
    for (let [i, s] of o.entries()) {
      if (A(a, s)) {
        n = !0, o.splice(i, 1);
        break;
      }
    }
    if (!n) return !1;
  }
  return !0;
}
function Ra(...r) {
  return e(Ua, r);
}
function Ua(r, t) {
  for (let [o, a] of Object.entries(t)) {
    if (!Object.hasOwn(r, o) || !P(a, r[o])) return !1;
  }
  return !0;
}
function qa() {
  return Ka;
}
var Ka = (r) => r;
function Va(...r) {
  return e(Za, r);
}
function Za(r, t) {
  let o = {};
  for (let [a, n] of r.entries()) {
    let i = t(n, a, r);
    o[i] = n;
  }
  return o;
}
function Ga(...r) {
  return c(Qa, r);
}
function Qa(r) {
  if (r.length === 0) return S;
  let t = new Map();
  for (let o of r) t.set(o, (t.get(o) ?? 0) + 1);
  return (o) => {
    let a = t.get(o);
    return a === void 0 || a === 0
      ? m
      : (a === 1 ? t.delete(o) : t.set(o, a - 1),
        { hasNext: !0, next: o, done: t.size === 0 });
  };
}
function Ha(...r) {
  return M(Ja, r);
}
function Ja(r, t) {
  if (!h(r, 2)) return r[0];
  let [o] = r, [, ...a] = r;
  for (let n of a) t(n, o) < 0 && (o = n);
  return o;
}
function Xa(r, t) {
  return typeof r == "object" ? rr(r, t) : j(rr, r === void 0 ? [] : [r], _a);
}
var rr = (r, t) => t === void 0 ? r.flat() : r.flat(t),
  _a = (r) =>
    r === void 0 || r === 1
      ? Ya
      : r <= 0
      ? y
      : (t) =>
        Array.isArray(t)
          ? { next: t.flat(r - 1), hasNext: !0, hasMany: !0, done: !1 }
          : { next: t, hasNext: !0, done: !1 },
  Ya = (r) =>
    Array.isArray(r)
      ? { next: r, hasNext: !0, hasMany: !0, done: !1 }
      : { next: r, hasNext: !0, done: !1 };
function re(...r) {
  return e(te, r, oe);
}
var te = (r, t) => r.flatMap(t),
  oe = (r) => (t, o, a) => {
    let n = r(t, o, a);
    return Array.isArray(n)
      ? { done: !1, hasNext: !0, hasMany: !0, next: n }
      : { done: !1, hasNext: !0, next: n };
  };
function ae(...r) {
  return e(w(Math.floor), r);
}
function ee(...r) {
  return e(ne, r, ie);
}
function ne(r, t) {
  return r.forEach(t), r;
}
var ie = (r) => (t, o, a) => (r(t, o, a), { done: !1, hasNext: !0, next: t });
function se(...r) {
  return e(fe, r);
}
function fe(r, t) {
  for (let [o, a] of Object.entries(r)) t(a, o, r);
  return r;
}
function ue(...r) {
  return e(Object.fromEntries, r);
}
function me(...r) {
  return e(pe, r);
}
function pe(r, t) {
  let o = {};
  for (let [a, n] of r.entries()) o[n] = t(n, a, r);
  return o;
}
function le(...r) {
  return e(Object.entries, r);
}
function ce(...r) {
  return e(tr, r);
}
function tr(r, t) {
  if (typeof r != "object" || r === null) return r;
  let o = { ...r };
  for (let [a, n] of Object.entries(t)) {
    a in o && (o[a] = typeof n == "function" ? n(o[a]) : tr(o[a], n));
  }
  return o;
}
function xe(...r) {
  return e(de, r, he);
}
var de = (r, t) => r.filter(t),
  he = (r) => (t, o, a) => r(t, o, a) ? { done: !1, hasNext: !0, next: t } : m;
var B = (r) => Object.assign(r, { single: !0 });
function ge(...r) {
  return e(ve, r, B(ye));
}
var ve = (r, t) => r.find(t),
  ye = (r) => (t, o, a) => r(t, o, a) ? { done: !0, hasNext: !0, next: t } : m;
function be(...r) {
  return e(je, r);
}
var je = (r, t) => r.findIndex(t);
function Ne(...r) {
  return e(we, r);
}
var we = (r, t) => {
  for (let o = r.length - 1; o >= 0; o--) {
    let a = r[o];
    if (t(a, o, r)) return a;
  }
};
function Oe(...r) {
  return e(Me, r);
}
var Me = (r, t) => {
  for (let o = r.length - 1; o >= 0; o--) if (t(r[o], o, r)) return o;
  return -1;
};
function Ae(...r) {
  return e(Te, r, B(Se));
}
var Te = ([r]) => r,
  Se = () => Ee,
  Ee = (r) => ({ hasNext: !0, next: r, done: !0 });
function ke(...r) {
  return e(ze, r);
}
var ze = (r, t) => r / t;
function Be() {
  return Ce;
}
function Ce(...r) {}
function Ie(...r) {
  return e(We, r, Le);
}
var We = (r, t) => t < 0 ? [...r] : r.slice(t);
function Le(r) {
  if (r <= 0) return y;
  let t = r;
  return (o) => t > 0 ? (t -= 1, m) : { done: !1, hasNext: !0, next: o };
}
function $e(...r) {
  return g(Pe, r);
}
function Pe(r, t, o) {
  if (o >= r.length) return [];
  if (o <= 0) return [...r];
  let a = r.slice(0, o);
  E(a, t);
  let n = [], i = r.slice(o);
  for (let s of i) {
    let f = k(a, t, s);
    n.push(f ?? s);
  }
  return n;
}
function Fe(...r) {
  return e(De, r);
}
var De = (r, t) => t > 0 ? r.slice(0, Math.max(0, r.length - t)) : [...r];
function Re(...r) {
  return e(Ue, r);
}
function Ue(r, t) {
  for (let o = r.length - 1; o >= 0; o--) {
    if (!t(r[o], o, r)) return r.slice(0, o + 1);
  }
  return [];
}
function qe(...r) {
  return e(Ke, r);
}
function Ke(r, t) {
  for (let [o, a] of r.entries()) if (!t(a, o, r)) return r.slice(o);
  return [];
}
function Ve(...r) {
  return e(Ze, r);
}
var Ze = (r, t) => r.endsWith(t);
function Ge(...r) {
  return e(F, r);
}
function F(r, t = [], o = []) {
  if (typeof r == "function") return r;
  if (
    typeof r != "object" || r === null || r instanceof Date ||
    r instanceof RegExp
  ) return structuredClone(r);
  let a = t.indexOf(r);
  return a !== -1
    ? o[a]
    : (t.push(r), Array.isArray(r) ? He(r, t, o) : Qe(r, t, o));
}
function Qe(r, t, o) {
  let a = {};
  o.push(a);
  for (let [n, i] of Object.entries(r)) a[n] = F(i, t, o);
  return a;
}
function He(r, t, o) {
  let a = [];
  o.push(a);
  for (let [n, i] of r.entries()) a[n] = F(i, t, o);
  return a;
}
function Je(...r) {
  return e(Xe, r);
}
var Xe = (r, t) => [...r, ...t];
function _e(r, t, o) {
  return r(o[0]) ? (a) => t(a, ...o) : t(...o);
}
var Ye = Object.assign(rn, { defaultCase: an });
function rn(...r) {
  return _e(on, tn, r);
}
function tn(r, ...t) {
  for (let [o, a] of t) if (o(r)) return a(r);
  throw new Error("conditional: data failed for all cases");
}
function on(r) {
  if (!Array.isArray(r)) return !1;
  let [t, o, ...a] = r;
  return typeof t == "function" && t.length <= 1 && typeof o == "function" &&
    o.length <= 1 && a.length === 0;
}
function an(r = nn) {
  return [en, r];
}
var en = () => !0, nn = () => {};
function sn(r) {
  return () => r;
}
function fn(...r) {
  return e(un, r);
}
var un = (r, t) => {
  let o = new Map();
  for (let [a, n] of r.entries()) {
    let i = t(n, a, r);
    if (i !== void 0) {
      let s = o.get(i);
      s === void 0 ? o.set(i, 1) : o.set(i, s + 1);
    }
  }
  return Object.fromEntries(o);
};
function mn(r, { waitMs: t, timing: o = "trailing", maxWaitMs: a }) {
  if (a !== void 0 && t !== void 0 && a < t) {
    throw new Error(
      `debounce: maxWaitMs (${a.toString()}) cannot be less than waitMs (${t.toString()})`,
    );
  }
  let n,
    i,
    s,
    f,
    u = () => {
      if (i !== void 0) {
        let v = i;
        i = void 0, clearTimeout(v);
      }
      if (s === void 0) {
        throw new Error(
          "REMEDA[debounce]: latestCallArgs was unexpectedly undefined.",
        );
      }
      let l = s;
      s = void 0, f = r(...l);
    },
    p = () => {
      if (n === void 0) return;
      let l = n;
      n = void 0, clearTimeout(l), s !== void 0 && u();
    },
    x = (l) => {
      s = l, a !== void 0 && i === void 0 && (i = setTimeout(u, a));
    };
  return {
    call: (...l) => {
      if (n === void 0) o === "trailing" ? x(l) : f = r(...l);
      else {
        o !== "leading" && x(l);
        let v = n;
        n = void 0, clearTimeout(v);
      }
      return n = setTimeout(p, t ?? a ?? 0), f;
    },
    cancel: () => {
      if (n !== void 0) {
        let l = n;
        n = void 0, clearTimeout(l);
      }
      if (i !== void 0) {
        let l = i;
        i = void 0, clearTimeout(l);
      }
      s = void 0;
    },
    flush: () => (p(), f),
    get isPending() {
      return n !== void 0;
    },
    get cachedValue() {
      return f;
    },
  };
}
function pn(...r) {
  return c(ln, r);
}
function ln(r) {
  if (r.length === 0) return y;
  let t = new Map();
  for (let o of r) t.set(o, (t.get(o) ?? 0) + 1);
  return (o) => {
    let a = t.get(o);
    return a === void 0 || a === 0
      ? { done: !1, hasNext: !0, next: o }
      : (t.set(o, a - 1), m);
  };
}
function cn(...r) {
  return c(xn, r);
}
var xn = (r, t) => (o) =>
  r.every((a) => !t(o, a)) ? { done: !1, hasNext: !0, next: o } : m;
function dn(...r) {
  return e(hn, r);
}
var hn = (r, t) => r + t;
function gn(...r) {
  return e(vn, r);
}
var vn = (r, t, o) => ({ ...r, [t]: o });
function yn(...r) {
  return e(bn, r);
}
var bn = (r, t) => t.every((o) => o(r));
function jn(...r) {
  return e(Nn, r);
}
var Nn = (r, t) => t.some((o) => o(r));
function wn(...r) {
  return e(On, r);
}
var On = (r) => `${r[0]?.toUpperCase() ?? ""}${r.slice(1)}`;
function Mn(...r) {
  return e(w(Math.ceil), r);
}
function An(...r) {
  return e(Tn, r);
}
function Tn(r, t) {
  if (t < 1) {
    throw new RangeError(
      `chunk: A chunk size of '${t.toString()}' would result in an infinite array`,
    );
  }
  if (r.length === 0) return [];
  if (t >= r.length) return [[...r]];
  let o = Math.ceil(r.length / t), a = new Array(o);
  if (t === 1) { for (let [n, i] of r.entries()) a[n] = [i]; }
  else {for (let n = 0; n < o; n += 1) {
      let i = n * t;
      a[n] = r.slice(i, i + t);
    }}
  return a;
}
function Sn(...r) {
  return e(En, r);
}
var En = (r, { min: t, max: o }) =>
  t !== void 0 && r < t ? t : o !== void 0 && r > o ? o : r;
export {
  $ as sum,
  $e as dropFirstBy,
  $t as shuffle,
  _r as tap,
  _t as rankBy,
  Ae as first,
  ae as floor,
  An as chunk,
  Ao as only,
  ao as pathOr,
  Ar as toLowerCase,
  at as splitWhen,
  b as pipe,
  Ba as isDate,
  ba as isIncludedIn,
  Be as doNothing,
  be as findIndex,
  Br as uncapitalize,
  Bt as sample,
  bt as sortedIndexWith,
  Ca as isDefined,
  ca as isStrictEqual,
  ce as evolve,
  cn as differenceWith,
  da as isString,
  dn as add,
  Dr as take,
  dr as zipWith,
  Dt as prop,
  e as purry,
  Ea as isArray,
  ea as mapToObj,
  ee as forEach,
  Eo as mapValues,
  Et as reverse,
  fa as isPromise,
  Fe as dropLast,
  fn as countBy,
  fr as uniqueWith,
  Ft as sliceString,
  ft as subtract,
  Ga as intersection,
  ga as isEmpty,
  Ge as clone,
  ge as find,
  gn as addProp,
  go as nthBy,
  gr as times,
  Gt as randomInteger,
  H as stringToPath,
  h as hasAtLeast,
  Ha as firstBy,
  ha as isSymbol,
  Ho as last,
  ht as sortedIndex,
  Ia as funnel,
  ia as isNumber,
  Ie as drop,
  Io as mean,
  Ir as unique,
  ir as uniqueBy,
  It as set,
  ja as isNonNull,
  Je as concat,
  jn as anyPass,
  jo as omit,
  Jr as takeWhile,
  Jt as range,
  jt as sortedLastIndex,
  ka as isBigInt,
  ke as divide,
  Ko as mergeDeep,
  Kr as takeFirstBy,
  kr as toUpperCase,
  Kt as randomBigInt,
  La as groupBy,
  le as entries,
  Lo as meanBy,
  lo as multiply,
  Lr as swapIndices,
  lr as zip,
  Lt as setPath,
  lt as sort,
  Ma as intersectionWith,
  me as fromKeys,
  Mn as ceil,
  mn as debounce,
  Mo as once,
  mo as product,
  mr as values,
  Mt as splice,
  mt as sumBy,
  Na as isNonNullish,
  Ne as findLast,
  no as pick,
  nt as startsWith,
  Oa as isNullish,
  oa as mapKeys,
  Oe as findLastIndex,
  Or as toKebabCase,
  P as isDeepEqual,
  pn as difference,
  Po as median,
  Pr as swapProps,
  pr as when,
  qa as identity,
  qe as dropWhile,
  Qo as keys,
  qo as mergeAll,
  Qr as takeLastWhile,
  Qt as randomString,
  Ra as hasSubObject,
  Re as dropLastWhile,
  re as flatMap,
  Ro as merge,
  ro as partialLastBind,
  rt as split,
  sa as isObjectType,
  se as forEachObj,
  Sn as clamp,
  sn as constant,
  So as partialBind,
  so as pickBy,
  Sr as toSnakeCase,
  Ta as invert,
  to as partition,
  Tt as reduce,
  tt as splitAt,
  ua as isShallowEqual,
  ue as fromEntries,
  uo as piped,
  Ut as pullObject,
  Va as indexBy,
  va as isError,
  Ve as endsWith,
  Vo as isTruthy,
  vt as sortedIndexBy,
  wa as isNot,
  wn as capitalize,
  wo as omitBy,
  wr as toCamelCase,
  wt as sortedLastIndexBy,
  Xa as flat,
  xe as filter,
  Xo as length,
  xt as sortBy,
  ya as isFunction,
  Ye as conditional,
  yn as allPass,
  Yo as map,
  yo as objOf,
  z as isPlainObject,
  za as isBoolean,
  Zo as join,
  zo as mapWithFeedback,
  Zr as takeLast,
  zt as round,
};
//# sourceMappingURL=remeda.mjs.map
