import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type NavigationItemProps = ComponentPropsWithoutRef<'div'> & {
  icon?: ReactNode;
  text: string;
  rightIcon?: ReactNode;
};

export const NavigationItem = ({
  icon,
  text,
  rightIcon,
  className,
  ...rest
}: NavigationItemProps) => {
  return (
    <div className={twMerge('flex flex-row gap-1', className)} {...rest}>
      {icon}
      <p>{text}</p>
      {rightIcon}
    </div>
  );
};
