import { create } from 'zustand';
import { Tours } from '../../types/Tour';
import { persist } from 'zustand/middleware';

type StoreTour = {
  tours: Tours;
  toursLoading: boolean;
  totalPages: number | null;
  getTour: (page: number | null, limit: number | null) => void;
};

const useStoreTour = create<StoreTour>(
  (persist as any)(
    //@ts-ignore
    set => ({
      tours: [],
      totalPages: null,
      toursLoading: true,
      getTour: async (page = 1, limit = 6) => {
        try {
          set({ toursLoading: true });
          const res = await fetch(import.meta.env.VITE_BACKEND_URL + `tours?page=${page}&limit=${limit}`);
          console.log('res: ', res)

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data)
          set({ tours: data, toursLoading: false, totalPages: data.totalPages });

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
