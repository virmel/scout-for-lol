/* esm.sh - combined-stream@1.0.8 */
import { Buffer as __Buffer$ } from "node:buffer";
import * as __0$ from "node:util";
import * as __1$ from "node:stream";
import * as __2$ from "/delayed-stream@~1.0.0?target=denonext";
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m,
    c = (m) => Object.assign({ __esModule: true }, m);
  switch (n) {
    case "node:util":
      return e(__0$);
    case "node:stream":
      return e(__1$);
    case "delayed-stream":
      return e(__2$);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var S = Object.create;
var h = Object.defineProperty;
var _ = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var m = Object.getPrototypeOf, l = Object.prototype.hasOwnProperty;
var o =
  ((t) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(t, { get: (e, r) => (typeof require < "u" ? require : e)[r] })
      : t)(function (t) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + t + '" is not supported');
    });
var y = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var x = (t, e, r, a) => {
  if (e && typeof e == "object" || typeof e == "function") {
    for (let s of d(e)) {
      !l.call(t, s) && s !== r && h(t, s, {
        get: () => e[s],
        enumerable: !(a = _(e, s)) || a.enumerable,
      });
    }
  }
  return t;
};
var z = (
  t,
  e,
  r,
) => (r = t != null ? S(m(t)) : {},
  x(
    e || !t || !t.__esModule
      ? h(r, "default", { value: t, enumerable: !0 })
      : r,
    t,
  ));
var c = y((N, f) => {
  var v = o("node:util"), p = o("node:stream").Stream, u = o("delayed-stream");
  f.exports = i;
  function i() {
    this.writable = !1,
      this.readable = !0,
      this.dataSize = 0,
      this.maxDataSize = 2 * 1024 * 1024,
      this.pauseStreams = !0,
      this._released = !1,
      this._streams = [],
      this._currentStream = null,
      this._insideLoop = !1,
      this._pendingNext = !1;
  }
  v.inherits(i, p);
  i.create = function (t) {
    var e = new this();
    t = t || {};
    for (var r in t) e[r] = t[r];
    return e;
  };
  i.isStreamLike = function (t) {
    return typeof t != "function" && typeof t != "string" &&
      typeof t != "boolean" && typeof t != "number" && !__Buffer$.isBuffer(t);
  };
  i.prototype.append = function (t) {
    var e = i.isStreamLike(t);
    if (e) {
      if (!(t instanceof u)) {
        var r = u.create(t, {
          maxDataSize: 1 / 0,
          pauseStream: this.pauseStreams,
        });
        t.on("data", this._checkDataSize.bind(this)), t = r;
      }
      this._handleErrors(t), this.pauseStreams && t.pause();
    }
    return this._streams.push(t), this;
  };
  i.prototype.pipe = function (t, e) {
    return p.prototype.pipe.call(this, t, e), this.resume(), t;
  };
  i.prototype._getNext = function () {
    if (this._currentStream = null, this._insideLoop) {
      this._pendingNext = !0;
      return;
    }
    this._insideLoop = !0;
    try {
      do this._pendingNext = !1, this._realGetNext(); while (this._pendingNext);
    } finally {
      this._insideLoop = !1;
    }
  };
  i.prototype._realGetNext = function () {
    var t = this._streams.shift();
    if (typeof t > "u") {
      this.end();
      return;
    }
    if (typeof t != "function") {
      this._pipeNext(t);
      return;
    }
    var e = t;
    e(function (r) {
      var a = i.isStreamLike(r);
      a &&
      (r.on("data", this._checkDataSize.bind(this)), this._handleErrors(r)),
        this._pipeNext(r);
    }.bind(this));
  };
  i.prototype._pipeNext = function (t) {
    this._currentStream = t;
    var e = i.isStreamLike(t);
    if (e) {
      t.on("end", this._getNext.bind(this)), t.pipe(this, { end: !1 });
      return;
    }
    var r = t;
    this.write(r), this._getNext();
  };
  i.prototype._handleErrors = function (t) {
    var e = this;
    t.on("error", function (r) {
      e._emitError(r);
    });
  };
  i.prototype.write = function (t) {
    this.emit("data", t);
  };
  i.prototype.pause = function () {
    this.pauseStreams &&
      (this.pauseStreams && this._currentStream &&
        typeof this._currentStream.pause == "function" &&
        this._currentStream.pause(),
        this.emit("pause"));
  };
  i.prototype.resume = function () {
    this._released ||
    (this._released = !0, this.writable = !0, this._getNext()),
      this.pauseStreams && this._currentStream &&
      typeof this._currentStream.resume == "function" &&
      this._currentStream.resume(),
      this.emit("resume");
  };
  i.prototype.end = function () {
    this._reset(), this.emit("end");
  };
  i.prototype.destroy = function () {
    this._reset(), this.emit("close");
  };
  i.prototype._reset = function () {
    this.writable = !1, this._streams = [], this._currentStream = null;
  };
  i.prototype._checkDataSize = function () {
    if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
      var t = "DelayedStream#maxDataSize of " + this.maxDataSize +
        " bytes exceeded.";
      this._emitError(new Error(t));
    }
  };
  i.prototype._updateDataSize = function () {
    this.dataSize = 0;
    var t = this;
    this._streams.forEach(function (e) {
      e.dataSize && (t.dataSize += e.dataSize);
    }),
      this._currentStream && this._currentStream.dataSize &&
      (this.dataSize += this._currentStream.dataSize);
  };
  i.prototype._emitError = function (t) {
    this._reset(), this.emit("error", t);
  };
});
var n = z(c()), { create: D, isStreamLike: L } = n, g = n.default ?? n;
export { D as create, g as default, L as isStreamLike };
//# sourceMappingURL=combined-stream.mjs.map
