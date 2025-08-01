import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .regex(/^[a-zA-Z0-9._%+-]+$/, "유효한 이메일 아이디 형식이 아닙니다."),
    domain: z
      .string()
      .min(1, "도메인을 입력해주세요")
      .regex(
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "유효한 도메인 형식이 아닙니다."
      ),
    authCode: z.string().min(1, "인증번호를 입력해주세요"),
    password: z.string().min(6, "비밀번호는 최소 6자 이상입니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;