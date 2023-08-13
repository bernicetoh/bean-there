const mongoose = require("mongoose");
const validate = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "A password must be at least 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must have a confirm password"],
    validate: function (val) {
      // this only works on SAVE
      return val === this.password;
    },
    message: "Passwords are not the same!",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  // only run this function if password was actly modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
