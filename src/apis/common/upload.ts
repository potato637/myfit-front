import apiInstance from "../apiClient";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiInstance.post("/api/upload", formData); //주소 api에 맞게 수정하기
  return response.data.imageUrl; // 명세서에 맞게 response 수정하기
};
