var User = require('../models/user');

module.exports = function(router) {

  var userRoute = router.route('/users');
  var userRouteID = router.route('/users/:userID');

  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"success": false, "message": message});
  }

  userRoute.get(function(req, res){
    var query = req.query;
    if (query.email == null){
      return handleError(res, "User Get Error: Field Missing", "Validation Error: fill out required fields !");
    }

    User.findOne({ email: query.email }, function (err, user) {
      if (err) {
        return handleError(res, "User Get Error: Find Error", "Error: Something went wrong");
      }
      else if (user == null){
        return handleError(res, "User Get Error: Email does not existed", "Validation Error: Email does not existed");
      }
      else{
        return res.status(201).json({"success": true, "message": 'Successfully resgisted', 'data': user});
      }
    });
  });

  userRoute.post(function(req, res) {
    var body = req.body;

    //validation
    if (body.email == null || body.firstName == null || body.lastName == null){
      return handleError(res, "User Post: Field Missing", "Validation Error: fill out required fields !");
    }

    //Check Duplicated
    User.findOne({ email: body.email }, function (err, user) {
      if (err) {
        return handleError(res, "User Post Error: Find Error", "Error: Something went wrong");
      }
      else if (user != null){
        return handleError(res, "User Post Error: Duplicated", "Validation Error: Email is already in used");
      }
      else{
        // Create object for User & Save User
        NewUser = new User();
        NewUser.email = body.email;
        NewUser.firstName = body.firstName;
        NewUser.lastName = body.lastName;
        NewUser.age = body.age;
        NewUser.club = body.club;
        NewUser.size = body.size;
        NewUser.gender = body.gender;
        NewUser.phone = body.phone;
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
            return handleError(res, "User Post Error: Save User", "Error: Something went wrong.. Couldnt save User");
          }
          else{
            return res.status(201).json({"success": true, "message": 'Successfully resgisted'});
          }
        });
      }
    });
  });

  userRouteID.put(function(req, res){
    var userId =req.params.userID;
    var body = req.body;

    User.findOne({_id: userId}, function (err, TargetUser) {
      if (err) {
        return handleError(res, "User Update Error: Find Error", "Error: Something went wrong");
      }
      else if (TargetUser == null){
        return handleError(res, "User Update Error: ID does not existed", "Validation Error: This user does not existed");
      }
      else{
        // Create object for User & Save User
        TargetUser.age = body.age;
        TargetUser.club = body.club;
        TargetUser.size = body.size;
        TargetUser.gender = body.gender;
        TargetUser.phone = body.phone;
        TargetUser.single.entry = body.single.entry;
        TargetUser.single.level = body.single.level;
        TargetUser.double.entry = body.double.entry;
        TargetUser.double.level = body.double.level;
        TargetUser.double.firstName = body.double.firstName;
        TargetUser.double.lastName = body.double.lastName;
        TargetUser.mixed.entry = body.mixed.entry;
        TargetUser.mixed.level = body.mixed.level;
        TargetUser.mixed.firstName = body.mixed.firstName;
        TargetUser.mixed.lastName = body.mixed.lastName;

        TargetUser.save(function(err, AddedUser) {
          if (err) {
            return handleError(res, "User Update Error: Save User", "Error: Something went wrong.. Couldnt save User");
          }
          else{
            return res.status(201).json({"success": true, "message": 'Successfully updated'});
          }
        });
      }
    });
  });

  return router;
}
