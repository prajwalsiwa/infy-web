/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';
import { cn } from '@/lib/utils'; 

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, placeholder, type, onClick, ...rest }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder || 'Search'}
        className={cn(
          `flex  border-b-2 border-grey-300 bg-transparent
            p-2 px-3 text-sm text-grey-800 file:font-medium placeholder:text-grey-400
             hover:border-primary-400 focus:border-primary-400 focus:bg-transparent
            focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        onClick={onClick}
        {...rest}
      />
    );
  },
);
Input.displayName = 'Input';

export default Input;