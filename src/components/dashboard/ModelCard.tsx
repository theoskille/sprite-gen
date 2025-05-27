import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ModelCardProps {
  id: string;
  name: string;
  description: string;
  triggerWord: string;
  outputWidth: number;
  outputHeight: number;
  lastTrainedAt: string | null;
  updatedAt: string;
}

export function ModelCard({ 
  id, 
  name, 
  description, 
  triggerWord, 
  outputWidth, 
  outputHeight,
  lastTrainedAt,
  updatedAt 
}: ModelCardProps) {
  return (
    <Link href={`/dashboard/models/${id}`}>
      <div className="bg-black rounded-lg border border-gray-800 hover:border-gray-700 transition-colors p-6 min-h-[200px] flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <span className="text-sm text-gray-400">{outputWidth}x{outputHeight}</span>
        </div>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Trigger:</span>
            <span className="text-xs text-gray-300">{triggerWord}</span>
          </div>
          {lastTrainedAt && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Last trained:</span>
              <span className="text-xs text-gray-300">
                {formatDistanceToNow(new Date(lastTrainedAt), { addSuffix: true })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Updated:</span>
            <span className="text-xs text-gray-300">
              {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 