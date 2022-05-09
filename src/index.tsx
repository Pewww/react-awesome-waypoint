import React, { useRef, useEffect, cloneElement } from 'react';

export interface WaypointProps {
  children?: React.ReactNode;
  onEnter?: () => void;
  onLeave?: () => void;
  root?: Element | Document | null | undefined;
  threshold?: number | number[] | undefined;
  topOffset?: string;
  bottomOffset?: string;
  leftOffset?: string;
  rightOffset?: string;
}

const Waypoint: React.FC<WaypointProps> = ({
  children,
  onEnter,
  onLeave,
  root,
  threshold,
  topOffset = '0px',
  bottomOffset = '0px',
  leftOffset = '0px',
  rightOffset = '0px'
}) => {
  const customRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!customRef.current) {
      return;
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onEnter?.();
        return;
      }

      onLeave?.();
    }, {
      root,
      threshold,
      rootMargin: `${topOffset} ${rightOffset} ${bottomOffset} ${leftOffset}`
    });

    observer.observe(customRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    root,
    threshold,
    topOffset,
    bottomOffset,
    leftOffset,
    rightOffset,
    onEnter,
    onLeave
  ]);

  if (!children) {
    return (
      <span ref={customRef} />
    );
  }

  if (typeof children === 'string') {
    return <span ref={customRef}>{children}</span>
  }

  return cloneElement(children as React.ReactElement, {
    ref: customRef
  });
};

export default Waypoint;
