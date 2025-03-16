/* esm.sh - dotenv@16.4.7 */
import __Process$ from "node:process";
import { Buffer as __Buffer$ } from "node:buffer";
import * as __0$ from "node:fs";
import * as __1$ from "node:path";
import * as __2$ from "node:os";
import * as __3$ from "node:crypto";
import __4$ from "dotenv@16.4.7/package.json?module";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "node:fs":
      return e(__0$);
    case "node:path":
      return e(__1$);
    case "node:os":
      return e(__2$);
    case "node:crypto":
      return e(__3$);
    case "dotenv/package.json":
      return e(__4$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var I = Object.create;
var D = Object.defineProperty;
var O = Object.getOwnPropertyDescriptor;
var T = Object.getOwnPropertyNames;
var w = Object.getPrototypeOf, A = Object.prototype.hasOwnProperty;
var p =
  ((e) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(e, { get: (r, t) => (typeof require < "u" ? require : r)[t] })
      : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
var b = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var $ = (e, r, t, c) => {
  if (r && typeof r == "object" || typeof r == "function") {
    for (let a of T(r)) {
      !A.call(e, a) && a !== t && D(e, a, {
        get: () => r[a],
        enumerable: !(c = O(r, a)) || c.enumerable,
      });
    }
  }
  return e;
};
var x = (
  e,
  r,
  t,
) => (t = e != null ? I(w(e)) : {},
  $(
    r || !e || !e.__esModule
      ? D(t, "default", { value: e, enumerable: !0 })
      : t,
    e,
  ));
var m = b((G, i) => {
  var g = p("node:fs"),
    h = p("node:path"),
    K = p("node:os"),
    Y = p("node:crypto"),
    k = p("dotenv/package.json"),
    _ = k.version,
    L =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function R(e) {
    let r = {}, t = e.toString();
    t = t.replace(
      /\r\n?/mg,
      `
`,
    );
    let c;
    for (; (c = L.exec(t)) != null;) {
      let a = c[1], n = c[2] || "";
      n = n.trim();
      let o = n[0];
      n = n.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"),
        o === '"' && (n = n.replace(
          /\\n/g,
          `
`,
        ),
          n = n.replace(/\\r/g, "\r")),
        r[a] = n;
    }
    return r;
  }
  function U(e) {
    let r = V(e), t = l.configDotenv({ path: r });
    if (!t.parsed) {
      let o = new Error(
        `MISSING_DATA: Cannot parse ${r} for an unknown reason`,
      );
      throw o.code = "MISSING_DATA", o;
    }
    let c = N(e).split(","), a = c.length, n;
    for (let o = 0; o < a; o++) {
      try {
        let s = c[o].trim(), u = F(t, s);
        n = l.decrypt(u.ciphertext, u.key);
        break;
      } catch (s) {
        if (o + 1 >= a) throw s;
      }
    }
    return l.parse(n);
  }
  function P(e) {
    console.log(`[dotenv@${_}][INFO] ${e}`);
  }
  function S(e) {
    console.log(`[dotenv@${_}][WARN] ${e}`);
  }
  function E(e) {
    console.log(`[dotenv@${_}][DEBUG] ${e}`);
  }
  function N(e) {
    return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0
      ? e.DOTENV_KEY
      : __Process$.env.DOTENV_KEY && __Process$.env.DOTENV_KEY.length > 0
      ? __Process$.env.DOTENV_KEY
      : "";
  }
  function F(e, r) {
    let t;
    try {
      t = new URL(r);
    } catch (s) {
      if (s.code === "ERR_INVALID_URL") {
        let u = new Error(
          "INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development",
        );
        throw u.code = "INVALID_DOTENV_KEY", u;
      }
      throw s;
    }
    let c = t.password;
    if (!c) {
      let s = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw s.code = "INVALID_DOTENV_KEY", s;
    }
    let a = t.searchParams.get("environment");
    if (!a) {
      let s = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw s.code = "INVALID_DOTENV_KEY", s;
    }
    let n = `DOTENV_VAULT_${a.toUpperCase()}`, o = e.parsed[n];
    if (!o) {
      let s = new Error(
        `NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${n} in your .env.vault file.`,
      );
      throw s.code = "NOT_FOUND_DOTENV_ENVIRONMENT", s;
    }
    return { ciphertext: o, key: c };
  }
  function V(e) {
    let r = null;
    if (e && e.path && e.path.length > 0) {
      if (Array.isArray(e.path)) {
        for (let t of e.path) {
          g.existsSync(t) && (r = t.endsWith(".vault") ? t : `${t}.vault`);
        }
      } else r = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
    } else r = h.resolve(__Process$.cwd(), ".env.vault");
    return g.existsSync(r) ? r : null;
  }
  function y(e) {
    return e[0] === "~" ? h.join(K.homedir(), e.slice(1)) : e;
  }
  function B(e) {
    P("Loading env from encrypted .env.vault");
    let r = l._parseVault(e), t = __Process$.env;
    return e && e.processEnv != null && (t = e.processEnv),
      l.populate(t, r, e),
      { parsed: r };
  }
  function M(e) {
    let r = h.resolve(__Process$.cwd(), ".env"),
      t = "utf8",
      c = !!(e && e.debug);
    e && e.encoding
      ? t = e.encoding
      : c && E("No encoding is specified. UTF-8 is used by default");
    let a = [r];
    if (e && e.path) {
      if (!Array.isArray(e.path)) a = [y(e.path)];
      else {
        a = [];
        for (let u of e.path) a.push(y(u));
      }
    }
    let n, o = {};
    for (let u of a) {
      try {
        let f = l.parse(g.readFileSync(u, { encoding: t }));
        l.populate(o, f, e);
      } catch (f) {
        c && E(`Failed to load ${u} ${f.message}`), n = f;
      }
    }
    let s = __Process$.env;
    return e && e.processEnv != null && (s = e.processEnv),
      l.populate(s, o, e),
      n ? { parsed: o, error: n } : { parsed: o };
  }
  function j(e) {
    if (N(e).length === 0) return l.configDotenv(e);
    let r = V(e);
    return r ? l._configVault(e) : (S(
      `You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`,
    ),
      l.configDotenv(e));
  }
  function C(e, r) {
    let t = __Buffer$.from(r.slice(-64), "hex"),
      c = __Buffer$.from(e, "base64"),
      a = c.subarray(0, 12),
      n = c.subarray(-16);
    c = c.subarray(12, -16);
    try {
      let o = Y.createDecipheriv("aes-256-gcm", t, a);
      return o.setAuthTag(n), `${o.update(c)}${o.final()}`;
    } catch (o) {
      let s = o instanceof RangeError,
        u = o.message === "Invalid key length",
        f = o.message === "Unsupported state or unable to authenticate data";
      if (s || u) {
        let d = new Error(
          "INVALID_DOTENV_KEY: It must be 64 characters long (or more)",
        );
        throw d.code = "INVALID_DOTENV_KEY", d;
      } else if (f) {
        let d = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw d.code = "DECRYPTION_FAILED", d;
      } else throw o;
    }
  }
  function q(e, r, t = {}) {
    let c = !!(t && t.debug), a = !!(t && t.override);
    if (typeof r != "object") {
      let n = new Error(
        "OBJECT_REQUIRED: Please check the processEnv argument being passed to populate",
      );
      throw n.code = "OBJECT_REQUIRED", n;
    }
    for (let n of Object.keys(r)) {
      Object.prototype.hasOwnProperty.call(e, n)
        ? (a === !0 && (e[n] = r[n]),
          c && E(
            a === !0
              ? `"${n}" is already defined and WAS overwritten`
              : `"${n}" is already defined and was NOT overwritten`,
          ))
        : e[n] = r[n];
    }
  }
  var l = {
    configDotenv: M,
    _configVault: B,
    _parseVault: U,
    config: j,
    decrypt: C,
    parse: R,
    populate: q,
  };
  i.exports.configDotenv = l.configDotenv;
  i.exports._configVault = l._configVault;
  i.exports._parseVault = l._parseVault;
  i.exports.config = l.config;
  i.exports.decrypt = l.decrypt;
  i.exports.parse = l.parse;
  i.exports.populate = l.populate;
  i.exports = l;
});
var v = x(m()),
  {
    configDotenv: J,
    _configVault: Q,
    _parseVault: H,
    config: z,
    decrypt: X,
    parse: Z,
    populate: ee,
  } = v,
  re = v.default ?? v;
export {
  ee as populate,
  H as _parseVault,
  J as configDotenv,
  Q as _configVault,
  re as default,
  X as decrypt,
  Z as parse,
  z as config,
};
//# sourceMappingURL=dotenv.mjs.map
