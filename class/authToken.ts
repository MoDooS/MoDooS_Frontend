class AuthToken {
  private _token: string | null;

  constructor() {
    this._token = null;
  }

  getToken() {
    return this._token;
  }

  setToken(newToken: string) {
    this._token = newToken;
  }

  deleteToken() {
    this._token = null;
  }
}

export const authToken = new AuthToken();
