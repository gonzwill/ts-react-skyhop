import React, { MouseEvent, useReducer, useState } from 'react';

import DragAndDropFileElement from './DragAndDropFileElement.tsx';
import DropdownElement from './formComponents/DropdownElement.tsx';
import RadioButton from './formComponents/RadioButton.tsx';
import ToggleSwitch from './formComponents/ToggleSwitch.tsx';

interface DocumentUploadModal {
  handleCloseModalClick: () => void;
}

interface TestingCentersState {
  [testingCenter: number]: string | null;
}

interface ToleranceSettings {
  displayToleranceLevel: boolean;
  displayToleranceSelector: boolean;
  toleranceLevelValue: number;
}

type ToggleSelectorDisplay = { type: 'toggle_tolerance_selector_display' };
type ToggleLevelDisplay = { type: 'toggle_tolerance_level_display' };
type SetTolerance = { type: 'set_tolerance_level'; payload: number };
type ToleranceActionType = ToggleSelectorDisplay | ToggleLevelDisplay | SetTolerance;

const initialToleranceSettings: ToleranceSettings = {
  displayToleranceLevel: false,
  displayToleranceSelector: false,
  toleranceLevelValue: 1,
};

const toleranceReducer = (state: ToleranceSettings, action: ToleranceActionType) => {
  switch (action.type) {
    case 'toggle_tolerance_selector_display':
      return {
        ...state,
        displayToleranceSelector: !state.displayToleranceSelector,
      };
    case 'toggle_tolerance_level_display':
      return {
        ...state,
        displayToleranceLevel: !state.displayToleranceLevel,
      };
    case 'set_tolerance_level':
      return {
        ...state,
        toleranceLevelValue: action.payload,
      };
    default:
      return state;
  }
};

