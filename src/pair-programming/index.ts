import { Socket } from 'socket.io';
import { Environment, Room } from './models/room';
import { Avatar, User } from './models/user';

enum events {
  RoomCreated = 'room-created',
  RoomUpdated = 'room-updated',
  UserInfoUpdated = 'user-info-updated',
  MessagesUpdated = 'messages-updated',
  EnvironmentUpdated = 'environment-updated',
}

export default class PairProgrmammingService {
  static rooms: Map<string, Room> = new Map<string, Room>();
  static userInfos: Map<Socket, User> = new Map<Socket, User>();

  static createRoom(client: Socket) {
    const room = new Room();
    client.emit(events.RoomCreated, {
      IDRoom: room.getId(),
    });
    PairProgrmammingService.rooms.set(room.getId(), room);
    PairProgrmammingService.enterRoom(client, room.getId());
  }

  static enterRoom(client: Socket, IDRoom: string) {
    const user = new User(IDRoom);
    const room = PairProgrmammingService.rooms.get(IDRoom);
    PairProgrmammingService.userInfos.set(client, user);
    room.addUser(client);
    room.notifyAllUsers(
      events.RoomUpdated,
      room.serialize(PairProgrmammingService.userInfos),
    );
  }

  static updateUserInfo(client: Socket, { avatar }: { avatar: Avatar }) {
    const user = PairProgrmammingService.userInfos.get(client);
    user.avatar = avatar;
    const room = PairProgrmammingService.rooms.get(user.currentIDRoom);
    room.notifyAllUsers(
      events.RoomUpdated,
      room.serialize(PairProgrmammingService.userInfos),
    );
  }

  static handleNewMessage(client: Socket, message: { content: string }) {
    const { currentIDRoom } = PairProgrmammingService.userInfos.get(client);
    const room = PairProgrmammingService.rooms.get(currentIDRoom);
    room.addNewMessage({ content: message.content, author: client });
    room.notifyAllUsers(
      events.MessagesUpdated,
      room.getMessages().map(({ content, author }) => {
        return {
          content,
          author: author.id,
        };
      }),
    );
  }

  static handleChangeEnvironment(client: Socket, environment: Environment) {
    const { currentIDRoom } = PairProgrmammingService.userInfos.get(client);
    const room = PairProgrmammingService.rooms.get(currentIDRoom);

    room.updateEnvironment(environment);
    room.notifyAllUsers(events.EnvironmentUpdated, room.getEnvironment());
  }
}
