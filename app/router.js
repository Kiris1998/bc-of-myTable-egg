'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/userInfo', controller.home.index);
  router.post('/deleteInfo', controller.home.delete);
  router.post('/editInfo', controller.home.update);
  router.post('/searchInfo', controller.home.search);
  router.post('/userInfo', controller.home.add);
  router.post('/uploadFile', controller.home.getFile);
};
