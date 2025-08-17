import { useEffect, useState } from 'react';

export default function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height;
        const heightDiff = initialViewportHeight - currentHeight;
        setKeyboardHeight(Math.max(0, heightDiff));
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      };
    } else {
      // Fallback for older browsers
      const handleResize = () => {
        const currentHeight = window.innerHeight;
        const heightDiff = initialViewportHeight - currentHeight;
        setKeyboardHeight(Math.max(0, heightDiff));
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return keyboardHeight;
}