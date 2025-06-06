import { DateTime, Zone } from 'https://esm.sh/@types/luxon@3.6.2/index.d.ts';
import { CronError } from './errors.d.ts';
import { CronJobParams } from './types/cron.types.d.ts';
type CustomZone = Zone & {
    zoneName?: string;
    fixed?: string;
};
type CustomDateTime = Omit<DateTime, 'zone'> & {
    zone: CustomZone;
};
export declare class CronTime {
    source: string | DateTime;
    timeZone?: string;
    utcOffset?: number;
    realDate: boolean;
    private second;
    private minute;
    private hour;
    private dayOfMonth;
    private month;
    private dayOfWeek;
    constructor(source: CronJobParams['cronTime'], timeZone?: CronJobParams['timeZone'], utcOffset?: null);
    constructor(source: CronJobParams['cronTime'], timeZone?: null, utcOffset?: CronJobParams['utcOffset']);
    static validateCronExpression(cronExpression: string): {
        valid: boolean;
        error?: CronError;
    };
    private _getWeekDay;
    sendAt(): DateTime;
    sendAt(i: number): DateTime[];
    getTimeout(): number;
    toString(): string;
    toJSON(): string[];
    getNextDateFrom(start: Date | CustomDateTime, timeZone?: string | CustomZone): DateTime;
    private _wcOrAll;
    private _hasAll;
    private _parse;
    private _parseField;
}
export {};
