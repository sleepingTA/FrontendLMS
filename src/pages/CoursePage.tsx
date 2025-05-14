import React from 'react'

export default function CoursePage() {
    return (
        <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">My Course</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[3/4] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>
                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>     
                </div>
            </div>
        </div>
    )
}
