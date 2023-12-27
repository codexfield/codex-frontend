import { useFs } from '@/hooks/useFs';
import { useReadBlob } from '@/hooks/useReadBlob';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

export default function Blob() {
  const { address } = useAccount();
  const router = useRouter();
  const { name, privateKey, endpoint, oid } = router.query;
  const fs = useFs({
    address,
    endpoint: endpoint as string,
    privateKey: privateKey as string,
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
