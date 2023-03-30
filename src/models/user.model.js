import database from "@src/config/database.config.js"

class UserModel  {
    constructor() {
      this.table="users";
    }
  async getAllUser() {
    return  database.query(`SELECT * FROM ${this.table}`);
  }
  async findById(condition,column) {
    return  database.findById(this.table,condition,column);
  }

  async insert(data) {
    return  database.insert(this.table,data);
  }
  async update(data,condition) {
    return  database.update(this.table,data,condition);
  }
//   static findById(id) {
//     return this.query('SELECT * FROM users WHERE id = ?', [id]);
//   }

  // static create(data) {
  //   return this.insert(this.table,data);
  // }

//   static update(id, data) {
//     return this.query('UPDATE users SET ? WHERE id = ?', [data, id]);
//   }

//   static delete(id) {
//     return this.query('DELETE FROM users WHERE id = ?', [id]);
//   }
}

// const User = require('./models/user');

// // Get all users
// User.getAll().then((users) => {
//   console.log(users);
// }).catch((error) => {
//   console.error(error);
// });

// // Find user by id
// User.findById(1).then((user) => {
//   console.log(user);
// }).catch((error) => {
//   console.error(error);
// });

// // Create a new user
// User.create({
//   name: 'John',
//   email: 'john@example.com'
// }).then((id) => {
//   console.log(`New user created with id: ${id}`);
// }).catch((error) => {
//   console.error(error);
// });

// // Update an existing user
// User.update(1, {
//   name: 'Jane'
// }).then((affectedRows) => {
//   console.log(`${affectedRows} rows affected`);
// }).catch((error) => {
//   console.error(error);
// });

// // Delete a user
// User.delete(1).then((affectedRows) => {
//   console.log(`${affectedRows} rows affected`);
// }).catch((error) => {
//   console.error(error);
// });

// // Close connection
// User.close();
module.exports =new UserModel();