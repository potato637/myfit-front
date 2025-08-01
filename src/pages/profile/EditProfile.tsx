import ProfileImgUploader from "../../components/profile/ProfileImgUploader";

function EditProfile({
  setEditProfile,
  imageUrl,
}: {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
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
          <ProfileImgUploader imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
