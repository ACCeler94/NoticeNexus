const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');


exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? getImageFileType(req.file) : 'unknown';

    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && typeof phoneNumber === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      // check if user with this login already exists
      const busyLogin = await User.findOne({ login });
      if (busyLogin) {
        return res.status(409).send({ message: 'User with this login already exists.' })
      }
      const user = await User.create({ login, password: await bcrypt.hash(password, 10), phoneNumber, avatar: req.file.filename });
      res.status(201).json('Created user' + user.login)

    } else {
      res.status(400).json({ message: 'Bad request' })
    }


  } catch (error) {
    res.status(500).json({ message: error })
  }
}



exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login })
      if (!user) {
        res.status(400).json({ message: 'Login or password is incorrect!' })
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {}; // save user session
          req.session.user.id = user.id;
          req.session.user.login = user.login;

          res.status(200).json({ message: 'Login successful' })
        } else {
          res.status(400).json({ message: 'Login or password is incorrect!' })
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.getUser = async (req, res) => {
  res.send(req.session.login);
}

exports.logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Could not log out, please try again' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
};