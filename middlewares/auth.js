module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  },
  redirectIfAuthenticated: function (req, res, next) {
    if (req.session.user) {
      return res.redirect('/');
    }
    next();
  }
};
