// useKeyboardInset.ts
import { useEffect } from "react";

export default function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;
    let initialHeight = window.innerHeight;

    const compute = () => {
      let inset = 0;
      
      if (vv) {
        // iOS: 키보드가 뜨면 visualViewport.height가 줄고 offsetTop이 생김
        inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      } else {
        // visualViewport 미지원 시 window.innerHeight 변화로 추정
        const currentHeight = window.innerHeight;
        inset = Math.max(0, initialHeight - currentHeight);
      }
      
      // 디버깅용 로그 (나중에 제거)
      console.log('Keyboard inset:', inset);
      
      document.documentElement.style.setProperty(
        "--keyboard-inset",
        `${inset}px`
      );
    };

    // 초기값 0으로 설정
    document.documentElement.style.setProperty("--keyboard-inset", "0px");
    
    // 최초 1회
    compute();

    // 다양한 이벤트에서 재계산
    vv?.addEventListener("resize", compute);
    vv?.addEventListener("scroll", compute); // 주소창/키보드 애니메이션 중에도 변함
    window.addEventListener("orientationchange", compute);

    // 처음 포커스 시 iOS가 약간 늦게 값을 주는 문제 방지 (딜레이 재계산)
    const focusIn = () => {
      console.log('Focus in - starting keyboard detection');
      compute();
      // 더 촘촘하고 긴 재계산으로 첫 키보드 활성화 대응
      setTimeout(compute, 10);
      setTimeout(compute, 50);
      setTimeout(compute, 100);
      setTimeout(compute, 200);
      setTimeout(compute, 300);
      setTimeout(compute, 500);
      setTimeout(compute, 800);  // 더 긴 시간까지 체크
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
