export interface ChannelMetric {
  locked: number;
  percentage: number;
}

export interface ChannelMetrics {
  mqls: ChannelMetric;
  sqls: ChannelMetric;
  sqos: ChannelMetric;
  cwds: ChannelMetric;
}

export interface Channels {
  paid: ChannelMetrics;
  referral: ChannelMetrics;
  organic: ChannelMetrics;
}

export interface PrimaryKPIs {
  mqls: number;
  sqlsPercentage: number;
  sqosPercentage: number;
  cwdsPercentage: number;
  lockedForecasts: {
    mqls: number;
    sqls: number;
    sqos: number;
    cwds: number;
  }
}

export interface GrowthData {
  primaryKPIs: PrimaryKPIs;
  channels: Channels;
}

export interface MetricsDisplayProps {
  growthData: GrowthData;
  monthCompletion: number;
  selectedMonth: string;
}

export interface GrowthMetricsFormProps {
  growthData: GrowthData;
  onUpdate: (data: GrowthData) => void;
} 