'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class infoService extends Service {
  async getUserInfo() {
    const result = await this.app.mysql.select('users');
    return result;
  }
  async addUser(data) {
    const result = await this.app.mysql.insert('users', data);
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  async deleteUser(data) {
    const result = await this.app.mysql.delete('users', { _id: data });
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  async searchUser(data) {
    const result = await this.app.mysql.select('users', {
      where: data,
      columns: [ 'name', 'age', '_id' ],
    });
    return result;
  }
  async updateUser(data) {
    const row = {
      name: data.name,
      age: data.age,
    };
    const options = {
      where: {
        _id: data._id,
      },
    };
    const result = await this.app.mysql.update('users', row, options);
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  async getFile() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/image', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    return '/static/image/' + filename;
  }
}


module.exports = infoService;
