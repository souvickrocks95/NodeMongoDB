const math = require('../service/math');

test('adds 1 + 2 to equal 3', () => {
  expect(math.sum(1, 2)).toBe(3);
});

/* test('adds 1 + 2 to equal 3 async', (done) => {
    setTimeout(()=> {
    expect(math.sum(1, 2)).toBe(5);
    done();
    },2000);
  });
 */
