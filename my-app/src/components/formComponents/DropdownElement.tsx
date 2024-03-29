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
    <div className='relative py-1 select-none'>
      <div 
        className={`flex flex-row justify-between items-center rounded-md border border-[#BDC1C7] dark:border-[#C8CCD1] dark:border-[#C8CCD1] bg-white dark:bg-gray-700 cursor-pointer ${showDropdownOptions && 'border-b-none rounded-b-none'}`}
        onClick={() => setShowDropdownOptions(!showDropdownOptions)}
        ref={dropdownRef}
      >
        <p className='pl-2.5 sm:pl-3 text-[#092D4E] dark:text-gray-300 text-[11px] font-extralight'>
          {currentChoice !== null && currentChoice !== '' ? currentChoice : defaultText }
        </p>
        <svg
          className={`h-6 w-6 pr-3 text-[#303144] dark:text-gray-300 transform transition-transform ${showDropdownOptions && '-rotate-90 -translate-x-[4px] -translate-y-[6px]'}`}
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
    <div className='absolute left-0 w-full border border-[#BDC1C7] dark:border-[#C8CCD1] bg-white dark:bg-gray-700 rounded-b-md z-50'>
      {data.map((option, ind, arr) => (
        <Fragment key={ind}>
          <div
            className={`pl-3 py-1 text-[#092D4E] dark:text-gray-300 text-[11px] font-extralight hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer ${ind === arr.length - 1 && 'rounded-b-md'}`}
            onMouseDown={() => {handleChoice(option)}}
          >
            {option}
          </div>
          {ind !== arr.length - 1 && <hr className='border border-b-0 border-[#BDC1C7] dark:border-[#C8CCD1]' />}
        </Fragment>
      ))}
    </div>
  );
}

export default DropdownElement;
