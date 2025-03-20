'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ProgressBar from './ProgressBar';
import { getCurrentMonthProgress } from '../utils/dateUtils';

const MonthProgress: React.FC = () => {
  const [monthProgress, setMonthProgress] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');

  // Update the month progress and current month on client-side only
  useEffect(() => {
    // Set initial values
    setMonthProgress(getCurrentMonthProgress());
    setCurrentMonth(format(new Date(), 'MMMM yyyy'));
    
    const updateProgress = () => {
      setMonthProgress(getCurrentMonthProgress());
    };

    // Update once a day
    const interval = setInterval(updateProgress, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!currentMonth) {
    return <div className="bg-white rounded-lg shadow-md p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Month Progress</h3>
      <div className="mb-2 text-center">
        <span className="text-xl font-medium text-black">{currentMonth}</span>
      </div>
      <ProgressBar
        percentage={monthProgress}
        color="#6366f1"
        label="Days Elapsed"
      />
      <p className="mt-4 text-sm text-black text-center">
        {monthProgress}% of {currentMonth} has passed
      </p>
      <p className="mt-2 text-xs text-gray-600 text-center">
        <span className="font-medium">Benchmark:</span> Metrics should be at least {monthProgress}% complete to be on track
      </p>
    </div>
  );
};

export default MonthProgress; 