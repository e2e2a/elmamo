const SITE_TITLE = 'Boarding House';
const User = require('../../models/user');

module.exports.index = async (req, res) => {
  const userLogin = await User.findById(req.session.login)
  res.render('register', {
    site_title: SITE_TITLE,
    title: 'Register',
    messages: req.flash(),
    currentUrl: req.originalUrl,
    userLogin:userLogin
  });
};
module.exports.submit = (req, res) => {
  if (req.body.password !== req.body.Cpassword) {
    req.flash('error', 'Password does not match.');
    return res.redirect('/register');
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    role: 'user',
  });
  console.log(user);
  user.save().then(() => {
      console.log('success')
      req.flash('error', 'Registration success.');
      return res.redirect('/login');
  }, () => {
      console.log('failed')
      req.flash('error', 'Password does not match.');
      return res.redirect('/register');
  });
};
