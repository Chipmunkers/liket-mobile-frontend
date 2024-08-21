import { create } from "zustand";

interface State {
  token: string;
}

interface Action {
  setToken: (token: State["token"]) => void;
}

const authStore = create<State & Action>((set) => ({
  token: "",
  setToken: (token) => set(() => ({ token })),
}));

export default authStore;
