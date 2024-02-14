import { useState, useEffect } from 'react';

// Custom hook to get the current window width
const useWindowWidth = (): number => {
  // useState to store and set the current window width
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect runs only on mount and unmount

  return width;
};

export default useWindowWidth;
