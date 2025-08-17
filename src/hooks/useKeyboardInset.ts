import { useEffect } from 'react';

export default function useKeyboardInset() {
  useEffect(() => {
    const updateKeyboardInset = () => {
      if (window.visualViewport) {
        const keyboardHeight = Math.max(0, window.innerHeight - window.visualViewport.height);
        document.documentElement.style.setProperty('--keyboard-inset', `${keyboardHeight}px`);
      } else {
        document.documentElement.style.setProperty('--keyboard-inset', '0px');
      }
    };

    // 초기 설정
    updateKeyboardInset();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateKeyboardInset);
      return () => {
        window.visualViewport.removeEventListener('resize', updateKeyboardInset);
      };
    }
  }, []);
}