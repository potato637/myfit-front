function EditProfile({
  setEditProfile,
}: {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCancelClick = () => {
    setEditProfile(false);
  };
  const handleCompleteClick = () => {
    setEditProfile(false);
  };

  return (
    <div className="fixed inset-0 bg-ct-white/50 z-[9999]">
      <div className="w-[335px] h-full mx-auto relative ct-center">
        <div className="flex justify-between items-center absolute top-[60px] left-0 right-0">
          <button
            className="text-sub1 text-ct-black-300"
            onClick={handleCancelClick}
          >
            취소
          </button>
          <span className="text-h2 text-ct-black-300">프로필</span>
          <button
            className="text-sub1 text-ct-black-300"
            onClick={handleCompleteClick}
          >
            완료
          </button>
        </div>
        <div className="ct-center flex-col gap-[36px]">
          <img
            src="/assets/profile/profileImage.png"
            alt="프로필 이미지"
            className="w-[251px] h-[251px] rounded-full object-cover"
          />
          <div className="ct-center gap-[10px] w-[135px] h-[38px] bg-ct-main-blue-100 rounded-[50px]">
            <img
              src="/assets/profile/profileImgChange.svg"
              alt="프로필 이미지 수정"
            />
            <span className="text-sub1 text-ct-white">수정</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
