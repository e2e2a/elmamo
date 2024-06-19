const indexController = require('../controllers/indexController');
const reserveController = require('../controllers/reserveController');
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const adminBoardingController = require('../controllers/admin/boardingController');
const adminApprovalController = require('../controllers/admin/approvalController');
module.exports = function(app) {
    /**
     * auth
     */
    app.get('/login', loginController.index)
    app.get('/logout', loginController.logout)
    app.post('/login', loginController.submit)
    app.get('/register', registerController.index)
    app.post('/register', registerController.submit)

    /**
     * admin
     */
    app.get('/boarding/create', adminBoardingController.create)
    app.post('/boarding/create', adminBoardingController.doCreate)
    app.get('/approval', adminApprovalController.index)
    app.post('/approval', adminApprovalController.submit)

     /**
     * user
     */
    app.get('/', indexController.index)
    app.get('/reserve/create/:id', reserveController.index)
    app.post('/reserve/create/:id', reserveController.submit)
}