import User from "../models/user"
import { comparePassword, hashPassword } from "../utils/auth"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // validation
    if (!name || !email)
      return res
        .status(400)
        .json({ success: false, message: "Please enter required fields" })
    if (!password || password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password is required and should be minimum 6 character long",
      })

    let userExist = await User.findOne({ email }).exec()
    if (userExist)
      return res.status(400).json({ success: false, message: "Email is taken" })

    // Hashpassword
    const hashedPassword = await hashPassword(password)

    // register
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save()
    return res
      .status(201)
      .json({ success: true, message: "User is registered successfully" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Registration error. Try again",
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // check user with that email
    const user = await User.findOne({ email }).exec()
    if (!user)
      return res.status(400).json({
        success: false,
        message: "No user found",
      })

    // check password
    const match = await comparePassword(password, user.password)
    if (!match)
      return res.status(400).json({
        success: false,
        message: "Incorrect credentials",
      })
    // create signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    // return user and token to client
    user.password = undefined // excluding passowrd

    // send token in Cookie (httpOnly)
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    })

    // send user as json respnse
    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: user, // except password
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Login error. Try Again!",
    })
  }
}
