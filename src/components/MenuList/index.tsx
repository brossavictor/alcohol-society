import type { ReactNode } from 'react';

import { ProductOptions } from 'src/types/options';

import { MenuItem } from '../MenuItem';

type MenuListProps = {
  options: ProductOptions[];
  children: ReactNode;
};

export const MenuList = ({ options, children }: MenuListProps) => {
  return (
    <ul className="group relative">
      <li>
        <a href="" className="cursor-pointer">
          {children}
        </a>
      </li>
      <li className="absolute top-full left-0 z-50 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
        <ul className="py-1">
          {options.map((option) => (
            <MenuItem key={option.label} label={option.label} />
          ))}
        </ul>
      </li>
    </ul>
  );
};
