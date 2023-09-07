'use strict';

const helper = require('../services/helper')
/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
      async find(ctx) {
        console.log('custom controller api::order.order');
        console.log('userId: ' + ctx.state.user.id);
        const {filters} = ctx.query;
        ctx.query = {
          ...ctx.query,
          filters: {
            ...filters,
            userId: ctx.state.user.id
          }
        };
        console.log(filters);
        // @ts-ignore
        return await super.find(ctx);
      },
      async create(ctx) {
        ctx.request.body.data = {
            ...ctx.request.body.data,
            userId: ctx.state.user.id,
            orderId: helper.generateOrderID(ctx.state.user.id),  //orderID format: 'userID-Date.now()'.toBase64
        }
        // @ts-ignore
        const response = await super.create(ctx);
        return response;
      },
      async update(ctx) {
        if (!ctx.state.user || !ctx.state.user.id) {
          return ctx.response.status = 401;
        }
        const {filters} = ctx.query;
        ctx.query = {
          ...ctx.query,
          filters: {
            ...filters,
            userId: ctx.state.user.id
          }
        };
        // @ts-ignore
        return await super.update(ctx);
      }
}));
 