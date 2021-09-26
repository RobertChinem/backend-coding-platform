import { Environment } from './pair-programming/models/room';
import { Avatar } from './pair-programming/models/user';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import PairProgrmammingService from './pair-programming';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: Socket) {
    console.log(`disconnect: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connection: ${client.id}`);
  }

  @SubscribeMessage('create-room')
  createRoom(client: Socket) {
    PairProgrmammingService.createRoom(client);
  }

  @SubscribeMessage('enter-room')
  enterRoom(client: Socket, IDRoom: string) {
    PairProgrmammingService.enterRoom(client, IDRoom);
  }

  @SubscribeMessage('new-message')
  handleNewMessage(client: Socket, message: { content: string }) {
    PairProgrmammingService.handleNewMessage(client, message);
  }

  @SubscribeMessage('update-user-info')
  updateUserInfo(client: Socket, { avatar }: { avatar: Avatar }) {
    PairProgrmammingService.updateUserInfo(client, { avatar });
  }

  @SubscribeMessage('update-environment')
  handleChangeEnvironment(client: Socket, environment: Environment) {
    PairProgrmammingService.handleChangeEnvironment(client, environment);
  }
}
