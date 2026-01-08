import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export type BadgeTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'gray'
  | 'white'
  | 'tertiary';

type BadgeType =
  | 'flat'
  | 'flat-dot'
  | 'flat-icon'
  | 'with-border'
  | 'with-border-dot'
  | 'with-border-icon'
  | 'with-border-flat'
  | 'with-border-flat-dot'
  | 'with-border-flat-icon';

type BadgeStyle = 'around' | 'pill';

interface BadgeOwnProps {
  theme?: BadgeTheme;
  type?: BadgeType;
  style?: BadgeStyle;
  icon?: ReactNode;
  children: ReactNode;
}

type BadgeProps = BadgeOwnProps & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

const badgeVariants = tv({
  base: 'leading-content inline-flex items-center text-xs font-medium',
  variants: {
    theme: {
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      destructive: '',
      gray: '',
      white: '',
      tertiary: '',
    },
    type: {
      flat: '',
      'flat-dot': 'gap-1.5',
      'flat-icon': 'gap-1.5',
      'with-border': '',
      'with-border-dot': 'gap-1.5',
      'with-border-icon': 'gap-1.5',
      'with-border-flat': '',
      'with-border-flat-dot': 'gap-1.5',
      'with-border-flat-icon': 'gap-1.5',
    },
    style: {
      around: 'px-md py-sm rounded-md',
      pill: 'px-md py-sm rounded-full',
    },
  },
  compoundVariants: [
    {
      theme: 'primary',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-primaryScale-100 text-primary',
    },
    {
      theme: 'primary',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-primary bg-primaryScale-100 text-primary border',
    },
    {
      theme: 'primary',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-primary border border-gray-200 bg-white',
    },
    {
      theme: 'secondary',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-secondaryScale-100 text-secondary',
    },
    {
      theme: 'secondary',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-secondary bg-secondaryScale-100 text-secondary border',
    },
    {
      theme: 'secondary',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-secondary border border-gray-200 bg-white',
    },
    {
      theme: 'success',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-success-100 text-success-700',
    },
    {
      theme: 'success',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-success-700 bg-success-100 text-success-700 border',
    },
    {
      theme: 'success',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-success-700 border border-gray-200 bg-white',
    },
    {
      theme: 'warning',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-warning-100 text-warning-700',
    },
    {
      theme: 'warning',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-warning-700 bg-warning-100 text-warning-700 border',
    },
    {
      theme: 'warning',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-warning-700 border border-gray-200 bg-white',
    },
    {
      theme: 'destructive',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-destructive-100 text-destructive-700',
    },
    {
      theme: 'destructive',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-destructive-700 bg-destructive-100 text-destructive-700 border',
    },
    {
      theme: 'destructive',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-destructive-700 border border-gray-200 bg-white',
    },

    {
      theme: 'gray',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-gray-100 text-gray-500',
    },
    {
      theme: 'gray',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border border-gray-500 bg-gray-100 text-gray-500',
    },
    {
      theme: 'gray',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'border border-gray-200 bg-white text-gray-500',
    },
    {
      theme: 'white',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-white text-gray-900',
    },
    {
      theme: 'white',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border border-gray-900 bg-white text-gray-900',
    },
    {
      theme: 'white',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'border border-gray-200 bg-white text-gray-900',
    },
    {
      theme: 'tertiary',
      type: ['flat', 'flat-dot', 'flat-icon'],
      class: 'bg-tertiaryScale-100 text-tertiary',
    },
    {
      theme: 'tertiary',
      type: ['with-border', 'with-border-dot', 'with-border-icon'],
      class: 'border-tertiary bg-tertiaryScale-100 text-tertiary border',
    },
    {
      theme: 'tertiary',
      type: ['with-border-flat', 'with-border-flat-dot', 'with-border-flat-icon'],
      class: 'text-tertiary border border-gray-200 bg-white',
    },
  ],
  defaultVariants: {
    theme: 'primary',
    type: 'flat',
    style: 'around',
  },
});

export const Badge = ({
  theme = 'primary',
  type = 'flat',
  style = 'around',
  icon,
  children,
  className,
  ...rest
}: BadgeProps) => {
  const classes = badgeVariants({ theme, type, style });
  return (
    <span className={twMerge(classes, className)} {...rest}>
      {type.includes('dot') && <span className="h-[6px] w-[6px] rounded-full bg-current" />}
      {type.includes('icon') && icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
    </span>
  );
};
