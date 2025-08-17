import { useEffect } from 'react';

export default function useKeyboardInset() {
  useEffect(() => {
    let initialHeight = window.innerHeight;
    
    const updateKeyboardInset = () => {
      let keyboardHeight = 0;
      
      if (window.visualViewport) {
        // visualViewport API 사용 (Safari 브라우저)
        keyboardHeight = Math.max(0, window.innerHeight - window.visualViewport.height);
      } else {
        // Fallback: window.innerHeight 변화 감지 (PWA)
        keyboardHeight = Math.max(0, initialHeight - window.innerHeight);
      }
      
      document.documentElement.style.setProperty('--keyboard-inset', `${keyboardHeight}px`);
    };

    // 초기 설정
    updateKeyboardInset();

    // 두 가지 이벤트 모두 등록
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateKeyboardInset);
    }
    
    window.addEventListener('resize', updateKeyboardInset);
    
    // Focus/blur 이벤트로 PWA 키보드 감지 보강
    const handleFocusIn = () => {
      setTimeout(updateKeyboardInset, 300);
    };
    
    const handleFocusOut = () => {
      setTimeout(() => {
        document.documentElement.style.setProperty('--keyboard-inset', '0px');
      }, 300);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateKeyboardInset);
      }
      window.removeEventListener('resize', updateKeyboardInset);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
}