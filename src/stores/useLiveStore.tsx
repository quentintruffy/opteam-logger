'use client';

import { create } from 'zustand';

type LiveStoreProps = {
  liveMode: boolean;
  setLiveMode: (liveMode: boolean) => void;
  resetLiveMode: () => void;
};

const useLiveStore = create<LiveStoreProps>((set, get) => ({
  liveMode: false,
  setLiveMode: liveMode => set({ liveMode }),
  resetLiveMode: () => set({ liveMode: false }),
}));

export { useLiveStore };
export type { LiveStoreProps };
