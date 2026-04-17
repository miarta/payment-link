'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

interface ImageDropzoneProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleRemove = () => {
    setPreview(null);
    onChange('');
  };

  if (preview) {
    return (
      <div className="relative">
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src={preview}
            alt="Product preview"
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-sm text-[#6B7280] mt-2">Klik X untuk menghapus gambar</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#374151] mb-2">Gambar Produk (Opsional)</label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging 
            ? 'border-[#2563EB] bg-blue-50' 
            : 'border-gray-300 hover:border-[#2563EB] hover:bg-gray-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDragging ? 'bg-[#2563EB]' : 'bg-gray-100'}`}>
            <svg 
              className={`w-6 h-6 ${isDragging ? 'text-white' : 'text-gray-400'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#374151]">
              Tarik gambar ke sini atau <span className="text-[#2563EB]">klik untuk upload</span>
            </p>
            <p className="text-xs text-[#6B7280] mt-1">PNG, JPG, GIF (maks. 5MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
