const User = require('../../models/user');
const Boarding = require('../../models/boarding');
const multer = require('multer');
const SITE_TITLE = 'Boarding House';
var fileUpload = require('../../middlewares/upload');
module.exports.create = async (req, res) => {
  const userLogin = await User.findById(req.session.login);
  console.log(userLogin);
  res.render('createBoarding', {
    site_title: SITE_TITLE,
    title: 'Register Boarding House',
    messages: req.flash(),
    currentUrl: req.originalUrl,
    userLogin: userLogin,
  });
};

module.exports.doCreate = async (request, response) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single('image');
  upload(request, response, function (err) {
    // Checking if the error is an instance of MulterError, which would indicate
    // an error specifically related to the file upload process, e.g.
    // the file is too large, no file was attached, etc.
    if (err instanceof multer.MulterError) {
      // Sending the multer error to the client
      return response.status(err.status || 500).render('500', { err: err });
    } else if (err) {
      // If there's another kind of error (not a MulterError), then handle it here
      // Sending the generic error to the client
      return response.status(err.status || 500).render('500', { err: err });
    } else {
      // If no errors occurred during the file upload, continue to the next step
      const imageUrl = `/public/uploads/${request.file.filename}`;
      const boarding = new Boarding({
        imgUrl: imageUrl,
        name: request.body.name,
        contact: request.body.contact,
      });
      console.log(boarding);
      boarding.save().then(
        () => {
          console.log('success');
          request.flash('error', 'Registration Boarding House Success.');
          return response.redirect('/boarding/create');
        },
        () => {
          console.log('failed');
          request.flash('error', 'Registration Boarding House Failed.');
          return response.redirect('/boarding/create');
        }
      );
    }
  });
};
