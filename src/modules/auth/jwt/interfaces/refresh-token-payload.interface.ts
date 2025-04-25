export interface RefreshTokenPayload {
  id: number;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}
