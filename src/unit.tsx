import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Unit = 'L' | 'gal';

export const GALLONS_PER_LITER = 0.264172;
export const LITERS_PER_GALLON = 1 / GALLONS_PER_LITER;

interface UnitContextValue {
  unit: Unit;
  setUnit: (u: Unit) => void;
  unitWord: string;
  unitAbbr: string;
}

const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit>('L');
  const value = useMemo<UnitContextValue>(
    () => ({
      unit,
      setUnit,
      unitWord: unit === 'gal' ? 'gallons' : 'liters',
      unitAbbr: unit === 'gal' ? 'gal' : 'L',
    }),
    [unit],
  );
  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used within a UnitProvider');
  return ctx;
}

/** Convert a canonical liters amount into the currently selected display unit. */
export function litersToDisplay(liters: number, unit: Unit) {
  return unit === 'gal' ? liters * GALLONS_PER_LITER : liters;
}

/** Convert a canonical gallons amount into the currently selected display unit. */
export function gallonsToDisplay(gallons: number, unit: Unit) {
  return unit === 'gal' ? gallons : gallons * LITERS_PER_GALLON;
}

/** Format a large number with a B/T/M suffix, e.g. 5.5e12 -> "5.5T". */
export function compactAmount(value: number): string {
  if (value >= 1e12) return (value / 1e12).toLocaleString(undefined, { maximumFractionDigits: 2 }) + 'T';
  if (value >= 1e9) return (value / 1e9).toLocaleString(undefined, { maximumFractionDigits: 2 }) + 'B';
  if (value >= 1e6) return (value / 1e6).toLocaleString(undefined, { maximumFractionDigits: 2 }) + 'M';
  return Math.round(value).toLocaleString('en-US');
}
