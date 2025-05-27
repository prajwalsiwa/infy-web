import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ILabelProps {
  children: ReactNode;
  htmlFor?: string | number;
  required?: boolean;
  className?: string;
}

export default function Label({
  children,
  htmlFor,
  required,
  className,
}: ILabelProps) {
  return (
    <label
      className={cn('text-sm text-grey-700', className)}
      htmlFor={htmlFor?.toString()}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}