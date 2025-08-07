import { FaEllipsisV } from 'react-icons/fa';
import { useState } from 'react';

const PatientList = ({ patients, onPatientSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handlePatientClick = (patient, index) => {
    setSelectedId(index);
    onPatientSelect(patient);
  };

  return (
    <div className="w-72 h-full bg-white rounded-xl shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Patients</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-none scrollbar-thin scrollbar-thumb-gray-300 pr-2">
        {patients.map((patient, index) => (
          <div
            key={index}
            onClick={() => handlePatientClick(patient, index)}
            className={`flex items-center justify-between px-2 py-3 rounded-lg cursor-pointer mb-1 transition-colors ${
              selectedId === index ? 'bg-cyan-100' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{patient.name}</p>
                <p className="text-xs text-gray-500">
                  {patient.gender}, {patient.age}
                </p>
              </div>
            </div>
            <FaEllipsisV className="text-gray-400 hover:text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;