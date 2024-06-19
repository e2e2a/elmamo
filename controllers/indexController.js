const Boarding = require('../models/boarding');
const User = require('../models/user');
const SITE_TITLE = 'Boarding House';

module.exports.index = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  const boardings = await Boarding.find();
  console.log(userLogin);
  res.render('index', {
    site_title: SITE_TITLE,
    title: 'Home',
    messages: req.flash(),
    currentUrl: req.originalUrl,
    userLogin: userLogin,
    boardings: boardings,
  });
};
