import React, { useState, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

interface TooltipProps {
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  useSpringEffect: boolean; // This is now a required prop
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltipContent,
  backgroundColor,
  textColor,
  useSpringEffect,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const smoothTooltipX = useSpring(0, { damping: 20, stiffness: 300 });
  const smoothTooltipY = useSpring(0, { damping: 20, stiffness: 300 });

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + 10;
      const y = e.clientY - rect.top + 10;

      if (useSpringEffect) {
        smoothTooltipX.set(x);
        smoothTooltipY.set(y);
      } else {
        setPosition({ x, y });
      }
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      ref={contentRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${backgroundColor} ${textColor} absolute px-4 py-2 rounded-full text-sm sm:text-base font-semibold pointer-events-none z-50 w-min text-nowrap`}
            style={
              useSpringEffect
                ? {
                    left: smoothTooltipX,
                    top: smoothTooltipY,
                  }
                : {
                    left: position.x,
                    top: position.y,
                  }
            }
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
