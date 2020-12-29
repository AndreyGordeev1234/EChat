export interface User {
  name: string;
  email: string;
  photoUrl: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export interface State {
  user: UserState;
}
