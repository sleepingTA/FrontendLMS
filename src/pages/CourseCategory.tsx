import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CategoryFilterDropdown from '../components/ui/CategoryFilterDropdown';

export default function CourseCategory() {

    window.addEventListener("load", (event: Event) => {
        const toggleElement = document.querySelector('[data-dropdown-toggle="dropdown"]') as HTMLElement | null;

        if (toggleElement) {
            toggleElement.click();
        }
    });

    return (
        <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">Find your course</h2>
            <CategoryFilterDropdown />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>

                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>

                    {/* Giá cả */}
                    <div className="mt-2">
                        <div className="text-lg font-bold text-black">199.000 ₫</div>
                        <div className="text-sm text-gray-500 line-through">399.000 ₫</div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1.5 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>

                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>

                    {/* Giá cả */}
                    <div className="mt-2">
                        <div className="text-lg font-bold text-black">199.000 ₫</div>
                        <div className="text-sm text-gray-500 line-through">399.000 ₫</div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1.5 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>

                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>

                    {/* Giá cả */}
                    <div className="mt-2">
                        <div className="text-lg font-bold text-black">199.000 ₫</div>
                        <div className="text-sm text-gray-500 line-through">399.000 ₫</div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1.5 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>

                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>

                    {/* Giá cả */}
                    <div className="mt-2">
                        <div className="text-lg font-bold text-black">199.000 ₫</div>
                        <div className="text-sm text-gray-500 line-through">399.000 ₫</div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1.5 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
                    <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/sunglass7.webp" alt="product1"
                            className="h-full w-full object-contain" />
                    </div>

                    {/* Tiêu đề + mô tả */}
                    <h3 className="text-lg font-semibold text-slate-900 mt-4">MSc Data Science</h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Launch your career in data science and AI by gaining qualifications in this in-demand field.
                    </p>

                    {/* Giá cả */}
                    <div className="mt-2">
                        <div className="text-lg font-bold text-black">199.000 ₫</div>
                        <div className="text-sm text-gray-500 line-through">399.000 ₫</div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1.5 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
