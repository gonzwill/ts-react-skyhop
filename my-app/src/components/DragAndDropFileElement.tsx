import React, { DragEvent, useState } from 'react';

const DragAndDropFileElement: React.FC = () => {
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };
  
  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  return (
    <div className='h-[130px] w-full flex flex-col items-center border border-[#BCBDBE] rounded-md'>
      <div 
        className={`h-4/6 w-11/12 flex justify-center items-center mt-3 rounded-md ${isDraggingFile && 'bg-gray-50'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div
          className='flex flex-col justify-center items-center rounded-md border border-dashed border-[#AFB0B1]'
          style={{height: isDraggingFile ? '90%': '95%' , width: isDraggingFile ? '95%': '98%' }}
        >
          <img className='h-3 w-3' src='https://i.imgur.com/NTowAnd.png' />
          <div className='mt-1 text-[#082C4D] text-[10px] font-extralight'>
            Drag & Drop Here or&nbsp;<span className='font-bold cursor-pointer hover:underline'>Browse</span>
          </div>
        </div>
      </div>
      <div className='h-[20px] flex items-center mx-auto my-2 px-10 py-1 text-white text-[10px] font-medium bg-[#1A3E6F] rounded-md select-none cursor-pointer'>
        Upload Manifest
      </div>
    </div>
  );
}

export default DragAndDropFileElement;
