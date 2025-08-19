// useKeyboardInset.ts
import { useEffect } from "react";

export default function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;

    const compute = () => {
      let inset = 0;
      
      if (vv) {
        // iOS: 키보드가 뜨면 visualViewport.height가 줄고 offsetTop이 생김
        inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      } else {
        // visualViewport 미지원 시 window.innerHeight 변화로 추정
        const currentHeight = window.innerHeight;
        const initialHeight = window.screen.height;
        inset = Math.max(0, initialHeight - currentHeight - 100); // 상단바 고려
      }
      
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
      // 더 촘촘한 재계산으로 첫 키보드 활성화 대응
      setTimeout(compute, 50);
      setTimeout(compute, 150);
      setTimeout(compute, 300);
      setTimeout(compute, 500);  // 애니메이션 완전 완료 후
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
