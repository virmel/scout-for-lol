/* esm.sh - zod@3.24.2 */
var g;
(function (r) {
  r.assertEqual = (n) => n;
  function e(n) {}
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  r.assertNever = t,
    r.arrayToEnum = (n) => {
      let a = {};
      for (let i of n) a[i] = i;
      return a;
    },
    r.getValidEnumValues = (n) => {
      let a = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
      for (let o of a) i[o] = n[o];
      return r.objectValues(i);
    },
    r.objectValues = (n) => r.objectKeys(n).map(function (a) {
      return n[a];
    }),
    r.objectKeys = typeof Object.keys == "function"
      ? (n) => Object.keys(n)
      : (n) => {
        let a = [];
        for (let i in n) {Object.prototype.hasOwnProperty.call(n, i) &&
            a.push(i);}
        return a;
      },
    r.find = (n, a) => {
      for (let i of n) if (a(i)) return i;
    },
    r.isInteger = typeof Number.isInteger == "function"
      ? (n) => Number.isInteger(n)
      : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  r.joinValues = s,
    r.jsonStringifyReplacer = (n, a) => typeof a == "bigint" ? a.toString() : a;
})(g || (g = {}));
var be;
(function (r) {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(be || (be = {}));
var f = g.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  R = (r) => {
    switch (typeof r) {
      case "undefined":
        return f.undefined;
      case "string":
        return f.string;
      case "number":
        return isNaN(r) ? f.nan : f.number;
      case "boolean":
        return f.boolean;
      case "function":
        return f.function;
      case "bigint":
        return f.bigint;
      case "symbol":
        return f.symbol;
      case "object":
        return Array.isArray(r)
          ? f.array
          : r === null
          ? f.null
          : r.then && typeof r.then == "function" && r.catch &&
              typeof r.catch == "function"
          ? f.promise
          : typeof Map < "u" && r instanceof Map
          ? f.map
          : typeof Set < "u" && r instanceof Set
          ? f.set
          : typeof Date < "u" && r instanceof Date
          ? f.date
          : f.object;
      default:
        return f.unknown;
    }
  },
  d = g.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  ze = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:"),
  T = class r extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e) {
      super(),
        this.issues = [],
        this.addIssue = (s) => {
          this.issues = [...this.issues, s];
        },
        this.addIssues = (s = []) => {
          this.issues = [...this.issues, ...s];
        };
      let t = new.target.prototype;
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : this.__proto__ = t,
        this.name = "ZodError",
        this.issues = e;
    }
    format(e) {
      let t = e || function (a) {
          return a.message;
        },
        s = { _errors: [] },
        n = (a) => {
          for (let i of a.issues) {
            if (i.code === "invalid_union") i.unionErrors.map(n);
            else if (i.code === "invalid_return_type") n(i.returnTypeError);
            else if (i.code === "invalid_arguments") n(i.argumentsError);
            else if (i.path.length === 0) s._errors.push(t(i));
            else {
              let o = s, l = 0;
              for (; l < i.path.length;) {
                let c = i.path[l];
                l === i.path.length - 1
                  ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(i)))
                  : o[c] = o[c] || { _errors: [] },
                  o = o[c],
                  l++;
              }
            }
          }
        };
      return n(this), s;
    }
    static assert(e) {
      if (!(e instanceof r)) throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, g.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (t) => t.message) {
      let t = {}, s = [];
      for (let n of this.issues) {
        n.path.length > 0
          ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n)))
          : s.push(e(n));
      }
      return { formErrors: s, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  };
T.create = (r) => new T(r);
var re = (r, e) => {
    let t;
    switch (r.code) {
      case d.invalid_type:
        r.received === f.undefined
          ? t = "Required"
          : t = `Expected ${r.expected}, received ${r.received}`;
        break;
      case d.invalid_literal:
        t = `Invalid literal value, expected ${
          JSON.stringify(r.expected, g.jsonStringifyReplacer)
        }`;
        break;
      case d.unrecognized_keys:
        t = `Unrecognized key(s) in object: ${g.joinValues(r.keys, ", ")}`;
        break;
      case d.invalid_union:
        t = "Invalid input";
        break;
      case d.invalid_union_discriminator:
        t = `Invalid discriminator value. Expected ${g.joinValues(r.options)}`;
        break;
      case d.invalid_enum_value:
        t = `Invalid enum value. Expected ${
          g.joinValues(r.options)
        }, received '${r.received}'`;
        break;
      case d.invalid_arguments:
        t = "Invalid function arguments";
        break;
      case d.invalid_return_type:
        t = "Invalid function return type";
        break;
      case d.invalid_date:
        t = "Invalid date";
        break;
      case d.invalid_string:
        typeof r.validation == "object"
          ? "includes" in r.validation
            ? (t = `Invalid input: must include "${r.validation.includes}"`,
              typeof r.validation.position == "number" &&
              (t =
                `${t} at one or more positions greater than or equal to ${r.validation.position}`))
            : "startsWith" in r.validation
            ? t = `Invalid input: must start with "${r.validation.startsWith}"`
            : "endsWith" in r.validation
            ? t = `Invalid input: must end with "${r.validation.endsWith}"`
            : g.assertNever(r.validation)
          : r.validation !== "regex"
          ? t = `Invalid ${r.validation}`
          : t = "Invalid";
        break;
      case d.too_small:
        r.type === "array"
          ? t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "more than"
          } ${r.minimum} element(s)`
          : r.type === "string"
          ? t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at least" : "over"
          } ${r.minimum} character(s)`
          : r.type === "number"
          ? t = `Number must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${r.minimum}`
          : r.type === "date"
          ? t = `Date must be ${
            r.exact
              ? "exactly equal to "
              : r.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${new Date(Number(r.minimum))}`
          : t = "Invalid input";
        break;
      case d.too_big:
        r.type === "array"
          ? t = `Array must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "less than"
          } ${r.maximum} element(s)`
          : r.type === "string"
          ? t = `String must contain ${
            r.exact ? "exactly" : r.inclusive ? "at most" : "under"
          } ${r.maximum} character(s)`
          : r.type === "number"
          ? t = `Number must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`
          : r.type === "bigint"
          ? t = `BigInt must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "less than or equal to"
              : "less than"
          } ${r.maximum}`
          : r.type === "date"
          ? t = `Date must be ${
            r.exact
              ? "exactly"
              : r.inclusive
              ? "smaller than or equal to"
              : "smaller than"
          } ${new Date(Number(r.maximum))}`
          : t = "Invalid input";
        break;
      case d.custom:
        t = "Invalid input";
        break;
      case d.invalid_intersection_types:
        t = "Intersection results could not be merged";
        break;
      case d.not_multiple_of:
        t = `Number must be a multiple of ${r.multipleOf}`;
        break;
      case d.not_finite:
        t = "Number must be finite";
        break;
      default:
        t = e.defaultError, g.assertNever(r);
    }
    return { message: t };
  },
  Ee = re;
function De(r) {
  Ee = r;
}
function pe() {
  return Ee;
}
var me = (r) => {
    let { data: e, path: t, errorMaps: s, issueData: n } = r,
      a = [...t, ...n.path || []],
      i = { ...n, path: a };
    if (n.message !== void 0) return { ...n, path: a, message: n.message };
    let o = "", l = s.filter((c) => !!c).slice().reverse();
    for (let c of l) o = c(i, { data: e, defaultError: o }).message;
    return { ...n, path: a, message: o };
  },
  Le = [];
