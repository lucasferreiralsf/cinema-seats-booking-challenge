'use client';

import { CinemaSession } from '@/shared/types/CinemaSession.type';
import { useRouter } from 'next/navigation';

type CinemaSessionListProps = {
  sessions: CinemaSession[];
};
export default function CinemaSessionList({
  sessions,
}: CinemaSessionListProps) {
  const router = useRouter();
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sessions.map((session) => (
        <li
          key={session.id}
          className="p-6 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
          onClick={() => router.push(`sessions/${session.id}`)}
        >
          <h3 className="text-xl font-semibold">{session.movie}</h3>
          <p className="text-gray-600">Hall: {session.hall.name}</p>
          <p className="text-gray-600">Session ID: {session.id}</p>
          <p className="text-gray-600">Start Time: {session.startTime}</p>
        </li>
      ))}
    </ul>
  );
}
