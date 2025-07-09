function CancelModal() {
  return (
    <div className="flex flex-col ct-center mt-[31px] mb-[20px]">
      <img
        src="/assets/chatting/bluecalender.svg"
        alt="캘린더 아이콘"
        className="w-[33px] h-[34px]"
      />
      <span className="mt-[4px] text-sub2 text-ct-black-100">
        정말 취소하시겠어요?
      </span>
      <span className="text-[15px] font-[400] text-ct-gray-300">
        취소된 커피챗은 되돌릴 수 없습니다.
      </span>
      <div className="flex gap-[12px] mt-[30px]">
        <button className="w-[142px] h-[42px] rounded-[100px] bg-ct-gray-200 text-ct-white text-sub2">
          취소 할래요
        </button>
        <button className="w-[142px] h-[42px] rounded-[100px] bg-ct-main-blue-200 text-ct-white text-sub2">
          안 할래요
        </button>
      </div>
    </div>
  );
}
export default CancelModal;
