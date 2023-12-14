import React, { MouseEvent } from 'react';
import DragAndDropFileElement from './DragAndDropFileElement.tsx';

interface DocumentUploadModal {
  handleCloseModalClick: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModal> = ({ handleCloseModalClick }) => {
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
          <div className='flex flex-row justify-between mt-3 sm:mt-5'>
            <div className='w-6/12 flex flex-col'>
              <DragAndDropFileElement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadModal;
