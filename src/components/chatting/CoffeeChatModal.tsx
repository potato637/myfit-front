import InformationBox from "../../components/chatting/InformationBox";
import MatchingButton from "../../components/chatting/MatchingButton";

function CoffeChatModal() {
  const status = "afterediting";
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
          status={status}
        />
      </div>
      <MatchingButton status={status} />
    </div>
  );
}
export default CoffeChatModal;
