import React from 'react';

const payments = [
  {
    id: 'TXN2024001',
    date: '2025-05-16',
    customer: 'Nguyễn Văn A',
    total: 1500000,
    status: 'Success',
  },
  {
    id: 'TXN2024002',
    date: '2025-05-16',
    customer: 'Trần Thị B',
    total: 700000,
    status: 'Waiting',
  },
  {
    id: 'TXN2024003',
    date: '2025-05-15',
    customer: 'Lê Văn C',
    total: 2500000,
    status: 'Failed',
  },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function AdPay() {
  return (
    <div className="w-full h-screen overflow-x-hidden flex flex-col">      
      <h2 className="text-2xl font-bold text-center my-6">Payment Management</h2>
      
      <div className="w-full flex-grow p-6">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Total Payment</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                <td className="p-4 font-semibold text-slate-900">{p.id}</td>
                <td className="p-4 text-slate-700">{p.date}</td>
                <td className="p-4 text-slate-700">{p.customer}</td>
                <td className="p-4 text-slate-700">{formatCurrency(p.total)}</td>
                <td className="p-4">
                  <span className={
                    p.status === 'Success'
                      ? 'text-green-600 font-semibold'
                      : p.status === 'Waiting'
                      ? 'text-yellow-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
