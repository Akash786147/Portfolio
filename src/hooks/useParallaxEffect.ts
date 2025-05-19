import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  /** Speed multiplier (default: 0.5) */
  speed?: number;
  /** Direction of parallax movement (default: 'vertical') */
  direction?: 'vertical' | 'horizontal';
  /** The element query selector or ref object */
  selector: string;
  /** Start position (default: 'top bottom') */
  start?: string;
  /** End position (default: 'bottom top') */
  end?: string;
}

const useParallaxEffect = ({
  speed = 0.5,
  direction = 'vertical',
  selector,
  start = 'top bottom',
  end = 'bottom top'
}: ParallaxOptions) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    const parallaxElements: gsap.core.Tween[] = [];
    
    elements.forEach((element) => {
      const tween = gsap.fromTo(
        element,
        {
          [direction === 'vertical' ? 'y' : 'x']: 0
        },
        {
          [direction === 'vertical' ? 'y' : 'x']: `${direction === 'vertical' ? '-' : ''}${speed * 100}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: true
          }
        }
      );
      
      parallaxElements.push(tween);
    });
    
    // Clean up
    return () => {
      parallaxElements.forEach((tween) => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      });
    };
  }, [speed, direction, selector, start, end]);
};

export default useParallaxEffect;
