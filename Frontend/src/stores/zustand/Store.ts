import { create } from 'zustand';
import { Tour } from '../../types/Tour';
import { persist } from 'zustand/middleware';

type StoreTour = {
  tours: Tour[];
  toursLoading: boolean;
  getTour: () => void;
};

const useStoreTour = create<StoreTour>(
  (persist as any)(
    //@ts-ignore
    set => ({
      tours: [],
      toursLoading: true,
      getTour: async () => {
        try {
          set({ toursLoading: true });
          const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'tours');

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          set({ tours: data, toursLoading: false });

        } catch (error) {
          set({ toursLoading: true });
          console.error('Errore nella richiesta dei dati:', error);
        }
      },

    }),
    { name: 'tourStore' },
  ),
);

export default useStoreTour;
