
export interface VisualizerConfig {
  particleSize: number;
  exposure: number;
  flow: number;
  inkDensity: number;
  isAudioPlaying: boolean;
  style: 'color' | 'ink';
  customImage?: HTMLImageElement | null;
  audioBuffer?: AudioBuffer | null;
  analyser?: AnalyserNode | null;
}

export enum AppSection {
  COLOR = 'color',
  SCENE = 'scene',
  FEATURES = 'features',
  CODE = 'code',
  MOTIVATION = 'motivation',
  PARAMS = 'params',
  EXPERIENCE = 'experience'
}
