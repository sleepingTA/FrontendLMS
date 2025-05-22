import React from 'react'
import { MdBlock } from "react-icons/md";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    joinedAt: "2022-05-15",
    status: "Online"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    joinedAt: "2022-07-20",
    status: "Offline"
  },
  {
    name: "Alen Doe",
    email: "alen@example.com",
    role: "User",
    joinedAt: "2022-07-21",
    status: "Block"
  }
];

export default function AdCourses() {
  return (
    <div className='w-full h-screen overflow-x-hidden flex flex-col'>
      <h2 className="text-xl font-bold text-center my-6">Users Management</h2>
      <div className="w-full flex-grow p-6">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">Name</th>
              <th className="p-4 text-left text-sm font-medium text-white">Email</th>
              <th className="p-4 text-left text-sm font-medium text-white">Role</th>
              <th className="p-4 text-left text-sm font-medium text-white">Joined At</th>
              <th className="p-4 text-left text-sm font-medium text-white">Actions</th>
              <th className="p-4 text-left text-sm font-medium text-white">Status</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {users.map((user, idx) => (
              <tr key={user.email} className={idx % 2 !== 0 ? "bg-blue-50" : ""}>
                <td className="p-4 text-[15px] text-slate-900 font-medium">{user.name}</td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">{user.email}</td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">{user.role}</td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">{user.joinedAt}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <button className="mr-3 cursor-pointer" title="UnBlock">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:bg-gray-200">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </button>
                    <button title="Block" className="cursor-pointer">
                      <MdBlock className='w-5 h-5 fill-red-500 hover:bg-gray-200' />
                    </button>
                  </div>
                </td>
                <td className='p-4'>
                  <span className={
                    user.status === "Online"
                      ? 'flex items-center gap-1 text-green-600 font-semibold'
                      : user.status === "Offline"
                        ? 'flex items-center gap-1 text-yellow-600 font-semibold'
                        : 'flex items-center gap-1 text-red-600 font-semibold'
                  }>
                    {user.status === "Online" && <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>}
                    {user.status === "Offline" && <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span>}
                    {user.status === "Block" && <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
                    <span>{user.status}</span>
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
