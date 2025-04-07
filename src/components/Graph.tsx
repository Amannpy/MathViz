import React, { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { Equation, ViewportConfig } from '../types';

interface GraphProps {
  equations: Equation[];
  viewport: ViewportConfig;
  darkMode: boolean;
}

export const Graph: React.FC<GraphProps> = ({ equations, viewport, darkMode }) => {
  const generatePoints = (equation: Equation) => {
    const points = {
      x: [] as number[],
      y: [] as number[],
    };

    for (let x = viewport.xMin; x <= viewport.xMax; x += 0.1) {
      try {
        const expression = equation.expression.replace(/y\s*=/, '');
        const y = evaluate(expression, { x });
        points.x.push(x);
        points.y.push(y);
      } catch (error) {
        console.error('Error evaluating equation:', error);
      }
    }

    return points;
  };

  const traces = equations
    .filter((eq) => eq.isVisible)
    .map((equation) => {
      const points = generatePoints(equation);
      return {
        type: 'scatter',
        mode: 'lines',
        name: equation.expression,
        x: points.x,
        y: points.y,
        line: { color: equation.color },
      };
    });

  const layout = {
    title: 'MathViz Graph',
    showlegend: true,
    xaxis: {
      range: [viewport.xMin, viewport.xMax],
      zeroline: true,
      gridcolor: darkMode ? '#444' : '#ddd',
    },
    yaxis: {
      range: [viewport.yMin, viewport.yMax],
      zeroline: true,
      gridcolor: darkMode ? '#444' : '#ddd',
    },
    paper_bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
    plot_bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
    font: {
      color: darkMode ? '#ffffff' : '#000000',
    },
  };

  return (
    <div className="w-full h-full">
      <Plot
        data={traces}
        layout={layout}
        useResizeHandler={true}
        className="w-full h-full"
      />
    </div>
  );
};