import InformationBox from "../InformationBox";

function AcceptModal() {
  return (
    <div className="w-full h-[498px] rounded-[15px] bg-ct-white flex flex-col items-center">
      <img
        src="/assets/chatting/coffechatlogo.svg"
        alt="커피챗 로고"
        className="w-[80.53px] h-[80.53px]"
      />
      <span className="text-h2 text-ct-black-200 mt-[4.24px]">
        만나서 얘기해보면 더 재밌을 것 같아요
      </span>
      <div className="mt-[21px] flex">
        <img src="/assets/chatting/manprofile.svg" alt="남성프로필" />
        <img src="/assets/chatting/womanprofile.svg" alt="여성프로필" />
      </div>
      <div className="mt-[25px]">
        <InformationBox
          date="2025.05.21 토"
          time="PM 03:30"
          place="서울시 용산구 마핏카페"
        />
        <img
          src="/assets/chatting/disablecheck.svg"
          alt="비활성 체크"
          className="absolute top-[10px] right-[10px]"
        />
      </div>
      <button className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-main-blue-200 text-ct-white">
        수락 하기
      </button>
      <button className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300">
        거절 하기
      </button>
    </div>
  );
}
export default AcceptModal;
