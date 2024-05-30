const TowersOfHanoi = require('./script');

describe('TowersOfHanoi', () => {
  let hanoi;

  beforeEach(() => {
    hanoi = new TowersOfHanoi(3);
  });

  test('initial state', () => {
    expect(hanoi.towers).toEqual([[3, 2, 1], [], []]);
    expect(hanoi.moves).toBe(0);
  });

  test('moveDisk', () => {
    hanoi.moveDisk(0, 1);
    expect(hanoi.towers).toEqual([[2, 1], [3], []]);
    expect(hanoi.moves).toBe(1);
  });

  test('solve', () => {
    hanoi.solve();
    expect(hanoi.towers).toEqual([[], [], [3, 2, 1]]);
    expect(hanoi.moves).toBe(7);
  });
});