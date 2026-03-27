import { create } from 'zustand';

interface SnackbarState {
  type: 'success' | 'error' | '';
  isOpen: boolean;
  message: string;
}

interface SnackbarActions {
  triggerSnackbar: (options: {
    message: string;
    type: 'success' | 'error';
  }) => void;
  closeSnackbar: () => void;
}

export interface SnackBar extends SnackbarState, SnackbarActions {}

const defaultState: SnackbarState = {
  type: '',
  isOpen: false,
  message: '',
};

export const useSnackbar = create<SnackBar>()((set) => ({
  ...defaultState,
  bears: 0,
  triggerSnackbar: (options) => set({ isOpen: true, ...options }),
  closeSnackbar: () => set(defaultState),
}));
