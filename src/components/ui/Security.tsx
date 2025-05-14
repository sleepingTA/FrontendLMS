import React from 'react'
import { MdEdit, MdOutlineSecurity } from 'react-icons/md'

export default function Security() {
    return (
        <div className="max-w-7xl mx-auto p-6 flex gap-8">
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Account</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Edit your account settings and change your password here.
                </p>
                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <div className="relative">
                        <input
                            type="email"
                            readOnly
                            value="nguyenthanhhuy22806010208@gmail.com"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 bg-gray-100 cursor-not-allowed"
                        />
                        <button className="absolute right-2 top-2.5 text-purple-600 hover:text-purple-800">
                            <MdEdit size={20} />
                        </button>
                    </div>
                </div>

                {/* Password */}
                <div className="mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
                        <input
                            type="password"
                            placeholder="Re-type new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Change password
                    </button>
                </div>
            </div>
        </div>
    )
}
