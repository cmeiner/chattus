export interface ServerToClientEvents {
  message: (message: string, from: { id: string; nickname: string }) => void;
  connected: (nickname: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  _error: (errorMessage: string) => void;
  // type: (nickname: string, room: string) => void;
  isTyping: (nickname: string, to: string) => void;
  isNotTyping: (to: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: (room: string) => void;
  isTyping: (nickname: string, to: string) => void;
  isNotTyping: (to: string) => void;
}

export interface InterServerEvents {}

export interface ServerSocketData {
  nickname: string;
}
