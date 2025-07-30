import { useRef, useState, useEffect } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { awsBucketName, awsIdentityPoolId, awsRegion } from "../../config/aws";

interface VerifiedUploadBoxProps {
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  initialPreview?: string | null;
  onUploadSuccess?: (fileUrl: string) => void;
}

function VerifiedUploadBox({
  className = "",
  textClassName = "",
  disabled = false,
  initialPreview,
  onUploadSuccess,
}: VerifiedUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialPreview) setPreview(initialPreview);
  }, [initialPreview]);

  const handleBoxClick = () => {
    if (!disabled && !isUploading) inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!(file instanceof File)) {
      alert("파일 형식이 잘못되었습니다.");
      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);

      const key = `businesslicense/${file.name}`;

      const s3 = new S3Client({
        region: awsRegion,
        credentials: fromCognitoIdentityPool({
          identityPoolId: awsIdentityPoolId,
          client: new CognitoIdentityClient({ region: awsRegion }),
        }),
      });

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const command = new PutObjectCommand({
        Bucket: awsBucketName,
        Key: key,
        Body: uint8Array,
      });

      await s3.send(command);
      const fileUrl = `https://${awsBucketName}.s3.${awsRegion}.amazonaws.com/${key}`;
      alert("이미지 업로드에 성공했습니다.");
      onUploadSuccess?.(fileUrl);
    } catch (err: any) {
      console.error(err);
      alert(`업로드 중 오류가 발생했습니다: ${err.message}`);
      setPreview(initialPreview ?? null);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div
      className={`ct-center flex-col whitespace-pre-line ${
        disabled || isUploading ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onClick={handleBoxClick}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />

      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-full object-cover rounded-[8px]"
        />
      ) : (
        <>
          <div className={`text-center leading-normal ${textClassName}`}>
            불러오기
          </div>
          <img
            src="/assets/setting/plus.svg"
            alt="plus"
            className="mt-[10px] w-[24px] h-[24px]"
          />
        </>
      )}
    </div>
  );
}

export default VerifiedUploadBox;
