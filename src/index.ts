export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
  //   const { Server } = require("socket.io");
  //   const strapiServer = strapi.server.httpServer; // Strapi 4.x
  //   const io = new Server(strapiServer, {
  //     cors: {
  //       origin: "http://localhost:3000", // Your frontend application's URL
  //       methods: ["GET", "POST"], // The HTTP methods allowed during CORS requests
  //       credentials: true // Add this if you need to send cookies with cross-origin requests
  //     }
  //   });
  //
  //   io.on('connection', (socket) => {
  //     console.log(`Подключен новый пользователь: ${socket.id}`);
  //
  //     socket.on('join-room', (roomId) => {
  //       console.log(`Пользователь ${socket.id} присоединился к комнате ${roomId}`);
  //       socket.join(roomId);
  //     });
  //
  //     socket.on('chat-message', async (data) => {
  //       console.log(`Получено сообщение от ${data.senderId} для комнаты ${data.roomId}: ${data.content}`);
  //
  //       // Сохраняем сообщение в базе данных
  //       const message = await strapi.entityService.create('api::message.message', {
  //         data: {
  //           content: data.content,
  //           sender: data.senderId,
  //           room: data.roomId,
  //           publishedAt: Date.now()
  //         },
  //       });
  //
  //       // Транслируем сообщение всем в комнате
  //       io.to(data.roomId).emit('new-message', message);
  //     });
  //
  //     socket.on('disconnect', () => {
  //       console.log(`Пользователь ${socket.id} отключился`);
  //       // Здесь можно добавить дополнительную логику, например, обновление статуса пользователя в БД
  //     });
  //   });
  //
  //   strapi.io = io; // Делаем экземпляр Socket.IO доступным глобально через strapi.io
  },
};
