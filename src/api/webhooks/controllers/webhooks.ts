module.exports = {
  async receiveWebhook(ctx) {
    try {
      // Парсим данные из входящего вебхука
      const { type, data } = ctx.request.body;

      // Проверяем, что тип вебхука - "user.created"
      if (type === 'user.created') {
        // Получаем данные из вебхука
        const email = data.email_addresses[0].email_address;
        const username = data.username;
        const first_name = data.first_name
        const last_name = data.last_name
        const id = data.id
        const profile_image_url = data.profile_image_url

        // Создаем тело запроса для создания пользователя
        const postData = {
          username,
          email,
          first_name,
          last_name,
          identificator: id,
          profile_image_url
        };

        // Check if the username or email already exists
        const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            username: postData.username,
          }
        });

        if (existingUser) {
          // If a user with the same username already exists, handle the error
          throw new Error('Username is already taken');
        }

        // Check if the email already exists
        const existingEmail = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            email: postData.email,
          }
        });

        if (existingEmail) {
          // If a user with the same email already exists, handle the error
          throw new Error('Email is already registered');
        }

        // Create a new user instance
        const newUser = await strapi.db.query('plugin::users-permissions.user').create({
          data: postData,
        });

        // Log success message
        console.log('New user created:', newUser);

        // Respond with a success message
        ctx.send({ message: 'User instance created successfully', user: newUser });
      }
    } catch (error) {
      // Handle unique constraint errors
      if (error.message.includes('username_unique_constraint')) {
        ctx.response.status = 400;
        ctx.send({ error: 'Username is already taken' });
      } else if (error.message.includes('email_unique_constraint')) {
        ctx.response.status = 400;
        ctx.send({ error: 'Email is already registered' });
      } else {
        // Handle other errors
        console.error('Error creating user:', error);
        ctx.response.status = 500;
        ctx.send({ error: 'Internal Server Error' });
      }
    }
  }
};
