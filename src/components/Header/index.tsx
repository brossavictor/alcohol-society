import {
  TruckIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';

import { SelectSearch } from '../SelectSearch';

export const Header = () => {
  return (
    <header className="flex h-40 w-full flex-col bg-gray-50 text-center">
      <div className="flex h-9 flex-row justify-center bg-pink-800 align-middle text-white">
        <TruckIcon className="size-6 self-center" fill="#fff" />
        <p className="self-center">Free delivery on 75$ purchases in 3 to 5 business days.</p>
      </div>
      <div className="h-5 bg-gray-200">{/* Separator */}</div>
      <div className="my-auto flex h-6 flex-row gap-2 px-8 align-middle">
        <div className="flex w-2/3 flex-row items-center text-center align-middle">
          <img src="/logo.svg" alt="Logo" className="h-10 w-32" />
          <SelectSearch
            className="w-full rounded-2xl"
            isMulti={true}
            value={[]}
            onValueChange={() => {}}
            options={[{ label: 'Ruffino Chianti', value: 'red wine' }]}
          />
        </div>
        <div className="flex w-1/3 flex-row justify-end gap-3">
          <div className="flex flex-row gap-1">
            <BuildingStorefrontIcon className="size-6" />
            <p>Stores</p>
          </div>
          <div className="flex flex-row">
            <UserCircleIcon className="mr-1 size-6" />
            <p>My account</p>
            <ChevronDownIcon className="size-6" />
          </div>
        </div>
      </div>
      <div className="mx-8 flex flex-row gap-2">
        <ul>
          <li>
            <a href=""></a>Featured
          </li>
        </ul>
        <ul>
          <li>
            <a href="">Products</a>
          </li>
        </ul>
      </div>
    </header>
  );
};
