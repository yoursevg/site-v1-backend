// /src/types/strapi.d.ts
import { Server as SocketIOServer } from 'socket.io';

declare module '@strapi/strapi' {
  export interface Strapi {
    io: SocketIOServer;
  }
}
