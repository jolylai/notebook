import selection from './index';

test('order:selection', () => {
  expect(
    selection(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E']),
  ).toEqual(['A', 'E', 'E', 'L', 'M', 'O', 'P', 'R', 'S', 'T', 'X']);
});
