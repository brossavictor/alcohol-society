import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ErrorMessageProps = ComponentPropsWithoutRef<'span'> & {
  error?: string;
};

export const ErrorMessage = ({ error, className, ...rest }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <span className={twMerge('text-destructive-700 text-sm font-normal', className)} {...rest}>
      {error}
    </span>
  );
};
