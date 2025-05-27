import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { NewProjectButton } from '@/components/dashboard/NewProjectButton';
import { CreateProjectCard } from '@/components/dashboard/CreateProjectCard';
import { getProjects } from '@/actions/projects';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const projects = await getProjects();

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Projects</h1>
              <p className="mt-2 text-sm text-gray-400">
                Manage your AI sprite generation projects
              </p>
            </div>
            <NewProjectButton />
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                modelCount={project.model_count}
                updatedAt={project.updated_at}
              />
            ))}
            <CreateProjectCard />
          </div>
        </div>
      </main>
    </div>
  );
} 