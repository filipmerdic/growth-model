'use client';

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import MetricCard from './MetricCard';
import ChannelMetricCard from './ChannelMetricCard';
import MonthProgress from './MonthProgress';
import DashboardHeader from './DashboardHeader';
import { MetricKey } from '../types';

const Dashboard: React.FC = () => {
  const { dashboardData } = useDashboard();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100">
        <div className="text-center py-10">Loading dashboard...</div>
      </div>
    );
  }
  
  const metricKeys = Object.keys(dashboardData.metrics) as MetricKey[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100">
      <DashboardHeader />
      
      <div className="mb-8">
        <MonthProgress />
      </div>
      
      <div className="space-y-8">
        {/* Main metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricKeys.map((key) => (
            <MetricCard
              key={key}
              metricKey={key}
              metric={dashboardData.metrics[key]}
            />
          ))}
        </div>

        {/* Channel metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricKeys.map((key) => (
            <ChannelMetricCard
              key={`${key}-channels`}
              parentKey={key}
              channelMetric={dashboardData.channelMetrics[key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 