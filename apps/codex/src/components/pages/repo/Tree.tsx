import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
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
  const { name, privateKey } = router.query;
  const endpoint = useGetSpUrlByBucket(name as string | undefined);
  console.log('RepoTree endpoint', name, endpoint);
  const fs = useFs({
    address,
    endpoint: endpoint as string,
    privateKey: privateKey as string,
    repoName: name as string,
  });

  const myOid = props.oid || (router.query.oid as string);

  // console.log('myOid', myOid);
  const tree = useReadTree(fs, myOid);
  // console.log('tree', tree);

  return (
    <>
      {tree &&
        tree?.tree.map((item) => {
          // console.log('item', item);
          return (
            <li key={item.path + item.oid}>
              <Link
                style={{ color: '#f00' }}
                href={`/${item.type}/${name}?oid=${item.oid}&privateKey=${privateKey}`}
              >
                {item.path} (type: {item.type}) oid: {item.oid}
              </Link>
            </li>
          );
        })}
    </>
  );
};
