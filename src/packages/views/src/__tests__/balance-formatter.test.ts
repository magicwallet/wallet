import {FiatBalanceFormatter} from '../fiat-balance-formatter';

const defaultFormatter = new FiatBalanceFormatter();

it('test value', () => {
  expect(defaultFormatter.fiatValue(12.12)).toBe('$12.12');
  expect(defaultFormatter.fiatValue(12333.12)).toBe('$12,333.12');
  expect(defaultFormatter.fiatValue(1233333.12)).toBe('$1,233,333.12');
  expect(defaultFormatter.fiatValue(-12.12)).toBe('-$12.12');
  expect(defaultFormatter.fiatValue(0)).toBe('$0.00');
  expect(defaultFormatter.fiatValue(0.123333)).toBe('$0.12');
});

it('test valueChange', () => {
  expect(defaultFormatter.fiatValueChange(9911112.12)).toBe('$9,911,112.12');
  expect(defaultFormatter.fiatValueChange(12.12)).toBe('$12.12');
  expect(defaultFormatter.fiatValueChange(-12.12)).toBe('-$12.12');
  expect(defaultFormatter.fiatValueChange(0)).toBe('$0.00');
  expect(defaultFormatter.fiatValueChange(0.123333)).toBe('$0.12');
});

it('test valueChangePercentage', () => {
  expect(defaultFormatter.fiatValueChangePercentage(12.12)).toBe('12.12%');
  expect(defaultFormatter.fiatValueChangePercentage(-12.12)).toBe('-12.12%');
  expect(defaultFormatter.fiatValueChangePercentage(0)).toBe('0.00%');
  expect(defaultFormatter.fiatValueChangePercentage(0.123333)).toBe('0.12%');

  expect(defaultFormatter.fiatValueChangePercentage(0.123, false)).toBe('+0.12%');
  expect(defaultFormatter.fiatValueChangePercentage(-10, false)).toBe('-10.00%');
});
