exports.showLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?'; // WARNING: use hashing in production

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      return res.render('auth/login', { error: 'Database error.' });
    }

    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/');
    } else {
      res.render('auth/login', { error: 'Invalid username or password.' });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
