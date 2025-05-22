import React, { ChangeEvent, useState } from "react";

interface CourseAddFormProps {
  onSubmit: (course: {
    id: string;
    name: string;
    category: string;
    price: number;
    discountPercent: number;
    image: string;
  }) => void;
  onCancel?: () => void;
}

export default function AddCourse({ onSubmit, onCancel }: CourseAddFormProps) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    discountPercent: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[96vh] overflow-y-auto"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          id: form.id.trim(),
          name: form.name.trim(),
          category: form.category.trim(),
          price: Number(form.price),
          discountPercent: Number(form.discountPercent),
          image: form.image.trim(),
        });
        setForm({
          id: "",
          name: "",
          category: "",
          price: "",
          discountPercent: "",
          image: "",
        });
      }}
    >
      <h3 className="text-lg font-bold mb-4">Thêm Khóa Học</h3>
      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Mã khóa học"
          value={form.id}
          onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Tên khóa học"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Danh mục"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          required
        />
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="Giá gốc"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          required
          min={0}
        />
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="% Giảm giá"
          value={form.discountPercent}
          onChange={e => setForm(f => ({ ...f, discountPercent: e.target.value }))}
          required
          min={0}
          max={100}
        />
        <div className="mb-3">
          <label className="block font-semibold mb-2">Image preview</label>
          <div className="border border-gray-300 rounded flex items-center justify-center bg-gray-50"
            style={{ width: 240, height: 140, margin: "0 auto" }}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="object-contain max-h-full max-w-full"
                style={{ maxWidth: 220, maxHeight: 120 }}
              />
            ) : (
              <span className="text-6xl text-gray-400 select-none">+</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Upload file</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            onChange={handleImageChange}
            className="block w-full border rounded px-3 py-2 cursor-pointer"
          />
          <div className="text-xs text-gray-400 mt-1">
            PNG, JPG, SVG, WEBP, and GIF are allowed.
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition w-full"
        >
          Thêm
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-500 transition"
            onClick={onCancel}
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );

}
