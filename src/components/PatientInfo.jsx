import React from 'react';
import { 
  BsCalendar3, 
  BsGenderFemale, 
  BsGenderMale,
  BsTelephone, 
  BsShield 
} from 'react-icons/bs';

const PatientInfoCard = ({ patient }) => {
  if (!patient) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mx-auto text-center">
        <p>Please select a patient to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mx-auto">
      <div className="text-center mb-8">
        <div className="relative mb-4">
          <img 
            src={patient.profile_picture} 
            alt={patient.name} 
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-100 shadow-lg object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{patient.name}</h2>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BsCalendar3 className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Date Of Birth</p>
            <p className="font-semibold text-gray-900">
              {new Date(patient.date_of_birth).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            {patient.gender === 'Female' ? (
              <BsGenderFemale className="w-5 h-5 text-gray-600" />
            ) : (
              <BsGenderMale className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Gender</p>
            <p className="font-semibold text-gray-900">{patient.gender}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BsTelephone className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Contact Info</p>
            <p className="font-semibold text-gray-900">{patient.phone_number}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BsTelephone className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Emergency Contacts</p>
            <p className="font-semibold text-gray-900">{patient.emergency_contact}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BsShield className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Insurance Provider</p>
            <p className="font-semibold text-gray-900">{patient.insurance_type}</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2">
        Show All Information
      </button>
    </div>
  );
};

export default PatientInfoCard;