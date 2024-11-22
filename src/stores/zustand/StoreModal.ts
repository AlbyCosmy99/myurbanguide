import { create } from 'zustand'
import { persist } from "zustand/middleware"

type StoreModal = {
    modalOpen: boolean
    toggleModal: () => void
    setModalOpen: () => void
}

const useStoreModal = create<StoreModal>((persist as any)(
    //@ts-ignore
    (set) => ({

        modalOpen: true,
        toggleModal: () => set((state: any) => ({ modalOpen: !state.modalOpen })),
        setModalOpen: (value: boolean) => set({ modalOpen: value }),

    }), { name: 'modalStore' }
))

export default useStoreModal
