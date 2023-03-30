import bcrypt from "bcrypt";
import database from "@src/config/database.config.js";
import responseStatus from "@src/constants/responseStatus";
class BcryptHelpers {
  hashPassword(password) {
    return new Promise(async (resolve, reject) => {
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        resolve(hashPassword);
      } catch (e) {
        reject(e);
      }
    });
  }
  async comparePassword(res, table, data) {
    const {email,password}=data;
    const hashedPassword = await database.findById(table,{email,user_type_id:1}, [
      "password",
    ]);
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword[0].password);
    if (!isPasswordMatch) {
      return res.json(responseStatus.BAD_REQUEST);
    }
  }
}
const bcryptHelpers = new BcryptHelpers();
export default bcryptHelpers;
