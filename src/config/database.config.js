import mysql from "mysql2/promise";

class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'web_khambenh',
      connectionLimit: 10
    });
  }

  insert(table, data) {
    if (data) {
      const fields = Object.keys(data);
      const placeholders = fields.map(() => '?').join(', ');
      const sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`;
      const params = Object.values(data);
      return this.query(sql, params);
    }
  }

  update(table, data, condition) {
    if (data) {
      const handleCondition = Object.entries(condition).map(([key]) => `${key} = ?`);
      const params=Object.values({...data,...condition})
      const updates = Object.entries(data).map(([key]) => `${key} = ?`);
      const sql = `UPDATE ${table} SET ${updates.join(', ')}  WHERE ${handleCondition.join (" and ")}`;
      return this.query(sql, params);
    }
  }
  //condition của delete viết trong một object {id:"123",name:"minh"}
  async deleteById(table, condition) {
    const handleCondition=Object.entries(condition).map(([key]) => `${key} = ?`);
    const sql = `DELETE FROM ${table} WHERE ${handleCondition.join(" and ")}`;
    const params = Object.values(condition);
    return this.query(sql,params);
  }
  findById(table, condition,column='*') {
    const handleCondition=Object.entries(condition).map(([key]) => `${key} = ?`);
    const sql = `SELECT ${!column ? column.join(",") : column } FROM ${table} WHERE ${handleCondition.join(" and ")}`;
    const params = Object.values(condition);
    return this.query(sql,params);
  }

  query(sql, params) {
    return new Promise(async (resolve, reject) => {
      try {
        
        //const params = [id, status];
// const sql = 'UPDATE resume SET resume_active = (CASE WHEN id = ? THEN ? ELSE 1 END)';
        const [rows] = await this.pool.query(sql, params);

        resolve(rows);
      } catch (err) {
        reject(err)
      }
    });
  }

  // close() {
  //   this.pool.end((error) => {
  //     if (error) {
  //       console.error(error);
  //     }
  //   });
  // }
}

module.exports = Database.getInstance();