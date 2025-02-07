import {create} from 'zustand';

export type addTodoModalType = {
  isOpen: boolean;
  toggleModal: () => void;
};

const useAddTodoModalStore = create<addTodoModalType>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({isOpen: !state.isOpen}))
}));

export default useAddTodoModalStore;
