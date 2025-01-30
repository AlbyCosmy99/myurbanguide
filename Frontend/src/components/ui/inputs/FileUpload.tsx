import { PhotoIcon } from '@heroicons/react/24/solid';
import useDraggableFile from "../../../hooks/useDraggableFile";

const FileUpload = () => {


  const {
    dragActive,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    previewUrls,
    handleFileChange,
    uploadMessage,
  } = useDraggableFile();

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Galleria foto <span className="text-red-700">*</span>
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed ${dragActive
          ? 'border-[#E29C00] bg-[#F9F2E2]'
          : 'border-gray-900/25'
          } p-6`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <PhotoIcon
            aria-hidden="true"
            className="mx-auto size-12 text-gray-300"
          />
          <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-[#E29C00] hover:text-[#E29C00]"
            >
              <span>Carica foto</span>
              <input
                id="file-upload"
                name="photos"
                type="file"
                className="sr-only"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">Oppure trascina qui</p>
          </div>
          <p className="text-xs/5 text-gray-600">
            PNG, JPG, TIFF sotto i 10MB
          </p>
          {uploadMessage && (
            <p className="mt-2 font-semibold text-red-700 text-sm">
              {uploadMessage}
            </p>
          )}
          <div className="mt-4 grid grid-cols-6 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Anteprima ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
