export type BaseSelectOption = {
  label: string;
  value: string;
};

export type SelectOption = BaseSelectOption;

export type SelectSearchOption = BaseSelectOption & {
  code?: string;
  [key: string]: unknown;
};
