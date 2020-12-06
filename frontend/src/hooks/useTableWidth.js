import { useEffect, useState } from 'react';

// Check for browser resize so that we can add an inner shadow when the table width is smaller than page width
// (+ padding offset)

export default function useTableWidth() {
  // Initialize state with undefined width so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [tableWidth, setTableWidth] = useState(undefined);

  useEffect(() => {
    // Handler to call on window resize - set table width to state
    const handleResize = () => setTableWidth(document.querySelector('.table').scrollWidth + 30); // 30 is padding offset

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return tableWidth;
}
