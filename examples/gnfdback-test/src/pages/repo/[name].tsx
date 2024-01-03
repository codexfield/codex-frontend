import { RepoTree } from "@/components/tree";
import { useFs } from "@/hooks/useFs";
import { useInitRepo } from "@/hooks/useInitRepo";
import { useRouter } from "next/router";

export default function Repo() {
  const router = useRouter()
  const {name, privateKey, endpoint} = router.query
  const fs = useFs(name as string, privateKey as string, endpoint as string)
  const latestCommit = useInitRepo(fs)
  
  return <>
    latestCommit is {latestCommit}

    <RepoTree oid={latestCommit} />
  </>
}