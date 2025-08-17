import { useEffect, useState } from 'react';

export default function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    let initialHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = initialHeight - currentHeight;
      console.log('Height diff:', heightDiff, 'Initial:', initialHeight, 'Current:', currentHeight);
      setKeyboardHeight(Math.max(0, heightDiff));
    };

    const handleFocus = () => {
      // iOS에서 input focus시 약간 지연 후 높이 체크
      setTimeout(() => {
        const currentHeight = window.innerHeight;
        const heightDiff = initialHeight - currentHeight;
        console.log('Focus - Height diff:', heightDiff);
        setKeyboardHeight(Math.max(0, heightDiff));
      }, 300);
    };

    const handleBlur = () => {
      setTimeout(() => {
        setKeyboardHeight(0);
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  return keyboardHeight;
}