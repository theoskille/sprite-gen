import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Folder } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  modelCount: number;
  updatedAt: string;
}

export function ProjectCard({ id, name, description, modelCount, updatedAt }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block">
      <div className="bg-black rounded-lg border border-gray-800 hover:border-gray-700 transition-colors p-6 min-h-[200px] flex flex-col cursor-pointer">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Folder className="w-8 h-8 text-[#33bbff]" />
            <h3 className="text-lg font-medium text-white">{name}</h3>
          </div>
          <span className="text-sm text-gray-400 bg-[#27272a] px-2 py-1">{modelCount} models</span>
        </div>
        <p className="text-sm text-gray-400 mt-4 line-clamp-2">{description || 'No description'}</p>
        <p className="text-sm text-gray-400 mt-auto">
          Updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        </p>
      </div>
    </Link>
  );
} 