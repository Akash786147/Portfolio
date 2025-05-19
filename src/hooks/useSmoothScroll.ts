import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Function to handle smooth scrolling when clicking on navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      // Check if it's an anchor link with a hash
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        const targetId = target.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Optionally update URL hash without scrolling
          window.history.pushState(null, '', target.hash);
        }
      }
    };
    
    // Add event listener
    document.body.addEventListener('click', handleAnchorClick);
    
    // Clean up
    return () => {
      document.body.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};

export default useSmoothScroll;
