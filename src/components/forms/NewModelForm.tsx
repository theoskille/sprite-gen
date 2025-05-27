'use client';

import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { createModel } from '@/actions/models';

interface NewModelFormProps {
  projectId: string;
  onClose: () => void;
}

export function NewModelForm({ projectId, onClose }: NewModelFormProps) {
  return (
    <form action={createModel} className="space-y-4">
      <input type="hidden" name="project_id" value={projectId} />
      <Input
        label="Model Name"
        name="name"
        required
        placeholder="Enter model name"
      />
      <TextArea
        label="Description"
        name="description"
        required
        placeholder="Enter model description"
        rows={3}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Output Width"
          name="output_width"
          type="number"
          required
          placeholder="Width in pixels"
          min={1}
          defaultValue={512}
        />
        <Input
          label="Output Height"
          name="output_height"
          type="number"
          required
          placeholder="Height in pixels"
          min={1}
          defaultValue={512}
        />
      </div>
      <Input
        label="Trigger Word"
        name="trigger_word"
        required
        placeholder="Enter trigger word"
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
          Create Model
        </Button>
      </div>
    </form>
  );
} 