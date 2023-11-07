const expect = require('chai').expect;
const User = require('../User.model');
const should = require('chai').should;

describe('User', () => {
  it('should throw an error if no argument is given', () => {
    const testUser = new User({});

    const err = testUser.validateSync()
    expect(err).to.exist;
  });

  it('should throw an error if login is not a string', () => {
    const cases = [{}, [], undefined];
    for (let login of cases) {
      const testUser = new User({ login: login, password: 'password', avatar: 'avatar.png', phoneNumber: '1234567890' });

      const err = testUser.validateSync()
      expect(err.errors.login).to.exist;
    }
  });

  it('should throw an error if password is not a string', () => {
    const cases = [{}, [], undefined];
    for (let password of cases) {
      const testUser = new User({ login: 'login', password: password, avatar: 'avatar.png', phoneNumber: '1234567890' });

      const err = testUser.validateSync()
      expect(err.errors.password).to.exist;
    }
  });

  it('should throw an error if avatar is not a string', () => {
    const cases = [{}, [], undefined];
    for (let avatar of cases) {
      const testUser = new User({ login: 'login', password: 'password', avatar: avatar, phoneNumber: '1234567890' });

      const err = testUser.validateSync()
      expect(err.errors.avatar).to.exist;
    }
  });

  it('should throw an error if phoneNumber is not a string', () => {
    const cases = [{}, [], undefined];
    for (let phoneNumber of cases) {
      const testUser = new User({ login: 'login', password: 'password', avatar: 'avatar.png', phoneNumber: phoneNumber });

      const err = testUser.validateSync()
      expect(err.errors.phoneNumber).to.exist;
    }
  });

  it('should not throw an error if all values are valid', () => {
    const testUser = new User({ login: 'login', password: 'password', avatar: 'avatar.png', phoneNumber: '123456789' });

    const err = testUser.validateSync()
    expect(err).to.not.exist;
  })
})
