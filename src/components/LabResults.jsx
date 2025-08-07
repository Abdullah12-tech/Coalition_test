import React from 'react';

const LabResults = ({ patient }) => {
  if (!patient || !patient.lab_results || patient.lab_results.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Lab Results</h2>
        <p className="text-gray-500">No lab results available for this patient</p>
      </div>
    );
  }

  const categorizeLabResults = (results) => {
    const categories = {
      'Blood Tests': [],
      'Imaging': [],
      'Other Tests': []
    };

    results.forEach(result => {
      if (result.includes('Blood') || result.includes('Panel') || result.includes('Hemoglobin')) {
        categories['Blood Tests'].push(result);
      } 
      else if (result.includes('Echo') || result.includes('X-Ray') || result.includes('MRI') || result.includes('Mammography') || result.includes('Ultrasound')) {
        categories['Imaging'].push(result);
      }
      else {
        categories['Other Tests'].push(result);
      }
    });

    return categories;
  };

  const labCategories = categorizeLabResults(patient.lab_results);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lab Results</h2>
      <div className="space-y-4">
        {Object.entries(labCategories).map(([category, tests], index) => (
          tests.length > 0 && (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">{category}</h3>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {tests.length} {tests.length === 1 ? 'test' : 'tests'}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {tests.map((test, testIndex) => (
                  <div 
                    key={testIndex} 
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-sm text-gray-700">{test}</span>
                    <svg 
                      className="w-4 h-4 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default LabResults;