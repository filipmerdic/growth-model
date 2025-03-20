'use client';

import React, { useState, useEffect } from 'react';
import { Metric, MetricKey, ChannelMetricKey } from '../types';
import ProgressBar from './ProgressBar';
import { calculatePercentage, getCurrentMonthProgress } from '../utils/dateUtils';
import { useDashboard } from '../context/DashboardContext';

interface ChannelMetricCardProps {
  parentKey: MetricKey;
  channelMetric: {
    name: string;
    metrics: {
      [key in ChannelMetricKey]: Metric;
    };
    color: string;
  };
}

const ChannelMetricCard: React.FC<ChannelMetricCardProps> = ({ parentKey, channelMetric }) => {
  const { updateChannelMetric } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [editingValues, setEditingValues] = useState<{
    [key in ChannelMetricKey]: { current: string; target: string };
  }>({
    'Paid Channels': { current: '', target: '' },
    'Referral Channels': { current: '', target: '' },
    'Organic & Other': { current: '', target: '' },
  });
  const [monthProgress, setMonthProgress] = useState(0);

  useEffect(() => {
    if (!channelMetric?.metrics) return;

    // Initialize editing values
    setEditingValues({
      'Paid Channels': {
        current: channelMetric.metrics['Paid Channels'].current.toString(),
        target: channelMetric.metrics['Paid Channels'].target.toString(),
      },
      'Referral Channels': {
        current: channelMetric.metrics['Referral Channels'].current.toString(),
        target: channelMetric.metrics['Referral Channels'].target.toString(),
      },
      'Organic & Other': {
        current: channelMetric.metrics['Organic & Other'].current.toString(),
        target: channelMetric.metrics['Organic & Other'].target.toString(),
      },
    });

    // Get current month progress
    setMonthProgress(getCurrentMonthProgress());
  }, [channelMetric]);

  if (!channelMetric?.metrics) {
    return null;
  }

  const handleSave = () => {
    Object.entries(editingValues).forEach(([channelKey, values]) => {
      const newCurrent = parseInt(values.current) || 0;
      const newTarget = parseInt(values.target) || 0;
      
      updateChannelMetric(parentKey, channelKey as ChannelMetricKey, 'current', newCurrent);
      updateChannelMetric(parentKey, channelKey as ChannelMetricKey, 'target', newTarget);
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingValues({
      'Paid Channels': {
        current: channelMetric.metrics['Paid Channels'].current.toString(),
        target: channelMetric.metrics['Paid Channels'].target.toString(),
      },
      'Referral Channels': {
        current: channelMetric.metrics['Referral Channels'].current.toString(),
        target: channelMetric.metrics['Referral Channels'].target.toString(),
      },
      'Organic & Other': {
        current: channelMetric.metrics['Organic & Other'].current.toString(),
        target: channelMetric.metrics['Organic & Other'].target.toString(),
      },
    });
    setIsEditing(false);
  };

  const renderMetricContent = (channelKey: ChannelMetricKey) => {
    const metric = channelMetric.metrics[channelKey];
    const percentage = calculatePercentage(metric.current, metric.target);
    const progressColor = percentage < monthProgress ? '#ef4444' : '#10b981';

    if (isEditing) {
      return (
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Value
            </label>
            <input
              type="number"
              value={editingValues[channelKey].current}
              onChange={(e) => setEditingValues(prev => ({
                ...prev,
                [channelKey]: { ...prev[channelKey], current: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Value
            </label>
            <input
              type="number"
              value={editingValues[channelKey].target}
              onChange={(e) => setEditingValues(prev => ({
                ...prev,
                [channelKey]: { ...prev[channelKey], target: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current</span>
          <span className="text-xl font-bold text-black">{metric.current}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Target</span>
          <span className="text-lg font-semibold text-black">{metric.target}</span>
        </div>
        <ProgressBar
          percentage={percentage}
          color={progressColor}
          label="Progress"
        />
        <div className="text-xs text-gray-500">
          {percentage < monthProgress ? (
            <span className="text-red-500">Behind schedule ({monthProgress - percentage}% gap)</span>
          ) : (
            <span className="text-green-500">On track or ahead of schedule</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{parentKey} Channels</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="space-y-6">
        {Object.keys(channelMetric.metrics).map((channelKey) => (
          <div key={channelKey} className="border-t pt-4 first:border-t-0 first:pt-0">
            <h4 className="text-md font-medium text-gray-700 mb-3">{channelKey}</h4>
            {renderMetricContent(channelKey as ChannelMetricKey)}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ChannelMetricCard; 