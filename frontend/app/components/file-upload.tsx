"use client";

import { useRef, useState } from "react";

interface FileUploadProps {
  readonly onUpload: (file: File) => void;
  readonly loading: boolean;
}

export function FileUpload({ onUpload, loading }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpload(file);
    }
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-blue-400">
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl">📄</span>
        <p className="text-sm text-slate-600">
          {fileName ??
            "Arraste e solte seu arquivo CSV aqui, ou clique para selecionar"}
        </p>
        <label className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          {loading ? "Processando..." : "Selecionar Arquivo CSV"}
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="hidden"
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
}
