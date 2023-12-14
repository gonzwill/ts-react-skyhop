import React, { MouseEvent, useState } from 'react';

import DragAndDropFileElement from './DragAndDropFileElement.tsx';
import RadioButton from './formComponents/RadioButton.tsx';

interface DocumentUploadModal {
  handleCloseModalClick: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModal> = ({ handleCloseModalClick }) => {
  const [clientOption, setClientOption] = useState<string>('multiple');
  const [socialDistancingSplitOption, setSocialDistancingSplitOption] = useState<string>('yes');

  return (
    <div 
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50'
      onClick={handleCloseModalClick}
    >
      <div 
        className='h-[600px] w-[800px] p-7 rounded-2xl bg-white'
        onClick={(e: MouseEvent<HTMLDivElement>) => {e.stopPropagation()}}
      >
        <div className='inline-block p-2 bg-[#041E5A] rounded-lg'>
          <svg
            className="h-5 w-5 text-white hover:text-gray-200 cursor-pointer"
            fill="none"
            onClick={handleCloseModalClick}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className='w-10/12 flex flex-col mx-auto'>
          <div className='w-[200px] mx-auto text-[#082C4D] text-2xl font-medium'>
            Document Upload
            <hr className='mt-1 text-[#CBCFDC] '/>
          </div>
          <div className='flex flex-row justify-between mt-5'>
            <div className='w-6/12 flex flex-col'>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Select a manifest that you'd like to import</div>
              <DragAndDropFileElement />
              <span className='mb-2'></span>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-1'>Elapse Data Checking:</div>
              <div className='text-[#49A244] font-medium text-[11px] mb-2'>
                No Elapsed Dates!
              </div>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Tolerance Window:</div>
            </div>
            <div className='w-5/12 flex flex-col'>
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Split schedule using social distancing?</div>
              <div className='flex flex-row'>
                <RadioButton
                  checkedValue={socialDistancingSplitOption} 
                  correctValue='yes'
                  inputId='socialDistancingSplitOptionYes' 
                  handleChange={() => {setSocialDistancingSplitOption('yes')}} 
                  optionText='Yes'
                />
                <span className='mr-3'></span>
                <RadioButton
                  checkedValue={socialDistancingSplitOption} 
                  correctValue='no'
                  inputId='socialDistancingSplitOptionNo' 
                  handleChange={() => {setSocialDistancingSplitOption('no')}} 
                  optionText='No'
                />
              </div>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-1'>Location Checking:</div>
              <div className='text-[#49A244] font-medium text-[11px] mb-2'>
                All available!
              </div>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Client:</div>
              <div className='flex flex-row'>
                <RadioButton
                  checkedValue={clientOption} 
                  correctValue='single'
                  inputId='clientOptionSingle' 
                  handleChange={() => {setClientOption('single')}} 
                  optionText='Single'
                />
                <span className='mr-3'></span>
                <RadioButton
                  checkedValue={clientOption} 
                  correctValue='multiple'
                  inputId='clientOptionMultiple' 
                  handleChange={() => {setClientOption('multiple')}} 
                  optionText='Multiple'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadModal;
