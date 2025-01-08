'use client';

import { reserveSeat } from '@/app/actions/cinema/actions';
import { WS_URL } from '@/shared/constants';
import { Seat } from '@/shared/types/Seat.type';
import { useParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CinemaSeatsListProps {
  seats: Seat[];
}
export default function CinemaSeatsList({
  seats: firstCallSeats,
}: CinemaSeatsListProps) {
  const { id } = useParams();

  const [seats, setSeats] = useState<Seat[]>(firstCallSeats);

  const [state, formAction] = useActionState(reserveSeat, {
    message: '',
    error: false,
    id: '',
  });

  useEffect(() => {
    if (state.message.length > 0) {
      if (state.error) toast.error(state.message);
      if (!state.error) toast.success(state.message);
    }
  }, [state.message, state.id, state.error]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      console.log('🚀 ~ useEffect ~ event:', event);
      const data = JSON.parse(event.data);

      if (data.sessionId === id) {
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === data.seatId
              ? { ...seat, available: data.available }
              : seat
          )
        );
      }
    };

    return () => {
      ws.close();
    };
  }, [id]);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {seats.map((seat) => (
        <li
          key={seat.id}
          className="p-6 border rounded-lg shadow-md  hover:bg-gray-100"
        >
          <form action={formAction}>
            <input type="hidden" name="sessionId" value={id} />
            <input type="hidden" name="seatId" value={seat.id} />
            <h3 className="text-xl font-semibold">Seat {seat.number}</h3>
            <p className="text-gray-600">Seat row: {seat.row}</p>
            <p className="text-gray-600">Seat ID: {seat.id}</p>

            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                seat.available ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
              disabled={!seat.available}
            >
              {seat.available ? 'Reserve' : 'Reserved'}
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
