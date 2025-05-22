import React, { ChangeEvent, useState } from "react";

interface Course {
    id: string;
    title: string;
    videoUrl: string;
    materialUrl: string;
}
interface CourseModalProps {
    courseName: string;
    courses: Course[];
    onClose: () => void;
    onAddLesson?: (lesson: Course) => void;
    onEditLesson?: (lesson: Course) => void;
    onDeleteLesson?: (id: string) => void;
}
export default function CoueseModal({
    courseName,
    courses,
    onClose,
    onAddLesson,
    onEditLesson,
    onDeleteLesson,
}: CourseModalProps) {
    const [showAdd, setShowAdd] = useState(false);
    const [newLesson, setNewLesson] = useState({ title: "", videoUrl: "", materialUrl: "" });

    function handlePdfChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-full max-w-xl p-6 relative">
                <button
                    className="absolute top-2 right-4 text-xl cursor-pointer hover:bg-gray-200"
                    onClick={onClose}
                >×</button>
                <h3 className="text-lg font-bold mb-4">Quản lý bài học - {courseName}</h3>

                <button
                    className="mb-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setShowAdd(true)}
                >+ Thêm bài học</button>
                
                {showAdd && (
                    <form
                        className="mb-4 bg-gray-50 p-3 rounded"
                        onSubmit={e => {
                            e.preventDefault();
                            if (newLesson.title && newLesson.videoUrl) {
                                onAddLesson?.({
                                    id: Math.random().toString(36).slice(2, 8),
                                    ...newLesson,
                                });
                                setNewLesson({ title: "", videoUrl: "", materialUrl: "" });
                                setShowAdd(false);
                            }
                        }}
                    >
                        <div className="flex flex-col gap-2">
                            <input
                                className="border rounded px-2 py-1"
                                placeholder="Tên bài học"
                                value={newLesson.title}
                                onChange={e => setNewLesson(l => ({ ...l, title: e.target.value }))}
                                required
                            />
                            <input
                                className="border rounded px-2 py-1"
                                placeholder="Link video (YouTube/embed)"
                                value={newLesson.videoUrl}
                                onChange={e => setNewLesson(l => ({ ...l, videoUrl: e.target.value }))}
                                required
                            />
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Upload file PDF</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handlePdfChange}
                                    className="block w-full border rounded px-3 py-2 cursor-pointer"
                                />
                                <div className="text-xs text-gray-400 mt-1">
                                    Chỉ cho phép file PDF.
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button type="submit" className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 cursor-pointer">
                                    Thêm
                                </button>
                                <button type="button" className="bg-gray-400 text-white rounded px-3 py-1 hover:bg-gray-500 cursor-pointer"
                                    onClick={() => setShowAdd(false)}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                <ul className="divide-y">
                    {courses.map((l, idx) => (
                        <li key={l.id} className="py-2 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{l.title}</span>
                                <div className="flex gap-2">
                                    <button
                                        className="text-red-500 text-sm hover:underline"
                                        onClick={() => onDeleteLesson?.(l.id)}
                                    >Xóa</button>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-slate-600">Video: </span>
                                <a href={l.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Xem video</a>
                            </div>
                            <div>
                                <span className="text-sm text-slate-600">PDF: </span>
                                {l.materialUrl
                                    ? <a href={l.materialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Tải PDF</a>
                                    : <span className="italic text-gray-400">Chưa có</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
