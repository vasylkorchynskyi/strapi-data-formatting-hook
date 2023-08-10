'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('date-format')
      .service('myService')
      .getWelcomeMessage();
  },
});
