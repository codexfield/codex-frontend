import { atomWithImmer } from 'jotai-immer';

export const newRepoAtom = atomWithImmer({
  start: false,
  normal: false,
  importGithub: false,
});

export const importGithubAtom = atomWithImmer({
  name: '',
  url: '',
});
