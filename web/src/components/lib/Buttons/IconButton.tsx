import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { LanguageKeyType } from '../../../config/Language.config';
import { useLang } from '../../../hooks/Language.hooks';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  iconFocus?: React.ReactNode;
  'aria-label': string;
  onFocusChange?: (focused: boolean, target?: EventTarget & HTMLButtonElement) => void;
  tooltip?: LanguageKeyType;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconFocus,
  className = '',
  onFocusChange,
  tooltip,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const lang = useLang();

  return (
    <>
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
        <span className="transition-transform duration-200 ease-in-out" data-tooltip-id={tooltip}>
          {iconFocus != null && isFocused ? iconFocus : icon}
        </span>
      </button>
      {tooltip && (
        <Tooltip id={tooltip} place="right">
          {lang(tooltip)}
        </Tooltip>
      )}
    </>
  );
};

export default IconButton;
