import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Bot } from 'lucide-react';

function getStatusColor(status: string) {
  switch (status) {
    case "ready":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "training":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "draft":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    case "failed":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

interface ModelCardProps {
  id: string;
  name: string;
  description: string | null;
  triggerWord: string;
  outputWidth: number;
  outputHeight: number;
  lastTrainedAt: string | null;
  updatedAt: string;
  status: 'draft' | 'training' | 'ready' | 'failed';
  projectId: string;
}

export function ModelCard({ 
  id, 
  name, 
  description, 
  triggerWord, 
  outputWidth, 
  outputHeight,
  lastTrainedAt,
  updatedAt,
  status,
  projectId
}: ModelCardProps) {
  return (
    <Link href={`/projects/${projectId}/models/${id}`} className="block">
      <div className="bg-black rounded-lg border border-gray-800 hover:border-gray-700 transition-colors p-6 min-h-[200px] flex flex-col cursor-pointer">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-[#33bbff]" />
            <h3 className="text-lg font-medium text-white">{name}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-4 line-clamp-2">{description || 'No description'}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Trigger:</span>
            <span className="text-xs font-mono text-[#33bbff] bg-[#27272a] px-2 py-1">{triggerWord}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Dimensions:</span>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{outputWidth} x {outputHeight}</p>
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