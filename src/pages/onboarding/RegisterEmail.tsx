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

function RegisterEmail() {
  const navigate = useNavigate();
  const memberType = localStorage.getItem("memberType");

  useEffect(() => {
    if (!memberType) navigate("/onboarding/selectmembers");
  }, [memberType, navigate]);

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

  const expectedCode = "123456";

  useEffect(() => {
    if (!emailSent) {
      setCodeVerified(false);
      setIsAuthInvalid(false);
      return;
    }

    if (authCode === expectedCode) {
      setCodeVerified(true);
      setIsAuthInvalid(false);
    } else if (authCode.length > 0) {
      setCodeVerified(false);
      setIsAuthInvalid(true);
    } else {
      setCodeVerified(false);
      setIsAuthInvalid(false);
    }
  }, [authCode, emailSent]);

  const handleSendEmail = () => {
    setEmailSent(true);
    setCodeVerified(false);
    setIsAuthInvalid(false);
  };

  const onSubmit = (data: RegisterEmailFormData) => {
    if (memberType === "individual") {
      navigate("/onboarding/profile-register", { state: { data } });
    } else {
      navigate("/onboarding/company-profile-register", { state: { data } });
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
            새로운 비밀번호
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="새로운 비밀번호"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px]"
          />
          {errors.password && (
            <p className="text-red-500 text-sub2">{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="새로운 비밀번호 확인"
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
