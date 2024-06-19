const SITE_TITLE = 'Boarding House';
const User = require('../../models/user');
module.exports.index = async(request, response) => {
    const userLogin = await User.findById(request.session.login);
  response.render('login', {
    site_title: SITE_TITLE,
    title: 'Login',
    messages: request.flash(),
    currentUrl: request.originalUrl,
    userLogin:userLogin,
  });
};
module.exports.submit = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.flash('error', 'Invalid email.');
      return res.redirect('/login'); // 400 Bad Request
    }

    user.comparePassword(req.body.password, (error, valid) => {
      if (error) {
        req.flash('error', 'Forbidden.');
        return res.redirect('/login'); // 403 Forbidden
      }

      if (!valid) {
        req.flash('error', 'Invalid password.');
        return res.redirect('/login'); // 400 Bad Request
      }

      req.session.login = user.id;
      res.redirect('/');
    });
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports.logout = (req, res) => {
  const login = req.session.login;
  req.session.destroy((err) => {
      if (err) {
          console.error('error destroying session', err);
      } else {
          console.log('user logout', login)
          return res.redirect('/login');
      }
  })
}