import React from 'react';
import { Settings, ZoomIn, ZoomOut, RotateCcw, Sun, Moon } from 'lucide-react';
import { PlotConfig } from '../types';

interface ControlPanelProps {
  config: PlotConfig;
  onConfigChange: (config: Partial<PlotConfig>) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onConfigChange,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Controls</h3>
        <button
          onClick={() => onConfigChange({ darkMode: !config.darkMode })}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {config.darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onZoomIn}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Reset View"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.showGrid}
              onChange={(e) => onConfigChange({ showGrid: e.target.checked })}
              className="rounded"
            />
            Show Grid
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.showAxis}
              onChange={(e) => onConfigChange({ showAxis: e.target.checked })}
              className="rounded"
            />
            Show Axes
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Frame Rate</label>
          <select
            value={config.frameRate}
            onChange={(e) => onConfigChange({ frameRate: Number(e.target.value) as 30 | 60 })}
            className="w-full rounded border-gray-300 dark:bg-gray-700"
          >
            <option value={30}>30 FPS</option>
            <option value={60}>60 FPS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Animation Speed</label>
          <input
            type="range"
            min={0.25}
            max={4}
            step={0.25}
            value={config.animationSpeed}
            onChange={(e) => onConfigChange({ animationSpeed: Number(e.target.value) })}
            className="w-full"
          />
          <div className="text-sm text-gray-500">{config.animationSpeed}x</div>
        </div>
      </div>
    </div>
  );
};