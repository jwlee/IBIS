var User = require('../models/user');

module.exports = function(router) {

  var userRoute = router.route('/users');

  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"success": false, "message": message});
  }

  // userRoute.get(function(req, res) {
  //   User.findOne({username: username}, function(err, user) {
  //     if (err) {
  //       handleError(res, err.message, "Failed to get contacts.");
  //     }
  //     if (user) {
  //       user.photo = null;
  //       res.status(200).json({message: "OK", data: user})
  //     } else {
  //       res.status(404).json({message: "User not found", data: []})
  //     }
  //   });
  // });

  userRoute.post(function(req, res) {
    var body = req.body;

    //validation
    if (body.email == null || body.password == null){
      return handleError(res, "User Post Field Missing", "Validation Error: Both email and password are required!");
    }

    //Check Duplicated
    User.findOne({ email: body.email }, function (err, user) {
      if (err) {
        return handleError(res, "User Post User: Find Error", "Error: Something went wrong");
      }
      else if (user != null){
        return handleError(res, "User Post User Duplicated", "Validation Error: Email is already in used");
      }
      console.log(body);
      // Create object for User & Save User
      NewUser = new User();
      NewUser.email = body.email;
      NewUser.firstName = body.firstName;
      NewUser.lastName = body.lastName;
      NewUser.password = body.password;
      NewUser.club = body.club;
      NewUser.gender = body.gender;
      NewUser.birthdate = body.birthdate;
      NewUser.address = body.address;
      NewUser.single.entry = body.single.entry;
      NewUser.single.level = body.single.level;
      NewUser.double.entry = body.double.entry;
      NewUser.double.level = body.double.level;
      NewUser.double.firstName = body.double.firstName;
      NewUser.double.lastName = body.double.lastName;
      NewUser.mixed.entry = body.mixed.entry;
      NewUser.mixed.level = body.mixed.level;
      NewUser.mixed.firstName = body.mixed.firstName;
      NewUser.mixed.lastName = body.mixed.lastName;

      NewUser.save(function(err, AddedUser) {
        if (err) {
          return handleError(res, "User Post User Error: Save User", "Error: Something went wrong.. Couldnt save User");
        }
        else{
          return res.status(201).json({"success": true, "message": 'User added', "data": AddedUser});
        }
      });
    });
  });

  return router;
}
