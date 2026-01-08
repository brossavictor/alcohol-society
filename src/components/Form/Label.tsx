import type { ComponentPropsWithoutRef } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
  htmlFor?: string;
};

export const Label = ({ htmlFor, children, className, ...rest }: LabelProps) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </label>
  );
};
