import Link from 'next/link';
import { getSessions } from './actions/cinema/actions';
import CinemaSessionList from './components/CinemaSessionList';

export const dynamic = 'force-dynamic';

export default async function SessionsPage() {
  const sessions = await getSessions();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex gap-4 mb-6">
        <Link href="/sign-up" className="p-2 bg-blue-500 text-white rounded">
          Signup
        </Link>
        <Link href="/sign-in" className="p-2 bg-blue-500 text-white rounded">
          Signin
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-6">Cinema Sessions</h2>
      <CinemaSessionList sessions={sessions} />
    </div>
  );
}
