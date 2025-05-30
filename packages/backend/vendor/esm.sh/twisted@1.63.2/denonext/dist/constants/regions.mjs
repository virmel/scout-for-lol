/* esm.sh - twisted@1.63.2/dist/constants/regions */
var R = Object.create;
var o = Object.defineProperty;
var u = Object.getOwnPropertyDescriptor;
var N = Object.getOwnPropertyNames;
var O = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty;
var _ = (A, e) => () => (e || A((e = { exports: {} }).exports, e), e.exports);
var s = (A, e, c, a) => {
  if (e && typeof e == "object" || typeof e == "function") {
    for (let S of N(e)) {
      !U.call(A, S) && S !== c && o(A, S, {
        get: () => e[S],
        enumerable: !(a = u(e, S)) || a.enumerable,
      });
    }
  }
  return A;
};
var n = (
  A,
  e,
  c,
) => (c = A != null ? R(O(A)) : {},
  s(
    e || !A || !A.__esModule
      ? o(c, "default", { value: A, enumerable: !0 })
      : c,
    A,
  ));
var t = _((r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: !0 });
  r.regionToRegionGroup = r.RegionGroups = r.Regions = void 0;
  var E;
  (function (A) {
    A.BRAZIL = "BR1",
      A.EU_EAST = "EUN1",
      A.EU_WEST = "EUW1",
      A.KOREA = "KR",
      A.LAT_NORTH = "LA1",
      A.LAT_SOUTH = "LA2",
      A.AMERICA_NORTH = "NA1",
      A.OCEANIA = "OC1",
      A.TURKEY = "TR1",
      A.RUSSIA = "RU",
      A.JAPAN = "JP1",
      A.VIETNAM = "VN2",
      A.TAIWAN = "TW2",
      A.SINGAPORE = "SG2",
      A.MIDDLE_EAST = "ME1",
      A.PBE = "PBE1";
  })(E || (r.Regions = E = {}));
  var T;
  (function (A) {
    A.ASIA = "ASIA",
      A.AMERICAS = "AMERICAS",
      A.EUROPE = "EUROPE",
      A.SEA = "SEA";
  })(T || (r.RegionGroups = T = {}));
  function M(A) {
    switch (A) {
      case E.AMERICA_NORTH:
      case E.BRAZIL:
      case E.LAT_NORTH:
      case E.LAT_SOUTH:
        return T.AMERICAS;
      case E.EU_EAST:
      case E.EU_WEST:
      case E.TURKEY:
      case E.RUSSIA:
      case E.MIDDLE_EAST:
        return T.EUROPE;
      case E.JAPAN:
      case E.KOREA:
        return T.ASIA;
      case E.OCEANIA:
      case E.SINGAPORE:
      case E.TAIWAN:
      case E.VIETNAM:
        return T.SEA;
    }
    throw new Error(`Unexpected region: ${A}`);
  }
  r.regionToRegionGroup = M;
});
var I = n(t()),
  { __esModule: L, regionToRegionGroup: C, RegionGroups: G, Regions: d } = I,
  f = I.default ?? I;
export {
  C as regionToRegionGroup,
  d as Regions,
  f as default,
  G as RegionGroups,
  L as __esModule,
};
//# sourceMappingURL=regions.mjs.map
