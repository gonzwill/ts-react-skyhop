import React, { Fragment, useEffect, useRef, useState } from 'react';

interface DropdownElementProps {
  optionsData: string[];
  currentChoice: string;
  defaultText: string;
  handleChoice: (newOption: string) => void;
}

interface DropdownOptionsProps {
  data: string[];
  handleChoice: (newOption: string) => void;
}

const DropdownElement: React.FC<DropdownElementProps> = ({ currentChoice, optionsData, defaultText, handleChoice }) => {
  const [showDropdownOptions, setShowDropdownOptions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdownOptions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='relative w-full py-1 select-none'>
      <div 
        className={`flex flex-row justify-between items-center rounded-md border border-[#BDC1C7] cursor-pointer ${showDropdownOptions && 'rounded-b-none'}`}
        onClick={() => setShowDropdownOptions(!showDropdownOptions)}
        ref={dropdownRef}
      >
        <div className='pl-3 text-[#092D4E] text-[11px] font-extralight'>
          {currentChoice !== null && currentChoice !== '' ? currentChoice : defaultText }
        </div>
        <svg
          className={`h-6 w-6 pr-3 text-[#303144] transform transition-transform ${showDropdownOptions && '-rotate-90 -translate-x-[4px] -translate-y-[6px]'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {showDropdownOptions &&
        <DropdownOptions data={optionsData} handleChoice={handleChoice} />
      }
    </div>
  );
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ data, handleChoice }) => {
  return (
    <div className='absolute left-0 w-full border border-[#BDC1C7] bg-white rounded-b-md z-50'>
      {data.map((option, ind, arr) => (
        <Fragment key={ind}>
          <div
            className='pl-3 py-1 text-[#092D4E] text-[11px] font-extralight hover:bg-blue-200 cursor-pointer'
            onMouseDown={() => {handleChoice(option)}}
          >
            {option}
          </div>
          {ind !== arr.length - 1 && <hr className='border border-b-0 border-[#BDC1C7]' />}
        </Fragment>
      ))}
    </div>
  );
}

export default DropdownElement;
