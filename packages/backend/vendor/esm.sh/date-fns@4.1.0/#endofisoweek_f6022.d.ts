import type { ContextOptions, DateArg } from "./types.d.ts";
/**
 * The {@link endOfISOWeek} function options.
 */
export interface EndOfISOWeekOptions<DateType extends Date = Date>
  extends ContextOptions<DateType> {}
/**
 * @name endOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
export declare function endOfISOWeek<
  DateType extends Date,
  ResultDate extends Date = DateType,
>(
  date: DateArg<DateType>,
  options?: EndOfISOWeekOptions<ResultDate> | undefined,
): ResultDate;
