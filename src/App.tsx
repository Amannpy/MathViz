import React, { useState } from 'react';
import { EquationInput } from './components/EquationInput';
import { ControlPanel } from './components/ControlPanel';
import { Graph } from './components/Graph';
import { EquationList } from './components/EquationList';
import { Equation, PlotConfig, ViewportConfig } from './types';
import { FunctionSquare as Function } from 'lucide-react';

function App() {
  const [equations, setEquations] = useState<Equation[]>([]);
  const [plotConfig, setPlotConfig] = useState<PlotConfig>({
    showGrid: true,
    showAxis: true,
    frameRate: 60,
    animationSpeed: 1,
    darkMode: false,
  });

  const [viewport, setViewport] = useState<ViewportConfig>({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
  });

  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#F59E0B', // Yellow
    '#EC4899', // Pink
  ];

  const handleAddEquation = (expression: string) => {
    const newEquation: Equation = {
      id: crypto.randomUUID(),
      expression,
      color: colors[equations.length % colors.length],
      isVisible: true,
    };
    setEquations([...equations, newEquation]);
  };

  const handleToggleVisibility = (id: string) => {
    setEquations(equations.map(eq =>
      eq.id === id ? { ...eq, isVisible: !eq.isVisible } : eq
    ));
  };

  const handleDeleteEquation = (id: string) => {
    setEquations(equations.filter(eq => eq.id !== id));
  };

  const handleZoomIn = () => {
    setViewport(prev => ({
      xMin: prev.xMin / 1.5,
      xMax: prev.xMax / 1.5,
      yMin: prev.yMin / 1.5,
      yMax: prev.yMax / 1.5,
    }));
  };

  const handleZoomOut = () => {
    setViewport(prev => ({
      xMin: prev.xMin * 1.5,
      xMax: prev.xMax * 1.5,
      yMin: prev.yMin * 1.5,
      yMax: prev.yMax * 1.5,
    }));
  };

  const handleReset = () => {
    setViewport({
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
    });
  };

  return (
    <div className={`min-h-screen ${plotConfig.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Function size={24} className="text-blue-500" />
            <h1 className="text-2xl font-bold">MathViz</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <EquationInput onAddEquation={handleAddEquation} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg" style={{ height: '600px' }}>
              <Graph
                equations={equations}
                viewport={viewport}
                darkMode={plotConfig.darkMode}
              />
            </div>
          </div>

          <div className="space-y-6">
            <ControlPanel
              config={plotConfig}
              onConfigChange={(changes) => setPlotConfig({ ...plotConfig, ...changes })}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
            />
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <EquationList
                equations={equations}
                onToggleVisibility={handleToggleVisibility}
                onDelete={handleDeleteEquation}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;