export interface StudentRecord {
  id: string;
  score: number;
}

export interface DistributionBucket {
  range: string;
  min: number;
  max: number;
  count: number;
  isUserBucket: boolean;
}

export interface AnalysisResult {
  record: StudentRecord;
  rank: number;
  totalParticipants: number;
  percentile: number;
  distribution: DistributionBucket[];
}