const DocumentUploadModal: React.FC<DocumentUploadModal> = ({ handleCloseModalClick }) => {
  const [clientOption, setClientOption] = useState<string>('multiple');
  const [importName, setImportName] = useState<string>('');
  const [socialDistancingSplitOption, setSocialDistancingSplitOption] = useState<string>('yes');
  const [testingCenters, setTestingCenters] = useState<TestingCentersState>({1: null, 2: null, 3: null, 4: null});
  const [toleranceSettings, dispatch] = useReducer(toleranceReducer, initialToleranceSettings);
  const [uploadedDocument, setUploadedDocument] = useState<File[] | []>([]);
  const [uploadedDocumentProgress, setUploadedDocumentProgress] = useState<number | null>(null);

  const displayedTestingCenters = clientOption === 'single'
    ? Object.entries(testingCenters).slice(0, 1)
    : Object.entries(testingCenters);

  const handleTestingCenterChange = (testingCenter: number, newOption: string) => {
    setTestingCenters({
      ...testingCenters,
      [testingCenter]: newOption,
    });
  };

  const formatFileSize = (fileSize: number): string => {
    const kilobytes = 1024;
    const megabytes = kilobytes * 1024;

    let formattedFileSize;

    if (fileSize < kilobytes) {
      formattedFileSize = `${fileSize} B`;
    } else if (fileSize < megabytes) {
      const kbFileSize = (fileSize / kilobytes).toFixed(2);
      formattedFileSize = `${kbFileSize} KB`;
    } else {
      const mbFileSize = (fileSize / megabytes).toFixed(2);
      formattedFileSize = `${mbFileSize} MB`;
    }

    return formattedFileSize;
  };

  const renderUploadedDocuments = () => {
    if (uploadedDocument.length > 0) {
      return (
        <section>
          <hr className='my-2'/>
          <div>
            {uploadedDocument.map((file, ind, arr) => (
              <div className={`flex flex-row ${ind === arr.length - 1 && 'mb-2'}`} key={file.name}>
                <img className='h-4 w-3 mr-2 my-auto' src='https://i.imgur.com/mUfzmVN.png' />
                <div className='flex flex-col' style={{width: '90%'}}>
                  <div className='flex flex-row justify-between items-center'>
                    <p className='text-slate-400 dark:text-gray-200 text-[9px] sm:text-[10px] font-light'>
                      {file.name}
                    </p>
                    <p className='text-[#4D4F50] dark:text-gray-500 text-[9px] font-medium'>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <div className='mt-1'>
                    <div className='w-full h-[2px] bg-gray-200 rounded-md'>
                      <div className='h-full bg-[#F28D3C] rounded-md' style={{width: `${uploadedDocumentProgress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className='mb-3' />
        </section>
      );
    }
  };

  const renderToleranceSelector = () => {
    if (toleranceSettings.displayToleranceSelector && uploadedDocumentProgress === 100) {
      return (
        <>
          <div className='mx-[5px] sm:mx-2'>|</div>
          <div className='relative flex flex-row items-center cursor-pointer'>
            <div className='flex flex-row hover:underline whitespace-nowrap'>
              <img className='h-4 w-4 mr-1 hidden sm:flex' src='https://i.imgur.com/jJfP1It.png' />
              <button className='select-none' onClick={() => {dispatch({ type: 'toggle_tolerance_level_display' })}}>
                <span>{toleranceSettings.displayToleranceLevel === true ? 'Hide' : 'Select'}</span> Tolerance Level
              </button>
            </div>
            {toleranceSettings.displayToleranceLevel &&
              <div className='absolute -top-2 left-[105px] sm:left-[125px] w-[50px] ml-2'>
                <DropdownElement 
                  optionsData={['1', '2', '3']} 
                  currentChoice={String(toleranceSettings.toleranceLevelValue)} 
                  defaultText={'Tolerance Level'} 
                  handleChoice={(newOption: string) => {dispatch({ type: 'set_tolerance_level', payload: Number(newOption) })}} 
                />
              </div>
            }
          </div>
        </>
      );
    }      
  };

  const renderTestingCenters = () => {
    return (
      <section>
        {displayedTestingCenters.map(([testingCenter, client]) => (
          <div className='flex flex-row items-center' key={testingCenter}>
            <p className='w-[75px] mr-6 text-[#092D4E] dark:text-gray-300 text-[10px] font-extralight whitespace-nowrap'>Testing Center {testingCenter}</p>
            <div className='min-w-[75px] sm:min-w-[110px]'>
              <DropdownElement 
                currentChoice={client}
                defaultText='Select Client'
                handleChoice={(newOption: string) => {handleTestingCenterChange(Number(testingCenter), newOption)}} 
                optionsData={['Client #1', 'Client #2', 'Client #3', 'Client #4']}
              />
            </div>
            <img 
              className='h-4 w-4 ml-3'
              src='https://i.imgur.com/jJfP1It.png' 
            />
          </div>
        ))}
      </section>
    );
  };

  const renderCompletionFooter = () => {
    if (uploadedDocumentProgress === 100) {
      return (
        <section>
          <div className='flex flex-col w-[400px] sm:w-[450px] mx-auto mt-10'>
            <p className='mx-auto text-[#000426] dark:text-white text-xs sm:text-sm font-medium whitespace-nowrap'>
              Data in the import file is correct. Please press Continue to import.
            </p>
            <div className='w-full flex flex-row justify-around mx-auto mt-2 sm:mt-3 text-[10px] sm:text-xs'>
              <button 
                className='w-5/12 text-center py-1 sm:py-2 text-white rounded-md border-2 border-[#1A3E6F] bg-[#1A3E6F] select-none cursor-pointer'
                onClick={handleCloseModalClick}
              >
                Continue Import
              </button>
              <button 
                className='w-5/12 text-center py-1 sm:py-2 text-[#F3973E] dark:text-white rounded-md border-2 border-[#F3973E] bg-white dark:bg-[#F3973E] select-none cursor-pointer'
                onClick={handleCloseModalClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      );
    }
  };
  
  return (
    <div 
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 dark:bg-opacity-30 z-50'
      onClick={handleCloseModalClick}
    >
      <div 
        className='h-[640px] w-[800px] p-7 rounded-2xl bg-white dark:bg-gray-800'
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {e.stopPropagation()}}
      >
        <button className='inline-block p-2 bg-[#041E5A] dark:bg-[#1A3E6F] rounded-lg'>
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
        </button>
        <div className='w-full sm:w-10/12 flex flex-col mx-auto'>
          <h1 className='w-[200px] mx-auto text-[#082C4D] dark:text-white text-2xl font-medium'>
            Document Upload
            <hr className='mt-1 text-[#CBCFDC] '/>
          </h1>
          <div className='flex flex-row justify-around sm:justify-between mt-3 sm:mt-5'>
            <div className='w-6/12 flex flex-col'>
              <section>
                <DropdownElement 
                  optionsData={['Import1', 'Import2', 'Import3']} 
                  currentChoice={importName} 
                  defaultText={'Select Import Name:'} 
                  handleChoice={(newOption: string) => {setImportName(newOption)}}
                />
                <span className='mb-2'></span>
              </section>
              <hr className='w-[170px] sm:w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <section>
                <h2 className='text-[#000426] dark:text-white  text-[11px] font-medium mb-2'>Select a manifest that you'd like to import</h2>
                <DragAndDropFileElement 
                  handleUploadedDocument={(files: File[]) => {setUploadedDocument(files)}}  
                  handleUploadedDocumentProgress={(progress) => setUploadedDocumentProgress(progress)} 
                />
                <span className='mb-1 sm:mb-2'></span>
                {renderUploadedDocuments()}
              </section>
              <hr className='w-[170px] sm:w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <section>
                <h2 className='text-[#000426] dark:text-white text-[11px] font-medium mb-1'>Elapse Data Checking:</h2>
                <p className={`${uploadedDocumentProgress === 100 ? 'text-[#49A244] font-medium' : 'text-[#4D4F50] dark:text-gray-500 font-extralight'} text-[11px] mb-1 sm:mb-2`}>
                  {uploadedDocumentProgress === 100 ? 'No Elapsed Dates!' : 'No data available for elapsed dates'}
                </p>
              </section>
              <hr className='w-[170px] sm:w-[200px] border-b-0 border-[#CBCFDC] mb-1 sm:mb-2' />
              <section>
                <h2 className='text-[#000426] dark:text-white text-[11px] font-medium mb-1 sm:mb-2'>Tolerance Window:</h2>
                <div className='flex flex-row items-center text-[#092D4E] dark:text-gray-300 text-[11px] font-extralight'>
                  <ToggleSwitch 
                    checkedValue={toleranceSettings.displayToleranceSelector} 
                    handleToggle={() => {dispatch({ type: 'toggle_tolerance_selector_display' })}} />
                  <p className='ml-1 whitespace-nowrap'>Toggle {toleranceSettings.displayToleranceSelector === true ? 'ON' : 'OFF'}</p>
                  {renderToleranceSelector()}
                </div>
              </section>
            </div>
            <div className='w-5/12 flex flex-col'>
              <section>
                <h2 className='text-[#000426] dark:text-white text-[11px] font-medium mb-1 sm:mb-2 whitespace-nowrap'>Split schedule using social distancing?</h2>
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
              </section>
              <hr className='w-[170px] sm:w-[200px] border-b-0 border-[#CBCFDC] mb-1 sm:mb-2' />
              <section>
                <h2 className='text-[#000426] dark:text-white text-[11px] font-medium mb-1'>Location Checking:</h2>
                <p className={`${uploadedDocumentProgress === 100 ? 'text-[#49A244] font-medium' : 'text-[#4D4F50] dark:text-gray-500 font-extralight'} text-[11px] mb-1 sm:mb-2`}>
                  {uploadedDocumentProgress === 100 ? 'All available!' : 'No data available for locations'}
                </p>
              </section>
              <hr className='w-[170px] sm:w-[200px] border-b-0 border-[#CBCFDC] mb-1 sm:mb-2' />
              <section>
                <h2 className='text-[#000426] dark:text-white text-[11px] font-medium mb-1 sm:mb-2'>Client:</h2>
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
                <div className='flex flex-col'>
                  {renderTestingCenters()}
                </div>
              </section>
            </div>
          </div>
          {renderCompletionFooter()}
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadModal;
