export const dummyRecruitList = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `[신입/경력] 사용자 경험을 바꾸는 프론트엔드 개발자 모집 ${i + 1}`,
  job: i % 2 === 0 ? "프론트엔드 개발자" : "백엔드 개발자", // 번갈아가며 직무 지정
  work_type: i % 3 === 0 ? "정규직" : "계약직",
  dead_line: `2025-07-${(i + 10).toString().padStart(2, "0")}`,
  writer: {
    name: `기업 ${i + 1}`,
    profile_img: "https://via.placeholder.com/32x32.png?text=👤",
  },
}));
