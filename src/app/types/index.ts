export interface Metric {
  name: string;
  current: number;
  target: number;
  color: string;
}

export interface ChannelMetric {
  name: string;
  metrics: {
    'Paid Channels': Metric;
    'Referral Channels': Metric;
    'Organic & Other': Metric;
  };
  color: string;
}

export interface DashboardData {
  metrics: {
    MQLs: Metric;
    SQLs: Metric;
    SQOs: Metric;
    CWDs: Metric;
  };
  channelMetrics: {
    MQLs: ChannelMetric;
    SQLs: ChannelMetric;
    SQOs: ChannelMetric;
    CWDs: ChannelMetric;
  };
  lastUpdated: string;
}

export type MetricKey = 'MQLs' | 'SQLs' | 'SQOs' | 'CWDs';
export type ChannelMetricKey = 'Paid Channels' | 'Referral Channels' | 'Organic & Other'; 