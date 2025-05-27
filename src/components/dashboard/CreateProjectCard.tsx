'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { NewProjectForm } from '@/components/forms/NewProjectForm';

export function CreateProjectCard() {
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
        <h3 className="text-lg font-medium text-white mb-2">Create New Project</h3>
        <p className="text-sm text-gray-400 text-center">
          Start training AI models for your game sprites
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <NewProjectForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
} 