import { formatDistance } from "date-fns";

export function relativeTime(date: string) {
  return formatDistance(date, new Date(), { addSuffix: true });
}
