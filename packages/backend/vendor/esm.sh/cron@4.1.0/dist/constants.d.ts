export declare const CONSTRAINTS: Readonly<{
  readonly second: readonly [0, 59];
  readonly minute: readonly [0, 59];
  readonly hour: readonly [0, 23];
  readonly dayOfMonth: readonly [1, 31];
  readonly month: readonly [1, 12];
  readonly dayOfWeek: readonly [0, 7];
}>;
export declare const PARSE_DEFAULTS: Readonly<{
  readonly second: "0";
  readonly minute: "*";
  readonly hour: "*";
  readonly dayOfMonth: "*";
  readonly month: "*";
  readonly dayOfWeek: "*";
}>;
export declare const ALIASES: Readonly<{
  readonly jan: 1;
  readonly feb: 2;
  readonly mar: 3;
  readonly apr: 4;
  readonly may: 5;
  readonly jun: 6;
  readonly jul: 7;
  readonly aug: 8;
  readonly sep: 9;
  readonly oct: 10;
  readonly nov: 11;
  readonly dec: 12;
  readonly sun: 0;
  readonly mon: 1;
  readonly tue: 2;
  readonly wed: 3;
  readonly thu: 4;
  readonly fri: 5;
  readonly sat: 6;
}>;
export declare const TIME_UNITS_MAP: Readonly<{
  readonly SECOND: "second";
  readonly MINUTE: "minute";
  readonly HOUR: "hour";
  readonly DAY_OF_MONTH: "dayOfMonth";
  readonly MONTH: "month";
  readonly DAY_OF_WEEK: "dayOfWeek";
}>;
export declare const TIME_UNITS: [
  "second",
  "minute",
  "hour",
  "dayOfMonth",
  "month",
  "dayOfWeek",
];
export declare const TIME_UNITS_LEN: number;
export declare const PRESETS: Readonly<{
  readonly "@yearly": "0 0 0 1 1 *";
  readonly "@monthly": "0 0 0 1 * *";
  readonly "@weekly": "0 0 0 * * 0";
  readonly "@daily": "0 0 0 * * *";
  readonly "@hourly": "0 0 * * * *";
  readonly "@minutely": "0 * * * * *";
  readonly "@secondly": "* * * * * *";
  readonly "@weekdays": "0 0 0 * * 1-5";
  readonly "@weekends": "0 0 0 * * 0,6";
}>;
export declare const RE_WILDCARDS: RegExp;
export declare const RE_RANGE: RegExp;
