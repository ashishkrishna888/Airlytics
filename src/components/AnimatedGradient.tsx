import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'login' | 'custom';
}

export function AnimatedGradient({ 
  className = '', 
  children, 
  variant = 'default' 
}: AnimatedGradientProps) {
  // Default gradient animation
  const defaultVariants = {
    animate: {
      background: [
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      ],
    },
  };

  // Login page specific gradient
  const loginVariants = {
    animate: {
      background: [
        'linear-gradient(45deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)',
        'linear-gradient(45deg, #3730a3 0%, #1e40af 50%, #1e3a8a 100%)',
        'linear-gradient(45deg, #1e40af 0%, #1e3a8a 50%, #3730a3 100%)',
        'linear-gradient(45deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)',
      ],
    },
  };

  // Custom gradient - you can replace this with your Framer gradient
  const customVariants = {
    animate: {
      background: [
        // Replace these colors with your Framer gradient colors
        'linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'linear-gradient(45deg, #764ba2 0%, #f093fb 25%, #f5576c 50%, #4facfe 75%, #00f2fe 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)',
        'linear-gradient(45deg, #f5576c 0%, #4facfe 25%, #00f2fe 50%, #43e97b 75%, #38f9d7 100%)',
        'linear-gradient(45deg, #4facfe 0%, #00f2fe 25%, #43e97b 50%, #38f9d7 75%, #667eea 100%)',
        'linear-gradient(45deg, #00f2fe 0%, #43e97b 25%, #38f9d7 50%, #667eea 75%, #764ba2 100%)',
        'linear-gradient(45deg, #43e97b 0%, #38f9d7 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
        'linear-gradient(45deg, #38f9d7 0%, #667eea 25%, #764ba2 50%, #f093fb 75%, #f5576c 100%)',
      ],
    },
  };

  const getVariants = () => {
    switch (variant) {
      case 'login':
        return loginVariants;
      case 'custom':
        return customVariants;
      default:
        return defaultVariants;
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      variants={getVariants()}
      animate="animate"
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  );
}

// Specific component for login page background
export function LoginGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Your custom animated gradient */}
      <AnimatedGradient variant="custom" className="opacity-20" />
      
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
