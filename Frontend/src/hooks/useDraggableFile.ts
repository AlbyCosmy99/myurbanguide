import { useState } from 'react';

const useDraggableFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  /* FILE UPLOAD */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setSelectedFiles(files);
    const urls = Array.from(files)
      .map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return null;
      })
      .filter(Boolean) as string[];
    setPreviewUrls(urls);
    setUploadMessage('');
  };

  return {
    handleDragLeave,
    handleDragOver,
    handleFileChange,
    handleDrop,
    dragActive,
    setDragActive,
    selectedFiles,
    setSelectedFiles,
    uploadMessage,
    setUploadMessage,
    previewUrls,
    setPreviewUrls,
  };
};

export default useDraggableFile;
