export default function round(x: number, decimalPlaces: number) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(x * multiplier) / multiplier;
}
