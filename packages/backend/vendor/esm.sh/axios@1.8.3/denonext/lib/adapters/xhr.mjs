/* esm.sh - axios@1.8.3/lib/adapters/xhr */
import q from "../../unsafe/utils.mjs";
import y from "../../unsafe/core/settle.mjs";
import A from "../defaults/transitional.mjs";
import n from "../core/AxiosError.mjs";
import O from "../cancel/CanceledError.mjs";
function E(r) {
  let p = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return p && p[1] || "";
}
import U from "../platform/index.mjs";
import C from "../core/AxiosHeaders.mjs";
import { progressEventReducer as D } from "../helpers/progressEventReducer.mjs";
import N from "../helpers/resolveConfig.mjs";
var k = typeof XMLHttpRequest < "u",
  W = k && function (r) {
    return new Promise(function (L, s) {
      let t = N(r),
        T = t.data,
        R = C.from(t.headers).normalize(),
        { responseType: i, onUploadProgress: h, onDownloadProgress: w } = t,
        a,
        g,
        x,
        d,
        f;
      function b() {
        d && d(),
          f && f(),
          t.cancelToken && t.cancelToken.unsubscribe(a),
          t.signal && t.signal.removeEventListener("abort", a);
      }
      let e = new XMLHttpRequest();
      e.open(t.method.toUpperCase(), t.url, !0), e.timeout = t.timeout;
      function H() {
        if (!e) return;
        let o = C.from(
            "getAllResponseHeaders" in e && e.getAllResponseHeaders(),
          ),
          u = {
            data: !i || i === "text" || i === "json"
              ? e.responseText
              : e.response,
            status: e.status,
            statusText: e.statusText,
            headers: o,
            config: r,
            request: e,
          };
        y(function (c) {
          L(c), b();
        }, function (c) {
          s(c), b();
        }, u), e = null;
      }
      "onloadend" in e ? e.onloadend = H : e.onreadystatechange = function () {
        !e || e.readyState !== 4 ||
          e.status === 0 &&
            !(e.responseURL && e.responseURL.indexOf("file:") === 0) ||
          setTimeout(H);
      },
        e.onabort = function () {
          e && (s(new n("Request aborted", n.ECONNABORTED, r, e)), e = null);
        },
        e.onerror = function () {
          s(new n("Network Error", n.ERR_NETWORK, r, e)), e = null;
        },
        e.ontimeout = function () {
          let l = t.timeout
              ? "timeout of " + t.timeout + "ms exceeded"
              : "timeout exceeded",
            u = t.transitional || A;
          t.timeoutErrorMessage && (l = t.timeoutErrorMessage),
            s(
              new n(
                l,
                u.clarifyTimeoutError ? n.ETIMEDOUT : n.ECONNABORTED,
                r,
                e,
              ),
            ),
            e = null;
        },
        T === void 0 && R.setContentType(null),
        "setRequestHeader" in e && q.forEach(R.toJSON(), function (l, u) {
          e.setRequestHeader(u, l);
        }),
        q.isUndefined(t.withCredentials) ||
        (e.withCredentials = !!t.withCredentials),
        i && i !== "json" && (e.responseType = t.responseType),
        w && ([x, f] = D(w, !0), e.addEventListener("progress", x)),
        h && e.upload &&
        ([g, d] = D(h),
          e.upload.addEventListener("progress", g),
          e.upload.addEventListener("loadend", d)),
        (t.cancelToken || t.signal) && (a = (o) => {
          e && (s(!o || o.type ? new O(null, r, e) : o), e.abort(), e = null);
        },
          t.cancelToken && t.cancelToken.subscribe(a),
          t.signal &&
          (t.signal.aborted ? a() : t.signal.addEventListener("abort", a)));
      let m = E(t.url);
      if (m && U.protocols.indexOf(m) === -1) {
        s(new n("Unsupported protocol " + m + ":", n.ERR_BAD_REQUEST, r));
        return;
      }
      e.send(T || null);
    });
  };
export { W as default };

import "https://deno.land/x/xhr@0.3.0/mod.ts"; //# sourceMappingURL=xhr.mjs.map
