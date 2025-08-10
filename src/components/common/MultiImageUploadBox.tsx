import { useRef, useState, useCallback } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { awsBucketName, awsIdentityPoolId, awsRegion } from "../../config/aws";

interface MultiImageUploadBoxProps {
  className?: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  S3Folder?: string;
}

function MultiImageUploadBox({
  className = "",
  images,
  onImagesChange,
  maxImages = 10,
  S3Folder = "",
}: MultiImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // S3 업로드 함수
  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      const s3Client = new S3Client({
        region: awsRegion,
        credentials: fromCognitoIdentityPool({
          clientConfig: { region: awsRegion },
          client: new CognitoIdentityClient({ region: awsRegion }),
          identityPoolId: awsIdentityPoolId,
        }),
        forcePathStyle: true, // 브라우저 호환성 개선
      });

      const fileName = `${
        S3Folder ? S3Folder + "/" : ""
      }${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;

      // File을 ArrayBuffer로 변환 (브라우저 호환성)
      const arrayBuffer = await file.arrayBuffer();

      const uploadParams = {
        Bucket: awsBucketName,
        Key: fileName,
        Body: new Uint8Array(arrayBuffer),
        ContentType: file.type,
        ContentDisposition: "inline",
      };

      console.log("🔄 S3 업로드 시작:", fileName);
      await s3Client.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${awsBucketName}.s3.${awsRegion}.amazonaws.com/${fileName}`;
      console.log("✅ S3 업로드 완료:", fileUrl);

      return fileUrl;
    } catch (error) {
      console.error("❌ S3 업로드 실패:", error);
      throw new Error(`업로드 실패: ${file.name}`);
    }
  };

  // 파일 처리 함수
  const handleFiles = async (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const fileArray = Array.from(files);
    const availableSlots = maxImages - images.length;
    const filesToProcess = fileArray.slice(0, availableSlots);

    if (fileArray.length > availableSlots) {
      alert(`${availableSlots}개의 이미지만 추가됩니다.`);
    }

    setIsUploading(true);

    try {
      const uploadPromises = filesToProcess.map(async (file) => {
        // 파일 검증
        if (!file.type.startsWith("image/")) {
          throw new Error(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name}의 크기가 10MB를 초과합니다.`);
        }

        return await uploadToS3(file);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);
    } catch (error: any) {
      console.error("이미지 업로드 실패:", error);
      alert(error.message || "이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    e.target.value = ""; // 같은 파일 재선택 가능하도록
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [images, maxImages, onImagesChange]
  );

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  // 이미지 순서 변경 (간단한 버전)
  // const handleMoveImage = (fromIndex: number, toIndex: number) => {
  //   const newImages = [...images];
  //   const [removed] = newImages.splice(fromIndex, 1);
  //   newImages.splice(toIndex, 0, removed);
  //   onImagesChange(newImages);
  // };

  return (
    <div className={`${className}`}>
      {/* 업로드된 이미지 그리드 */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`업로드된 이미지 ${index + 1}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              {/* 순서 표시 */}
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs rounded px-1">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 영역 */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-ct-main-blue-100 bg-ct-light-blue-100"
              : "border-ct-gray-200 hover:border-ct-gray-300"
          } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="text-ct-gray-300">
              <div className="animate-spin w-6 h-6 border-2 border-ct-main-blue-100 border-t-transparent rounded-full mx-auto mb-2"></div>
              업로드 중...
            </div>
          ) : (
            <div className="text-ct-gray-300">
              <div className="text-2xl mb-2">📷</div>
              <p className="text-body2">
                이미지를 선택하거나 드래그해서 추가하세요
              </p>
              <p className="text-body3 mt-1">
                {images.length}/{maxImages} • 최대 10MB • JPG, PNG
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiImageUploadBox;
