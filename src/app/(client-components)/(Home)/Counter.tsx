"use client";
import { animate, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
}

const Counter: React.FC<CounterProps> = ({ from, to }) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(nodeRef);

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, isInView]);

  return (
    <motion.p
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    />
  );
};

export default Counter;
