// middleware || next function

// const errorMiddleware = (err, req, res, next) => {
//   // console.log(err);
//   const defaultErrors = {
//     statusCode: 500,
//     message: err,
//   };
//   //   res.status(500).send({
//   //     success: false,
//   //     message: "Something went wrong",
//   //     err,
//   //   });
//   //   missing fields error
//   if (err.name === "ValidationError") {
//     defaultErrors.statusCode = 400;
//     defaultErrors.message = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(",");
//   }
// //   duplicate 
// if(err.code && err.code === 11000) {
//     defaultErrors.statusCode = 400
//     defaultErrors.message = `${Object.keys(err.keyValue)} fields has to be unique`
// }
//   res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
// };
// export default errorMiddleware;


//  const errorMiddleware = (err, req, res, next) => {
//   console.log(err);
//   const statusCode = err.statusCode || 500;

//   // Send the appropriate response with status code and error message
//   res.status(statusCode).send({
//     message: err.message || "Something went wrong",
//     success: false,
//     statusCode
//   });
// };
// export default errorMiddleware;

//error middleware || NEXT function
const errroMiddelware = (err, req, res, next) => {
  console.log(err);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };

  // missing filed error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }
  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errroMiddelware;