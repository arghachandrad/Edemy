export const register = (req, res) => {
  console.log(req.body)
  res.status(200).json({
    message: "register",
  })
}
