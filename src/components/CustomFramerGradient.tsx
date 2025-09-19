import React from 'react';
import { motion } from 'framer-motion';

interface CustomFramerGradientProps {
  colors: string[]; // Array of hex colors from your Framer gradient
  className?: string;
  duration?: number;
  children?: React.ReactNode;
}

export function CustomFramerGradient({ 
  colors, 
  className = '', 
  duration = 8,
  children 
}: CustomFramerGradientProps) {
  // Generate gradient steps by rotating through your colors
  const generateGradientSteps = (colorArray: string[]) => {
    const steps = [];
    const numSteps = Math.max(6, colorArray.length * 2); // Ensure smooth animation
    
    for (let i = 0; i < numSteps; i++) {
      const gradient = [];
      const offset = (i / numSteps) * 100;
      
      // Create a gradient with your colors
      colorArray.forEach((color, index) => {
        const position = (index / (colorArray.length - 1)) * 100;
        gradient.push(`${color} ${position}%`);
      });
      
      steps.push(`linear-gradient(${45 + (i * 5)}deg, ${gradient.join(', ')})`);
    }
    
    return steps;
  };

  const gradientVariants = {
    animate: {
      background: generateGradientSteps(colors),
    },
  };

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      variants={gradientVariants}
      animate="animate"
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  );
}

// Example usage with your Framer colors
export function FramerLoginBackground() {
  // Replace these colors with your actual Framer gradient colors
  const framerColors = [
    '#667eea', // Blue
    '#764ba2', // Purple
    '#f093fb', // Pink
    '#f5576c', // Red
    '#4facfe', // Light Blue
    '#00f2fe', // Cyan
    '#43e97b', // Green
    '#38f9d7', // Teal
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Your custom Framer gradient */}
      <CustomFramerGradient 
        colors={framerColors} 
        className="opacity-20" 
        duration={10}
      />
      
      {/* Additional floating elements for depth */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}
