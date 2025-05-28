'use client';

import { useState, useCallback, useEffect } from 'react';
import { Upload, Image, X, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { uploadImageToStorage, getModelImages, getImageFromStorage, deleteTrainingImage } from '@/actions/training';

interface TrainingImage {
  id: string;
  url: string;
  name: string;
  status: 'uploading' | 'uploaded' | 'error';
  imageData?: string;
}

interface TrainInterfaceProps {
  projectId: string;
  modelId: string;
}

export default function TrainInterface({ projectId, modelId }: TrainInterfaceProps) {
  const [images, setImages] = useState<TrainingImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch existing training images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const existingImages = await getModelImages(projectId, modelId);
        
        // Fetch image data for each image
        const imagesWithData = await Promise.all(
          existingImages.map(async (img) => {
            try {
              const imageData = await getImageFromStorage(img.url);
              return {
                id: img.id,
                url: img.url,
                name: img.name,
                status: 'uploaded' as const,
                imageData
              };
            } catch (error) {
              console.error('Error fetching image data:', error);
              return {
                id: img.id,
                url: img.url,
                name: img.name,
                status: 'error' as const
              };
            }
          })
        );

        setImages(imagesWithData);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [projectId, modelId]);

  const handleDelete = async (imageId: string, filePath: string) => {
    try {
      setDeletingId(imageId);
      await deleteTrainingImage(imageId, filePath);
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      const imageId = Math.random().toString(36).substring(7);
      
      // Add image to state with uploading status
      setImages(prev => [...prev, {
        id: imageId,
        url: URL.createObjectURL(file),
        name: file.name,
        status: 'uploading'
      }]);

      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const result = await uploadImageToStorage(projectId, modelId, formData);
        
        // Get the image data from storage
        const imageData = await getImageFromStorage(result.filePath);

        // Update the temporary image with the permanent one
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { 
                ...img, 
                status: 'uploaded', 
                url: result.filePath,
                imageData
              }
            : img
        ));
      } catch (error) {
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, status: 'error' }
            : img
        ));
      }
    }
    
    setIsUploading(false);
  }, [projectId, modelId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    disabled: isUploading
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Upload Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-5 h-5 text-[#33bbff]" />
          <h2 className="text-lg font-medium text-white">Training Images</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4">Upload images to train your model. More images = better results.</p>
        <div 
          {...getRootProps()}
          className={`bg-[#27272a] rounded-lg p-6 border-2 border-dashed ${
            isDragActive ? 'border-[#33bbff] bg-[#27272a]/50' : 'border-[#3f3f46]'
          } h-[400px] transition-colors cursor-pointer`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">
                {isDragActive 
                  ? "Drop the images here..." 
                  : "Drag and drop your images here"}
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to browse</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Set Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Image className="w-5 h-5 text-[#33bbff]" />
          <h2 className="text-lg font-medium text-white">Current Training Set</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4">Images currently used for training</p>
        <div className="bg-[#27272a] rounded-lg p-6 border border-[#3f3f46] h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-[#33bbff] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <p className="text-gray-400">No training images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.imageData || image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  {image.status === 'uploading' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                      <div className="w-8 h-8 border-2 border-[#33bbff] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {image.status === 'error' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                  )}
                  {image.status === 'uploaded' && (
                    <button
                      onClick={() => handleDelete(image.id, image.url)}
                      disabled={deletingId === image.id}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    >
                      {deletingId === image.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate rounded-b">
                    {image.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 