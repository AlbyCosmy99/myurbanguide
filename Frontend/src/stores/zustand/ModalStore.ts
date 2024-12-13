import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ModalStoreState = {
  modalOpen: boolean;
};

type ModalStoreAction = {
  toggleModal: () => void;
  setModalOpen: (modalOpen: ModalStoreState['modalOpen']) => void;
}

const useModalStore = create<ModalStoreState & ModalStoreAction>(
  (persist as any)(
    //@ts-ignore
    set => ({
      modalOpen: true,
      toggleModal: () => set((state: any) => ({ modalOpen: !state.modalOpen })),
      setModalOpen: (modalOpen: boolean) => set(() => ({ modalOpen: modalOpen })),
    }),
    { name: 'modalStore' },
  ),
);

export default useModalStore;
