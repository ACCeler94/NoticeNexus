const Session = require('../models/Session.model');
const authMiddleware = (req, res, next) => {

  if (process.env.NODE_ENV !== "production") {
    Session.findOne().then((session, err) => {
      if (!session)
        return res.status(401).send({ message: 'You are not authorized' });
      if (err)
        return res.status(401).send({ message: 'You are not authorized' });
      else {
        const sessionData = JSON.parse(session.session);
        const user = {
          id: sessionData.user.id,
          login: sessionData.user.login,
        }

        req.session.user = user;
        return next();
      }
    })
  }
  else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({ message: 'You are not authorized' });
    }
  }
}

module.exports = authMiddleware;