import React from 'react';

const DragAndDropFileElement: React.FC = () => {
  return (
    <div className='h-[130px] w-full flex flex-col items-center border border-[#BCBDBE] rounded-md'>
      <div className='h-4/6 w-11/12 flex justify-center items-center mt-3 rounded-md'>
        <div className='h-[85px] w-[300px] flex flex-col justify-center items-center rounded-md border border-dashed border-[#AFB0B1]'>
          <img className='h-3 w-3' src='https://i.imgur.com/NTowAnd.png' />
          <div className='mt-2 text-[#082C4D] text-[11px] font-extralight'>
            Drag & Drop Here or&nbsp;<span className='font-bold cursor-pointer'>Browse</span>
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
