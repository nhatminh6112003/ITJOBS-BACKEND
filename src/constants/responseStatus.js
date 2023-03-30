//SUCCESS
const responseStatus = {
    //Sử dụng khi GET một tài nguyên
  SUCCESS: {
    isSuccess: true,
    status: 200,
    message: "Success !",
  },
  //Sử dụng khi tạo một tài nguyê<n></n>
  CREATED: {
    isSuccess: true,
    status: 201,
    message: "Created !",
  },
  ACCEPTED: {
    isSuccess: true,
    status: 202,
    message: "Accepted !",
  },
  //Thường sử dụng khi xóa một tài nguyên
  NO_CONTENT: {
    isSuccess: true,
    status: 204,
    message: "No Content",
  },
  // BAD_REQUEST
  BAD_REQUEST: {
    isSuccess: false,
    status: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    isSuccess: false,
    status: 401,
    message: "Unauthorized !",
  },
  FORBIDDEN: {
    isSuccess: false,
    status: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    isSuccess: false,
    status: 404,
    message: "Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    isSuccess: false,
    status: 500,
    message: "Internal Server Error",
  },
};
export default responseStatus