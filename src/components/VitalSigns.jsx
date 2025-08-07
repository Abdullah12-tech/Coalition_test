import React from 'react';
import { FaLungs, FaThermometerHalf, FaHeart } from 'react-icons/fa';
import Heart from "../assets/images/HeartBPM.svg"
import Respiratory from "../assets/images/respiratory rate.svg"
import Temperature from "../assets/images/temperature.svg"
const VitalSigns = ({ patient }) => {
  if (!patient || !patient.diagnosis_history || patient.diagnosis_history.length === 0) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <p className="text-gray-700">No vital signs data available</p>
      </div>
    </div>;
  }

  const latestDiagnosis = patient.diagnosis_history[0];

  const vitalSigns = [
    { 
      icon: Respiratory, 
      label: 'Respiratory Rate', 
      value: `${latestDiagnosis.respiratory_rate.value} bpm`, 
      status: latestDiagnosis.respiratory_rate.levels, 
      bgColor: 'bg-blue-100', 
      textColor: getStatusColor(latestDiagnosis.respiratory_rate.levels)
    },
    { 
      icon: Temperature, 
      label: 'Temperature', 
      value: `${latestDiagnosis.temperature.value}°F`, 
      status: latestDiagnosis.temperature.levels, 
      bgColor: 'bg-pink-100', 
      textColor: getStatusColor(latestDiagnosis.temperature.levels)
    },
    { 
      icon: Heart, 
      label: 'Heart Rate', 
      value: `${latestDiagnosis.heart_rate.value} bpm`, 
      status: latestDiagnosis.heart_rate.levels, 
      bgColor: 'bg-red-100', 
      textColor: getStatusColor(latestDiagnosis.heart_rate.levels)
    },
  ];

  function getStatusColor(status) {
    if (status.includes('Higher')) return 'text-red-600';
    if (status.includes('Lower')) return 'text-blue-600';
    return 'text-green-600';
  }

  return (
    <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-6">
      {vitalSigns.map((sign, index) => (
        <div key={index} className={`${sign.bgColor} p-4 rounded-lg text-left`}>
          <div className={`text-3xl mb-2 ${sign.textColor}`}> <img src={sign.icon} alt="" /> </div>
          <p className="text-gray-700">{sign.label}</p>
          <p className="text-lg font-semibold text-gray-900">{sign.value}</p>
          <p className={`text-sm ${sign.textColor}`}>{sign.status}</p>
        </div>
      ))}
    </div>
  );
};

export default VitalSigns;