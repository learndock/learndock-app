import React, { useState } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  iconFocus?: React.ReactNode;
  'aria-label': string;
  onFocusChange?: (focused: boolean, target?: EventTarget & HTMLButtonElement) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconFocus,
  className = '',
  onFocusChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      {...props}
      onFocus={(e) => {
        setIsFocused(true);
        onFocusChange?.(true, e.currentTarget);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onFocusChange?.(false, e.currentTarget);
        props.onBlur?.(e);
      }}
      className={`
        relative inline-flex items-center justify-center
        p-2 rounded-full text-text-primary
        transition-all duration-30 ease-out
        hover:bg-cards ${iconFocus && "focus:bg-cards/90"}
        hover:scale-105
        ${className}
      `}
    >
      <span className="transition-transform duration-200 ease-in-out">
        {iconFocus != null && isFocused ? iconFocus : icon}
      </span>
    </button>
  );
};

export default IconButton;
