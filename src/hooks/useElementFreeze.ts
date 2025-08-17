import { RefObject, useEffect, useRef } from "react";

export default function useElementFreeze(rootRef: RefObject<HTMLElement | null>, active: boolean) {
  const yRef = useRef(0);
  
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (active) {
      yRef.current = root.scrollTop;
      root.style.overflow = "hidden";         // 실제 스크롤 잠금
    } else {
      root.style.overflow = "";               // 자동 복원
      root.scrollTop = yRef.current;          // 조용히 복원(점프 없음)
    }
  }, [active, rootRef]);
}