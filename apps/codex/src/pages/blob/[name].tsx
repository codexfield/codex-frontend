import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useGetOffchainAuth } from '@/hooks/useGetOffchainAuth';
import { useReadBlob } from '@/hooks/useReadBlob';
import { useRouter } from 'next/router';

export default function Blob() {
  const router = useRouter();
  const { name, oid } = router.query;
  // useGetOffchainAuth();

  const endpoint = useGetSpUrlByBucket(name as string | undefined);
  const fs = useFs({
    endpoint: endpoint as string,
    repoName: name as string,
  });
  const content = useReadBlob(fs, oid as string);
  // console.log('content', oid, content);

  return (
    <div>
      this is {name} - {oid}
      <br />
      content is:
      <br />
      <textarea disabled value={content}></textarea>
    </div>
  );
}
