import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { evaluate } from 'mathjs';

interface EquationInputProps {
  onAddEquation: (expression: string) => void;
}

export const EquationInput: React.FC<EquationInputProps> = ({ onAddEquation }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const validateEquation = (expression: string) => {
    try {
      // Test with x = 0 to validate the expression
      evaluate(expression.replace(/y\s*=/, ''), { x: 0 });
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter an equation');
      return;
    }

    if (!validateEquation(input)) {
      setError('Invalid equation format');
      return;
    }

    onAddEquation(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter equation (e.g., y = x^2)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};