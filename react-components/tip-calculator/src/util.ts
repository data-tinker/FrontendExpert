export function toFixedNumber(base: number, digits: number, num: number): number {
  const pow = Math.pow(base, digits)
  return Math.round(num * pow) / pow
}
