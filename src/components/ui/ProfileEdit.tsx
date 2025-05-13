import React from 'react'

export default function Profile() {
  return (
    <div className='flex-1'>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Public profile</h1>
            <p className="text-sm text-gray-600 mb-6">Add information about yourself</p>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        defaultValue="Hoàng Thái Anh"
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Save
            </button>
        </div>
  )
}
