import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { useAtom } from 'jotai';
import { CreateRepoNormal } from './createRepoNormal';

export const CreateRepoForm = () => {
  const [showCreateRepo, setShowCreateRepo] = useAtom(newRepoAtom);

  return <>{showCreateRepo.normal && <CreateRepoNormal />}</>;
};
