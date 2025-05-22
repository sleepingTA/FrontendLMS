import React, { useState, useEffect } from "react";

interface CategoryModalProps {
  mode?: "add" | "edit";
  initName?: string;
  initDesc?: string;
  onSubmit: (name: string, desc: string) => void;
  onClose: () => void;
}

export default function CategoryEditModal({
  mode = "add",
  initName = "",
  initDesc = "",
  onSubmit,
  onClose,
}: CategoryModalProps) {
  const [name, setName] = useState(initName);
  const [desc, setDesc] = useState(initDesc);

  useEffect(() => {
    setName(initName);
    setDesc(initDesc);
  }, [initName, initDesc]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onSubmit={e => {
          e.preventDefault();
          if (name.trim() && desc.trim()) {
            onSubmit(name.trim(), desc.trim());
          }
        }}>
        <button
          type="button"
          className="absolute top-3 right-5 text-2xl font-bold text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >×</button>
        <h2 className="text-xl font-bold mb-5 text-center">{mode === "edit" ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên danh mục</label>
            <input
              className="w-full border rounded px-3 py-2 focus:border-blue-500 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-20 focus:border-blue-500 outline-none resize-none"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >{mode === "edit" ? "Lưu thay đổi" : "Thêm"}</button>
        </div>
      </form>
    </div>
  );
}
