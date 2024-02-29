import React from 'react';

interface RadioButtonProps {
  checkedValue: string | null;
  correctValue: string;
  handleChange: () => void;
  inputId: string;
  optionText: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ checkedValue, correctValue, inputId, handleChange, optionText }) => {
  return (
    <div className="flex mb-2">
      <input
        className="hidden"
        checked={checkedValue === correctValue}
        id={inputId}
        onChange={handleChange}
        type="radio"
      />
      <label
        htmlFor={inputId}
        className="flex items-center cursor-pointer"
      >
        <div className={`h-4 w-4 flex justify-center items-center border border-[#082C4D] dark:border-[#1A3E6F] rounded-full`}>
          <div className={`h-2 w-2 bg-[#082C4D] dark:bg-[#1A3E6F] rounded-full ${checkedValue !== correctValue && 'hidden'}`}></div>
        </div>
        <p className="ml-1 text-[#092D4E] dark:text-gray-300 text-[11px] font-extralight">{optionText}</p>
      </label>
    </div>
  );
}

export default RadioButton;
