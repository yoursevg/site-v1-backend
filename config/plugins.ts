module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  'fuzzy-search': {
    enabled: true,
    config: {
      contentTypes: [{
        uid: "api::post.post",
        modelName: "post",
        queryConstraints: {
          populate: true,
        },
        fuzzysortOptions: {
          characterLimit: 500,
          keys: [
            {
              name: "title",
              weight: 200,
            },
            {
              name: "description",
              weight: -200,
            },
          ],
        },
      }],
    },
  },
  // ...
});
