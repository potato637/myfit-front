import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useNavigate } from "react-router-dom";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../validations/resetPasswordSchema";
import { sendVerificationCode, validateAuthCode } from "../../apis/onboarding";
import { resetPassword } from "../../apis/auth";
import { usePostLogout } from "../../hooks/settingQueries";

function ResetPasssword() {
  const navigate = useNavigate();
  const { mutate: logout } = usePostLogout();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const email = useWatch({ control, name: "email" }) || "";
  const domain = useWatch({ control, name: "domain" }) || "";
  const authCode = useWatch({ control, name: "authCode" }) || "";

  const fullEmail = `${email}@${domain}`;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail);

  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [isAuthInvalid, setIsAuthInvalid] = useState(false);

  useEffect(() => {
    if (!emailSent) {
      setCodeVerified(false);
      setIsAuthInvalid(false);
      return;
    }

    // 6자리 인증코드가 입력되면 자동으로 검증
    if (authCode.length === 6) {
      handleVerifyCode(authCode);
    } else {
      setCodeVerified(false);
      setIsAuthInvalid(false);
    }
  }, [authCode, emailSent]);

  const handleVerifyCode = async (code: string) => {
    try {
      console.log("🔐 인증코드 검증 요청:", {
        email: fullEmail,
        authCode: code,
      });
      const response = await validateAuthCode({
        email: fullEmail,
        authCode: code,
      });

      if (response.isSuccess) {
        setCodeVerified(true);
        setIsAuthInvalid(false);
        console.log("✅ 인증코드 검증 성공:", response.message);
      } else {
        setCodeVerified(false);
        setIsAuthInvalid(true);
        console.log("❌ 인증코드 검증 실패:", response.message);
      }
    } catch (error) {
      console.error("❌ 인증코드 검증 에러:", error);
      setCodeVerified(false);
      setIsAuthInvalid(true);
    }
  };

  const handleSendEmail = async () => {
    if (!isEmailValid) return;

    try {
      console.log("📧 비밀번호 재설정 이메일 발송 요청:", fullEmail);
      await sendVerificationCode({ email: fullEmail });
      setEmailSent(true);
      setCodeVerified(false);
      setIsAuthInvalid(false);
      console.log("✅ 비밀번호 재설정 이메일 발송 완료");
    } catch (error) {
      console.error("❌ 이메일 발송 실패:", error);
      // 에러가 발생해도 일단 진행 (개발 중)
      setEmailSent(true);
      setCodeVerified(false);
      setIsAuthInvalid(false);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log("🔒 비밀번호 재설정 요청:", {
        email: `${data.email}@${data.domain}`,
        authCode: data.authCode,
        newPassword: "***",
      });

      // 비밀번호 재설정 API 호출
      const response = await resetPassword({
        email: `${data.email}@${data.domain}`,
        authCode: data.authCode,
        newPassword: data.password,
      });

      if (response.isSuccess) {
        console.log("✅ 비밀번호 재설정 완료:", response.message);

        // 성공 시 로그인 페이지로 이동
        logout();
        navigate("/onboarding", {
          state: {
            message:
              response.message || "비밀번호가 성공적으로 변경되었습니다.",
          },
        });
      } else {
        throw new Error(response.message || "비밀번호 재설정에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("❌ 비밀번호 재설정 실패:", error);

      // 구체적인 에러 메시지 표시
      let errorMessage = "비밀번호 재설정에 실패했습니다.";

      if (error.response?.status === 400) {
        errorMessage =
          "인증코드가 유효하지 않거나 비밀번호 조건을 만족하지 않습니다.";
      } else if (error.response?.status === 404) {
        errorMessage = "가입되지 않은 이메일입니다.";
      } else if (error.response?.status === 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      alert(errorMessage);
    }
  };

  const TopBarContent = () => {
    return <span className="text-h2 text-ct-black-100">비밀번호 재설정</span>;
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <form onSubmit={handleSubmit(onSubmit)} className="px-[25.45px]">
        {/* 이메일 입력 */}
        <fieldset className="w-full mt-[16px]">
          <label
            htmlFor="email"
            className="block mb-[10px] text-sub1 text-ct-black-200"
          >
            이메일
          </label>
          <div className="flex w-full gap-[8px] items-center">
            {/* 이메일 입력 */}
            <div className="flex-1">
              <input
                id="email"
                {...register("email")}
                type="text"
                placeholder="이메일"
                className="w-full h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7] text-sub2 text-ct-gray-200"
              />
            </div>

            {/* @ 아이콘 */}
            <span className="w-[18px] text-center">@</span>

            {/* 도메인 입력 */}
            <div className="flex-[1.2]">
              <input
                id="emailDomain"
                {...register("domain")}
                type="text"
                placeholder="도메인 주소 입력"
                className="w-full h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7] text-sub2 text-ct-gray-200"
              />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sub2 mt-1">
              {errors.email.message}
            </p>
          )}
          {errors.domain && (
            <p className="text-red-500 text-sub2">{errors.domain.message}</p>
          )}
        </fieldset>

        {/* 인증번호 입력 */}
        <fieldset className="w-full mx-auto mt-[40px]">
          <label
            htmlFor="authCode"
            className="block mb-[10px] text-sub1 text-ct-black-200"
          >
            인증번호 입력
          </label>

          <div className="flex flex-col gap-[12px]">
            {/* 인증 발송 */}
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={!isEmailValid || emailSent}
              className={`w-full h-[44px] rounded-[10px] ${
                isEmailValid && !emailSent
                  ? "bg-ct-main-blue-100 text-white"
                  : "bg-ct-gray-100 text-ct-gray-300"
              }`}
            >
              <span className="text-sub2">이메일 인증 발송</span>
            </button>

            {/* 인증번호 입력칸 */}
            <div className="flex w-full gap-[8px]">
              <div className="relative flex-[2] h-[44px]">
                <input
                  id="authCode"
                  {...register("authCode")}
                  disabled={!emailSent}
                  type="text"
                  className={`w-full h-full rounded-[10px] px-3 pr-[36px] bg-[#F7F7F7] text-sub2 text-ct-gray-200 outline-none ring-0 focus:ring-0 focus:outline-none ${
                    isAuthInvalid
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder="인증번호 입력"
                />
                {authCode && emailSent && codeVerified && (
                  <img
                    src="/assets/setting/check.svg"
                    alt="확인됨"
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[16px] h-[16px]"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={handleSendEmail}
                disabled={!emailSent || codeVerified}
                className={`flex-[1] h-[44px] rounded-[10px] ${
                  !emailSent || codeVerified
                    ? "bg-ct-gray-100 text-ct-gray-300"
                    : "bg-ct-main-blue-100 text-white"
                }`}
              >
                <span className="text-sub2">재발송</span>
              </button>
            </div>

            {isAuthInvalid && (
              <p className="text-red-500 text-sub2">
                인증번호가 올바르지 않습니다.
              </p>
            )}
          </div>
        </fieldset>

        {/* 비밀번호 입력 */}
        <fieldset className="w-full mx-auto mt-[40px] mb-[127px] flex flex-col gap-[13px]">
          <label htmlFor="password" className="text-sub1 text-ct-black-200">
            새로운 비밀번호
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="새로운 비밀번호"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 text-ct-gray-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sub2">{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="새로운 비밀번호 확인"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 text-ct-gray-200"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sub2">
              {errors.confirmPassword.message}
            </p>
          )}
        </fieldset>

        {/* CTA 버튼 */}
        <div className="absolute bottom-[20px] w-[328px]">
          <BottomCTAButton
            type="submit"
            text="저장하기"
            onClick={() => {}}
            disabled={!isValid || isSubmitting || !codeVerified}
          />
        </div>
      </form>
    </TopBarContainer>
  );
}

export default ResetPasssword;
