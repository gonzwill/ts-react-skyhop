import React, {useState} from 'react';

import DocumentUploadModal from './DocumentUploadModal'

const HomePage: React.FC = () => {
  const [showDocumentUploadModal, setShowDocumentUploadModal] = useState<boolean>(false);

  return (
    <div className='flex h-screen items-center justify-center bg-white dark:bg-gray-800 font-sans'>
      <div 
        className='w-[150px] bg-blue-200 hover:bg-blue-300 active:bg-blue-400 font-light px-2 py-1 select-none cursor-pointer'
        onClick={() => {setShowDocumentUploadModal(true)}}
      >
        Upload document!
      </div>
      {showDocumentUploadModal &&
        <DocumentUploadModal handleCloseModalClick={() => {setShowDocumentUploadModal(false)}} />
      }
    </div>
  );
}

export default HomePage;
