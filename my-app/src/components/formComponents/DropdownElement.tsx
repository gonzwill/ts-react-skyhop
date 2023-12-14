import React, { useEffect, useRef, useState } from 'react';

interface DropdownElementProps {
  currentChoice: string;
  defaultText: string;
}

const DropdownElement: React.FC<DropdownElementProps> = ({ currentChoice, defaultText }) => {
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
    <div className='w-full py-1 select-none'>
      <div 
        className='flex flex-row justify-between items-center rounded-md border border-[#BDC1C7] cursor-pointer'
      >
        <div className='pl-3 text-[#092D4E] text-[11px] font-extralight'>
          {currentChoice !== null && currentChoice !== '' ? currentChoice : defaultText }
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className='h-6 w-6 pr-3 text-[#303144]'
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
    </div>
  );
}

export default DropdownElement;
