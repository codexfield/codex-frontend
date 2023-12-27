import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useReadTree } from '@/hooks/useReadTree';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  oid?: string;
}

export const RepoTree = (props: Props) => {
  const router = useRouter();
  const { name } = router.query;
  const endpoint = useGetSpUrlByBucket(name as string | undefined);
  const fs = useFs({
    endpoint: endpoint as string,
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
              <Link style={{ color: '#f00' }} href={`/${item.type}/${name}?oid=${item.oid}`}>
                {item.path} (type: {item.type}) oid: {item.oid}
              </Link>
            </li>
          );
        })}
    </>
  );
};
