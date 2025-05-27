'use client';

import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { createProject } from '@/actions/projects';

interface NewProjectFormProps {
  onClose: () => void;
}

export function NewProjectForm({ onClose }: NewProjectFormProps) {
  return (
    <form action={createProject} className="space-y-4">
      <Input
        label="Project Name"
        name="name"
        required
        placeholder="Enter project name"
      />
      <TextArea
        label="Description"
        name="description"
        required
        placeholder="Enter project description"
        rows={3}
      />
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">
          Create Project
        </Button>
      </div>
    </form>
  );
} 