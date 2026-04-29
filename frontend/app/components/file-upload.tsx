"use client";

import { useRef } from "react";

interface FileUploadProps {
  readonly onUpload: (file: File) => void;
  readonly loading: boolean;
}

export function FileUpload({ onUpload, loading }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
      />
      {loading && <span className="text-sm text-gray-500">Processing...</span>}
    </div>
  );
}
