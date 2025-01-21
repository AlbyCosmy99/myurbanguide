import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Galleria foto <span className="text-red-700">*</span>
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-900/25'
        } px-6 py-10`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <PhotoIcon
            aria-hidden="true"
            className="mx-auto size-12 text-gray-300"
          />
          <div className="mt-4 flex text-sm/6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-[#E29C00] hover:text-[#E29C00]"
            >
              <span>Carica foto</span>
              <input
                required
                id="file-upload"
                name="photos"
                type="file"
                className="sr-only"
                multiple
                onChange={e => setSelectedFiles(e.target.files)}
              />
            </label>
            <p className="pl-1">Oppure trascina qui</p>
          </div>
          <p className="text-xs/5 text-gray-600">PNG, JPG, TIFF sotto i 10MB</p>
          {uploadMessage && (
            <p className="mt-2 font-semibold text-red-700 text-sm">
              {uploadMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
