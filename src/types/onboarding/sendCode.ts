// 이메일 인증 코드 전송 요청
export interface SendCodeRequest {
  email: string;
}

// 성공 응답
export interface SendCodeResponse {
  message: string; // "인증번호가 전송되었습니다."
  expiresIn: number; // 인증번호 유효 시간 (초 단위)
}

// 오류 응답 (400 또는 500)
export interface SendCodeError {
  message: string; // "이미 가입된 메일입니다." 또는 "이메일 전송에 실패했습니다."
}
