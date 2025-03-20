'use client';

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { formatDate } from '../utils/dateUtils';

const DashboardHeader: React.FC = () => {
  const { dashboardData, resetMetrics } = useDashboard();
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    setFormattedDate(formatDate(dashboardData.lastUpdated));
  }, [dashboardData.lastUpdated]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">Growth Dashboard</h1>
        <button
          onClick={resetMetrics}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Reset All Metrics
        </button>
      </div>
      <p className="text-black mt-2">
        {formattedDate ? `Last updated: ${formattedDate}` : ''}
      </p>
    </div>
  );
};

export default DashboardHeader; 