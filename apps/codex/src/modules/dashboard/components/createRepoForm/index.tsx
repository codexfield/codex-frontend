import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { useAtom } from 'jotai';
import { CreateRepoNormal } from './createRepoNormal';
import { ImportGithub } from './importGithubForm';

export const CreateRepoForm = () => {
  const [showCreateRepo, setShowCreateRepo] = useAtom(newRepoAtom);

  return (
    <>
      {showCreateRepo.importGithub && <ImportGithub />}

      {showCreateRepo.normal && <CreateRepoNormal />}
    </>
  );
};
