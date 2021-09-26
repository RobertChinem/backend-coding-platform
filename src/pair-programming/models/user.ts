export interface Avatar {
  name: string;
  color: string;
}

export class User {
  avatar: Avatar;
  currentIDRoom: string;

  constructor(
    currentIDRoom: string,
    avatar: Avatar = { name: 'Anônimo', color: '#000000' },
  ) {
    this.avatar = avatar;
    this.currentIDRoom = currentIDRoom;
  }

  serialize(): Record<string, unknown> {
    return {
      avatar: this.avatar,
    };
  }
}
