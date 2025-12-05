import React, { useEffect, useState } from 'react';

interface SubscriberCounterProps {
  count: number;
  label?: string;
  className?: string;
}

const SubscriberCounter: React.FC<SubscriberCounterProps> = ({ count, label = 'Subscribers', className = '' }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 2000;
    const incrementTime = 20; // Update every 20ms
    const totalSteps = duration / incrementTime;
    const incrementValue = end / totalSteps;

    const timer = setInterval(() => {
      start += incrementValue;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [count]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-2xl font-bold text-white tabular-nums tracking-tight drop-shadow-md">
        {formatNumber(displayCount)}
      </span>
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default SubscriberCounter;
