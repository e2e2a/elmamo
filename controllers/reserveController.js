const Boarding = require('../models/boarding');
const Reservation = require('../models/reservation');
const User = require('../models/user');
const SITE_TITLE = 'Boarding House';

module.exports.index = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  if(!userLogin) {
    return res.redirect('/login')
  }
  const boardings = await Boarding.findById(req.params.id);
  if(!boardings){
    return res.redirect('/')
  }
  console.log(userLogin);
  res.render('reserve', {
    site_title: SITE_TITLE,
    title: 'Reservation',
    messages: req.flash(),
    currentUrl: req.originalUrl,
    userLogin: userLogin,
    boardings: boardings,
    status: 'pending',
  });
};
module.exports.submit = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  const boardings = await Boarding.findById(req.params.id);
  console.log(userLogin);
  const reservation = new Reservation({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    contact: req.body.contact,
    userId: userLogin._id,
    boardingId: boardings._id,
  });
  console.log(reservation);
  reservation.save().then(() => {
      console.log('success')
      req.flash('error', 'Reservation Success.');
      return res.redirect('/')
  }, () => {
      console.log('failed')
      req.flash('error', 'Reservation Failed.');
      return res.redirect('/');
  });
};
