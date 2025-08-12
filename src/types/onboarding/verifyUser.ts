export interface VerifyUserRequest {
  email: string;
  password: string;
}

export interface VerifyUserResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: null;
}