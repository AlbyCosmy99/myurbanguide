import { create } from 'zustand';

type ModalStoreState = {
  modalOpen: boolean;
};

type ModalStoreAction = {
  toggleModal: () => void;
  setModalOpen: (modalOpen: ModalStoreState['modalOpen']) => void;
}

const useModalStore = create<ModalStoreState & ModalStoreAction>(
  //@ts-ignore
  set => ({
    modalOpen: false,
    toggleModal: () => set((state: any) => ({ modalOpen: !state.modalOpen })),
    setModalOpen: (modalOpen: boolean) => set(() => ({ modalOpen: modalOpen })),
  })
);

export default useModalStore;
