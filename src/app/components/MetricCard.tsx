'use client';

import React, { useState, useEffect } from 'react';
import { Metric, MetricKey } from '../types';
import ProgressBar from './ProgressBar';
import { calculatePercentage, getCurrentMonthProgress } from '../utils/dateUtils';
import { useDashboard } from '../context/DashboardContext';

interface MetricCardProps {
  metricKey: MetricKey;
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metricKey, metric }) => {
  const { updateMetric } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [monthProgress, setMonthProgress] = useState(0);
  const [progressColor, setProgressColor] = useState(metric.color);
  
  useEffect(() => {
    setCurrentValue(metric.current.toString());
    setTargetValue(metric.target.toString());
    const calculatedPercentage = calculatePercentage(metric.current, metric.target);
    setPercentage(calculatedPercentage);
    
    // Get current month progress for comparison
    const currentMonthProgress = getCurrentMonthProgress();
    setMonthProgress(currentMonthProgress);
    
    // Set color based on comparison with month progress
    if (calculatedPercentage < currentMonthProgress) {
      setProgressColor('#ef4444'); // Red
    } else {
      setProgressColor('#10b981'); // Green
    }
  }, [metric]);

  const handleSave = () => {
    const newCurrent = parseInt(currentValue) || 0;
    const newTarget = parseInt(targetValue) || 0;
    
    updateMetric(metricKey, 'current', newCurrent);
    updateMetric(metricKey, 'target', newTarget);
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(metric.current.toString());
    setTargetValue(metric.target.toString());
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{metric.name}</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Value
            </label>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
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
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div className="flex justify-end space-x-2">
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
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current</span>
            <span className="text-2xl font-bold text-black">{metric.current}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Target</span>
            <span className="text-xl font-semibold text-black">{metric.target}</span>
          </div>
          <ProgressBar
            percentage={percentage}
            color={progressColor}
            label="Progress"
          />
          <div className="text-xs text-gray-500 mt-1">
            {percentage < monthProgress ? (
              <span className="text-red-500">Behind schedule ({monthProgress - percentage}% gap)</span>
            ) : (
              <span className="text-green-500">On track or ahead of schedule</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard; 