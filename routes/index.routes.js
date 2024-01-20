var express = require('express');
var router = express.Router();
let contactController = require("../Controller/Contact.controller")
let authController = require('../Controller/auth.controller');
const { isAuthenticated } = require('../middlware/isAuthenticated');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


//contact router
router.post("/api/contact/add",isAuthenticated , contactController.add)
router.get("/api/contact/show",isAuthenticated,contactController.show)
router.patch("/api/contact/update",isAuthenticated,contactController.update)
router.delete("/api/contact/delete",isAuthenticated,contactController.delete)

//auth router
router.post("/api/auth/signup",authController.Signup)
router.post("/api/auth/login",authController.Login)
router.patch("/api/auth/update", isAuthenticated , authController.Update)
router.patch("/api/auth/delete", isAuthenticated , authController.delete)
// router.post("/api/auth/login",authController.Login)


module.exports = router;
