'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardData, Metric, MetricKey, ChannelMetric, ChannelMetricKey } from '../types';

interface DashboardContextType {
  dashboardData: DashboardData;
  updateMetric: (metricKey: MetricKey, field: 'current' | 'target', value: number) => void;
  updateChannelMetric: (parentKey: MetricKey, channelKey: ChannelMetricKey, field: 'current' | 'target', value: number) => void;
  resetMetrics: () => void;
}

const defaultMetric: Metric = {
  name: '',
  current: 0,
  target: 0,
  color: '',
};

const defaultChannelMetric: ChannelMetric = {
  name: '',
  metrics: {
    'Paid Channels': { ...defaultMetric, name: 'Paid Channels', color: '#3b82f6' },
    'Referral Channels': { ...defaultMetric, name: 'Referral Channels', color: '#10b981' },
    'Organic & Other': { ...defaultMetric, name: 'Organic & Other', color: '#f59e0b' },
  },
  color: '',
};

const initialDashboardData: DashboardData = {
  metrics: {
    MQLs: { ...defaultMetric, name: 'MQLs', color: '#3b82f6' },
    SQLs: { ...defaultMetric, name: 'SQLs', color: '#10b981' },
    SQOs: { ...defaultMetric, name: 'SQOs', color: '#f59e0b' },
    CWDs: { ...defaultMetric, name: 'CWDs', color: '#ef4444' },
  },
  channelMetrics: {
    MQLs: { ...defaultChannelMetric, name: 'MQLs Channels', color: '#3b82f6' },
    SQLs: { ...defaultChannelMetric, name: 'SQLs Channels', color: '#10b981' },
    SQOs: { ...defaultChannelMetric, name: 'SQOs Channels', color: '#f59e0b' },
    CWDs: { ...defaultChannelMetric, name: 'CWDs Channels', color: '#ef4444' },
  },
  lastUpdated: new Date().toISOString(),
};

