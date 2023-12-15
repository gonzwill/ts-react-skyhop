import React from 'react';

interface ToggleSwitchProps {
  checkedValue: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checkedValue, handleToggle }) => {
  return (
    <div className="relative w-[38px] flex justify-between items-center cursor-pointer" onClick={handleToggle}>
      <input 
        checked={checkedValue === true}
        className="absolute left-1/2 -translate-x-1/2 w-[full] h-full peer appearance-none rounded-md" 
        type="checkbox" 
      />
      <span className="w-9 h-5 flex items-center pl-[1px] bg-gray-300 dark:bg-gray-400 rounded-full duration-200 ease-in-out peer-checked:bg-[#193E6F] after:w-[18px] after:h-[18px] after:bg-white after:rounded-full after:duration-200 peer-checked:after:translate-x-[16px]"></span>
    </div>
  );
}

export default ToggleSwitch;
