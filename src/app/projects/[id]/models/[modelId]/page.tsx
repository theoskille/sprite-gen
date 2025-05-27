import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getProject } from '@/actions/projects';
import { BackButton } from '@/components/ui/BackButton';
import { Bot, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs } from '@/components/ui/Tabs';

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

interface ModelPageProps {
  params: {
    id: string;
    modelId: string;
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { id, modelId } = params;
  const project = await getProject(id);

  if (!project) {
    redirect('/projects');
  }

  const model = project.models.find(m => m.id === modelId);
  if (!model) {
    redirect(`/projects/${id}`);
  }

  const tabs = [
    {
      id: 'train',
      label: 'Train',
      content: (
        <div>
          <h2 className="text-lg font-medium text-white mb-4">Train Model</h2>
          <p className="text-gray-400">Training interface coming soon...</p>
        </div>
      ),
    },
    {
      id: 'generate',
      label: 'Generate',
      content: (
        <div>
          <h2 className="text-lg font-medium text-white mb-4">Generate Sprites</h2>
          <p className="text-gray-400">Generation interface coming soon...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <BackButton href={`/projects/${id}`} />
              <div>
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-[#33bbff]" />
                  <h1 className="text-3xl font-bold text-white">{model.name}</h1>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(model.status)}`}>
                    {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-400">{model.description || 'No description'}</p>
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Trigger:</span>
                    <span className="text-sm font-mono text-[#33bbff] bg-[#27272a] px-2 py-1">{model.trigger_word}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Size:</span>
                    <span className="text-sm text-gray-300">{model.output_width}×{model.output_height}</span>
                  </div>
                  {model.last_trained_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        Last trained {formatDistanceToNow(new Date(model.last_trained_at), { addSuffix: true })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs tabs={tabs} defaultTab="train" />
        </div>
      </div>
    </div>
  );
} 