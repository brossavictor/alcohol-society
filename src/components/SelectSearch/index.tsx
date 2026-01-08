import { ExclamationCircleIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/16/solid';
import React, { forwardRef } from 'react';
import ReactSelect, { type InputActionMeta, type SelectInstance } from 'react-select';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import type { SelectSearchOption } from '../../types/select';
import { Badge } from '../Badge';
import { ErrorMessage, Label } from '../Form';

const icon = tv({
  base: 'pointer-events-none absolute top-1/2 right-3 z-50 size-6 -translate-y-1/2',
  variants: {
    hasError: {
      false: 'fill-gray-400',
      true: 'fill-destructive-700',
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

export type { SelectSearchOption } from '../../types/select';

type BaseSelectSearchProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  options: SelectSearchOption[];
  inputValue?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
  isLoading?: boolean;
  allowTypedValue?: boolean;
  isRemoteSearch?: boolean;
  formatOptionLabel?: (option: SelectSearchOption) => React.ReactNode;
  onSearch?: (value: string, meta: InputActionMeta) => void;
  onMenuOpen?: () => void;
  onClear?: () => void;
};

type SingleSelectProps = BaseSelectSearchProps & {
  isMulti?: false;
  value: string;
  onValueChange: (value: string) => void;
};

type MultiSelectProps = BaseSelectSearchProps & {
  isMulti: true;
  value: string[];
  onValueChange: (value: string[]) => void;
};

type SelectSearchProps = SingleSelectProps | MultiSelectProps;

const Icon = ({ hasError }: { hasError?: boolean }) => {
  const Component = hasError ? ExclamationCircleIcon : MagnifyingGlassIcon;

  return <Component className={icon({ hasError })} />;
};

export const SelectSearch = forwardRef<SelectInstance<SelectSearchOption>, SelectSearchProps>(
  (
    {
      label,
      placeholder,
      name,
      options,
      value,
      inputValue,
      containerClassName,
      className,
      error,
      isLoading,
      allowTypedValue,
      isRemoteSearch,
      isMulti,
      formatOptionLabel,
      onValueChange,
      onSearch,
      onMenuOpen,
      onClear,
    },
    ref
  ) => {
    const [internalInputValue, setInternalInputValue] = React.useState('');
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const hasError = !!error;
    const hasXMark = !!(
      onClear &&
      ((typeof value === 'string' && value.length > 0) ||
        (Array.isArray(value) && value.length > 0)) &&
      !isLoading
    );

    const currentInputValue = isMulti ? internalInputValue : inputValue || '';
    const shouldShowMenu = currentInputValue.length > 0 && menuIsOpen;

    const getValue = () => {
      if (isMulti && Array.isArray(value)) {
        return null;
      }
      const selectOption = options.find((option) => option.value === value);

      if (selectOption) return selectOption;
      if (allowTypedValue && inputValue) return { label: inputValue, value: inputValue };
      return null;
    };

    const getSelectedOptions = () => {
      if (isMulti && Array.isArray(value)) {
        return options.filter((option) => value.includes(option.value));
      }
      return [];
    };

    const handleRemoveOption = (valueToRemove: string) => {
      if (isMulti && Array.isArray(value)) {
        onValueChange(value.filter((v) => v !== valueToRemove));
      }
    };

    return (
      <div className={twMerge('flex w-full flex-col gap-2', containerClassName)}>
        {label && <Label htmlFor={name}>{label}</Label>}

        <div className="relative z-40">
          <ReactSelect
            ref={ref}
            id={name}
            placeholder={placeholder}
            isSearchable
            isLoading={isLoading}
            isMulti={isMulti}
            value={getValue()}
            inputValue={isMulti ? internalInputValue : undefined}
            onChange={(option) => {
              if (isMulti && option && !Array.isArray(option)) {
                const currentValues = Array.isArray(value) ? value : [];
                const newValue = (option as SelectSearchOption).value;
                if (!currentValues.includes(newValue)) {
                  (onValueChange as (value: string[]) => void)([...currentValues, newValue]);
                }
                setInternalInputValue('');
              } else if (option && !Array.isArray(option)) {
                (onValueChange as (value: string) => void)((option as SelectSearchOption).value);
              } else if (!option) {
                if (isMulti) {
                  (onValueChange as (value: string[]) => void)([]);
                } else {
                  (onValueChange as (value: string) => void)('');
                }
              }
            }}
            onInputChange={(input, actionMeta) => {
              if (isMulti) {
                setInternalInputValue(input);
              }
              if (actionMeta.action === 'input-change') {
                onSearch?.(input, actionMeta);
                // Open menu when user starts typing
                if (input.length > 0) {
                  setMenuIsOpen(true);
                } else {
                  // Close menu when input is cleared
                  setMenuIsOpen(false);
                }
              }
            }}
            onMenuOpen={() => {
              // Only open menu if there's input
              const input = isMulti ? internalInputValue : inputValue || '';
              if (input.length > 0) {
                setMenuIsOpen(true);
                onMenuOpen?.();
              } else {
                // Prevent menu from opening if no input
                setMenuIsOpen(false);
              }
            }}
            onMenuClose={() => {
              setMenuIsOpen(false);
            }}
            menuIsOpen={shouldShowMenu}
            openMenuOnFocus={false}
            onKeyDown={(e) => {
              // Allow typing to open menu, but prevent arrow keys from opening it when empty
              if (
                currentInputValue.length === 0 &&
                (e.key === 'ArrowDown' || e.key === 'ArrowUp')
              ) {
                e.preventDefault();
              }
            }}
            options={shouldShowMenu ? options : []}
            formatOptionLabel={formatOptionLabel}
            components={{ DropdownIndicator: null }}
            noOptionsMessage={() => 'Nenhum resultado encontrado.'}
            loadingMessage={() => 'Carregando...'}
            unstyled
            filterOption={(option, rawInput) => {
              if (isLoading || isRemoteSearch) return true;

              // Hide all options when there's no input
              if (!rawInput || rawInput.trim().length === 0) return false;

              const search = rawInput.toLowerCase();

              return (
                option.label.toLowerCase().includes(search) ||
                (option.data.code?.toLowerCase().includes(search) ?? false)
              );
            }}
            blurInputOnSelect={true}
            closeMenuOnSelect={true}
            controlShouldRenderValue={!isMulti}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
                pointerEvents: 'auto',
              }),
              menu: (base) => ({ ...base, minWidth: '100%' }),
              option: (base, state) => ({
                ...base,
                cursor: state.isDisabled ? 'not-allowed' : 'pointer',
              }),
            }}
            classNames={{
              control: ({ isFocused }) =>
                twMerge(
                  'w-full bg-white rounded-lg border px-3 py-2 border-gray-300 text-sm font-normal text-gray-900 ring-inset transition-shadow duration-200 ease-in-out outline-none',
                  className,
                  isFocused && 'ring-2 ring-primary shadow-primary',
                  hasError && 'border-destructive-400 ring-destructive-700 shadow-destructive-700'
                ),
              input: () => 'min-w-0',
              valueContainer: () => (hasXMark ? 'pr-10' : 'pr-6'),
              placeholder: () => 'text-sm font-normal text-gray-400',
              menu: () =>
                'mt-0.5 bg-white rounded-lg shadow-md text-sm text-gray-700 border border-gray-300 ',
              option: ({ isSelected }) =>
                twMerge(
                  'relative flex select-none items-center p-2 outline-none hover:bg-gray-100',
                  isSelected && 'bg-gray-200'
                ),
              noOptionsMessage: () => 'text-gray-400 text-sm font-normal p-2',
              loadingMessage: () => 'text-gray-400 text-sm font-normal p-2',
            }}
          />

          {hasXMark && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear?.();
              }}
              className="absolute top-1/2 right-3 z-50 -translate-y-1/2"
              aria-label="Limpar seleção"
            >
              <XCircleIcon className="size-5 fill-gray-500" />
            </button>
          )}

          {!isLoading && !hasXMark && <Icon hasError={hasError} />}
        </div>

        {isMulti && getSelectedOptions().length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {getSelectedOptions().map((option) => (
              <Badge
                key={option.value}
                theme="gray"
                type="flat"
                style="pill"
                className="flex items-center gap-1"
              >
                {option.label}
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option.value)}
                  className="ml-1 rounded-full hover:bg-gray-300"
                  aria-label={`Remover ${option.label}`}
                >
                  <XCircleIcon className="size-4" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <ErrorMessage error={error} className="mt-0.5" />
      </div>
    );
  }
);

SelectSearch.displayName = 'SelectSearch';
