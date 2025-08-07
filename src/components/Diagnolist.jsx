import React from 'react';

const DiagnosticList = ({ patient }) => {
  if (!patient || !patient.diagnostic_list || patient.diagnostic_list.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Diagnostic List</h2>
        <p className="text-gray-500">No diagnoses available for this patient</p>
      </div>
    );
  }
  const uniqueDiagnoses = patient.diagnostic_list.reduce((acc, current) => {
    const existing = acc.find(item => item.name === current.name && item.status === current.status);
    if (!existing) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actively being treated':
        return 'bg-red-100 text-red-800';
      case 'Under observation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cured':
        return 'bg-green-100 text-green-800';
      case 'Untreated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Diagnostic List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b font-medium">Problem/Diagnosis</th>
              <th className="p-3 border-b font-medium">Description</th>
              <th className="p-3 border-b font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {uniqueDiagnoses.map((diagnosis, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b text-gray-700 font-medium">{diagnosis.name}</td>
                <td className="p-3 border-b text-gray-600">{diagnosis.description}</td>
                <td className="p-3 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(diagnosis.status)}`}>
                    {diagnosis.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticList;