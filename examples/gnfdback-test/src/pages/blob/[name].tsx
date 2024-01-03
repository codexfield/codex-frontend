import { useFs } from '@/hooks/useFs';
import { useReadBlob } from '@/hooks/useReadBlob';
import { useRouter } from "next/router";


export default function Blob() {
  const router = useRouter();
  const {name, privateKey, endpoint, oid} = router.query
  const fs = useFs(name as string, privateKey as string, endpoint as string)
  const content = useReadBlob(fs, oid as string)

  return <div>

    this is {name} - {oid}

    <br />

    content is:

    <br />

    <textarea disabled value={content}>
    </textarea>
  </div>
}