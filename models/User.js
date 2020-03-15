const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const userSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, "first name is required"]
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, "last name is required"]
  },
  phone_no: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"]
  },
  dob: {
    type: Date
  },
  address: {
    type: String,
    trim: true,
    required: [true, "address is required"]
  }
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
