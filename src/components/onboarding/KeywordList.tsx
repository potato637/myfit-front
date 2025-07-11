type KeywordListProps = {
  category: "프로그래밍" | "디자인" | "데이터 분석" | "마케팅";
  selectedKeywords: string[];
  onSelect: (keyword: string) => void;
};

const keywordMap: Record<KeywordListProps["category"], string[]> = {
  프로그래밍: [
    "React",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Django",
    "Spring Boot",
    "Firebase",
    "Flutter",
    "Swift",
    "Kotlin",
    "Python",
    "Java",
    "TypeScript",
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "GitHub",
    "GitLab",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "REST API",
    "GraphQL",
    "CI/CD",
    "WebSocket",
    "Realtime",
  ],
  디자인: [
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Sketch",
    "Protopie",
    "UX 설계",
    "사용자 플로우",
    "디자인 시스템 구축",
    "모바일 앱 디자인",
    "반응형 웹 디자인",
    "사용자 조사",
    "A/B 테스트",
  ],
  "데이터 분석": [
    "Excel",
    "Google Sheets",
    "SQL",
    "Python",
    "Pandas",
    "NumPy",
    "matplotlib",
    "R",
    "Google Analytics",
    "GA4",
    "Amplitude",
    "Tableau",
    "Looker",
    "Power BI",
    "데이터 시각화",
    "KPI 설정 및 관리",
    "퍼널 분석",
    "코호트 분석",
  ],
  마케팅: [
    "퍼포먼스 마케팅",
    "콘텐츠 마케팅",
    "SEO",
    "바이럴 캠페인",
    "브랜드 전략",
    "유튜브 마케팅",
    "인스타그램 마케팅",
    "틱톡 마케팅",
    "이메일 마케팅",
    "CRM",
    "AARRR 모델",
    "커뮤니티 운영",
    "리텐션 전략",
    "브랜딩 리뉴얼",
  ],
};

const KeywordList = ({
  category,
  selectedKeywords,
  onSelect,
}: KeywordListProps) => {
  return (
    <div className="flex flex-wrap gap-[8px] ml-3 pt-[10px]">
      {keywordMap[category].map((keyword) => (
        <button
          key={keyword}
          onClick={() => onSelect(keyword)}
          disabled={selectedKeywords.includes(keyword)}
          className={`px-[12px] py-[6px] rounded-[20px] text-body2 border ${
            selectedKeywords.includes(keyword)
              ? "bg-ct-main-blue-100 text-ct-white border-ct-main-blue-100"
              : "bg-ct-white text-ct-black-200 border-ct-gray-200"
          }`}
        >
          #{keyword}
        </button>
      ))}
    </div>
  );
};

export default KeywordList;
