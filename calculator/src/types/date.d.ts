declare module '../utils/dateUtils' {
  export function formatDate(date: Date): string;
  export function parseDateString(dateString: string): Date;
  export function isValidDateString(dateString: string): boolean;
  export function getCurrentDateFormatted(): string;
  export function compareDates(date1: Date, date2: Date): number;
  export function addDays(date: Date, days: number): Date;
  export function formatDateForDisplay(
    date: Date | string,
    locale?: string
  ): string;
}
