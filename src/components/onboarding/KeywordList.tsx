type KeywordListProps = {
  category: "프로그래밍" | "디자인" | "데이터 분석" | "마케팅" | "제품&서비스" | "협업&조직문화" | "성과" | "창업&리더십" | "콘텐츠" | "프로젝트" | "외부경험&대외활동" | "자격&교육";
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
  "제품&서비스": [
    "MVP 개발",
    "프로토타이핑",
    "사용자 인터뷰",
    "서비스 운영",
    "피봇 경험",
    "제품 런칭",
    "기능 개선",
    "고객 요구 반영",
    "유저 피드백 수집",
    "신규 서비스 기획",
  ],
  "협업&조직문화": [
    "애자일 개발 경험",
    "스크럼 / 스프린트",
    "노션 / Slack / Jira 사용",
    "협업툴 활용",
    "원격근무 경험",
    "크로스팀 협업",
    "문서화 습관",
    "회고 주도",
    "린 스타트업 실천",
    "의사결정 참여",
  ],
  "성과": [
    "MAU 성장",
    "매출 증가 기여",
    "고객 유지율 개선",
    "앱 다운로드 수",
    "투자 유치 보조",
    "대외 수상",
    "앱스토어 피처드",
    "유저 만족도 NPS 상승",
  ],
  "창업&리더십": [
    "창업 경험",
    "팀 리딩 경험",
    "조직 빌딩 참여",
    "사업계획서 작성",
    "법인 설립 경험",
    "피치덱 제작",
    "IR 발표",
    "스타트업 경진대회 참가",
    "초기 사업모델 설계",
    "투자자 미팅 경험",
  ],
  "콘텐츠": [
    "블로그 운영",
    "뉴스레터 발행",
    "기술문서 작성",
    "발표 / 강의 경험",
    "오픈소스 참여",
    "유튜브 운영",
    "인스타 운영",
    "커뮤니티 기여",
    "SNS 콘텐츠 제작",
    "카피라이팅",
  ],
  "프로젝트": [
    "사이드 프로젝트",
    "사이드 프로젝트 런칭",
    "Github 오픈 프로젝트 운영",
    "해커톤 참가",
    "혼자 만든 서비스",
    "팀 빌딩 및 리딩 경험",
    "독서",
    "자기개발",
  ],
  "외부경험&대외활동": [
    "인턴",
    "기업 협업 프로젝트",
    "공모전 수상",
    "창업동아리 활동",
    "해커톤 참가",
    "액셀러레이터 참여",
    "정부지원사업 선정",
  ],
  "자격&교육": [
    "구글 인증 마케팅 자격",
    "정보처리기사",
    "SQLD",
    "컴퓨터활용능력",
    "교육 이수",
    "부트캠프",
    "자격증",
    "AI/ML 관련 인증",
    "TOEIC",
    "TOEFL",
    "TEPS",
    "TOEIC SPEAKING / OPIC",
    "아카데미 수료",
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
