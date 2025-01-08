'use client';

import { signUp } from '@/app/actions/auth/actions';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, { message: '' });

  useEffect(() => {
    if (state.message.length > 0) {
      toast.error(state.message);
    }
  }, [state.message]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Sign Up
      </button>
    </form>
  );
}
