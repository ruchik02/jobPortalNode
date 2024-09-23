import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, lastName } = req.body;
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
    const user = await userModels.create({ name, email, password, lastName });
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
  } catch (error) {
    return next(error);
    // console.log(error);
    // res.status(400).send({
    //   message: "Error in Register Controller",
    //   sucess: false,
    //   error,
    // });
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ message: "Please provide all feild", statusCode: 404 });
  }
  //   find user by email
  const user = await userModels.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next({ message: "User not found", statusCode: 404 });
  }

  //   compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log(isMatch, "78")
   return next({ message: "Invalid username and password", statusCode: 404 });
  }
  console.log("82")
  // user.password = undefined;
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

// export const loginController = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     // validate email and password
//     if (!email || !password) {
//       return next({ message: "Please provide all feild", statusCode: 400 });
//     }

//     const user = await userModels.findOne({ email });
//     if (!user) {
//       return next({ message: "User not found", statusCode: 404 });
//     }
//     // compare password
//     const passwordMatch = await user.comparePassword(password);
//     if (!passwordMatch) {
//       return next({ message: "Invalid password", statusCode: 400 });
//     }

//     // again generate JWT token for security purposes in authentication we always generate token in both register and login APIs
//     const token = await user.createJWT();

//     return res.status(200).send({
//       message: "User logged in successfully",
//       success: true,
//       user,
//       token,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };
