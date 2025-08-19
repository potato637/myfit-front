import { RefObject, useEffect, useRef } from "react";

export default function useElementFreeze(rootRef: RefObject<HTMLElement | null> | null, active: boolean) {
  const yRef = useRef(0);
  
  useEffect(() => {
    const root = rootRef?.current;
    if (!root || !active) return;  // ref 없거나 비활성화면 아무것도 안 함

    yRef.current = root.scrollTop;
    root.style.overflow = "hidden";         // 실제 스크롤 잠금

    return () => {
      root.style.overflow = "";               // 자동 복원
      root.scrollTop = yRef.current;          // 조용히 복원(점프 없음)
    };
  }, [active, rootRef]);
}