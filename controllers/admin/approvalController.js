const Boarding = require('../../models/boarding');
const Reservation = require('../../models/reservation');
const User = require('../../models/user');
const SITE_TITLE = 'Boarding House';

module.exports.index = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  const reservations = await Reservation.find()
    .populate('userId')
    .populate('boardingId');
  if (!userLogin) {
    return res.redirect('/login');
  }
  if (userLogin.role !== 'admin') {
    return res.status(403).send('forbidden');
  }

  console.log(userLogin);
  res.render('admin-approval', {
    site_title: SITE_TITLE,
    title: 'Approval',
    messages: req.flash(),
    currentUrl: req.originalUrl,
    userLogin: userLogin,
    reservations: reservations,
  });
};
module.exports.submit = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  const button = req.body.button;
  if (button === 'approved') {
    const reservation = await Reservation.findByIdAndUpdate(req.body.reservationId, {
      status: 'approved',
    });
    req.flash('error', 'Approved Success.');
    return res.redirect('/approval');
  } else if (button === 'declined') {
    const reservation = await Reservation.findByIdAndUpdate(req.body.reservationId, {
      status: 'declined',
    });
    req.flash('error', 'Declined Success.');
    return res.redirect('/approval');
  }
  // console.log(userLogin);
  // reservation.save().then(() => {
  //     console.log('success')
  //     req.flash('error', 'Reservation Success.');
  //     return res.redirect('/')
  // }, () => {
  //     console.log('failed')
  //     req.flash('error', 'Reservation Failed.');
  //     return res.redirect('/');
  // });
};
