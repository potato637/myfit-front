import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import * as config from "../../config/aws";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUpdateProfileImage } from "../../hooks/mypageQueries";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

function ProfileImgUploader({ imageUrl }: { imageUrl: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useUpdateProfileImage();

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

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

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
        ACL: ObjectCannedACL.public_read,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      const publicImageUrl = `https://${config.awsBucketName}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;

      alert("이미지 업로드에 성공했습니다.");
      mutate({ profile_img: publicImageUrl });
    } catch (err: any) {
      console.error("이미지 업로드 실패: ", err);
    } finally {
      window.location.reload();
    }
  };

  const displayImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : imageUrl;

  return (
    <>
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
        className="w-[251px] h-[251px] rounded-full object-cover"
        onClick={handleImageClick}
      />
      <div
        className="ct-center gap-[10px] w-[135px] h-[38px] bg-ct-main-blue-100 rounded-[50px]"
        onClick={handleUpload}
      >
        <img
          src="/assets/profile/profileImgChange.svg"
          alt="프로필 이미지 수정"
        />
        <span className="text-sub1 text-ct-white">수정</span>
      </div>
    </>
  );
}

export default ProfileImgUploader;
