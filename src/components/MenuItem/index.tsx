type MenuItemProps = {
  label: string;
};

export const MenuItem = ({ label }: MenuItemProps) => {
  return (
    <li>
      <a href={`/${label}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {label}
      </a>
    </li>
  );
};
