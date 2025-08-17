import { RefObject, useEffect, useRef } from "react";

export default function useElementFreeze(rootRef: RefObject<HTMLElement | null>, active: boolean) {
  const yRef = useRef(0);
  
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (active) {
      yRef.current = root.scrollTop;
      root.style.setProperty("--freeze-y", `${-yRef.current}px`);
      root.classList.add("frozen");           // 시각적 고정
      root.style.overflow = "hidden";         // 실제 스크롤 잠금
      root.style.transform = `translateY(var(--freeze-y))`;
      root.style.willChange = "transform";
    } else {
      root.classList.remove("frozen");
      root.style.removeProperty("--freeze-y");
      root.style.overflow = "";               // 자동 복원
      root.style.transform = "";
      root.style.willChange = "";
      root.scrollTop = yRef.current;          // 조용히 복원(점프 없음)
    }
  }, [active, rootRef]);
}