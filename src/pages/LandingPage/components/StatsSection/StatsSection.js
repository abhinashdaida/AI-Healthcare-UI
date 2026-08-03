import { Icon } from "@iconify/react";
import { Container } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { STATS as statsData } from '../../../../shared/constants/landingPage';

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isDecimal = end % 1 !== 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * end;
      setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatCard = ({ end, suffix, label, iconColor, bgColor, start }) => {
  const count = useCountUp(end, 2000, start);
  return (
    <div className="
      group
      flex flex-col
      p-8
      rounded-[16px]
      border-[1px] border-[#D0D0D0]
      bg-white
      hover:shadow-xl hover:shadow-gray-200/50
      transition-all duration-300
      min-h-[220px]
    ">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: bgColor }}
      >
        <Icon
                icon="hugeicons:ai-dna" width={24} height={24} color={iconColor} />
      </div>

      {/* CountUp Number + Label */}
      <div className="mt-auto">
        <h3 className="text-[#0D1412] font-extrabold text-[28px] leading-none mb-2">
          {count}{suffix}
        </h3>
        <p className="text-[#4D4D4D] font-medium text-[13px] tracking-tight">
          {label}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartCount(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-white">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="mb-12 text-left">
          <p className="section-kicker">
            Our Impact in Numbers
          </p>
          <h2 className="text-[#141414] font-bold text-3xl md:text-4xl lg:text-[2.6rem] leading-tight max-w-[700px]">
            Healthcare you can trust,<br />
            backed by <span className="text-[#096B58]">real results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} start={startCount} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
