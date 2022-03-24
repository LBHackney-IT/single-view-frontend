import { format, isFuture, isSameDay, isValid, parseISO } from "date-fns";

const voidDate = new Date("1900-01-01T00:00:00");

function parseDate(date: null): null;
function parseDate(date: string): Date;
function parseDate(date: string | null): Date | null;
function parseDate(date: string | null): Date | null {
  if (!date) {
    return null;
  }
  const parsedDate = parseISO(date);
  return !isSameDay(parsedDate, voidDate) && isValid(parsedDate) ? parsedDate : null;
}

export { parseDate };

export const formatDate = (date: string | null): string => {
  const parsedDate = parseDate(date);
  if (!parsedDate) {
    return "";
  }
  return format(parsedDate, "dd/MM/yyyy");
};

export const formatTime = (date: string | null): string => {
  const parsedDate = parseDate(date);
  if (!parsedDate) {
    return "";
  }
  return format(parsedDate, "HH:mm:ss");
};

export const isFutureDate = (date: string | null): boolean => {
  const parsedDate = parseDate(date);

  if (!parsedDate) {
    return true;
  }

  return isFuture(parsedDate);
};
