import { IAuthProvider, IAuthData } from './auth-provider.interface';
import { OAuth2Client } from 'google-auth-library';

export class GoogleAuthProvider implements IAuthProvider {
  async validateToken(token: string): Promise<IAuthData> {
    const authData = {
      email: '',
      valid: true,
    };
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      authData.email = payload.email;
    } catch {
      authData.valid = false;
    } finally {
      return authData;
    }
  }
}
