const User = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, address, dob } = req.body.data;
    console.log(req.body);

    const userExist = await User.findOne({
      phone_no: phone
    });

    let BDate = new Date(dob)
    let age = ~~((Date.now() - BDate) / (31557600000))
    console.log(age)

    if (age <= 14 || age >= 25) {
      return res.status(400).json({
        message: "Error: Sorry, can't create account. You are either too young or too old."
      });
    }

    if (!userExist) {
      const user = await new User({
        first_name: firstname,
        last_name: lastname,
        phone_no: phone,
        address: address,
        dob: dob
      }).save();


      res.status(201).json({
        message: "Success",
        user
      });
    } else {
      res.status(400).json({
        message: "Error: There exist a user with that phone number"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      res.status(404).json({
        message: "Error: Users not found! Create an account"
      });
    } else {
      res.status(200).json({
        message: "Operation Successful!",
        data: users
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.singleUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId
    });

    if (!user) {
      res.status(404).json({
        message: "Error: User not found!"
      });
    } else {
      console.log(user.dob);
      res.status(200).json({
        message: "Operation Successful!",
        data: user
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, address, dob } = req.body.data;
    console.log(req.body);

    const user = await User.findOne({
      _id: req.params.userId
    });

    if (user) {
      user.first_name = firstname || user.first_name;
      user.last_name = lastname || user.last_name;
      (user.phone_no = phone || user.phone_no),
        (user.address = address || user.address);
      user.dob = dob || user.dob;

      await user.save();

      res.status(201).json({
        message: "Success",
        user
      });
    } else {
      res.status(404).json({
        message: "Error: User does not exist"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.userId
    });

    console.log(user);

    if (user) {
      res.status(204).json({
        message: "User Record Successfully Deleted",
        user
      });
    } else {
      res.status(404).json({
        message: "Error: User does not exist."
      });
    }
  } catch (error) {
    console.log(error);
  }
};
