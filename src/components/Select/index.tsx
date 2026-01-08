import { ChevronDoubleDownIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid';
import * as ReactSelect from '@radix-ui/react-select';
import React from 'react';
import { twJoin } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import type { SelectOption } from '../../types/select';
import { ErrorMessage, Label } from '../Form';

const select = tv({
  slots: {
    trigger:
      'group [&[data-placeholder][data-error]]:text-destructive-400 inline-flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-shadow duration-200 ease-in-out ring-inset [&:not([data-placeholder])]:text-gray-900 [&[data-placeholder]]:text-gray-400',
    chevron: 'size-4 transition-all duration-300 group-data-[state=open]:rotate-180',
    content:
      'z-50 min-w-[--radix-select-trigger-width] overflow-hidden rounded-lg border bg-white shadow-md',
  },
  variants: {
    hasError: {
      false: {
        trigger:
          'focus:shadow-primary focus:ring-primary data-[state=open]:shadow-primary data-[state=open]:ring-primary border-gray-300 focus:ring-2 focus:outline-none data-[state=open]:ring-2 data-[state=open]:outline-none',
        chevron: 'fill-gray-400',
        content: 'border-gray-300',
      },
      true: {
        trigger:
          'border-destructive-400 focus:shadow-destructive-700 focus:ring-destructive-700 focus:ring-2 focus:outline-none',
        chevron: 'fill-destructive-400',
        content: 'border-destructive-400',
      },
    },
    disabled: {
      false: { trigger: 'bg-white' },
      true: { trigger: 'bg-gray-50' },
    },
  },
  defaultVariants: {
    hasError: false,
    disabled: false,
  },
});

export type { SelectOption } from '../../types/select';

type SelectBaseProps = ReactSelect.SelectProps & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  iconLeft?: React.FC<React.SVGProps<SVGSVGElement>>;
  hasChevron?: boolean;
  className?: string;
};

export const Select = ({
  name,
  label,
  value,
  placeholder,
  onValueChange,
  options,
  error,
  iconLeft,
  hasChevron = true,
  className,
  ...props
}: SelectBaseProps) => {
  const hasError = !!error;
  const selectStyles = select({ hasError, disabled: props.disabled });

  const optionsWithPlaceholder = placeholder
    ? [{ label: placeholder, value: undefined as never }, ...options]
    : options;

  return (
    <div className={twJoin('flex flex-col', className)}>
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
        </Label>
      )}

      <ReactSelect.Root
        name={name}
        value={value ?? ''}
        onValueChange={(newValue) => onValueChange?.(newValue ?? '')}
        {...props}
      >
        <ReactSelect.Trigger
          className={selectStyles.trigger()}
          data-placeholder={!value ? '' : undefined}
          data-error={hasError ? '' : undefined}
        >
          <div className="flex items-center gap-2">
            {iconLeft &&
              React.createElement(iconLeft, {
                className: 'size-4 text-gray-900',
              })}
            <ReactSelect.Value placeholder={placeholder}>
              {options.find((option) => option.value === value)?.label ?? ''}
            </ReactSelect.Value>
          </div>
          <div className="flex items-center gap-1">
            {hasError ? (
              <ExclamationCircleIcon className="text-destructive-700 size-5" />
            ) : (
              hasChevron && <ChevronDoubleDownIcon className={selectStyles.chevron()} />
            )}
          </div>
        </ReactSelect.Trigger>

        <ReactSelect.Portal>
          <ReactSelect.Content
            side="bottom"
            position="popper"
            avoidCollisions={false}
            sideOffset={2}
            className={selectStyles.content()}
          >
            <ReactSelect.Viewport>
              {options.length === 0 ? (
                <div className="relative flex cursor-not-allowed items-center rounded p-2 text-sm text-gray-700 outline-none select-none data-[state=checked]:bg-gray-200">
                  Não existe opções cadastradas
                </div>
              ) : (
                optionsWithPlaceholder.map((option, index) => (
                  <ReactSelect.Item
                    key={option.value || `placeholder-${index}`}
                    value={option.value}
                    className="relative flex cursor-pointer items-center rounded p-2 text-sm text-gray-700 outline-none select-none hover:bg-gray-100 data-[state=checked]:bg-gray-200"
                  >
                    <ReactSelect.ItemText>{option.label}</ReactSelect.ItemText>
                  </ReactSelect.Item>
                ))
              )}
            </ReactSelect.Viewport>
          </ReactSelect.Content>
        </ReactSelect.Portal>
      </ReactSelect.Root>

      <ErrorMessage error={error} className="mt-2" />
    </div>
  );
};