function u(r, e) {
  let t = pe(),
    s = me({
      issueData: e,
      data: r.data,
      path: r.path,
      errorMaps: [
        r.common.contextualErrorMap,
        r.schemaErrorMap,
        t,
        t === re ? void 0 : re,
      ].filter((n) => !!n),
    });
  r.common.issues.push(s);
}
var x = class r {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(e, t) {
      let s = [];
      for (let n of t) {
        if (n.status === "aborted") return v;
        n.status === "dirty" && e.dirty(), s.push(n.value);
      }
      return { status: e.value, value: s };
    }
    static async mergeObjectAsync(e, t) {
      let s = [];
      for (let n of t) {
        let a = await n.key, i = await n.value;
        s.push({ key: a, value: i });
      }
      return r.mergeObjectSync(e, s);
    }
    static mergeObjectSync(e, t) {
      let s = {};
      for (let n of t) {
        let { key: a, value: i } = n;
        if (a.status === "aborted" || i.status === "aborted") return v;
        a.status === "dirty" && e.dirty(),
          i.status === "dirty" && e.dirty(),
          a.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) &&
          (s[a.value] = i.value);
      }
      return { status: e.value, value: s };
    }
  },
  v = Object.freeze({ status: "aborted" }),
  te = (r) => ({ status: "dirty", value: r }),
  b = (r) => ({ status: "valid", value: r }),
  we = (r) => r.status === "aborted",
  Te = (r) => r.status === "dirty",
  P = (r) => r.status === "valid",
  ue = (r) => typeof Promise < "u" && r instanceof Promise;
function ve(r, e, t, s) {
  if (t === "a" && !s) {
    throw new TypeError("Private accessor was defined without a getter");
  }
  if (typeof e == "function" ? r !== e || !s : !e.has(r)) {
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  }
  return t === "m" ? s : t === "a" ? s.call(r) : s ? s.value : e.get(r);
}
function Ze(r, e, t, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) {
    throw new TypeError("Private accessor was defined without a setter");
  }
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) {
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  }
  return s === "a" ? n.call(r, t) : n ? n.value = t : e.set(r, t), t;
}
var h;
(function (r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {},
    r.toString = (e) => typeof e == "string" ? e : e?.message;
})(h || (h = {}));
var de,
  ce,
  S = class {
    constructor(e, t, s, n) {
      this._cachedPath = [],
        this.parent = e,
        this.data = t,
        this._path = s,
        this._key = n;
    }
    get path() {
      return this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath;
    }
  },
  Oe = (r, e) => {
    if (P(e)) return { success: !0, data: e.value };
    if (!r.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        let t = new T(r.common.issues);
        return this._error = t, this._error;
      },
    };
  };
