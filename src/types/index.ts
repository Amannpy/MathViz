export interface Equation {
  id: string;
  expression: string;
  color: string;
  isVisible: boolean;
}

export interface PlotConfig {
  showGrid: boolean;
  showAxis: boolean;
  frameRate: 30 | 60;
  animationSpeed: number;
  darkMode: boolean;
}

export interface ViewportConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin?: number;
  zMax?: number;
}