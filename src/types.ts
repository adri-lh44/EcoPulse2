export type ActiveTab = 'dashboard' | 'eco-tracker' | 'recycle-rush' | 'heritage-trail' | 'focus-timer';

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  treesPlanted: number;
  carbonOffsetKg: number;
  rank: number;
}

export interface FeatItem {
  id: string;
  initials: string;
  name: string;
  location: string;
  description: string;
  xp: number;
  timeAgo: string;
  colorClass: string;
}

export interface Landmark {
  id: string;
  title: string;
  category: 'ancient' | 'cleantech' | 'coastal';
  location: string;
  badge: string;
  bountyXp: number;
  subtitle: string;
  subValue: string;
  description: string;
  meta1Label: string;
  meta1Value: string;
  meta2Label: string;
  meta2Value: string;
  image: string;
  imageAlt: string;
  tag: string;
  unescoTag?: string;
  engineeringBreakdown: string;
  modernRelevance: string;
  quizQuestion: string;
  quizOptions: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
