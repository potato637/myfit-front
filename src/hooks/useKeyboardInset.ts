// useKeyboardInset.ts
import { useEffect } from "react";

export default function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;

    const compute = () => {
      // iOS: 키보드가 뜨면 visualViewport.height가 줄고 offsetTop이 생김
      const inset = vv
        ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
        : 0;
      document.documentElement.style.setProperty(
        "--keyboard-inset",
        `${inset}px`
      );
    };

    // 최초 1회
    compute();

    // 다양한 이벤트에서 재계산
    vv?.addEventListener("resize", compute);
    vv?.addEventListener("scroll", compute); // 주소창/키보드 애니메이션 중에도 변함
    window.addEventListener("orientationchange", compute);

    // 처음 포커스 시 iOS가 약간 늦게 값을 주는 문제 방지 (딜레이 재계산)
    const focusIn = () => {
      compute();
      // 애니메이션 끝나고 한 번 더
      setTimeout(compute, 50);
      setTimeout(compute, 250);
    };
    const focusOut = () => {
      // 키보드 내려가면 0으로 수렴
      setTimeout(compute, 0);
      setTimeout(compute, 100);
    };
    window.addEventListener("focusin", focusIn);
    window.addEventListener("focusout", focusOut);

    return () => {
      vv?.removeEventListener("resize", compute);
      vv?.removeEventListener("scroll", compute);
      window.removeEventListener("orientationchange", compute);
      window.removeEventListener("focusin", focusIn);
      window.removeEventListener("focusout", focusOut);
    };
  }, []);
}
