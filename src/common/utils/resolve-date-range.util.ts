export type DateRange = { gte: Date; lte: Date } | undefined;

interface DateFilterable {
  date?: string;
  startDate?: string;
  endDate?: string;
  month?: number;
  year?: number;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

function lastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 0, 23, 59, 59, 999);
}

// Prioridad: date > startDate+endDate > month+year > year
export function resolveDateRange(dto: DateFilterable): DateRange {
  if (dto.date) {
    const d = new Date(dto.date);
    return { gte: startOfDay(d), lte: endOfDay(d) };
  }

  if (dto.startDate && dto.endDate) {
    return {
      gte: startOfDay(new Date(dto.startDate)),
      lte: endOfDay(new Date(dto.endDate)),
    };
  }

  if (dto.month && dto.year) {
    return {
      gte: new Date(dto.year, dto.month - 1, 1, 0, 0, 0, 0),
      lte: lastDayOfMonth(dto.year, dto.month),
    };
  }

  if (dto.year) {
    return {
      gte: new Date(dto.year, 0, 1, 0, 0, 0, 0),
      lte: new Date(dto.year, 11, 31, 23, 59, 59, 999),
    };
  }

  return undefined;
}
