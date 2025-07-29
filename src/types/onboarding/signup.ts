export interface SignUpRequest {
  email: string;
  password: string;
  division: "personal" | "business";
  name: string;
  one_line_profile?: string;
  birth_date?: string; // YYYY-MM-DD 형식
  high_area_id: number;
  low_area_id: number;
  recruiting_status?: string;
  high_sector?: string;
  low_sector?: string;
  grade_status?: string;
}

export interface SignUpResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    user_id: number;
    service_id: number;
    email: string;
  };
}
