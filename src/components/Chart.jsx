import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BloodPressureChart = ({ patient }) => {
    if (!patient || !patient.diagnosis_history || patient.diagnosis_history.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <p>No blood pressure data available for this patient</p>
            </div>
        );
    }

    const history = [...patient.diagnosis_history]
        .sort((a, b) => new Date(`${a.month} 1, ${a.year}`) - new Date(`${b.month} 1, ${b.year}`))
        .slice(-6);

    const labels = history.map(item => `${item.month} ${item.year}`);
    const systolicData = history.map(item => item.blood_pressure.systolic.value);
    const diastolicData = history.map(item => item.blood_pressure.diastolic.value);

    const latestSystolic = systolicData[systolicData.length - 1];
    const latestDiastolic = diastolicData[diastolicData.length - 1];
    const systolicStatus = history[history.length - 1].blood_pressure.systolic.levels;
    const diastolicStatus = history[history.length - 1].blood_pressure.diastolic.levels;

    const data = {
        labels,
        datasets: [
            {
                label: 'Systolic',
                data: systolicData,
                borderColor: 'rgb(221, 160, 221)',
                backgroundColor: 'rgba(221, 160, 221, 0.5)',
                pointBackgroundColor: 'rgb(221, 160, 221)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Diastolic',
                data: diastolicData,
                borderColor: 'rgb(138, 43, 226)',
                backgroundColor: 'rgba(138, 43, 226, 0.5)',
                pointBackgroundColor: 'rgb(138, 43, 226)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Blood Pressure',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Pressure (mmHg)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    function getStatusColor(status) {
        if (status.includes('Higher')) return 'text-red-600';
        if (status.includes('Lower')) return 'text-blue-600';
        return 'text-green-600';
    }

    return (
        <div className="p-6 flex bg-white rounded-lg shadow-lg">
            <div className='w-2/3'>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Blood Pressure</h2>
                    <span className="text-sm text-gray-500">Last {history.length} months</span>
                </div>
                <Line data={data} options={options} />
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <p>
                    <span className="font-bold text-purple-600">● Systolic</span> {latestSystolic}
                    <span className={`${getStatusColor(systolicStatus)}`}> ● {systolicStatus}</span>
                </p>
                <p>
                    <span className="font-bold text-indigo-600">● Diastolic</span> {latestDiastolic}
                    <span className={`${getStatusColor(diastolicStatus)}`}> ● {diastolicStatus}</span>
                </p>
            </div>
        </div>
    );
};

export default BloodPressureChart;