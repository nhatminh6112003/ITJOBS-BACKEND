import database from "@src/config/database.config.js";

class AuthModel {
  constructor() {
    this.table = "users";
  }
  async findById(condition, column) {
    return database.findById(this.table, condition, column);
  }
  // async deleteById(condition){
  //   return database.deleteById(this.table,condition);
  // }
  async insert(data) {
    return database.insert(this.table, data);
  }
  async update(data, condition) {
    return database.update(this.table, data, condition);
  }
 
}

module.exports = new AuthModel();
