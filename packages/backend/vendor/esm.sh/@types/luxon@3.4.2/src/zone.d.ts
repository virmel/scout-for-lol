import { CanBeInvalid, DefaultValidity, IfValid } from "./_util.d.ts";

export interface ZoneOffsetOptions {
  /**
   * What style of offset to return.
   */
  format?: "short" | "long" | undefined;
  /**
   * What locale to return the offset name in.
   */
  locale?: string | undefined;
}

/**
 * What style of offset to return.
 * Returning '+6', '+06:00', or '+0600' respectively
 */
export type ZoneOffsetFormat = "narrow" | "short" | "techie";

export type ZoneMaybeValid = CanBeInvalid extends true
  ? Zone<true> | Zone<false>
  : Zone;

export abstract class Zone<IsValid extends boolean = DefaultValidity> {
  /**
   * The type of zone
   */
  get type(): IfValid<string, "invalid", IsValid>;

  /**
   * The name of this zone.
   */
  get name(): string;

  /**
   * Returns whether the offset is known to be fixed for the whole year.
   */
  get isUniversal(): IfValid<boolean, false, IsValid>;

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   *
   * @param ts - Epoch milliseconds for which to get the name
   * @param options - Options to affect the format
   * @param options.format - What style of offset to return.
   * @param options.locale - What locale to return the offset name in.
   */
  offsetName(
    ts: number,
    options: ZoneOffsetOptions,
  ): IfValid<string, null, IsValid>;

  /**
   * Returns the offset's value as a string
   *
   * @param ts - Epoch milliseconds for which to get the offset
   * @param format - What style of offset to return.
   *                 Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   */
  formatOffset(
    ts: number,
    format: ZoneOffsetFormat,
  ): IfValid<string, "", IsValid>;

  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * @param ts - Epoch milliseconds for which to compute the offset
   */
  offset(ts: number): IfValid<number, typeof NaN, IsValid>;

  /**
   * Return whether this Zone is equal to another zone
   *
   * @param other - the zone to compare
   */
  equals(other: Zone): IfValid<boolean, false, IsValid>;

  /**
   * Return whether this Zone is valid.
   */
  get isValid(): IfValid<true, false, IsValid>;
}

/**
 * A zone identified by an IANA identifier, like America/New_York
 */
export class IANAZone<IsValid extends boolean = DefaultValidity>
  extends Zone<IsValid> {
  /**
   * Same as constructor but has caching.
   */
  static create(
    name: string,
  ): CanBeInvalid extends true ? (IANAZone<true> | IANAZone<false>) : IANAZone;

  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   */
  static resetCache(): void;

  /**
   * Returns whether the provided string is a valid specifier.
   * This only checks the string's format, not that the specifier
   * identifies a known zone; see {@link isValidZone} for that.
   *
   * @param s - The string to check validity on
   *
   * @example
   * IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example
   * IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
   * @example
   * IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   */
  static isValidSpecifier(s: string): boolean;

  /**
   * Returns whether the provided string identifies a real zone
   *
   * @param zone - The string to check
   *
   * @example
   * IANAZone.isValidZone("America/New_York") //=> true
   * @example
   * IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example
   * IANAZone.isValidZone("Sport~~blorp") //=> false
   */
  static isValidZone(zone: string): boolean;

  constructor(name: string);
}

/**
 * A zone with a fixed offset (meaning no DST)
 */
export class FixedOffsetZone extends Zone<true> {
  /**
   * Get a singleton instance of UTC
   */
  static get utcInstance(): FixedOffsetZone;

  /**
   * Get an instance with a specified offset
   *
   * @param offset - The offset in minutes
   */
  static instance(offset: number): FixedOffsetZone;

  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   *
   * @param s - The offset string to parse
   *
   * @example
   * FixedOffsetZone.parseSpecifier("UTC+6")
   * @example
   * FixedOffsetZone.parseSpecifier("UTC+06")
   * @example
   * FixedOffsetZone.parseSpecifier("UTC-6:00")
   */
  static parseSpecifier(s: string): FixedOffsetZone;
}

/**
 * A zone that failed to parse. You should never need to instantiate this.
 */
export class InvalidZone extends Zone<false> {
  get type(): "invalid";
  get isUniversal(): false;
  get offsetFormat(): "";
}

/**
 * Represents the system zone for this JavaScript environment.
 */
export class SystemZone extends Zone<true> {
  /**
   * Get a singleton instance of the system zone
   */
  static get instance(): SystemZone;
}
