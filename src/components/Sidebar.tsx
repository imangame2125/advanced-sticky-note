import type { FC } from 'react';

interface Props {}
const Sidebar: FC<Props> = () => {
  return (
    <div className="w-40 bg-red-50 overflow-y-auto flex-1 z-50 ">sidebar</div>
  );
};

export default Sidebar;
