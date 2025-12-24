import React from 'react';
import { GuideStep } from './types'; // 修改这里：改为 ./types

interface StepCardProps {
  step: GuideStep;
  isActive: boolean;
  onSelect: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, isActive, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
        isActive 
          ? 'bg-blue-50 border-blue-500 shadow-md transform scale-[1.01]' 
          : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${
          isActive ? 'bg-blue-500 text-white' : 'bg-slate-100'
        }`}>
          {step.icon}
        </div>
        <div>
          <h3 className={`font-bold text-lg ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
            {step.id}. {step.title}
          </h3>
          <p className="text-slate-500 text-sm">{step.description}</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <ul className="space-y-3">
          {step.details.map((detail, index) => (
            <li key={index} className="flex items-start space-x-3 text-slate-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
              <span className="text-sm leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>
        {step.tips && (
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
            <p className="text-xs text-amber-700">
              <strong>💡 小贴士：</strong> {step.tips}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;
