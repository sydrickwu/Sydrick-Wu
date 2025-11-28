import { StudentRecord } from './types';

// Transcribed from the provided image
export const RAW_DATA: StudentRecord[] = [
  { id: '261', score: 11.75 }, { id: '610', score: 15.5 }, { id: '621', score: 17 },
  { id: '818', score: 18 }, { id: '469', score: 10 }, { id: '616', score: 13.75 },
  { id: '211', score: 16 }, { id: '630', score: 18.25 }, { id: '247', score: 21.5 },
  { id: '322', score: 15.25 }, { id: '115', score: 13.5 }, { id: '048', score: 19 },
  { id: '317', score: 20.5 }, { id: '212', score: 14.25 }, { id: '512', score: 16 },
  { id: '216', score: 21.75 }, { id: '418', score: 22 }, { id: '912', score: 19 },
  { id: '542', score: 17.5 }, { id: '529', score: 21.75 }, { id: '111', score: 10 },
  { id: '194', score: 10.25 }, { id: '782', score: 24.5 }, { id: '718', score: 16 },
  { id: '810', score: 7 }, { id: '731', score: 7.75 }, { id: '625', score: 12 },
  { id: '566', score: 23.5 }, { id: '540', score: 17.75 }, { id: '619', score: 15.75 },
  { id: '930', score: 25 }, { id: '650', score: 16.25 }, { id: '515', score: 12 },
  { id: '820', score: 19.25 }, { id: '463', score: 25 }, { id: '418', score: 19 }, // Note: 418 appears twice in image, included both
  { id: '120', score: 16.75 }, { id: '080', score: 14.5 }, { id: '010', score: 20 },
  { id: '547', score: 19.5 }, { id: '112', score: 17.5 }, { id: '016', score: 24.25 },
  { id: '012', score: 20.5 }, { id: '032', score: 6.5 }, { id: '159', score: 19 },
  { id: '343', score: 22.25 }, { id: '323', score: 18 }, { id: '312', score: 15.25 },
  { id: '226', score: 20 }, { id: '119', score: 16.25 }, { id: '711', score: 23.5 },
  { id: '011', score: 16.5 }, { id: '719', score: 18.5 }, { id: '320', score: 12 },
  { id: '613', score: 16 }, { id: '319', score: 19.5 }, { id: '516', score: 13.5 },
  { id: '546', score: 15.5 }, { id: '720', score: 9 }, { id: '918', score: 14.5 }
];

export const MAX_SCORE = 25;
export const BUCKET_SIZE = 1; // Finer granularity set to 1.0