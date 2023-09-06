'use strict';

const { nanoid } = require('nanoid');
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
            orderId: nanoid(),
        }
        // @ts-ignore
        const response = await super.create(ctx);
        return response;
      }
}));
 