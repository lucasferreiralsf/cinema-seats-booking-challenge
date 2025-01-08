'use server';

import { getSeats } from '@/app/actions/cinema/actions';
import CinemaSeatsList from './components/CinemaSeatList';

export default async function CinemaSeatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const seats = await getSeats(id);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Seats</h2>
      <CinemaSeatsList seats={seats} />
    </div>
  );
}
