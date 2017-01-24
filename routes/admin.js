var User = require('../models/user');

module.exports = function(router) {

  var adminRoute = router.route('/admin');

  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"success": false, "message": message});
  }

  adminRoute.post(function(req, res) {
    var body = req.body;

    //validation
    if (body.password == null){
      return handleError(res, "Admin Post: Field Password", "Validation Error: fill out required fields !");
    }
    else if (body.password != process.env.password){
      return handleError(res, "Admin Post: Field Password", "Wrong password!");
    }
    else{
      //Check Duplicated
      User.find({}, function (err, users) {
        if (err) {
          handleError(res, "Admin Post Error: Find Error", "Error: Something went wrong");
        }
        else{
          res.status(200).json({"success": true, "message": 'Successfully got information', 'data': users});
        }
      });
    }
  });

  return router;
}
