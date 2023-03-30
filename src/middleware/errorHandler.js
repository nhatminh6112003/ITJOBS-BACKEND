const errorHandler = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  // if(err.code==11000){
  //     err.statusCode=400;
  //     for (const p in err.keyValue) {
  //         err.message=`${p} have to be unique`
  //     }
  // }
  const messageError = err.message;
  res.status(err.statusCode).json({
    isSuccess: false,
    message: messageError,
    status:err.statusCode
  });
};
export default errorHandler;
