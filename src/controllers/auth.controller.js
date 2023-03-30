import authService from "@src/services/auth.service.js";
import responseStatus from "@src/constants/responseStatus";
import JwtHelpers from "@src/helpers/jwt.helper";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import jwtDecode from "jwt-decode";
import role from "@src/constants/role";
dotenv.config();
const authController = {
  async register(req, res,next) {
    const data = req.body;

    try {
      const insertUser= await authService.createUser(data);
      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.log(error)
      next(error)
    }
  },


  //login jobseeker
  async login(req, res,next) {
    const data = req.body;
    try {
      // res.cookie('accessToken', accessToken, { httpOnly: true });
      //phải query từ database để xác thực tên tài khoản mật khẩu có đúng không sau đó mới ủy quyền
      const dataUser = await authService.authentication(data);
    
      const [{ password,refresh_token, ...rest }] = dataUser;

      const [accessToken, refreshToken] = await Promise.all([
        JwtHelpers.signAccessToken(rest),
        JwtHelpers.signRefreshToken(rest),
      ]);
      // const updateRefreshToken = await authService.updateRefeshToken({
      //   refreshToken,
      //   id: rest.id,
      // });
      // res.cookie("userRefreshToken", refreshToken, {
      //   maxAge: 3.154e10, // 1 year
      //   sameSite: "strict",
      //   secure: false,
      //   httpOnly: true,
      //   domain:"localhost"
      // });
      return res.json({
        ...responseStatus.SUCCESS,
       data:{accessToken,refreshToken,...rest}
      });
    } catch (error) {
      // return res.json({...responseStatus.BAD_REQUEST,error:error.message});
      next(error)
    }
  },
  // const currentTime = Math.floor(Date.now() / 1000);
  //     const refreshTokenExpiration = currentTime - 60;
  //     const expiredRefreshToken = jwt.sign({ sub: user.id },process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiration });

  async logout(req, res) {
    const { userRefreshToken } = req.cookies;
    try {
      const decoded =
        userRefreshToken &&
        (await jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET));
      const authUser = await authService.findUser(decoded);
      if (!authUser) {
        return res.status(404).send({ message: "User not found" });
      }
    
      const deleteRefeshToken = await authService.deleteRefeshToken({
        id: decoded.id,
      });
      res.cookie('userRefreshToken', '', { expires: new Date(0), httpOnly: true });
      res.clearCookie("userRefreshToken");
      return res.json({...responseStatus.SUCCESS,message:"Logout successful"});
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(200).json({ code: 401, message: error.message });
      } else if (error.name === "TokenExpiredError") {
        const decoded =  jwtDecode(userRefreshToken);
        const authUser = await authService.findUser(decoded);
        if (!authUser) {
          return res.json({ ...responseStatus.NOT_FOUND, error: "User not found" });
        }
        const deleteRefeshToken = await authService.deleteRefeshToken({
          id: decoded.id,
        });
        res.clearCookie("userRefreshToken");
        return res.json({...responseStatus.SUCCESS,message:"Token expired"});
      }
      return res.json(responseStatus.UNAUTHORIZED);
    }
  },

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    try {
      const decoded =
      refreshToken &&
        (await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
      const authUser = await authService.findUser(decoded);

      if (!authUser) {
        return res.json({ ...responseStatus.NOT_FOUND, error: "User not found" });

      }
      const { iat, exp, ...rest } = decoded;

      if (exp < Date.now() / 1000) {
        return res
          .status(200)
          .json({ code: 401, message: "Refresh token expired" });
      }
      const accessToken = await JwtHelpers.signAccessToken(rest);
      return res.json({ ...responseStatus.SUCCESS, data: { accessToken }});
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.json({...responseStatus.UNAUTHORIZED , message: "Refresh token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(200).json({ code: 401, message: error.message });
      }
      return res.json({message:error.message});
    }
  }
}
export default authController
