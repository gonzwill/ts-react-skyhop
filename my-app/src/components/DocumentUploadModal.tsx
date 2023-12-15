import React, { MouseEvent, useState } from 'react';

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
  const [displayToleranceSelector, setDisplayToleranceSelector] = useState<boolean>(false);
  const [importName, setImportName] = useState<string>('');
  const [socialDistancingSplitOption, setSocialDistancingSplitOption] = useState<string>('yes');
  const [testingCenters, setTestingCenters] = useState<TestingCentersState>({1: null, 2: null, 3: null, 4: null});
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
        <div>
          <hr className='my-2'/>
          <div>
            {uploadedDocument.map((file, ind, arr) => (
              <div className={`flex flex-row ${ind === arr.length - 1 && 'mb-2'}`} key={file.name}>
                <img className='h-4 w-3 mr-2 my-auto' src='https://i.imgur.com/mUfzmVN.png' />
                <div className='flex flex-col' style={{width: '90%'}}>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='text-slate-400 text-[10px] font-light'>
                      {file.name}
                    </div>
                    <div className='text-[#4D4F50] text-[9px] font-medium'>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <div className='mt-1'>
                    <div className='w-full h-[2px] bg-gray-200 rounded-md'>
                      <div className='h-full bg-[#F28D3C] rounded-md' style={{width: `${uploadedDocumentProgress}%`}}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className='mb-3' />
        </div>
      );
    }
  };

  const renderCompletionFooter = () => {
    if (uploadedDocumentProgress === 100) {
      return (
        <div className='flex flex-col w-[450px] mx-auto mt-5'>
          <div className='mx-auto text-[#000426] text-sm font-medium'>
            Data in the import file is correct. Please press Continue to import.
          </div>
          <div className='w-full flex flex-row justify-around mx-auto mt-3 text-xs'>
            <div 
              className='w-5/12 text-center py-2 text-white rounded-md border-2 border-[#1A3E6F] bg-[#1A3E6F] select-none cursor-pointer'
              onClick={handleCloseModalClick}
            >
              Continue Import
            </div>
            <div 
              className='w-5/12 text-center py-2 text-[#F3973E] rounded-md border-2 border-[#F3973E] bg-white select-none cursor-pointer'
              onClick={handleCloseModalClick}
            >
              Cancel
            </div>
          </div>
        </div>
      );
    }
  };
  
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
              <DropdownElement 
                optionsData={['Import1', 'Import2', 'Import3']} 
                currentChoice={importName} 
                defaultText={'Select Import Name:'} 
                handleChoice={(newOption: string) => {setImportName(newOption)}}
              />
              <span className='mb-2'></span>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Select a manifest that you'd like to import</div>
              <DragAndDropFileElement 
                handleUploadedDocument={(files: File[]) => {setUploadedDocument(files)}}  
                handleUploadedDocumentProgress={(progress) => setUploadedDocumentProgress(progress)} 
              />
              {renderUploadedDocuments()}
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-1'>Elapse Data Checking:</div>
              <div className={`${uploadedDocumentProgress === 100 ? 'text-[#49A244] font-medium' : 'text-[#4D4F50] font-extralight'} text-[11px] mb-2`}>
                {uploadedDocumentProgress === 100 ? 'No Elapsed Dates!' : 'No data available for elapsed dates'}
              </div>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-2'>Tolerance Window:</div>
              <div className='flex flex-row items-center text-[#092D4E] text-[11px] font-extralight'>
                <ToggleSwitch 
                  checkedValue={displayToleranceSelector} 
                  handleToggle={() => {setDisplayToleranceSelector(!displayToleranceSelector)}} 
                />
                <div className='ml-1'>Toggle {displayToleranceSelector === true ? 'ON' : 'OFF'}</div>
                <div className='mx-2'>|</div>
                <div className='flex flex-row items-center'>
                  <div className='flex flex-row'>
                    <img className='h-4 w-4 mr-1' src='https://i.imgur.com/jJfP1It.png' />
                    <div>Select Tolerance Level</div>
                  </div>
                </div>
              </div>
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
              <div className={`${uploadedDocumentProgress === 100 ? 'text-[#49A244] font-medium' : 'text-[#4D4F50] font-extralight'} text-[11px] mb-2`}>
                {uploadedDocumentProgress === 100 ? 'All available!' : 'No data available for locations'}
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
              <div className='flex flex-col'>
                {displayedTestingCenters.map(([testingCenter, client]) => (
                  <div className='flex flex-row items-center' key={testingCenter}>
                    <div className='w-[80px] mr-6 text-[#092D4E] text-[10px] font-extralight'>Testing Center {testingCenter}</div>
                    <div className='w-[110px]'>
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
              </div>
            </div>
          </div>
          {renderCompletionFooter()}
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadModal;
