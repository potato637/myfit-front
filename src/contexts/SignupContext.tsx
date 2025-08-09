import { createContext, useContext, useState, ReactNode } from 'react';

// 회원가입 단계별 데이터 타입 정의
interface SignupData {
  // 1-5단계: 기본 인증 정보 (공통)
  division: 'personal' | 'company' | null;
  email: string;
  password: string;
  
  // 6단계: 프로필 정보 (공통)
  name: string; // 개인명 또는 회사명
  oneLineProfile: string;
  highAreaId: number | null;
  lowAreaId: number | null;
  recruitingStatus: string;
  serviceId: number | null; // 회원가입 완료 후 받은 service_id
  
  // 개인 회원 전용 필드
  birthdate: string;
  highSector: string;
  lowSector: string;
  gradeStatus: string;
  educationLevel: string; // 최종 학력
  
  // 회사 회원 전용 필드
  teamDivision: string; // 스타트업/창업 팀/예비 창업팀
  industry: string; // 업종
  website: string; // 회사 공식 웹사이트
}

interface SignupContextType {
  // 데이터 상태
  signupData: SignupData;
  
  // 현재 단계
  currentStep: number;
  
  // 데이터 업데이트 함수들
  updateDivision: (division: 'personal' | 'company') => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateProfileInfo: (profileData: Partial<SignupData>) => void;
  
  // 단계 관리
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  
  // 초기화
  resetSignup: () => void;
  
  // 완료된 단계 체크
  isStepCompleted: (step: number) => boolean;
}

const initialSignupData: SignupData = {
  // 공통 필드
  division: null,
  email: '',
  password: '',
  name: '',
  oneLineProfile: '',
  highAreaId: null,
  lowAreaId: null,
  recruitingStatus: '',
  serviceId: null,
  
  // 개인 회원 전용 필드
  birthdate: '',
  highSector: '',
  lowSector: '',
  gradeStatus: '',
  educationLevel: '',
  
  // 회사 회원 전용 필드
  teamDivision: '',
  industry: '',
  website: '',
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);
  const [currentStep, setCurrentStep] = useState(1);

  // 개발용: 콘솔에서 현재 상태 확인
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).getSignupData = () => {
      console.log("📊 [Context] 현재 회원가입 데이터:", signupData);
      console.log("📊 [Context] 현재 단계:", currentStep);
      return { signupData, currentStep };
    };
  }

  const updateDivision = (division: 'personal' | 'company') => {
    console.log("📝 [Context] Division 업데이트:", division);
    setSignupData(prev => ({ ...prev, division }));
  };

  const updateEmail = (email: string) => {
    console.log("📝 [Context] Email 업데이트:", email);
    setSignupData(prev => ({ ...prev, email }));
  };

  const updatePassword = (password: string) => {
    console.log("📝 [Context] Password 업데이트: [HIDDEN]");
    setSignupData(prev => ({ ...prev, password }));
  };

  const updateProfileInfo = (profileData: Partial<SignupData>) => {
    console.log("📝 [Context] Profile 업데이트:", profileData);
    setSignupData(prev => ({ ...prev, ...profileData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetSignup = () => {
    setSignupData(initialSignupData);
    setCurrentStep(1);
  };

  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1: // SelectMembers
        return signupData.division !== null;
      case 2: // RegisterMethod
        return true; // 단순 선택 단계
      case 3: // 이메일 입력
        return signupData.email !== '';
      case 4: // 인증코드 (별도 상태 필요)
        return true; // 임시
      case 5: // 비밀번호
        return signupData.password !== '';
      case 6: // 프로필 정보 (개인/회사별 다른 필수 조건)
        if (signupData.division === 'personal') {
          return signupData.name !== '' && 
                 signupData.oneLineProfile !== '' && 
                 signupData.birthdate !== '';
        } else if (signupData.division === 'company') {
          return signupData.name !== '' && 
                 signupData.oneLineProfile !== '' && 
                 signupData.teamDivision !== '';
        }
        return false;
      default:
        return false;
    }
  };

  const value: SignupContextType = {
    signupData,
    currentStep,
    updateDivision,
    updateEmail,
    updatePassword,
    updateProfileInfo,
    nextStep,
    prevStep,
    goToStep,
    resetSignup,
    isStepCompleted,
  };

  return (
    <SignupContext.Provider value={value}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};