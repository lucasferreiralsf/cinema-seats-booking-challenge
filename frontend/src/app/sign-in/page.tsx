'use server';
import SignInForm from './components/SignInForm';

export default async function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <SignInForm />
      <p className="mt-4">
        Don&apos;t have an account?{' '}
        <a href="/sign-up" className="text-blue-500">
          Sign Up
        </a>
      </p>
    </div>
  );
}
