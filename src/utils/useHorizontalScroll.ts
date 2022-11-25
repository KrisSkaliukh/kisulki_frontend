import { useEffect, useRef } from 'react';

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = elRef.current;
    function onWheel(this: HTMLDivElement, e: WheelEvent) {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el!.scrollTo({
        left: el!.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    }
    if (el) {
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
    return undefined;
  }, []);
  return elRef;
}
