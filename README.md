# MyFit - 네트워킹 플랫폼

<div align="center">
  <img src="public/assets/icon/icon.svg" alt="MyFit Logo" width="120" height="120">
  <h3>나에게 맞는 사람을 찾는 네트워킹 플랫폼</h3>
</div>

## 📱 프로젝트 소개

MyFit은 개인과 기업이 서로에게 맞는 파트너를 찾을 수 있는 네트워킹 플랫폼입니다. 피드, 채팅, 커피챗, 채용 등 다양한 기능을 통해 의미 있는 연결을 만들어갑니다.

## ✨ 주요 기능

### 🏠 **온보딩 & 프로필**

- 개인/기업 회원가입 및 프로필 설정
- 키워드 기반 매칭 시스템
- 명함 형태의 프로필 카드 생성

### 📰 **피드 시스템**

- 게시글 작성 및 공유
- 해시태그 기반 검색
- 댓글 및 좋아요 기능
- 무한 스크롤 피드

### 💬 **채팅 & 커피챗**

- 실시간 1:1 채팅
- 커피챗 요청 및 매칭
- 위치 및 시간 기반 미팅 설정
- 채팅 내역 저장

### 🔍 **검색 & 필터링**

- 사용자 및 게시글 검색
- 상세 필터링 옵션
- 직무 및 지역별 검색

### 💼 **채용 시스템**

- 채용 공고 등록 및 관리
- 지원자 매칭
- 북마크 및 저장 기능

## 🛠 기술 스택

### **Frontend**

- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안정성 보장
- **Vite** - 빠른 개발 환경 및 빌드
- **Tailwind CSS** - 유틸리티 기반 스타일링

### **상태 관리 & 데이터 페칭**

- **React Query (TanStack Query)** - 서버 상태 관리
- **React Context** - 전역 상태 관리
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증

### **UI/UX**

- **Framer Motion** - 애니메이션
- **React Spring** - 물리 기반 애니메이션
- **Swiper** - 터치 슬라이더
- **React Toastify** - 알림 시스템

### **PWA & 모바일**

- **Vite PWA Plugin** - PWA 기능
- **Workbox** - 서비스 워커
- **모바일 최적화** - 터치 제스처, 반응형 디자인

### **개발 도구**

- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 전처리
- **Socket.io Client** - 실시간 통신

## 🚀 시작하기

### **필수 요구사항**

- Node.js 18+
- npm 또는 yarn

### **설치 및 실행**

```bash
# 저장소 클론
git clone [repository-url]
cd myfit-clone

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview
```

### **환경 설정**

- 개발 서버는 `http://localhost:5173`에서 실행됩니다
- API 프록시는 `https://myfit.my`로 설정되어 있습니다

## 📁 프로젝트 구조

```
src/
├── apis/           # API 클라이언트 및 인터페이스
├── components/     # 재사용 가능한 컴포넌트
│   ├── chatting/   # 채팅 관련 컴포넌트
│   ├── common/     # 공통 컴포넌트
│   ├── feed/       # 피드 관련 컴포넌트
│   ├── layouts/    # 레이아웃 컴포넌트
│   ├── onboarding/ # 온보딩 컴포넌트
│   ├── profile/    # 프로필 관련 컴포넌트
│   ├── recruiting/ # 채용 관련 컴포넌트
│   ├── searching/  # 검색 관련 컴포넌트
│   ├── setting/    # 설정 관련 컴포넌트
│   ├── skeletons/  # 로딩 스켈레톤
│   └── ui/         # UI 컴포넌트
├── contexts/       # React Context
├── hooks/          # 커스텀 훅
├── pages/          # 페이지 컴포넌트
├── routes/         # 라우팅 설정
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```

## 🔧 주요 스크립트

```json
{
  "dev": "vite", // 개발 서버 실행
  "build": "tsc -b && vite build", // TypeScript 컴파일 및 빌드
  "lint": "eslint .", // 코드 린팅
  "preview": "vite preview" // 빌드 결과 미리보기
}
```

## 📱 PWA 기능

- **오프라인 지원** - 서비스 워커를 통한 캐싱
- **앱 설치** - 홈 화면에 앱으로 설치 가능
- **푸시 알림** - 실시간 알림 지원
- **반응형 디자인** - 모든 디바이스에서 최적화된 경험

## 🌐 배포

- **Netlify** - 자동 배포 및 호스팅
- **AWS S3** - 파일 저장소
- **AWS Cognito** - 사용자 인증

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

<div align="center">
  <p>Made with ❤️ by MyFit Team</p>
</div>
