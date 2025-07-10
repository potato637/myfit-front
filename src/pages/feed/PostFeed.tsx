import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import KeywordInput from "../../components/feed/KeywordInput";
import BottomNav from "../../components/layouts/BottomNav";

const TopBarContent = () => {
  return (
    <div className="relative w-full ct-center">
      <span className="text-ct-black-100 text-h1">게시글 추가 </span>
      <div className="absolute right-[22px]">
        <span className="text-sub2 text-ct-gray-200">완료</span>
      </div>
    </div>
  );
};

function PostFeed() {
  return (
    <>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="flex flex-col px-[16px] ">
          {/* ✅ 이미지 업로드 영역 */}
          <div className="flex flex-col mb-[19px]">
            {/* 안내 텍스트 */}
            <ImageUploadBox
              className="w-full aspect-square rounded-[5px] bg-ct-gray-100 overflow-hidden"
              textClassName="text-body3 text-ct-gray-300"
            />
          </div>
          {/* ✅ 내용 입력 영역 */}
          <div className="mb-[29px] pl-3">
            <p className="text-sub1 font-semibold text-ct-black-200 mb-[11px]">
              내용 입력
            </p>
            <textarea
              maxLength={1000}
              placeholder="내용을 아침엔 트렌드 체크, 점심 전엔 경쟁 서비스 분석, 오후엔 사용 자 리서치 인터뷰. 집중하려면 역시 인사동 카페 자유로운 시간을 보내며 루틴 채워가기!"
              className="w-full h-[112px] text-body1 text-ct-black-200 resize-none outline-none placeholder:text-ct-gray-300 bg-transparent"
            />
            <KeywordInput />
          </div>
        </div>{" "}
        <BottomNav />
      </TopBarContainer>
    </>
  );
}
export default PostFeed;
