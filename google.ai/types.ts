
import React from 'react';

export interface Message {
  role: 'user' | 'ai';
  content: string;
  type?: 'text' | 'image';
}

export interface GuideStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  tips?: string;
}
