import React from "react";

interface Category {  
  name: string;
  description: string;
}

interface CategoryModalProps {
  categoryName: string;
  categories: Category[];
  onClose: () => void;
}

export default function UserModal({ categoryName, categories, onClose }: CategoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative max-h-[95vh] overflow-y-auto">
        <button
          className="absolute top-2 right-4 text-xl cursor-pointer hover:bg-gray-200"
          onClick={onClose}
        >×</button>
        <h3 className="text-lg font-bold mb-4">Danh sách users - {courseName}</h3>
        <ul className="divide-y">
          {users.length === 0 ? (
            <li className="py-2 text-center text-gray-400 italic">Chưa có user nào tham gia khóa học này</li>
          ) : (
            users.map(u => (
              <li key={u.id} className="py-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold">{u.name}</span>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