const CURRENT_VERSION = 2; // Increment this when making breaking changes to the data structure

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(() => {
    // Try to load from localStorage on initial render (client-side only)
    if (typeof window !== 'undefined') {
      const savedVersion = localStorage.getItem('dashboardVersion');
      const savedData = localStorage.getItem('dashboardData');
      
      // If version doesn't match or no version exists, use initial data
      if (!savedVersion || parseInt(savedVersion) < CURRENT_VERSION) {
        localStorage.setItem('dashboardVersion', CURRENT_VERSION.toString());
        localStorage.setItem('dashboardData', JSON.stringify(initialDashboardData));
        return initialDashboardData;
      }

      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error('Failed to parse dashboard data from localStorage', error);
        }
      }
    }
    return initialDashboardData;
  });

  // Fetch data from Google Sheets periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheets');
        if (!response.ok) {
          throw new Error('Failed to fetch data from Google Sheets');
        }
        const data = await response.json();
        
        // Update metrics with new data
        setDashboardData(prev => ({
          ...prev,
          metrics: {
            ...prev.metrics,
            MQLs: { ...prev.metrics.MQLs, current: data.metrics.MQLs.current, target: data.metrics.MQLs.target },
            SQLs: { ...prev.metrics.SQLs, current: data.metrics.SQLs.current, target: data.metrics.SQLs.target },
            SQOs: { ...prev.metrics.SQOs, current: data.metrics.SQOs.current, target: data.metrics.SQOs.target },
            CWDs: { ...prev.metrics.CWDs, current: data.metrics.CWDs.current, target: data.metrics.CWDs.target },
          },
          channelMetrics: {
            ...prev.channelMetrics,
            MQLs: {
              ...prev.channelMetrics.MQLs,
              metrics: {
                'Paid Channels': { ...prev.channelMetrics.MQLs.metrics['Paid Channels'], current: data.channelMetrics.MQLs['Paid Channels'].current, target: data.channelMetrics.MQLs['Paid Channels'].target },
                'Referral Channels': { ...prev.channelMetrics.MQLs.metrics['Referral Channels'], current: data.channelMetrics.MQLs['Referral Channels'].current, target: data.channelMetrics.MQLs['Referral Channels'].target },
                'Organic & Other': { ...prev.channelMetrics.MQLs.metrics['Organic & Other'], current: data.channelMetrics.MQLs['Organic & Other'].current, target: data.channelMetrics.MQLs['Organic & Other'].target },
              },
            },
            SQLs: {
              ...prev.channelMetrics.SQLs,
              metrics: {
                'Paid Channels': { ...prev.channelMetrics.SQLs.metrics['Paid Channels'], current: data.channelMetrics.SQLs['Paid Channels'].current, target: data.channelMetrics.SQLs['Paid Channels'].target },
                'Referral Channels': { ...prev.channelMetrics.SQLs.metrics['Referral Channels'], current: data.channelMetrics.SQLs['Referral Channels'].current, target: data.channelMetrics.SQLs['Referral Channels'].target },
                'Organic & Other': { ...prev.channelMetrics.SQLs.metrics['Organic & Other'], current: data.channelMetrics.SQLs['Organic & Other'].current, target: data.channelMetrics.SQLs['Organic & Other'].target },
              },
            },
            SQOs: {
              ...prev.channelMetrics.SQOs,
              metrics: {
                'Paid Channels': { ...prev.channelMetrics.SQOs.metrics['Paid Channels'], current: data.channelMetrics.SQOs['Paid Channels'].current, target: data.channelMetrics.SQOs['Paid Channels'].target },
                'Referral Channels': { ...prev.channelMetrics.SQOs.metrics['Referral Channels'], current: data.channelMetrics.SQOs['Referral Channels'].current, target: data.channelMetrics.SQOs['Referral Channels'].target },
                'Organic & Other': { ...prev.channelMetrics.SQOs.metrics['Organic & Other'], current: data.channelMetrics.SQOs['Organic & Other'].current, target: data.channelMetrics.SQOs['Organic & Other'].target },
              },
            },
            CWDs: {
              ...prev.channelMetrics.CWDs,
              metrics: {
                'Paid Channels': { ...prev.channelMetrics.CWDs.metrics['Paid Channels'], current: data.channelMetrics.CWDs['Paid Channels'].current, target: data.channelMetrics.CWDs['Paid Channels'].target },
                'Referral Channels': { ...prev.channelMetrics.CWDs.metrics['Referral Channels'], current: data.channelMetrics.CWDs['Referral Channels'].current, target: data.channelMetrics.CWDs['Referral Channels'].target },
                'Organic & Other': { ...prev.channelMetrics.CWDs.metrics['Organic & Other'], current: data.channelMetrics.CWDs['Organic & Other'].current, target: data.channelMetrics.CWDs['Organic & Other'].target },
              },
            },
          },
          lastUpdated: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
      }
    };

    // Fetch immediately
    fetchData();

    // Then fetch every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Save to localStorage whenever dashboardData changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
      localStorage.setItem('dashboardVersion', CURRENT_VERSION.toString());
    }
  }, [dashboardData]);

  const updateMetric = (metricKey: MetricKey, field: 'current' | 'target', value: number) => {
    setDashboardData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricKey]: {
          ...prev.metrics[metricKey],
          [field]: value,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateChannelMetric = (parentKey: MetricKey, channelKey: ChannelMetricKey, field: 'current' | 'target', value: number) => {
    setDashboardData((prev) => ({
      ...prev,
      channelMetrics: {
        ...prev.channelMetrics,
        [parentKey]: {
          ...prev.channelMetrics[parentKey],
          metrics: {
            ...prev.channelMetrics[parentKey].metrics,
            [channelKey]: {
              ...prev.channelMetrics[parentKey].metrics[channelKey],
              [field]: value,
            },
          },
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const resetMetrics = () => {
    setDashboardData(initialDashboardData);
  };

  return (
    <DashboardContext.Provider value={{ dashboardData, updateMetric, updateChannelMetric, resetMetrics }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 