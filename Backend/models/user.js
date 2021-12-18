const db = require('../util/database');

module.exports = class User {
  constructor(name, email, number, password, collegename, collegeaddress) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.number = number;
    this.collegename = collegename;
    this.collegeaddress = collegeaddress;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, number, password, collegename, collegeaddress) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.number, user.password, user.collegename, user.collegeaddress]
    );
  }

  static fetchAll(user) {
    return db.execute('SELECT * FROM users');
  }
};