function _(r) {
  if (!r) return {};
  let {
    errorMap: e,
    invalid_type_error: t,
    required_error: s,
    description: n,
  } = r;
  if (e && (t || s)) {
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  }
  return e ? { errorMap: e, description: n } : {
    errorMap: (i, o) => {
      var l, c;
      let { message: p } = r;
      return i.code === "invalid_enum_value"
        ? { message: p ?? o.defaultError }
        : typeof o.data > "u"
        ? {
          message: (l = p ?? s) !== null && l !== void 0 ? l : o.defaultError,
        }
        : i.code !== "invalid_type"
        ? { message: o.defaultError }
        : {
          message: (c = p ?? t) !== null && c !== void 0 ? c : o.defaultError,
        };
    },
    description: n,
  };
}
var y = class {
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return R(e.data);
    }
    _getOrReturnCtx(e, t) {
      return t ||
        {
          common: e.parent.common,
          data: e.data,
          parsedType: R(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        };
    }
    _processInputParams(e) {
      return {
        status: new x(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: R(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      };
    }
    _parseSync(e) {
      let t = this._parse(e);
      if (ue(t)) throw new Error("Synchronous parse encountered promise.");
      return t;
    }
    _parseAsync(e) {
      let t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      let s = this.safeParse(e, t);
      if (s.success) return s.data;
      throw s.error;
    }
    safeParse(e, t) {
      var s;
      let n = {
          common: {
            issues: [],
            async: (s = t?.async) !== null && s !== void 0 ? s : !1,
            contextualErrorMap: t?.errorMap,
          },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: R(e),
        },
        a = this._parseSync({ data: e, path: n.path, parent: n });
      return Oe(n, a);
    }
    "~validate"(e) {
      var t, s;
      let n = {
        common: { issues: [], async: !!this["~standard"].async },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: R(e),
      };
      if (!this["~standard"].async) {
        try {
          let a = this._parseSync({ data: e, path: [], parent: n });
          return P(a) ? { value: a.value } : { issues: n.common.issues };
        } catch (a) {
          !((s = (t = a?.message) === null || t === void 0
                ? void 0
                : t.toLowerCase()) === null || s === void 0) &&
          s.includes("encountered") && (this["~standard"].async = !0),
            n.common = { issues: [], async: !0 };
        }
      }
      return this._parseAsync({ data: e, path: [], parent: n }).then((a) =>
        P(a) ? { value: a.value } : { issues: n.common.issues }
      );
    }
    async parseAsync(e, t) {
      let s = await this.safeParseAsync(e, t);
      if (s.success) return s.data;
      throw s.error;
    }
    async safeParseAsync(e, t) {
      let s = {
          common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: R(e),
        },
        n = this._parse({ data: e, path: s.path, parent: s }),
        a = await (ue(n) ? n : Promise.resolve(n));
      return Oe(s, a);
    }
    refine(e, t) {
      let s = (n) =>
        typeof t == "string" || typeof t > "u"
          ? { message: t }
          : typeof t == "function"
          ? t(n)
          : t;
      return this._refinement((n, a) => {
        let i = e(n), o = () => a.addIssue({ code: d.custom, ...s(n) });
        return typeof Promise < "u" && i instanceof Promise
          ? i.then((l) => l ? !0 : (o(), !1))
          : i
          ? !0
          : (o(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement((s, n) =>
        e(s) ? !0 : (n.addIssue(typeof t == "function" ? t(s, n) : t), !1)
      );
    }
    _refinement(e) {
      return new C({
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "refinement", refinement: e },
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    constructor(e) {
      this.spa = this.safeParseAsync,
        this._def = e,
        this.parse = this.parse.bind(this),
        this.safeParse = this.safeParse.bind(this),
        this.parseAsync = this.parseAsync.bind(this),
        this.safeParseAsync = this.safeParseAsync.bind(this),
        this.spa = this.spa.bind(this),
        this.refine = this.refine.bind(this),
        this.refinement = this.refinement.bind(this),
        this.superRefine = this.superRefine.bind(this),
        this.optional = this.optional.bind(this),
        this.nullable = this.nullable.bind(this),
        this.nullish = this.nullish.bind(this),
        this.array = this.array.bind(this),
        this.promise = this.promise.bind(this),
        this.or = this.or.bind(this),
        this.and = this.and.bind(this),
        this.transform = this.transform.bind(this),
        this.brand = this.brand.bind(this),
        this.default = this.default.bind(this),
        this.catch = this.catch.bind(this),
        this.describe = this.describe.bind(this),
        this.pipe = this.pipe.bind(this),
        this.readonly = this.readonly.bind(this),
        this.isNullable = this.isNullable.bind(this),
        this.isOptional = this.isOptional.bind(this),
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (t) => this["~validate"](t),
        };
    }
    optional() {
      return O.create(this, this._def);
    }
    nullable() {
      return Z.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return I.create(this);
    }
    promise() {
      return V.create(this, this._def);
    }
    or(e) {
      return W.create([this, e], this._def);
    }
    and(e) {
      return q.create(this, e, this._def);
    }
    transform(e) {
      return new C({
        ..._(this._def),
        schema: this,
        typeName: m.ZodEffects,
        effect: { type: "transform", transform: e },
      });
    }
    default(e) {
      let t = typeof e == "function" ? e : () => e;
      return new X({
        ..._(this._def),
        innerType: this,
        defaultValue: t,
        typeName: m.ZodDefault,
      });
    }
    brand() {
      return new le({ typeName: m.ZodBranded, type: this, ..._(this._def) });
    }
    catch(e) {
      let t = typeof e == "function" ? e : () => e;
      return new Q({
        ..._(this._def),
        innerType: this,
        catchValue: t,
        typeName: m.ZodCatch,
      });
    }
    describe(e) {
      let t = this.constructor;
      return new t({ ...this._def, description: e });
    }
    pipe(e) {
      return fe.create(this, e);
    }
    readonly() {
      return K.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  },
  Ue = /^c[^\s-]{8,}$/i,
  Fe = /^[0-9a-z]+$/,
  Be = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  We =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  qe = /^[a-z0-9_-]{21}$/i,
  Je = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  Ye =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  He =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Ge = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  ke,
  Xe =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Qe =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Ke =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  et =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  tt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  rt = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  je =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  st = new RegExp(`^${je}$`);
function Re(r) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return r.precision
    ? e = `${e}\\.\\d{${r.precision}}`
    : r.precision == null && (e = `${e}(\\.\\d+)?`),
    e;
}
function nt(r) {
  return new RegExp(`^${Re(r)}$`);
}
function Ne(r) {
  let e = `${je}T${Re(r)}`, t = [];
  return t.push(r.local ? "Z?" : "Z"),
    r.offset && t.push("([+-]\\d{2}:?\\d{2})"),
    e = `${e}(${t.join("|")})`,
    new RegExp(`^${e}$`);
}
function at(r, e) {
  return !!((e === "v4" || !e) && Xe.test(r) ||
    (e === "v6" || !e) && Ke.test(r));
}
function it(r, e) {
  if (!Je.test(r)) return !1;
  try {
    let [t] = r.split("."),
      s = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(
        t.length + (4 - t.length % 4) % 4,
        "=",
      ),
      n = JSON.parse(atob(s));
    return !(typeof n != "object" || n === null || !n.typ || !n.alg ||
      e && n.alg !== e);
  } catch {
    return !1;
  }
}
function ot(r, e) {
  return !!((e === "v4" || !e) && Qe.test(r) ||
    (e === "v6" || !e) && et.test(r));
}
var $ = class r extends y {
  _parse(e) {
    if (
      this._def.coerce && (e.data = String(e.data)),
        this._getType(e) !== f.string
    ) {
      let a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: f.string,
        received: a.parsedType,
      }),
        v;
    }
    let s = new x(), n;
    for (let a of this._def.checks) {
      if (a.kind === "min") {
        e.data.length < a.value &&
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              code: d.too_small,
              minimum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "max") {
        e.data.length > a.value &&
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              code: d.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "length") {
        let i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (n = this._getOrReturnCtx(e, n),
          i
            ? u(n, {
              code: d.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !0,
              message: a.message,
            })
            : o &&
              u(n, {
                code: d.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          s.dirty());
      } else if (a.kind === "email") {
        He.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "email",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "emoji") {
        ke || (ke = new RegExp(Ge, "u")),
          ke.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "emoji",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "uuid") {
        We.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "uuid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "nanoid") {
        qe.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "nanoid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "cuid") {
        Ue.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "cuid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "cuid2") {
        Fe.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "cuid2",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "ulid") {
        Be.test(e.data) ||
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "ulid",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty());
      } else if (a.kind === "url") {
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n),
            u(n, {
              validation: "url",
              code: d.invalid_string,
              message: a.message,
            }),
            s.dirty();
        }
      } else {a.kind === "regex"
          ? (a.regex.lastIndex = 0,
            a.regex.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "regex",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty()))
          : a.kind === "trim"
          ? e.data = e.data.trim()
          : a.kind === "includes"
          ? e.data.includes(a.value, a.position) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: { includes: a.value, position: a.position },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "toLowerCase"
          ? e.data = e.data.toLowerCase()
          : a.kind === "toUpperCase"
          ? e.data = e.data.toUpperCase()
          : a.kind === "startsWith"
          ? e.data.startsWith(a.value) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: { startsWith: a.value },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "endsWith"
          ? e.data.endsWith(a.value) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: { endsWith: a.value },
                message: a.message,
              }),
              s.dirty())
          : a.kind === "datetime"
          ? Ne(a).test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: "datetime",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "date"
          ? st.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: "date",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "time"
          ? nt(a).test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                code: d.invalid_string,
                validation: "time",
                message: a.message,
              }),
              s.dirty())
          : a.kind === "duration"
          ? Ye.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "duration",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "ip"
          ? at(e.data, a.version) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "ip",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "jwt"
          ? it(e.data, a.alg) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "jwt",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "cidr"
          ? ot(e.data, a.version) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "cidr",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "base64"
          ? tt.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "base64",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : a.kind === "base64url"
          ? rt.test(e.data) ||
            (n = this._getOrReturnCtx(e, n),
              u(n, {
                validation: "base64url",
                code: d.invalid_string,
                message: a.message,
              }),
              s.dirty())
          : g.assertNever(a);}
    }
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: d.invalid_string,
      ...h.errToObj(s),
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...h.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...h.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...h.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...h.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...h.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...h.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...h.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...h.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...h.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: "base64url", ...h.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...h.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...h.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...h.errToObj(e) });
  }
  datetime(e) {
    var t, s;
    return typeof e == "string"
      ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        local: !1,
        message: e,
      })
      : this._addCheck({
        kind: "datetime",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
        local: (s = e?.local) !== null && s !== void 0 ? s : !1,
        ...h.errToObj(e?.message),
      });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string"
      ? this._addCheck({ kind: "time", precision: null, message: e })
      : this._addCheck({
        kind: "time",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        ...h.errToObj(e?.message),
      });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...h.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...h.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...h.errToObj(t?.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: "startsWith", value: e, ...h.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: "endsWith", value: e, ...h.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...h.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...h.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: "length", value: e, ...h.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, h.errToObj(e));
  }
  trim() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxLength() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
};
$.create = (r) => {
  var e;
  return new $({
    checks: [],
    typeName: m.ZodString,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ..._(r),
  });
};
function dt(r, e) {
  let t = (r.toString().split(".")[1] || "").length,
    s = (e.toString().split(".")[1] || "").length,
    n = t > s ? t : s,
    a = parseInt(r.toFixed(n).replace(".", "")),
    i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
var z = class r extends y {
  constructor() {
    super(...arguments),
      this.min = this.gte,
      this.max = this.lte,
      this.step = this.multipleOf;
  }
  _parse(e) {
    if (
      this._def.coerce && (e.data = Number(e.data)),
        this._getType(e) !== f.number
    ) {
      let a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: f.number,
        received: a.parsedType,
      }),
        v;
    }
    let s, n = new x();
    for (let a of this._def.checks) {
      a.kind === "int"
        ? g.isInteger(e.data) ||
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.invalid_type,
              expected: "integer",
              received: "float",
              message: a.message,
            }),
            n.dirty())
        : a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.too_small,
              minimum: a.value,
              type: "number",
              inclusive: a.inclusive,
              exact: !1,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.too_big,
              maximum: a.value,
              type: "number",
              inclusive: a.inclusive,
              exact: !1,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "multipleOf"
        ? dt(e.data, a.value) !== 0 &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.not_multiple_of,
              multipleOf: a.value,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "finite"
        ? Number.isFinite(e.data) ||
          (s = this._getOrReturnCtx(e, s),
            u(s, { code: d.not_finite, message: a.message }),
            n.dirty())
        : g.assertNever(a);
    }
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, h.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, h.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, h.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, h.toString(t));
  }
  setLimit(e, t, s, n) {
    return new r({
      ...this._def,
      checks: [...this._def.checks, {
        kind: e,
        value: t,
        inclusive: s,
        message: h.toString(n),
      }],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: "int", message: h.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: h.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: h.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: h.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: h.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: h.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: h.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: h.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) =>
      e.kind === "int" || e.kind === "multipleOf" && g.isInteger(e.value)
    );
  }
  get isFinite() {
    let e = null, t = null;
    for (let s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf") {
        return !0;
      }
      s.kind === "min"
        ? (t === null || s.value > t) && (t = s.value)
        : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
};
z.create = (r) =>
  new z({
    checks: [],
    typeName: m.ZodNumber,
    coerce: r?.coerce || !1,
    ..._(r),
  });
