import { Context, Next } from 'koa';
import { Strapi } from '@strapi/strapi';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({secretKey: process.env.CLERK_BACKEND_API_KEY});

export default (config, {strapi}: { strapi: Strapi }) => {
  return async (ctx: Context, next: Next) => {
    if (ctx.request.url.includes('/admin') || ctx.request.url.includes('/content-manager') ||
      ctx.request.url.includes("/i18n")) {
      return next();
    }

    strapi.log.info('In auth middleware.');

    if (ctx.request.header.authorization) {
      const sessionToken = ctx.request.header.authorization.split(' ')[1];

      try {
        const client = await clerkClient.base.verifySessionToken(sessionToken);

        if (client) {

          // If Clerk client is successfully verified, find or create a corresponding Strapi user
          const strapiUser = await findStrapiUserByClerkId(client.sub, strapi);

          if (strapiUser) {

            console.log(strapiUser)
            // Issue a Strapi JWT for the verified user
            ctx.state.user = strapiUser;
            const jwt = strapi.plugins['users-permissions'].services.jwt.issue({id: strapiUser.id});
            console.log(jwt)
            ctx.request.header.authorization = `Bearer ${jwt}`;
          } else {
            ctx.throw(401, 'User not found');
          }
        } else {
          ctx.throw(401, 'Invalid session token');
        }

        await next();
      } catch (error) {
        ctx.throw(401, 'Unauthorized: Invalid session token');
      }
    } else {
      await next();
    }
  };
};

async function findStrapiUserByClerkId(clerkId: string, strapi: Strapi) {

  const strapiUsers = await strapi.query('plugin::users-permissions.user').findMany({
    where: { identificator: clerkId },
    limit: 1,
  });

  const strapiUser = strapiUsers[0];

  if (!strapiUser) {
    throw new Error(`No Strapi user found for Clerk ID: ${clerkId}`);
  }

  return strapiUser;
}
