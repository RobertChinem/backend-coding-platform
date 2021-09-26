import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  content: string;
  author: string;
}

interface Room {
  followers: Socket[];
  messages: Message[];
}

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  static messages: any[] = [];
  static wsClients: Set<Socket> = new Set<Socket>();
  static rooms: Map<string, Room> = new Map<string, Room>();

  handleDisconnect(client: Socket) {
    // console.log(`cliente desconectado: ${client.id}`);
    ChatGateway.wsClients.delete(client);
  }
  handleConnection(client: Socket) {
    // console.log(`cliente conectado: ${client.id}`);
    ChatGateway.wsClients.add(client);
  }
  afterInit(server: Server) {
    // console.log('server iniciado');
  }

  @SubscribeMessage('new-message')
  handleMessage(
    _,
    { message, IDRoom }: { message: Message; IDRoom: string },
  ): void {
    ChatGateway.rooms.get(IDRoom).messages.push(message);
    ChatGateway.rooms.get(IDRoom).followers.forEach((follower) => {
      follower.emit('new-message', ChatGateway.rooms.get(IDRoom).messages);
    });
  }

  @SubscribeMessage('login')
  handleLogin(client: Socket, { IDRoom }: { IDRoom: string }) {
    ChatGateway.rooms.get(IDRoom).followers.push(client);
    client.emit('login', {
      messages: ChatGateway.rooms.get(IDRoom).messages,
      IDRoom,
    });
  }

  @SubscribeMessage('create-room')
  handleCreateRoom(client: Socket): void {
    const IDRoom = uuidv4();
    ChatGateway.rooms.set(IDRoom, {
      followers: [client],
      messages: [],
    });
    client.emit('create-room', IDRoom);
  }
}
