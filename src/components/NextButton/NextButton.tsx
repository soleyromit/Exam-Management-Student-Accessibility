import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
export interface NextButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  'data-id'?: string;
}
export const NextButton = ({
  label = 'Next',
  onClick,
  disabled = false,
  className = '',
  'data-id': dataId
}: NextButtonProps) => {
  return (
    <button
      data-id={dataId}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        bg-primary text-white
        font-heading font-semibold text-base leading-6
        px-5 py-3 rounded-lg
        border border-black
        shadow-sm
        transition-opacity duration-150
        hover:opacity-90 active:opacity-80
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        minWidth: 140,
        height: 50
      }}>
      
      <span>{label}</span>
      <ChevronRightIcon className="w-5 h-5" strokeWidth={2.5} />
    </button>);

};