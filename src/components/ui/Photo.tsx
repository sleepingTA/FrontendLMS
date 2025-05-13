import React, { useState } from 'react'

export default function Photo() {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };
    return (
        <div className='flex max-w-7xl mx-auto p-6 gap-8'>
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Photo</h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Add a nice photo of yourself for your profile.
                </p>

                {/* Image Preview Section */}
                <div className="border border-gray-300 rounded-md bg-gray-50 p-6 w-full max-w-lg items-center mx-auto">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image preview</p>
                    <div className="w-full aspect-video border border-gray-300 bg-white flex items-center justify-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="object-contain h-full max-h-60"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-24 h-24 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Upload File Section */}
                <div className="max-w-md mt-6 items-center mx-auto">
                    <label className="text-base text-slate-900 font-medium mb-3 block">Upload file</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-slate-500 font-medium text-sm bg-white border 
          file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 
          file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        PNG, JPG, SVG, WEBP, and GIF are allowed.
                    </p>
                    {/* Save button */}
                    <button
                        className=" mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
