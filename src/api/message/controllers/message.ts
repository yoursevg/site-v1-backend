import {factories} from '@strapi/strapi';


interface MessageRequestBody {
  content: string;
  sender: { id: number };
  seller: { id: number }
}

export default factories.createCoreController('api::message.message', ({strapi}) => ({
  create: async function (ctx) {

    const {content, sender, seller} = ctx.request.body as MessageRequestBody;


    if (!content || !sender) {
      return ctx.badRequest('Content and user are required.');
    }

    // Предполагается, что ID продавца вы можете получить из карточки товара
    const sellerId = seller.id;
    const userId = sender.id;

    // Проверяем, существует ли комната между пользователем и продавцом
    let room = await strapi.db.query('api::room.room').findOne({
      where: { users: [sellerId, userId] },
    });

    if (!room) {
      // Создаем комнату, если она не существует
      room = await strapi.entityService.create('api::room.room', {
        data: {
          users: [sellerId, userId],
        },
      });
    }

    // Создаем сообщение в комнате
    const message = await strapi.entityService.create('api::message.message', {
      data: {
        content,
        sender: userId,
        room: room.id,
        publishedAt: Date.now()
      },
    });

    // Отправляем событие через Socket.IO
    strapi.io.to(room.id.toString()).emit('new-message', message);

    // Возвращаем созданное сообщение
    return this.transformResponse(message);
  },
}));
