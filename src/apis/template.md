## 1. apiClient.ts

```typescript
import apiClient from "./apiClient";
```

를 이용해 만들어둔 axios instance를 가져옵니다.

## 2. API 호출

```typescript
export const <API 함수 이름> = async () => {
  try {
    const response = await apiClient.get(<API 주소>);
    return response.data;
  } catch (error) {
    // 인터셉터에서 공통 에러 처리가 이미 되었으므로,
    // 여기서는 특정 비즈니스 로직에 맞는 추가 에러 처리가 필요한 경우에만 작성합니다.

    // throw error를 호출하여 상위 컴포넌트나 로직에서도 에러를 처리할 수 있도록 합시다.
    throw error;
  }
};
```

## 3. type 설정

각 API 함수의 response type을 정의합니다.
response type은 API 바로 위에 export와 함께 정의합니다.

```typescript

export interface <TypeName> {
  <property>: <type>;
}
export const <API 함수 이름> = async (): Promise<TypeName> => {
  try {
    const response = await apiClient.get<TypeName>(<API 주소>);
    return response.data;
  } catch (error) {
    // 인터셉터에서 공통 에러 처리가 이미 되었으므로,
    // 여기서는 특정 비즈니스 로직에 맞는 추가 에러 처리가 필요한 경우에만 작성합니다.

    // throw error를 호출하여 상위 컴포넌트나 로직에서도 에러를 처리할 수 있도록 합시다.
    throw error;
  }
};
```

## react-query 함수 작성

query 함수와 useQuery hook은 같은 파일에 작성합니다.

```typescript
export const use<Query 함수 이름> = () => {
  return useQuery<TypeName>({})
}
```
