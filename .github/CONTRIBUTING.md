# 💼 MyFit 프론트엔드 협업 규칙 가이드

본 문서는 프로트엔드 프로젝트를 진행하는 팀을 위한 협업 규칙입니다.
모든 팀원은 일관된 규칙을 따라 협업하시길 바랍니다.

## 📝 커밋 규칙

커밋 메시지는 다음 형식을 따라야 합니다.

```
<type>: <내용>
```

### 📝 커밋 타입

feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 스타일 수정
이 외의 타입은 사용하지 않습니다.

### 📝 커밋 내용

내용의 경우
한글/영어 자유롭게 사용가능하고
영어 사용시 소문자 + 띄어쓰기를 사용합니다.
마침표는 사용하지 않습니다.

### 📝 커밋 예시

```
feat: 로그인 페이지 구현
```

## 📝 브랜치 규칙

브랜치 이름은 다음 형식을 따라야 합니다.

```
<type>/<내용>
```

**메인 브랜치에서 새로운 브랜치를 만들어 작업하고, 절대로 직접 main 브랜치에 커밋하지 않습니다.**
**메인 브랜치는 보호되고, 모든 변경은 PR을 통해서만 반영합니다.**

### 📝 브랜치 타입

feat/새로운 기능 추가
fix/버그 수정
refactor/코드 리팩토링
docs/문서 수정
hotfix/버그 수정

### 📝 브랜치 내용

브랜치 내용은
영어 소문자 + kebap-case를 형식을 사용합니다.
마침표는 사용하지 않습니다.

### 📝 브랜치 예시

```
feat/login-page
```

## 📝 PR 규칙

PR은 가능한 작은 PR을 지향합니다.
PR 한 개당 하나의 기능 또는 수정을 반영하는 것이 좋습니다.

**협업 중 메인 브랜치의 최신 변경 내용을 반영하기 위해 PR을 보내기 전 git rebase를 이용하여 롴러 브랜치를 최신 main 브랜치 위로 업데이트해야 합니다.**

## 📝 기타 규칙

코드 스타일을 ESLint와 Prettier 기본 규칙을 따르며 자동 정렬 하도록 합니다.

JSX로 반환 되는 컴포넌트는 function을 사용해서 정의합니다.

```
function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
    </div>
  );
}
```

컴포넌트 제외 함수를 선언할 때는 arrow function 형식 사용을 권장합니다.

주석은 기능마다 작성함을 원칙으로 하고 최대한 간결하게 작성합니다.

하나의 파일에는 하나의 컴포넌트만 작성합니다. 파일 하나에 여러 컴포넌트를 넣지 않습니다.

색깔의 경우 미리 정의해 놓은 색상만 사용합니다. (사용할 색상이 없을 경우 팀장 문의)

```
colors: {
        "ct-main-blue-200": "#2167FF",
        "ct-main-blue-100": "#237DF9",
        "ct-sub-blue-500": "#0077EB",
        "ct-sub-blue-400": "#3C89F3",
        "ct-sub-blue-300": "#008CFF",
        "ct-sub-blue-200": "#60A3FE",
        "ct-sub-blue-100": "#CCE8FE",
        "ct-black-300": "#000000",
        "ct-black-200": "#121212",
        "ct-black-100": "#333333",
        "ct-white": "#FFFFFF",
        "ct-gray-500": "#404040",
        "ct-gray-400": "#5C5C5C",
        "ct-gray-300": "#828282",
        "ct-gray-200": "#B4B4B4",
        "ct-gray-100": "#EDEDED",
},

// 사용 예시
<div className="bg-ct-main-blue-200"></div>
```

텍스트 역시 기존 정의해 놓은 설정들만 사용합니다.

```
fontSize: {
  h1: ["20px", { lineHeight: "28px", fontWeight: "700" }],
  h2: ["18px", { lineHeight: "26px", fontWeight: "700" }],
  sub: ["15px", { lineHeight: "22px", fontWeight: "600" }],
  body1: ["14px", { lineHeight: "20px", fontWeight: "500" }],
  body2: ["13px", { lineHeight: "18px", fontWeight: "500" }],
  body3: ["12px", { lineHeight: "16px", fontWeight: "400" }],
},
```
