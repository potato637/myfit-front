import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useNavigate } from "react-router-dom";
import {
  RegisterEmailFormData,
  registerEmailSchema,
} from "../../validations/registerEmailSchema";
import { useSignup } from "../../contexts/SignupContext";
import { sendVerificationCode, validateAuthCode, verifyUser } from "../../apis/onboarding";
import { toast } from "react-toastify";

function RegisterEmail() {
  const navigate = useNavigate();
  const { signupData, updateEmail, updatePassword, nextStep } = useSignup();

  useEffect(() => {
    if (!signupData.division) navigate("/onboarding/selectmembers");
  }, [signupData.division, navigate]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterEmailFormData>({
    resolver: zodResolver(registerEmailSchema),
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
      console.log("🔐 인증코드 자동 검증 요청:", {
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
        console.log("✅ 인증코드 자동 검증 성공:", response.message);
      } else {
        setCodeVerified(false);
        setIsAuthInvalid(true);
        console.log("❌ 인증코드 자동 검증 실패:", response.message);
      }
    } catch (error) {
      console.error("❌ 인증코드 자동 검증 에러:", error);
      setCodeVerified(false);
      setIsAuthInvalid(true);
    }
  };

  const handleSendEmail = async () => {
    if (!isEmailValid) return;

    try {
      console.log("📧 이메일 인증 발송 요청:", fullEmail);
      await sendVerificationCode({ email: fullEmail });
      setEmailSent(true);
      setCodeVerified(false);
      setIsAuthInvalid(false);
      console.log("✅ 이메일 인증 발송 완료");
    } catch (error) {
      console.error("❌ 이메일 인증 발송 실패:", error);
      // 에러가 발생해도 일단 진행 (개발 중)
      setEmailSent(true);
      setCodeVerified(false);
      setIsAuthInvalid(false);
    }
  };

  const onSubmit = async (data: RegisterEmailFormData) => {
    try {
      const fullEmailAddress = `${data.email}@${data.domain}`;
      
      // 사용자 검증 API 호출
      console.log("🔐 사용자 검증 API 호출:", { email: fullEmailAddress, password: data.password });
      const response = await verifyUser({
        email: fullEmailAddress,
        password: data.password
      });

      if (response.isSuccess) {
        // 검증 성공 시 SignupContext에 이메일과 비밀번호 저장
        updateEmail(fullEmailAddress);
        updatePassword(data.password);
        nextStep();

        if (signupData.division === "personal") {
          navigate("/onboarding/profile-register");
        } else {
          navigate("/onboarding/company-profile-register");
        }
      } else {
        // 검증 실패 시 에러 메시지 표시
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("❌ 사용자 검증 실패:", error);
      
      // 서버 에러 응답 처리
      if (error.response?.status === 400) {
        toast.error("비밀번호가 유효하지 않습니다.");
      } else if (error.response?.status === 409) {
        toast.error("이미 회원가입된 이메일입니다.");
      } else if (error.response?.status === 500) {
        toast.error("서버에 문제가 발생하였습니다.");
      } else {
        toast.error("검증 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <TopBarContainer
      TopBarContent={
        <span className="text-h2 font-Pretendard text-ct-black-100">
          이메일로 회원가입
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="px-[25.45px]">
        {/* 이메일 입력 */}
        <fieldset className="w-full mt-[30px]">
          <label
            htmlFor="email"
            className="block mb-[10px] text-sub1 font-sans text-ct-black-200"
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
                className="w-full h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7]"
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
                className="w-full h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7]"
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
        <fieldset className="w-full mt-[50px]">
          <label
            htmlFor="authCode"
            className="block mb-[10px] text-sub1 font-sans text-ct-black-200"
          >
            인증번호 입력
          </label>
          <div className="flex flex-col gap-[12px]">
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
              이메일 인증 발송
            </button>

            <div className="flex w-full gap-[8px]">
              <div className="relative flex-[2] h-[44px]">
                <input
                  id="authCode"
                  {...register("authCode")}
                  disabled={!emailSent}
                  type="text"
                  className={`w-full h-full rounded-[10px] px-3 pr-[36px] bg-[#F7F7F7] outline-none ring-0 focus:ring-0 focus:outline-none ${
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
                재발송
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
        <fieldset className="w-full mt-[50px] mb-[127px] flex flex-col gap-[13px]">
          <label
            htmlFor="password"
            className="text-sub1 font-sans text-ct-black-200"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="비밀번호"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px]"
          />
          {errors.password && (
            <p className="text-red-500 text-sub2">{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="비밀번호 확인"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sub2">
              {errors.confirmPassword.message}
            </p>
          )}
        </fieldset>

        {/* CTA 버튼 */}
        <div className="mt-[127px]">
          <BottomCTAButton
            type="submit"
            text="다음 단계로 이동"
            onClick={() => {}}
            disabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </TopBarContainer>
  );
}

export default RegisterEmail;
