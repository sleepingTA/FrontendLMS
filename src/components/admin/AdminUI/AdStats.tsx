import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const incomeByMonth = [
  { month: '01/2024', income: 32, transactions: 82 },
  { month: '02/2024', income: 42, transactions: 94 },
  { month: '03/2024', income: 58, transactions: 110 },
  { month: '04/2024', income: 66, transactions: 120 },
  { month: '05/2024', income: 78, transactions: 125 },
  { month: '06/2024', income: 61, transactions: 101 },
  { month: '07/2024', income: 80, transactions: 137 },
  { month: '08/2024', income: 73, transactions: 128 },
  { month: '09/2024', income: 70, transactions: 125 },
  { month: '10/2024', income: 85, transactions: 144 },
  { month: '11/2024', income: 90, transactions: 155 },
  { month: '12/2024', income: 95, transactions: 162 }
];

const total = incomeByMonth.reduce((sum, cur) => sum + cur.income, 0);
const avg = Math.round(total / 12);
const max = Math.max(...incomeByMonth.map(m => m.income));
const min = Math.min(...incomeByMonth.map(m => m.income));
const maxMonth = incomeByMonth.find(m => m.income === max)?.month;
const minMonth = incomeByMonth.find(m => m.income === min)?.month;
const totalTransactions = incomeByMonth.reduce((sum, cur) => sum + cur.transactions, 0);

// Bar chart data
const data = {
  labels: incomeByMonth.map(item => item.month),
  datasets: [
    {
      label: 'Thu nhập (triệu VND)',
      data: incomeByMonth.map(item => item.income),
      backgroundColor: 'rgba(59,130,246,0.85)', // Tailwind blue-600
      borderRadius: 12,
      barPercentage: 0.7,
      categoryPercentage: 0.6,
      borderSkipped: false,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      padding: 12,
      backgroundColor: '#111827', // bg-gray-900
      borderColor: '#3B82F6',
      borderWidth: 1.5,
      callbacks: {
        label: (context: any) => ` Thu nhập: ${context.parsed.y} triệu VND`,
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: { size: 14, weight: 'bold' },
        color: '#3B82F6'
      },
      grid: {
        color: '#E5E7EB'
      },
      title: {
        display: true,
        text: 'Triệu VND',
        font: { size: 15 }
      }
    },
    x: {
      ticks: {
        font: { size: 13, weight: 'bold' },
        color: '#64748b'
      },
      grid: {
        color: '#F3F4F6'
      },
    }
  }
};

export default function AdStats() {
  return (
    <div className="max-w-5xl mx-auto px-2 py-10">      
      <div className="gap-3 mb-4 text-center items-center">        
        <div className="text-3xl font-extrabold text-slate-800">Income Report</div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-2xl flex flex-col items-center shadow">
          <span className="text-sm text-blue-600 font-semibold mb-1">Tổng thu nhập</span>
          <span className="text-2xl font-bold text-blue-900">{total.toLocaleString("vi-VN")} triệu</span>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-2xl flex flex-col items-center shadow">
          <span className="text-sm text-green-700 font-semibold mb-1">Trung bình/tháng</span>
          <span className="text-2xl font-bold text-green-900">{avg.toLocaleString("vi-VN")} triệu</span>
        </div>
        <div className="bg-gradient-to-r from-violet-100 to-blue-100 p-5 rounded-2xl flex flex-col items-center shadow">
          <span className="text-sm text-violet-700 font-semibold mb-1">Cao nhất ({maxMonth})</span>
          <span className="text-2xl font-bold text-violet-900">{max.toLocaleString("vi-VN")} triệu</span>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-red-100 p-5 rounded-2xl flex flex-col items-center shadow">
          <span className="text-sm text-pink-700 font-semibold mb-1">Tổng giao dịch</span>
          <span className="text-2xl font-bold text-pink-900">{totalTransactions.toLocaleString("vi-VN")}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg w-full min-h-[420px] p-6 flex flex-col justify-center">
        <Bar data={data} options={options as any} />
      </div>
      <div className="flex justify-end mt-3 text-sm text-gray-400 italic">
        * Đơn vị: triệu VND
      </div>
    </div>
  );
}
