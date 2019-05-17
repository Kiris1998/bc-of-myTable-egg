'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const user = await ctx.service.info.getUserInfo();
    ctx.body = { user };
  }
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.info.deleteUser(ctx.request.body._id);
    const text = res ? 'Delete successful' : 'Delete failed';
    ctx.body = text;
  }
  async add() {
    const { ctx } = this;
    const res = await ctx.service.info.addUser(ctx.request.body);
    ctx.body = { res };
  }
  async search() {
    const { ctx } = this;
    const res = await ctx.service.info.searchUser(ctx.request.body);
    console.log(res);
    ctx.body = { res };
  }
  async update() {
    const { ctx } = this;
    const res = await ctx.service.info.updateUser(ctx.request.body);
    ctx.body = { res };
  }
  async getFile() {
    const { ctx } = this;
    const res = await ctx.service.info.getFile();
    ctx.body = res;
  }
}

module.exports = HomeController;
