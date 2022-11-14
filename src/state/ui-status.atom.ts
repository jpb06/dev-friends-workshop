import { atom } from 'jotai';

export type UiStatus = 'loading' | 'errored' | 'ready';

export const uiStatusAtom = atom<UiStatus>('loading');