var D = class r extends y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce) {
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    }
    if (this._getType(e) !== f.bigint) return this._getInvalidInput(e);
    let s, n = new x();
    for (let a of this._def.checks) {
      a.kind === "min"
        ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.too_small,
              type: "bigint",
              minimum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "max"
        ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.too_big,
              type: "bigint",
              maximum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            n.dirty())
        : a.kind === "multipleOf"
        ? e.data % a.value !== BigInt(0) &&
          (s = this._getOrReturnCtx(e, s),
            u(s, {
              code: d.not_multiple_of,
              multipleOf: a.value,
              message: a.message,
            }),
            n.dirty())
        : g.assertNever(a);
    }
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    let t = this._getOrReturnCtx(e);
    return u(t, {
      code: d.invalid_type,
      expected: f.bigint,
      received: t.parsedType,
    }),
      v;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, h.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, h.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, h.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, h.toString(t));
  }
  setLimit(e, t, s, n) {
    return new r({
      ...this._def,
      checks: [...this._def.checks, {
        kind: e,
        value: t,
        inclusive: s,
        message: h.toString(n),
      }],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e;
  }
  get maxValue() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e;
  }
};
D.create = (r) => {
  var e;
  return new D({
    checks: [],
    typeName: m.ZodBigInt,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ..._(r),
  });
};
var L = class extends y {
  _parse(e) {
    if (
      this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean
    ) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.boolean,
        received: s.parsedType,
      }),
        v;
    }
    return b(e.data);
  }
};
L.create = (r) =>
  new L({ typeName: m.ZodBoolean, coerce: r?.coerce || !1, ..._(r) });
var U = class r extends y {
  _parse(e) {
    if (
      this._def.coerce && (e.data = new Date(e.data)),
        this._getType(e) !== f.date
    ) {
      let a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: f.date,
        received: a.parsedType,
      }),
        v;
    }
    if (isNaN(e.data.getTime())) {
      let a = this._getOrReturnCtx(e);
      return u(a, { code: d.invalid_date }), v;
    }
    let s = new x(), n;
    for (let a of this._def.checks) {
      a.kind === "min"
        ? e.data.getTime() < a.value &&
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              code: d.too_small,
              message: a.message,
              inclusive: !0,
              exact: !1,
              minimum: a.value,
              type: "date",
            }),
            s.dirty())
        : a.kind === "max"
        ? e.data.getTime() > a.value &&
          (n = this._getOrReturnCtx(e, n),
            u(n, {
              code: d.too_big,
              message: a.message,
              inclusive: !0,
              exact: !1,
              maximum: a.value,
              type: "date",
            }),
            s.dirty())
        : g.assertNever(a);
    }
    return { status: s.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: h.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: h.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    }
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (let t of this._def.checks) {
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return e != null ? new Date(e) : null;
  }
};
U.create = (r) =>
  new U({ checks: [], coerce: r?.coerce || !1, typeName: m.ZodDate, ..._(r) });
