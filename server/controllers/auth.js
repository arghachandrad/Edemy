import User from "../models/user"
import { comparePassword, hashPassword } from "../utils/auth"

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

    console.log("Registered user: ", user)
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
