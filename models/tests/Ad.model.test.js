const expect = require('chai').expect;
const Ad = require('../Ad.model');

describe('Ad', () => {
  it('should throw an error if no argument is given', () => {
    const testAd = new Ad({});

    const err = testAd.validateSync()
    expect(err).to.exist;
  });
  it('should throw an error if title is not a string or has invalid length', () => {
    const cases = [{}, [], undefined, 'abc'];
    for (let title of cases) {
      const testAd = new Ad({ title: title, desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: 'test.png', price: 20, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.title).to.exist;
    }
  });
  it('should throw an error if desc is not a string or has invalid length', () => {
    const cases = [{}, [], undefined, 'abc'];
    for (let desc of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: desc, date: '12-12-12', photo: 'test.png', price: 20, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.desc).to.exist;
    }
  });
  it('should throw an error if date is not a string', () => {
    const cases = [{}, [], undefined];
    for (let date of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: date, photo: 'test.png', price: 20, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.date).to.exist;
    }
  });
  it('should throw an error if photo is not a string', () => {
    const cases = [{}, [], undefined];
    for (let photo of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: photo, price: 20, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.photo).to.exist;
    }
  });
  it('should throw an error if price is not a number', () => {
    const cases = [{}, [], undefined, 'abc'];
    for (let price of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: 'test.png', price: price, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.price).to.exist;
    }
  });
  it('should throw an error if location is not a string', () => {
    const cases = [{}, [], undefined];
    for (let location of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: 'test.png', price: 20, location: location, seller: '6548d635b1da6cfe1829672b' });

      const err = testAd.validateSync()
      expect(err.errors.location).to.exist;
    }
  })
  it('should throw an error if seller is not provided or is not a valid ObjectId', () => {
    const cases = [{}, [], undefined, 'abc', '123'];
    for (let seller of cases) {
      const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: 'test.png', price: 20, location: 'NYC', seller: seller });

      const err = testAd.validateSync()
      expect(err.errors.seller).to.exist;
    }
  });
  it('should not throw an error if all values are correct', () => {
    const testAd = new Ad({ title: 'abcdefghijkl', desc: 'abcdefghijklmnopqrstuvwxyz', date: '12-12-12', photo: 'test.png', price: 20, location: 'NYC', seller: '6548d635b1da6cfe1829672b' });

    const err = testAd.validateSync();
    expect(err).to.not.exist;
  })
})