var se = class extends y {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.symbol,
        received: s.parsedType,
      }),
        v;
    }
    return b(e.data);
  }
};
se.create = (r) => new se({ typeName: m.ZodSymbol, ..._(r) });
var F = class extends y {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.undefined,
        received: s.parsedType,
      }),
        v;
    }
    return b(e.data);
  }
};
F.create = (r) => new F({ typeName: m.ZodUndefined, ..._(r) });
var B = class extends y {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.null,
        received: s.parsedType,
      }),
        v;
    }
    return b(e.data);
  }
};
B.create = (r) => new B({ typeName: m.ZodNull, ..._(r) });
var M = class extends y {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return b(e.data);
  }
};
M.create = (r) => new M({ typeName: m.ZodAny, ..._(r) });
var N = class extends y {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return b(e.data);
  }
};
N.create = (r) => new N({ typeName: m.ZodUnknown, ..._(r) });
var A = class extends y {
  _parse(e) {
    let t = this._getOrReturnCtx(e);
    return u(t, {
      code: d.invalid_type,
      expected: f.never,
      received: t.parsedType,
    }),
      v;
  }
};
A.create = (r) => new A({ typeName: m.ZodNever, ..._(r) });
var ne = class extends y {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.void,
        received: s.parsedType,
      }),
        v;
    }
    return b(e.data);
  }
};
ne.create = (r) => new ne({ typeName: m.ZodVoid, ..._(r) });
var I = class r extends y {
  _parse(e) {
    let { ctx: t, status: s } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== f.array) {
      return u(t, {
        code: d.invalid_type,
        expected: f.array,
        received: t.parsedType,
      }),
        v;
    }
    if (n.exactLength !== null) {
      let i = t.data.length > n.exactLength.value,
        o = t.data.length < n.exactLength.value;
      (i || o) && (u(t, {
        code: i ? d.too_big : d.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message,
      }),
        s.dirty());
    }
    if (
      n.minLength !== null && t.data.length < n.minLength.value &&
      (u(t, {
        code: d.too_small,
        minimum: n.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.minLength.message,
      }),
        s.dirty()),
        n.maxLength !== null && t.data.length > n.maxLength.value &&
        (u(t, {
          code: d.too_big,
          maximum: n.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: n.maxLength.message,
        }),
          s.dirty()),
        t.common.async
    ) {
      return Promise.all(
        [...t.data].map((i, o) => n.type._parseAsync(new S(t, i, t.path, o))),
      ).then((i) => x.mergeArray(s, i));
    }
    let a = [...t.data].map((i, o) =>
      n.type._parseSync(new S(t, i, t.path, o))
    );
    return x.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new r({
      ...this._def,
      minLength: { value: e, message: h.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxLength: { value: e, message: h.toString(t) },
    });
  }
  length(e, t) {
    return new r({
      ...this._def,
      exactLength: { value: e, message: h.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
I.create = (r, e) =>
  new I({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: m.ZodArray,
    ..._(e),
  });
function ee(r) {
  if (r instanceof w) {
    let e = {};
    for (let t in r.shape) {
      let s = r.shape[t];
      e[t] = O.create(ee(s));
    }
    return new w({ ...r._def, shape: () => e });
  } else {return r instanceof I
      ? new I({ ...r._def, type: ee(r.element) })
      : r instanceof O
      ? O.create(ee(r.unwrap()))
      : r instanceof Z
      ? Z.create(ee(r.unwrap()))
      : r instanceof E
      ? E.create(r.items.map((e) => ee(e)))
      : r;}
}
var w = class r extends y {
  constructor() {
    super(...arguments),
      this._cached = null,
      this.nonstrict = this.passthrough,
      this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    let e = this._def.shape(), t = g.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      let c = this._getOrReturnCtx(e);
      return u(c, {
        code: d.invalid_type,
        expected: f.object,
        received: c.parsedType,
      }),
        v;
    }
    let { status: s, ctx: n } = this._processInputParams(e),
      { shape: a, keys: i } = this._getCached(),
      o = [];
    if (
      !(this._def.catchall instanceof A && this._def.unknownKeys === "strip")
    ) { for (let c in n.data) i.includes(c) || o.push(c); }
    let l = [];
    for (let c of i) {
      let p = a[c], k = n.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: p._parse(new S(n, k, n.path, c)),
        alwaysSet: c in n.data,
      });
    }
    if (this._def.catchall instanceof A) {
      let c = this._def.unknownKeys;
      if (c === "passthrough") {
        for (let p of o) {
          l.push({
            key: { status: "valid", value: p },
            value: { status: "valid", value: n.data[p] },
          });
        }
      } else if (c === "strict") {
        o.length > 0 &&
          (u(n, { code: d.unrecognized_keys, keys: o }), s.dirty());
      } else if (c !== "strip") {
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      }
    } else {
      let c = this._def.catchall;
      for (let p of o) {
        let k = n.data[p];
        l.push({
          key: { status: "valid", value: p },
          value: c._parse(new S(n, k, n.path, p)),
          alwaysSet: p in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve().then(async () => {
        let c = [];
        for (let p of l) {
          let k = await p.key, he = await p.value;
          c.push({ key: k, value: he, alwaysSet: p.alwaysSet });
        }
        return c;
      }).then((c) => x.mergeObjectSync(s, c))
      : x.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return h.errToObj,
      new r({
        ...this._def,
        unknownKeys: "strict",
        ...e !== void 0
          ? {
            errorMap: (t, s) => {
              var n, a, i, o;
              let l =
                (i = (a = (n = this._def).errorMap) === null || a === void 0
                      ? void 0
                      : a.call(n, t, s).message) !== null && i !== void 0
                  ? i
                  : s.defaultError;
              return t.code === "unrecognized_keys"
                ? {
                  message: (o = h.errToObj(e).message) !== null && o !== void 0
                    ? o
                    : l,
                }
                : { message: l };
            },
          }
          : {},
      });
  }
  strip() {
    return new r({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new r({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(e) {
    return new r({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new r({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: m.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new r({ ...this._def, catchall: e });
  }
  pick(e) {
    let t = {};
    return g.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }),
      new r({ ...this._def, shape: () => t });
  }
  omit(e) {
    let t = {};
    return g.objectKeys(this.shape).forEach((s) => {
      e[s] || (t[s] = this.shape[s]);
    }),
      new r({ ...this._def, shape: () => t });
  }
  deepPartial() {
    return ee(this);
  }
  partial(e) {
    let t = {};
    return g.objectKeys(this.shape).forEach((s) => {
      let n = this.shape[s];
      e && !e[s] ? t[s] = n : t[s] = n.optional();
    }),
      new r({ ...this._def, shape: () => t });
  }
  required(e) {
    let t = {};
    return g.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s]) t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof O;) a = a._def.innerType;
        t[s] = a;
      }
    }),
      new r({ ...this._def, shape: () => t });
  }
  keyof() {
    return Ie(g.objectKeys(this.shape));
  }
};
w.create = (r, e) =>
  new w({
    shape: () => r,
    unknownKeys: "strip",
    catchall: A.create(),
    typeName: m.ZodObject,
    ..._(e),
  });
w.strictCreate = (r, e) =>
  new w({
    shape: () => r,
    unknownKeys: "strict",
    catchall: A.create(),
    typeName: m.ZodObject,
    ..._(e),
  });
w.lazycreate = (r, e) =>
  new w({
    shape: r,
    unknownKeys: "strip",
    catchall: A.create(),
    typeName: m.ZodObject,
    ..._(e),
  });
var W = class extends y {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (let o of a) if (o.result.status === "valid") return o.result;
      for (let o of a) {
        if (o.result.status === "dirty") {
          return t.common.issues.push(...o.ctx.common.issues), o.result;
        }
      }
      let i = a.map((o) => new T(o.ctx.common.issues));
      return u(t, { code: d.invalid_union, unionErrors: i }), v;
    }
    if (t.common.async) {
      return Promise.all(s.map(async (a) => {
        let i = { ...t, common: { ...t.common, issues: [] }, parent: null };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i,
          }),
          ctx: i,
        };
      })).then(n);
    }
    {
      let a, i = [];
      for (let l of s) {
        let c = { ...t, common: { ...t.common, issues: [] }, parent: null },
          p = l._parseSync({ data: t.data, path: t.path, parent: c });
        if (p.status === "valid") return p;
        p.status === "dirty" && !a && (a = { result: p, ctx: c }),
          c.common.issues.length && i.push(c.common.issues);
      }
      if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
      let o = i.map((l) => new T(l));
      return u(t, { code: d.invalid_union, unionErrors: o }), v;
    }
  }
  get options() {
    return this._def.options;
  }
};
W.create = (r, e) => new W({ options: r, typeName: m.ZodUnion, ..._(e) });
var j = (r) =>
    r instanceof J
      ? j(r.schema)
      : r instanceof C
      ? j(r.innerType())
      : r instanceof Y
      ? [r.value]
      : r instanceof H
      ? r.options
      : r instanceof G
      ? g.objectValues(r.enum)
      : r instanceof X
      ? j(r._def.innerType)
      : r instanceof F
      ? [void 0]
      : r instanceof B
      ? [null]
      : r instanceof O
      ? [void 0, ...j(r.unwrap())]
      : r instanceof Z
      ? [null, ...j(r.unwrap())]
      : r instanceof le || r instanceof K
      ? j(r.unwrap())
      : r instanceof Q
      ? j(r._def.innerType)
      : [],
  _e = class r extends y {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== f.object) {
        return u(t, {
          code: d.invalid_type,
          expected: f.object,
          received: t.parsedType,
        }),
          v;
      }
      let s = this.discriminator, n = t.data[s], a = this.optionsMap.get(n);
      return a
        ? t.common.async
          ? a._parseAsync({ data: t.data, path: t.path, parent: t })
          : a._parseSync({ data: t.data, path: t.path, parent: t })
        : (u(t, {
          code: d.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [s],
        }),
          v);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, t, s) {
      let n = new Map();
      for (let a of t) {
        let i = j(a.shape[e]);
        if (!i.length) {
          throw new Error(
            `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
          );
        }
        for (let o of i) {
          if (n.has(o)) {
            throw new Error(
              `Discriminator property ${String(e)} has duplicate value ${
                String(o)
              }`,
            );
          }
          n.set(o, a);
        }
      }
      return new r({
        typeName: m.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: n,
        ..._(s),
      });
    }
  };
function Ce(r, e) {
  let t = R(r), s = R(e);
  if (r === e) return { valid: !0, data: r };
  if (t === f.object && s === f.object) {
    let n = g.objectKeys(e),
      a = g.objectKeys(r).filter((o) => n.indexOf(o) !== -1),
      i = { ...r, ...e };
    for (let o of a) {
      let l = Ce(r[o], e[o]);
      if (!l.valid) return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (t === f.array && s === f.array) {
    if (r.length !== e.length) return { valid: !1 };
    let n = [];
    for (let a = 0; a < r.length; a++) {
      let i = r[a], o = e[a], l = Ce(i, o);
      if (!l.valid) return { valid: !1 };
      n.push(l.data);
    }
    return { valid: !0, data: n };
  } else {return t === f.date && s === f.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };}
}
var q = class extends y {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e),
      n = (a, i) => {
        if (we(a) || we(i)) return v;
        let o = Ce(a.value, i.value);
        return o.valid
          ? ((Te(a) || Te(i)) && t.dirty(), { status: t.value, value: o.data })
          : (u(s, { code: d.invalid_intersection_types }), v);
      };
    return s.common.async
      ? Promise.all([
        this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
        this._def.right._parseAsync({ data: s.data, path: s.path, parent: s }),
      ]).then(([a, i]) => n(a, i))
      : n(
        this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
        this._def.right._parseSync({ data: s.data, path: s.path, parent: s }),
      );
  }
};
q.create = (r, e, t) =>
  new q({ left: r, right: e, typeName: m.ZodIntersection, ..._(t) });
var E = class r extends y {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.array) {
      return u(s, {
        code: d.invalid_type,
        expected: f.array,
        received: s.parsedType,
      }),
        v;
    }
    if (s.data.length < this._def.items.length) {
      return u(s, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        v;
    }
    !this._def.rest && s.data.length > this._def.items.length &&
      (u(s, {
        code: d.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
        t.dirty());
    let a = [...s.data].map((i, o) => {
      let l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new S(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async
      ? Promise.all(a).then((i) => x.mergeArray(t, i))
      : x.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new r({ ...this._def, rest: e });
  }
};
E.create = (r, e) => {
  if (!Array.isArray(r)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new E({ items: r, typeName: m.ZodTuple, rest: null, ..._(e) });
};
var ye = class r extends y {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.parsedType !== f.object) {
        return u(s, {
          code: d.invalid_type,
          expected: f.object,
          received: s.parsedType,
        }),
          v;
      }
      let n = [], a = this._def.keyType, i = this._def.valueType;
      for (let o in s.data) {
        n.push({
          key: a._parse(new S(s, o, s.path, o)),
          value: i._parse(new S(s, s.data[o], s.path, o)),
          alwaysSet: o in s.data,
        });
      }
      return s.common.async
        ? x.mergeObjectAsync(t, n)
        : x.mergeObjectSync(t, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, s) {
      return t instanceof y
        ? new r({ keyType: e, valueType: t, typeName: m.ZodRecord, ..._(s) })
        : new r({
          keyType: $.create(),
          valueType: e,
          typeName: m.ZodRecord,
          ..._(t),
        });
    }
  },
  ae = class extends y {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.parsedType !== f.map) {
        return u(s, {
          code: d.invalid_type,
          expected: f.map,
          received: s.parsedType,
        }),
          v;
      }
      let n = this._def.keyType,
        a = this._def.valueType,
        i = [...s.data.entries()].map(([o, l], c) => ({
          key: n._parse(new S(s, o, s.path, [c, "key"])),
          value: a._parse(new S(s, l, s.path, [c, "value"])),
        }));
      if (s.common.async) {
        let o = new Map();
        return Promise.resolve().then(async () => {
          for (let l of i) {
            let c = await l.key, p = await l.value;
            if (c.status === "aborted" || p.status === "aborted") return v;
            (c.status === "dirty" || p.status === "dirty") && t.dirty(),
              o.set(c.value, p.value);
          }
          return { status: t.value, value: o };
        });
      } else {
        let o = new Map();
        for (let l of i) {
          let c = l.key, p = l.value;
          if (c.status === "aborted" || p.status === "aborted") return v;
          (c.status === "dirty" || p.status === "dirty") && t.dirty(),
            o.set(c.value, p.value);
        }
        return { status: t.value, value: o };
      }
    }
  };
ae.create = (r, e, t) =>
  new ae({ valueType: e, keyType: r, typeName: m.ZodMap, ..._(t) });
var ie = class r extends y {
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== f.set) {
      return u(s, {
        code: d.invalid_type,
        expected: f.set,
        received: s.parsedType,
      }),
        v;
    }
    let n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value &&
    (u(s, {
      code: d.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message,
    }),
      t.dirty()),
      n.maxSize !== null && s.data.size > n.maxSize.value &&
      (u(s, {
        code: d.too_big,
        maximum: n.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.maxSize.message,
      }),
        t.dirty());
    let a = this._def.valueType;
    function i(l) {
      let c = new Set();
      for (let p of l) {
        if (p.status === "aborted") return v;
        p.status === "dirty" && t.dirty(), c.add(p.value);
      }
      return { status: t.value, value: c };
    }
    let o = [...s.data.values()].map((l, c) =>
      a._parse(new S(s, l, s.path, c))
    );
    return s.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, t) {
    return new r({
      ...this._def,
      minSize: { value: e, message: h.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxSize: { value: e, message: h.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
ie.create = (r, e) =>
  new ie({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: m.ZodSet,
    ..._(e),
  });
var ge = class r extends y {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== f.function) {
        return u(t, {
          code: d.invalid_type,
          expected: f.function,
          received: t.parsedType,
        }),
          v;
      }
      function s(o, l) {
        return me({
          data: o,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, pe(), re]
            .filter((c) => !!c),
          issueData: { code: d.invalid_arguments, argumentsError: l },
        });
      }
      function n(o, l) {
        return me({
          data: o,
          path: t.path,
          errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, pe(), re]
            .filter((c) => !!c),
          issueData: { code: d.invalid_return_type, returnTypeError: l },
        });
      }
      let a = { errorMap: t.common.contextualErrorMap }, i = t.data;
      if (this._def.returns instanceof V) {
        let o = this;
        return b(async function (...l) {
          let c = new T([]),
            p = await o._def.args.parseAsync(l, a).catch((xe) => {
              throw c.addIssue(s(l, xe)), c;
            }),
            k = await Reflect.apply(i, this, p);
          return await o._def.returns._def.type.parseAsync(k, a).catch((xe) => {
            throw c.addIssue(n(k, xe)), c;
          });
        });
      } else {
        let o = this;
        return b(function (...l) {
          let c = o._def.args.safeParse(l, a);
          if (!c.success) throw new T([s(l, c.error)]);
          let p = Reflect.apply(i, this, c.data),
            k = o._def.returns.safeParse(p, a);
          if (!k.success) throw new T([n(p, k.error)]);
          return k.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new r({ ...this._def, args: E.create(e).rest(N.create()) });
    }
    returns(e) {
      return new r({ ...this._def, returns: e });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, s) {
      return new r({
        args: e || E.create([]).rest(N.create()),
        returns: t || N.create(),
        typeName: m.ZodFunction,
        ..._(s),
      });
    }
  },
  J = class extends y {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: t } = this._processInputParams(e);
      return this._def.getter()._parse({
        data: t.data,
        path: t.path,
        parent: t,
      });
    }
  };
J.create = (r, e) => new J({ getter: r, typeName: m.ZodLazy, ..._(e) });
var Y = class extends y {
  _parse(e) {
    if (e.data !== this._def.value) {
      let t = this._getOrReturnCtx(e);
      return u(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value,
      }),
        v;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
};
Y.create = (r, e) => new Y({ value: r, typeName: m.ZodLiteral, ..._(e) });
function Ie(r, e) {
  return new H({ values: r, typeName: m.ZodEnum, ..._(e) });
}
var H = class r extends y {
  constructor() {
    super(...arguments), de.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      let t = this._getOrReturnCtx(e), s = this._def.values;
      return u(t, {
        expected: g.joinValues(s),
        received: t.parsedType,
        code: d.invalid_type,
      }),
        v;
    }
    if (
      ve(this, de, "f") || Ze(this, de, new Set(this._def.values), "f"),
        !ve(this, de, "f").has(e.data)
    ) {
      let t = this._getOrReturnCtx(e), s = this._def.values;
      return u(t, { received: t.data, code: d.invalid_enum_value, options: s }),
        v;
    }
    return b(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    let e = {};
    for (let t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return r.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return r.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...t,
    });
  }
};
de = new WeakMap();
H.create = Ie;
var G = class extends y {
  constructor() {
    super(...arguments), ce.set(this, void 0);
  }
  _parse(e) {
    let t = g.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== f.string && s.parsedType !== f.number) {
      let n = g.objectValues(t);
      return u(s, {
        expected: g.joinValues(n),
        received: s.parsedType,
        code: d.invalid_type,
      }),
        v;
    }
    if (
      ve(this, ce, "f") ||
      Ze(this, ce, new Set(g.getValidEnumValues(this._def.values)), "f"),
        !ve(this, ce, "f").has(e.data)
    ) {
      let n = g.objectValues(t);
      return u(s, { received: s.data, code: d.invalid_enum_value, options: n }),
        v;
    }
    return b(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
ce = new WeakMap();
G.create = (r, e) => new G({ values: r, typeName: m.ZodNativeEnum, ..._(e) });
var V = class extends y {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    let { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.promise && t.common.async === !1) {
      return u(t, {
        code: d.invalid_type,
        expected: f.promise,
        received: t.parsedType,
      }),
        v;
    }
    let s = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
    return b(
      s.then((n) =>
        this._def.type.parseAsync(n, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        })
      ),
    );
  }
};
V.create = (r, e) => new V({ type: r, typeName: m.ZodPromise, ..._(e) });
var C = class extends y {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    let { status: t, ctx: s } = this._processInputParams(e),
      n = this._def.effect || null,
      a = {
        addIssue: (i) => {
          u(s, i), i.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return s.path;
        },
      };
    if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
      let i = n.transform(s.data, a);
      if (s.common.async) {
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted") return v;
          let l = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s,
          });
          return l.status === "aborted"
            ? v
            : l.status === "dirty" || t.value === "dirty"
            ? te(l.value)
            : l;
        });
      }
      {
        if (t.value === "aborted") return v;
        let o = this._def.schema._parseSync({
          data: i,
          path: s.path,
          parent: s,
        });
        return o.status === "aborted"
          ? v
          : o.status === "dirty" || t.value === "dirty"
          ? te(o.value)
          : o;
      }
    }
    if (n.type === "refinement") {
      let i = (o) => {
        let l = n.refinement(o, a);
        if (s.common.async) return Promise.resolve(l);
        if (l instanceof Promise) {
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return o;
      };
      if (s.common.async === !1) {
        let o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return o.status === "aborted"
          ? v
          : (o.status === "dirty" && t.dirty(),
            i(o.value),
            { status: t.value, value: o.value });
      } else {return this._def.schema._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        }).then((o) =>
          o.status === "aborted"
            ? v
            : (o.status === "dirty" && t.dirty(),
              i(o.value).then(() => ({ status: t.value, value: o.value })))
        );}
    }
    if (n.type === "transform") {
      if (s.common.async === !1) {
        let i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        if (!P(i)) return i;
        let o = n.transform(i.value, a);
        if (o instanceof Promise) {
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        }
        return { status: t.value, value: o };
      } else {return this._def.schema._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        }).then((i) =>
          P(i)
            ? Promise.resolve(n.transform(i.value, a)).then((o) => ({
              status: t.value,
              value: o,
            }))
            : i
        );}
    }
    g.assertNever(n);
  }
};
C.create = (r, e, t) =>
  new C({ schema: r, typeName: m.ZodEffects, effect: e, ..._(t) });
C.createWithPreprocess = (r, e, t) =>
  new C({
    schema: e,
    effect: { type: "preprocess", transform: r },
    typeName: m.ZodEffects,
    ..._(t),
  });
var O = class extends y {
  _parse(e) {
    return this._getType(e) === f.undefined
      ? b(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
O.create = (r, e) => new O({ innerType: r, typeName: m.ZodOptional, ..._(e) });
var Z = class extends y {
  _parse(e) {
    return this._getType(e) === f.null
      ? b(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
Z.create = (r, e) => new Z({ innerType: r, typeName: m.ZodNullable, ..._(e) });
var X = class extends y {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e), s = t.data;
    return t.parsedType === f.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: t.path, parent: t });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
X.create = (r, e) =>
  new X({
    innerType: r,
    typeName: m.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ..._(e),
  });
var Q = class extends y {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      s = { ...t, common: { ...t.common, issues: [] } },
      n = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: { ...s },
      });
    return ue(n)
      ? n.then((a) => ({
        status: "valid",
        value: a.status === "valid" ? a.value : this._def.catchValue({
          get error() {
            return new T(s.common.issues);
          },
          input: s.data,
        }),
      }))
      : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new T(s.common.issues);
          },
          input: s.data,
        }),
      };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
Q.create = (r, e) =>
  new Q({
    innerType: r,
    typeName: m.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ..._(e),
  });
var oe = class extends y {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      let s = this._getOrReturnCtx(e);
      return u(s, {
        code: d.invalid_type,
        expected: f.nan,
        received: s.parsedType,
      }),
        v;
    }
    return { status: "valid", value: e.data };
  }
};
oe.create = (r) => new oe({ typeName: m.ZodNaN, ..._(r) });
var ct = Symbol("zod_brand"),
  le = class extends y {
    _parse(e) {
      let { ctx: t } = this._processInputParams(e), s = t.data;
      return this._def.type._parse({ data: s, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  },
  fe = class r extends y {
    _parse(e) {
      let { status: t, ctx: s } = this._processInputParams(e);
      if (s.common.async) {
        return (async () => {
          let a = await this._def.in._parseAsync({
            data: s.data,
            path: s.path,
            parent: s,
          });
          return a.status === "aborted"
            ? v
            : a.status === "dirty"
            ? (t.dirty(), te(a.value))
            : this._def.out._parseAsync({
              data: a.value,
              path: s.path,
              parent: s,
            });
        })();
      }
      {
        let n = this._def.in._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return n.status === "aborted"
          ? v
          : n.status === "dirty"
          ? (t.dirty(), { status: "dirty", value: n.value })
          : this._def.out._parseSync({
            data: n.value,
            path: s.path,
            parent: s,
          });
      }
    }
    static create(e, t) {
      return new r({ in: e, out: t, typeName: m.ZodPipeline });
    }
  },
  K = class extends y {
    _parse(e) {
      let t = this._def.innerType._parse(e),
        s = (n) => (P(n) && (n.value = Object.freeze(n.value)), n);
      return ue(t) ? t.then((n) => s(n)) : s(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
K.create = (r, e) => new K({ innerType: r, typeName: m.ZodReadonly, ..._(e) });
function Se(r, e) {
  let t = typeof r == "function"
    ? r(e)
    : typeof r == "string"
    ? { message: r }
    : r;
  return typeof t == "string" ? { message: t } : t;
}
function $e(r, e = {}, t) {
  return r
    ? M.create().superRefine((s, n) => {
      var a, i;
      let o = r(s);
      if (o instanceof Promise) {
        return o.then((l) => {
          var c, p;
          if (!l) {
            let k = Se(e, s),
              he =
                (p = (c = k.fatal) !== null && c !== void 0 ? c : t) !== null &&
                  p !== void 0
                  ? p
                  : !0;
            n.addIssue({ code: "custom", ...k, fatal: he });
          }
        });
      }
      if (!o) {
        let l = Se(e, s),
          c = (i = (a = l.fatal) !== null && a !== void 0 ? a : t) !== null &&
              i !== void 0
            ? i
            : !0;
        n.addIssue({ code: "custom", ...l, fatal: c });
      }
    })
    : M.create();
}
var ut = { object: w.lazycreate }, m;
(function (r) {
  r.ZodString = "ZodString",
    r.ZodNumber = "ZodNumber",
    r.ZodNaN = "ZodNaN",
    r.ZodBigInt = "ZodBigInt",
    r.ZodBoolean = "ZodBoolean",
    r.ZodDate = "ZodDate",
    r.ZodSymbol = "ZodSymbol",
    r.ZodUndefined = "ZodUndefined",
    r.ZodNull = "ZodNull",
    r.ZodAny = "ZodAny",
    r.ZodUnknown = "ZodUnknown",
    r.ZodNever = "ZodNever",
    r.ZodVoid = "ZodVoid",
    r.ZodArray = "ZodArray",
    r.ZodObject = "ZodObject",
    r.ZodUnion = "ZodUnion",
    r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    r.ZodIntersection = "ZodIntersection",
    r.ZodTuple = "ZodTuple",
    r.ZodRecord = "ZodRecord",
    r.ZodMap = "ZodMap",
    r.ZodSet = "ZodSet",
    r.ZodFunction = "ZodFunction",
    r.ZodLazy = "ZodLazy",
    r.ZodLiteral = "ZodLiteral",
    r.ZodEnum = "ZodEnum",
    r.ZodEffects = "ZodEffects",
    r.ZodNativeEnum = "ZodNativeEnum",
    r.ZodOptional = "ZodOptional",
    r.ZodNullable = "ZodNullable",
    r.ZodDefault = "ZodDefault",
    r.ZodCatch = "ZodCatch",
    r.ZodPromise = "ZodPromise",
    r.ZodBranded = "ZodBranded",
    r.ZodPipeline = "ZodPipeline",
    r.ZodReadonly = "ZodReadonly";
})(m || (m = {}));
var lt = (r, e = { message: `Input not instance of ${r.name}` }) =>
    $e((t) => t instanceof r, e),
  Me = $.create,
  Ve = z.create,
  ft = oe.create,
  ht = D.create,
  Pe = L.create,
  pt = U.create,
  mt = se.create,
  vt = F.create,
  _t = B.create,
  yt = M.create,
  gt = N.create,
  xt = A.create,
  kt = ne.create,
  bt = I.create,
  wt = w.create,
  Tt = w.strictCreate,
  Ct = W.create,
  Ot = _e.create,
  St = q.create,
  At = E.create,
  Et = ye.create,
  Zt = ae.create,
  jt = ie.create,
  Rt = ge.create,
  Nt = J.create,
  It = Y.create,
  $t = H.create,
  Mt = G.create,
  Vt = V.create,
  Ae = C.create,
  Pt = O.create,
  zt = Z.create,
  Dt = C.createWithPreprocess,
  Lt = fe.create,
  Ut = () => Me().optional(),
  Ft = () => Ve().optional(),
  Bt = () => Pe().optional(),
  Wt = {
    string: (r) => $.create({ ...r, coerce: !0 }),
    number: (r) => z.create({ ...r, coerce: !0 }),
    boolean: (r) => L.create({ ...r, coerce: !0 }),
    bigint: (r) => D.create({ ...r, coerce: !0 }),
    date: (r) => U.create({ ...r, coerce: !0 }),
  },
  qt = v,
  Jt = Object.freeze({
    __proto__: null,
    defaultErrorMap: re,
    setErrorMap: De,
    getErrorMap: pe,
    makeIssue: me,
    EMPTY_PATH: Le,
    addIssueToContext: u,
    ParseStatus: x,
    INVALID: v,
    DIRTY: te,
    OK: b,
    isAborted: we,
    isDirty: Te,
    isValid: P,
    isAsync: ue,
    get util() {
      return g;
    },
    get objectUtil() {
      return be;
    },
    ZodParsedType: f,
    getParsedType: R,
    ZodType: y,
    datetimeRegex: Ne,
    ZodString: $,
    ZodNumber: z,
    ZodBigInt: D,
    ZodBoolean: L,
    ZodDate: U,
    ZodSymbol: se,
    ZodUndefined: F,
    ZodNull: B,
    ZodAny: M,
    ZodUnknown: N,
    ZodNever: A,
    ZodVoid: ne,
    ZodArray: I,
    ZodObject: w,
    ZodUnion: W,
    ZodDiscriminatedUnion: _e,
    ZodIntersection: q,
    ZodTuple: E,
    ZodRecord: ye,
    ZodMap: ae,
    ZodSet: ie,
    ZodFunction: ge,
    ZodLazy: J,
    ZodLiteral: Y,
    ZodEnum: H,
    ZodNativeEnum: G,
    ZodPromise: V,
    ZodEffects: C,
    ZodTransformer: C,
    ZodOptional: O,
    ZodNullable: Z,
    ZodDefault: X,
    ZodCatch: Q,
    ZodNaN: oe,
    BRAND: ct,
    ZodBranded: le,
    ZodPipeline: fe,
    ZodReadonly: K,
    custom: $e,
    Schema: y,
    ZodSchema: y,
    late: ut,
    get ZodFirstPartyTypeKind() {
      return m;
    },
    coerce: Wt,
    any: yt,
    array: bt,
    bigint: ht,
    boolean: Pe,
    date: pt,
    discriminatedUnion: Ot,
    effect: Ae,
    enum: $t,
    function: Rt,
    instanceof: lt,
    intersection: St,
    lazy: Nt,
    literal: It,
    map: Zt,
    nan: ft,
    nativeEnum: Mt,
    never: xt,
    null: _t,
    nullable: zt,
    number: Ve,
    object: wt,
    oboolean: Bt,
    onumber: Ft,
    optional: Pt,
    ostring: Ut,
    pipeline: Lt,
    preprocess: Dt,
    promise: Vt,
    record: Et,
    set: jt,
    strictObject: Tt,
    string: Me,
    symbol: mt,
    transformer: Ae,
    tuple: At,
    undefined: vt,
    union: Ct,
    unknown: gt,
    void: kt,
    NEVER: qt,
    ZodIssueCode: d,
    quotelessJson: ze,
    ZodError: T,
  });
export {
  $ as ZodString,
  $e as custom,
  $t as enum,
  _e as ZodDiscriminatedUnion,
  _t as null,
  A as ZodNever,
  Ae as effect,
  Ae as transformer,
  ae as ZodMap,
  At as tuple,
  B as ZodNull,
  b as OK,
  be as objectUtil,
  Bt as oboolean,
  bt as array,
  C as ZodEffects,
  C as ZodTransformer,
  Ct as union,
  ct as BRAND,
  D as ZodBigInt,
  d as ZodIssueCode,
  De as setErrorMap,
  Dt as preprocess,
  E as ZodTuple,
  Et as record,
  F as ZodUndefined,
  f as ZodParsedType,
  fe as ZodPipeline,
  Ft as onumber,
  ft as nan,
  G as ZodNativeEnum,
  g as util,
  ge as ZodFunction,
  gt as unknown,
  H as ZodEnum,
  ht as bigint,
  I as ZodArray,
  ie as ZodSet,
  It as literal,
  J as ZodLazy,
  Jt as default,
  Jt as z,
  jt as set,
  K as ZodReadonly,
  kt as void,
  L as ZodBoolean,
  Le as EMPTY_PATH,
  le as ZodBranded,
  Lt as pipeline,
  lt as instanceof,
  M as ZodAny,
  m as ZodFirstPartyTypeKind,
  Me as string,
  me as makeIssue,
  Mt as nativeEnum,
  mt as symbol,
  N as ZodUnknown,
  Ne as datetimeRegex,
  ne as ZodVoid,
  Nt as lazy,
  O as ZodOptional,
  oe as ZodNaN,
  Ot as discriminatedUnion,
  P as isValid,
  Pe as boolean,
  pe as getErrorMap,
  Pt as optional,
  pt as date,
  Q as ZodCatch,
  q as ZodIntersection,
  qt as NEVER,
  R as getParsedType,
  re as defaultErrorMap,
  Rt as function,
  se as ZodSymbol,
  St as intersection,
  T as ZodError,
  Te as isDirty,
  te as DIRTY,
  Tt as strictObject,
  U as ZodDate,
  u as addIssueToContext,
  ue as isAsync,
  Ut as ostring,
  ut as late,
  V as ZodPromise,
  v as INVALID,
  Ve as number,
  Vt as promise,
  vt as undefined,
  W as ZodUnion,
  w as ZodObject,
  we as isAborted,
  Wt as coerce,
  wt as object,
  X as ZodDefault,
  x as ParseStatus,
  xt as never,
  Y as ZodLiteral,
  y as Schema,
  y as ZodSchema,
  y as ZodType,
  ye as ZodRecord,
  yt as any,
  Z as ZodNullable,
  z as ZodNumber,
  ze as quotelessJson,
  Zt as map,
  zt as nullable,
};
//# sourceMappingURL=zod.mjs.map
