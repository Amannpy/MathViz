import React from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { Equation } from '../types';

interface EquationListProps {
  equations: Equation[];
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EquationList: React.FC<EquationListProps> = ({
  equations,
  onToggleVisibility,
  onDelete,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Equations</h3>
      {equations.length === 0 ? (
        <p className="text-gray-500">No equations added yet</p>
      ) : (
        <div className="space-y-2">
          {equations.map((equation) => (
            <div
              key={equation.id}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: equation.color }}
                />
                <span>{equation.expression}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleVisibility(equation.id)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {equation.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => onDelete(equation.id)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};