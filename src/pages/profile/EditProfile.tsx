import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import * as config from "../../config/aws";
import { useUpdateProfileImage } from "../../hooks/mypageQueries";
import ProfileImgUploader from "../../components/profile/ProfileImgUploader";

function EditProfile({
  imageUrl,
  setEditProfile,
}: {
  imageUrl: string;
  setEditProfile: (value: boolean) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  const s3Client = new S3Client({
    region: config.awsRegion,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: config.awsRegion }),
      identityPoolId: config.awsIdentityPoolId,
    }),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    try {
      const fileName = `userProfile/${uuidv4()}-${selectedFile.name.replace(
        /\s/g,
        "_"
      )}`;

      const arrayBuffer = await selectedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const params = {
        Bucket: config.awsBucketName,
        Key: fileName,
        Body: uint8Array,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      return `https://${config.awsBucketName}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
    } catch (err) {
      console.error("이미지 업로드 실패: ", err);
      return null;
    }
  };

  const handleCompleteClick = async () => {
    if (!selectedFile) {
      setEditProfile(false);
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        await updateProfileImage({ profile_img: imageUrl });
      }
      setEditProfile(false);
      window.location.reload(); // 페이지 새로고침으로 변경사항 반영
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelClick = () => {
    setEditProfile(false);
  };

  const displayImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : imageUrl;

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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <img
            src={displayImageUrl}
            alt="프로필 이미지"
            className="w-[251px] h-[251px] rounded-full object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <div
            className="ct-center gap-[10px] w-[135px] h-[38px] bg-ct-main-blue-100 rounded-[50px] cursor-pointer"
            onClick={handleCompleteClick}
          >
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
