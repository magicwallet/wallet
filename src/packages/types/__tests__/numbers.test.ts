import {round} from '../src';
import {fromBigNumber, toBigNumber, format} from '../src/numbers';

it('test round', () => {
  expect(round(10, 2)).toBe(10);
  expect(round(12.123, 2)).toBe(12.12);
  //expect(round(5926.82838876, 4)).toBe(5926.8283);
});

it('test format', () => {
  expect(format(10)).toBe('10');
  expect(format(12.123)).toBe('12.12');
  //expect(format(5926.82838876)).toBe('5926.8283');
});

it('test toBigNumber', () => {
  expect(toBigNumber(1.1, 18)).toBe(1100000000000000000n);
  expect(toBigNumber(1.1, 0)).toBe(0n);
  expect(toBigNumber(10, 2)).toBe(1000n);
  expect(toBigNumber(10.2, 2)).toBe(1020n);
  expect(toBigNumber(16, 0)).toBe(16n);
  expect(toBigNumber(167, 18)).toBe(167000000000000000000n);
  expect(toBigNumber(573218870054, 8)).toBe(57321887005400000000n);
  expect(toBigNumber(13108211, 8)).toBe(1310821100000000n);
});

it('test fromBigNumber', () => {
  expect(fromBigNumber(123n, 1)).toBe(12.3);
  expect(fromBigNumber(123n, 2)).toBe(1.23);
  expect(fromBigNumber(16n, 0)).toBe(16);
  expect(fromBigNumber(573218870054n, 8)).toBe(5732.18870054);
  expect(fromBigNumber(592682838876n, 8)).toBe(5926.82838876);
});
