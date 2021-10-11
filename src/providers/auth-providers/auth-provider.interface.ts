export interface IAuthData {
  valid: boolean;
  email: string;
}

export interface IAuthProvider {
  validateToken(token: string): Promise<IAuthData>;
}
