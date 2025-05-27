'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { login } from '@/actions/auth';

export function LoginForm() {
  return (
    <form action={login} className="mt-8 space-y-6">
      <Input
        label="Email address"
        type="email"
        name="email"
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        required
        autoComplete="current-password"
      />
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
} 