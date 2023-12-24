import { useFs } from '@/hooks/useFs';
import { useInitRepo } from '@/hooks/useInitRepo';
import { useReadTree } from '@/hooks/useReadTree';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

interface Props {
  oid?: string;
}

export const RepoTree = (props: Props) => {
  const router = useRouter();
  const { address } = useAccount();
  const { name, privateKey, endpoint } = router.query;
  const fs = useFs({
    address,
    endpoint: endpoint as string,
    privateKey: privateKey as string,
    repoName: name as string,
  });

  const myOid = props.oid || (router.query.oid as string);

  const tree = useReadTree(fs, myOid);

  return (
    <>
      {tree &&
        tree?.tree.map((item) => {
          return (
            <li key={item.oid}>
              <Link
                style={{ color: '#f00' }}
                href={`/${item.type}/${name}?oid=${item.oid}&endpoint=${endpoint}&privateKey=${privateKey}`}
              >
                {item.path} (type: {item.type})
              </Link>
            </li>
          );
        })}
    </>
  );
};
