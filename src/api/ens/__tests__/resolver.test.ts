import {hash} from '../resolver';

it('should', async () => {
  const expected = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f';
  const result = hash('foo.eth');
  expect(result).toEqual(expected);
});
