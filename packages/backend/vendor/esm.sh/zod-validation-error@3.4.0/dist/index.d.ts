import * as zod from "https://esm.sh/zod@3.24.1/index.d.ts";

interface ErrorOptions {
  cause?: unknown;
}
declare class ValidationError extends Error {
  name: "ZodValidationError";
  details: Array<zod.ZodIssue>;
  constructor(message?: string, options?: ErrorOptions);
  toString(): string;
}

declare function isValidationError(err: unknown): err is ValidationError;

declare function isValidationErrorLike(err: unknown): err is ValidationError;

declare function isZodErrorLike(err: unknown): err is zod.ZodError;

declare const errorMap: zod.ZodErrorMap;

type NonEmptyArray<T> = [T, ...T[]];

type ZodIssue = zod.ZodIssue;
type MessageBuilder = (issues: NonEmptyArray<ZodIssue>) => string;
type CreateMessageBuilderProps = {
  issueSeparator?: string;
  unionSeparator?: string;
  prefix?: string | null;
  prefixSeparator?: string;
  includePath?: boolean;
  maxIssuesInMessage?: number;
};
declare function createMessageBuilder(
  props?: CreateMessageBuilderProps,
): MessageBuilder;

type ZodError = zod.ZodError;
type FromZodErrorOptions = {
  messageBuilder: MessageBuilder;
} | CreateMessageBuilderProps;
declare function fromZodError(
  zodError: ZodError,
  options?: FromZodErrorOptions,
): ValidationError;

declare function fromError(
  err: unknown,
  options?: FromZodErrorOptions,
): ValidationError;

type FromZodIssueOptions = {
  messageBuilder: MessageBuilder;
} | Omit<CreateMessageBuilderProps, "maxIssuesInMessage">;
declare function fromZodIssue(
  issue: ZodIssue,
  options?: FromZodIssueOptions,
): ValidationError;

declare const toValidationError: (
  options?: FromZodErrorOptions,
) => (err: unknown) => ValidationError;

export {
  createMessageBuilder,
  errorMap,
  type ErrorOptions,
  fromError,
  fromZodError,
  type FromZodErrorOptions,
  fromZodIssue,
  type FromZodIssueOptions,
  isValidationError,
  isValidationErrorLike,
  isZodErrorLike,
  type MessageBuilder,
  type NonEmptyArray,
  toValidationError,
  ValidationError,
  type ZodError,
  type ZodIssue,
};
