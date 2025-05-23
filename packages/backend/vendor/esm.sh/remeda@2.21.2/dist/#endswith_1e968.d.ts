/**
 * Determines whether the string ends with the provided suffix, and refines
 * the output if possible. Uses the built-in [`String.prototype.endsWith`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith).
 *
 * @param data - The input string.
 * @param suffix - The prefix to check for.
 * @signature
 *   R.endsWith(data, suffix);
 * @example
 *   R.endsWith("hello world", "hello"); // false
 *   R.endsWith("hello world", "world"); // true
 * @dataFirst
 * @category String
 */
declare function endsWith<T extends string, Suffix extends string>(
  data: T,
  suffix: string extends Suffix ? never : Suffix,
): data is T & `${string}${Suffix}`;
declare function endsWith(data: string, suffix: string): boolean;
/**
 * Determines whether the string ends with the provided suffix, and refines
 * the output if possible. Uses the built-in [`String.prototype.endsWith`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith).
 *
 * @param suffix - The prefix to check for.
 * @signature
 *   R.endsWith(suffix)(data);
 * @example
 *   R.pipe("hello world", R.endsWith("hello")); // false
 *   R.pipe("hello world", R.endsWith("world")); // true
 * @dataLast
 * @category String
 */
declare function endsWith<Suffix extends string>(
  suffix: string extends Suffix ? never : Suffix,
): <T extends string>(data: T) => data is T & `${string}${Suffix}`;
declare function endsWith(suffix: string): (data: string) => boolean;

export { endsWith };
