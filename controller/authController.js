import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  //   try {
  const { name, email, password } = req.body;
  //  validate
  if (!name) {
    next("Please provide name");
    //   return res.status(400).send({
    //     message: "Please provide name",
    //     sucess: false,
    //   });
  }
  if (!email) {
    next("Please provide email");
    //   return res.status(400).send({
    //     message: "Please provide email",
    //     sucess: false,
    //   });
  }
  if (!password) {
    next("Please provide password");
    //   return res.status(400).send({
    //     message: "Please provide password",
    //     sucess: false,
    //   });
  }
  const existingUser = await userModels.findOne({ email });
  if (existingUser) {
    next("Email already  register, Please Login");
    //   return res.status(200).send({
    //     success: false,
    //     message: "Email already  register, Please Login",
    //   });
  }
  const user = await userModels.create({ name, email, password });
  // token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created Successfully",
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
  //   }
  //   catch (error) {
  // next(error);
  // console.log(error);
  // res.status(400).send({
  //   message: "Error in Register Controller",
  //   sucess: false,
  //   error,
  // });
  //   }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide all fields");
  }
  //   find user by email
  const user = await userModels.findOne({
    email,
  }).select("+password");
  if (!user) {
    next("Invalid username and password");
  }

  //   compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username and password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    // user: {
    //   name: user.name,
    //   email: user.email,
    //   lastName: user.lastName,
    //   location: user.location,
    //   createAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // },
    user,
    token,
  });
};
