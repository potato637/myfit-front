export interface VerifyUserRequest {
  email: string;
  password: string;
  authCode: string;
}

export interface VerifyUserResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: null;
}