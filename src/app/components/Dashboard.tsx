'use client';

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import MetricCard from './MetricCard';
import ChannelMetricCard from './ChannelMetricCard';
import MonthProgress from './MonthProgress';
import DashboardHeader from './DashboardHeader';
import { MetricKey } from '../types';

const Dashboard: React.FC = () => {
  const { dashboardData, error } = useDashboard();
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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading dashboard data: {error}
              </p>
            </div>
          </div>
        </div>
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