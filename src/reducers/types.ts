export interface User {
  name: string;
  email: string;
  photoUrl: string;
}

export interface Message {
  id: string;
  from: string;
  text: string;
  createdAt: any;
}

export interface Dialog {
  messages: Message[];
  user1: User;
  user2: User;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

export interface MessagesState {
  dialog: Dialog | null;
  loading: boolean;
  error: any;
}

export interface SendMessageState {
  status: boolean;
  loading: boolean;
  error: any;
}

export interface DialogInfo {
  id: string;
  anotherUser: User;
  messageText: string;
  messageDate: any;
}

export interface DialogsState {
  dialogs: DialogInfo[];
  loading: boolean;
  error: any;
}

export interface State {
  user: UserState;
  users: UsersState;
  messages: MessagesState;
  sendMessage: SendMessageState;
  dialogs: DialogsState;
}
