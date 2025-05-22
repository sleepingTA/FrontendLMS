import React, { useState } from 'react'
import CategoryModal from '../AdminModal/CategoryModal';
import CategoryEditModal from '../AdminModal/CategoryEditModal';

const Categories = [
    {
        id: 1,
        name: 'AI & Machine Learning',
        description: 'Khóa học về AI, học máy, deep learning, NLP...',
    },
    {
        id: 2,
        name: 'Web Development',
        description: 'HTML, CSS, JS, ReactJS, backend web,...',
    },
    {
        id: 3,
        name: 'Mobile Development',
        description: 'Lập trình ứng dụng di động Android/iOS, React Native...',
    },
    {
        id: 4,
        name: 'Data Science',
        description: 'Phân tích dữ liệu, trực quan hóa dữ liệu, Python, R,...',
    },
];

export default function AdCate() {
    const [showAdd, setShowAdd] = useState(false);
    const [categories, setCategories] = useState(Categories);
    const [editCate, setEditCate] = useState<{ id: number, name: string, description: string } | null>(null);


    return (
        <div className='w-full h-screen overflow-x-hidden flex flex-col'>
            <h2 className="text-2xl font-bold text-center my-6">Categories Management</h2>
            <div className="flex justify-end mb-4 px-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowAdd(true)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {showAdd && (
                <CategoryModal
                    onAdd={(name, desc) => {
                        setCategories([
                            ...categories,
                            { id: categories.length + 1, name, description: desc }
                        ]);
                        setShowAdd(false);
                    }}
                    onClose={() => setShowAdd(false)}
                />
            )}

            <div className="w-full flex-grow p-6">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 whitespace-nowrap">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                ID
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Name
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Description
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                        {categories.map((cate, idx) => (
                            <tr key={cate.id} className={idx % 2 !== 0 ? 'bg-blue-50' : ''}>
                                <td className="p-4 text-[15px] text-slate-900 font-medium">
                                    {cate.id}
                                </td>
                                <td className="p-4 text-[15px] text-slate-600 font-medium">
                                    {cate.name}
                                </td>
                                <td className="p-4 text-[15px] text-slate-600 font-medium">
                                    {cate.description}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <button className="mr-3 cursor-pointer" title="Edit" onClick={() => setEditCate({ ...cate })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5} stroke="currentColor" className="size-5 hover:bg-gray-200 text-cyan-500">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button title="Delette" className="cursor-pointer" onClick={() => {
                                            if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
                                                setCategories(categories.filter(c => c.id !== cate.id));
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5} stroke="currentColor" className="size-5 hover:bg-gray-200 text-red-700">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editCate && (
                    <CategoryEditModal
                        mode="edit"
                        initName={editCate.name}
                        initDesc={editCate.description}
                        onSubmit={(name, desc) => {
                            setCategories(categories =>
                                categories.map(c =>
                                    c.id === editCate.id ? { ...c, name, description: desc } : c
                                )
                            );
                            setEditCate(null);
                        }}
                        onClose={() => setEditCate(null)}
                    />
                )}
            </div>
        </div>
    )
}
