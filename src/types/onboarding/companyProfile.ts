export interface CompanyProfileRequest {
  email: string;
  password: string;
  division: "team";
  name: string;
  one_line_profile?: string;
  high_area_id: number; // 개인 회원가입과 동일하게 ID로 변경
  low_area_id: number;  // 개인 회원가입과 동일하게 ID로 변경
  recruiting_status?: string;
  team_division?: string; // 스타트업/창업 팀/예비 창업팀
  industry?: string; // 업종
  link?: string; // 회사 공식 웹사이트
}

export interface CompanyProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    user_id: number;
    service_id: number;
    email: string;
  };
}
