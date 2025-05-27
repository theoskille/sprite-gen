'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { NewModelForm } from '@/components/forms/NewModelForm';

interface CreateModelCardProps {
  projectId: string;
}

export function CreateModelCard({ projectId }: CreateModelCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-[#33bbff] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]"
      >
        <div className="w-12 h-12 rounded-full bg-[#33bbff] flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Create New Model</h3>
        <p className="text-sm text-gray-400 text-center">
          Train a new AI model for your sprites
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Model"
      >
        <NewModelForm projectId={projectId} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
} 