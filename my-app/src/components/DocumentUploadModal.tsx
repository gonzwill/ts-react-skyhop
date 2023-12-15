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

const DocumentUploadModal: React.FC<DocumentUploadModal> = ({ handleCloseModalClick }) => {
  const [clientOption, setClientOption] = useState<string>('multiple');
  const [displayToleranceSelector, setDisplayToleranceSelector] = useState<boolean>(false);
  const [importName, setImportName] = useState<string>('');
  const [socialDistancingSplitOption, setSocialDistancingSplitOption] = useState<string>('yes');
  const [testingCenters, setTestingCenters] = useState<TestingCentersState>({1: null, 2: null, 3: null, 4: null});
  const [uploadedDocument, setUploadedDocument] = useState<File[] | []>([]);

  const displayedTestingCenters = clientOption === 'single'
    ? Object.entries(testingCenters).slice(0, 1)
    : Object.entries(testingCenters);

  const handleTestingCenterChange = (testingCenter: number, newOption: string) => {
    setTestingCenters({
      ...testingCenters,
      [testingCenter]: newOption,
    });
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
              <DragAndDropFileElement handleUploadedDocument={(files: File[]) => {setUploadedDocument(files)}}  />
              <span className='mb-2'></span>
              <hr className='w-[200px] border-b-0 border-[#CBCFDC] mb-2' />
              <div className='text-[#000426] text-[11px] font-medium mb-1'>Elapse Data Checking:</div>
              <div className='text-[#49A244] font-medium text-[11px] mb-2'>
                No Elapsed Dates!
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
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadModal;
