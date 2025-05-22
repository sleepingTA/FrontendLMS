import React, { useState, useRef, useEffect } from "react";

interface AddCategoryModalProps {
  onAdd: (name: string, description: string) => void;
  onClose: () => void;
}

export default function AddCategoryModal({ onAdd, onClose }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onSubmit={e => {
          e.preventDefault();
          if (name.trim() && desc.trim()) {
            onAdd(name.trim(), desc.trim());
            setName(""); setDesc("");
          }
        }}
      >
        <button
          type="button"
          className="absolute top-3 right-5 text-2xl font-bold text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >×</button>
        <h2 className="text-xl font-bold mb-5 text-center">Thêm danh mục</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên danh mục</label>
            <input
              ref={inputRef}
              className="w-full border rounded px-3 py-2 focus:border-blue-500 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nhập tên danh mục..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-20 focus:border-blue-500 outline-none resize-none"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Nhập mô tả..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >Thêm</button>
        </div>
      </form>
    </div>
  );
}
