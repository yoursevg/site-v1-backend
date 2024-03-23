export default {
  routes: [
    {
     method: 'POST',
     path: '/webhooks',
     handler: 'webhooks.receiveWebhook',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
