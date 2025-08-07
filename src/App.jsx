import { Toaster } from "sonner";
import Home from "./pages/Home";
import Header from "./components/header";
import PatientList from "./components/Sidebar";
import DiagnosisHistory from "./components/History";
import PatientInfoCard from "./components/PatientInfo";
import BloodPressureChart from "./components/Chart";
import VitalSigns from "./components/VitalSigns";
import { useEffect, useState } from "react";
import DiagnosticList from "./components/Diagnolist";
import LabResults from "./components/LabResults";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const username = "coalition";
  const password = "skills-test";
  const token = btoa(`${username}:${password}`);
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
        method: "GET",
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      const data = await res.json();
      console.log(data[0]);

      setPatients(data);
      if (data.length > 0) {
        setSelectedPatient(data[0]);
      }
    };

    fetchPatients();
  }, []);


  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50 font-sans p-1 text-gray-900">
        <Header />
        <div className="flex flex-1 gap-2 overflow-hidden">
          <div className="flex flex-col">
            <PatientList
              patients={patients}
              onPatientSelect={setSelectedPatient}
            />
          </div>
          <div className="p-6 max-w-2xl flex flex-col bg-white overflow-y-scroll hide-scrollbar shadow rounded-xl space-y-6">

            <div>
              <h2 className="text-xl font-semibold">Diagnosis History</h2>
              <BloodPressureChart patient={selectedPatient} />
              <VitalSigns patient={selectedPatient} />
            </div>
            <DiagnosticList patient={selectedPatient} />
          </div>
          <div className="flex flex-col overflow-scroll">
          <PatientInfoCard patient={selectedPatient} />
          <LabResults patient={selectedPatient} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;