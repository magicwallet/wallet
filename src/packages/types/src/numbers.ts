// https://stackoverflow.com/a/68191952

const formatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
  minimumSignificantDigits: 1,
  maximumFractionDigits: 4,
  maximumSignificantDigits: 4,
  useGrouping: true,
});

export function round(num: number, fractionDigits: number): number {
  return Number(num.toFixed(fractionDigits));
}

export function format(number: number): string {
  return formatter.format(number);
}

export function toBigNumber(number: number, decimals: number): BigInt {
  const numberString = number.toString(10);
  const location = numberString.indexOf('.');
  const diff = location > 0 ? numberString.length - location - 1 : 0;
  if (diff > 0 && decimals === 0) {
    return BigInt(0);
  }
  const value = numberString.replace('.', '').replace(',', '');
  return BigInt(value) * BigInt(10 ** (decimals - diff));
}

export function fromBigNumber(value: BigInt, decimals: number): number {
  const result = (value as bigint) / BigInt(10) ** BigInt(decimals);
  const result2 = (value as bigint) % BigInt(10) ** BigInt(decimals);

  return parseFloat(result.toString(10)) + parseFloat(result2.toString(10)) / 10 ** decimals;
}
