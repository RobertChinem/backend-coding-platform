import { User } from './user';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';

export interface Environment {
  language: string;
  sourceCode: string;
  stdin: string;
}

interface Message {
  content: string;
  author: Socket;
}

export class Room {
  private id: string;
  private users: Set<Socket>;
  private environment: Environment;
  private messages: Message[];

  constructor() {
    this.id = uuidv4();
    this.users = new Set<Socket>();
    this.environment = {
      language: '',
      sourceCode: '',
      stdin: '',
    };
    this.messages = [];
  }

  serialize(userInfos: Map<Socket, User>): Record<string, unknown> {
    return {
      id: this.id,
      users: Array.from(this.users).map((socket) => {
        return {
          id: socket.id,
          ...userInfos.get(socket).serialize(),
        };
      }),
      environment: this.environment,
      messages: this.messages.map(({ content, author }) => {
        return {
          content,
          author: author.id,
        };
      }),
    };
  }

  getId() {
    return this.id;
  }

  getEnvironment() {
    return this.environment;
  }

  getUsers() {
    return this.users;
  }

  getMessages() {
    return this.messages;
  }

  addUser(user: Socket) {
    this.users.add(user);
  }

  deleteUser(user: Socket) {
    this.users.delete(user);
  }

  notifyAllUsers(event: string, data: any) {
    for (const user of this.users) {
      user.emit(event, data);
    }
  }

  addNewMessage(message: Message) {
    this.messages.push(message);
  }

  updateEnvironment(environment: Environment) {
    this.environment = environment;
  }
}
