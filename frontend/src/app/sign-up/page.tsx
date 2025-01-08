'use server';
import SignUpForm from './components/SignUpForm';

export default async function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <SignUpForm />
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/sign-in" className="text-blue-500">
          Sign In
        </a>
      </p>
    </div>
  );
}
