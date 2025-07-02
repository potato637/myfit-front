import ImageDisplay from "../../components/common/ImageDisplay";
import TopBar from "../../components/common/TopBar";
import BottomNav from "../../components/layouts/BottomNav";

const temp = "";

function RecruitAnnouncement() {
  return (
    <>
      <TopBar>
        <div className="flex items-center gap-[6px]">
          <div className="w-[24px] h-[24px] bg-[#d9d9d9] rounded-[10px]" />
          <span className="text-h1 font-Pretendard text-ct-black-100 tracking-[-0.31px]">
            위플랜
          </span>
        </div>
      </TopBar>
      <div className="flex flex-col pt-[66px] mb-[89px] px-[19px]">
        <div className="text-sub2 px-[5px] text-ct-main-blue-100">
          마감일자:2025.01.01
        </div>
        <ul className="flex flex-col mt-[12.5px]">
          <li className="flex gap-[24px] px-[5px] py-[13px] border-y border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              공고제목
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              Next.js와 함께 성장할 프론트엔드 엔지니어
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              구인 직무
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              프론트엔드 엔지니어
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 지역
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              서울특별시 강남구 테헤란로 311 (역삼역 도보 5분)
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              지원 조건
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              경력 1년 이상 (신입은 별도 인턴 전형 운영 예정) 필수: JavaScript,
              React, Next.js 사용 경험 우대: TypeScript, Storybook, Git 협업
              경험 디자인 시스템 구축 경험
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              급여
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              연봉 3,800만 원 ~ 6,000만 원
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px]">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 형태
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              정규직 (수습 3개월, 급여 동일 지급)
            </p>
          </li>
        </ul>
        {temp && (
          <ImageDisplay
            imageUrl="assets/onboarding/splash.jpg"
            alt="팀 상세 페이지"
            className="h-[397px] w-[349px] rounded-[16px] "
          />
        )}
        <div className="mt-[26px] flex justify-between">
          <img src="assets/recruit/bookmark(off).svg" alt="bookmark" />
          <button className="w-[132px] h-[34px] rounded-[16px] bg-ct-main-blue-100 text-sub2 font-Pretendard text-ct-white">
            채팅으로 문의
          </button>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
export default RecruitAnnouncement;
