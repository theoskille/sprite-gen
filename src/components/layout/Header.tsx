import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { signOut } from '@/actions/auth';

export async function Header() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              SpriteGen
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {session ? (
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Sign out
                </Button>
              </form>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="secondary">Sign in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 