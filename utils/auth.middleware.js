const authMiddleware = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.send('User not authorized');
  }
};

module.exports = authMiddleware;