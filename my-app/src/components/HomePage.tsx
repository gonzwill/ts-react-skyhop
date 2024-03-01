import React, {useState} from 'react';

import DocumentUploadModal from './DocumentUploadModal';

interface HomePageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [showDocumentUploadModal, setShowDocumentUploadModal] = useState<boolean>(false);

  return (
    <div className='flex h-screen items-center justify-center bg-white dark:bg-gray-800 font-sans'>
      <button 
        className='w-[150px] bg-blue-200 hover:bg-blue-300 active:bg-blue-400 font-light px-2 py-1 select-none cursor-pointer'
        onClick={() => {setShowDocumentUploadModal(true)}}
      >
        Upload document!
      </button>
      {showDocumentUploadModal &&
        <DocumentUploadModal 
          handleCloseModalClick={() => {setShowDocumentUploadModal(false)}}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      }
    </div>
  );
}

export default HomePage;
