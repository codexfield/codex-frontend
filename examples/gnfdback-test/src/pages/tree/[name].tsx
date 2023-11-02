
import { RepoTree } from "@/components/tree";
import { useRouter } from "next/router";

export default function Tree() {
  const router = useRouter()
  const {name, privateKey, endpoint} = router.query;

  return <div>
    {name}:
    <RepoTree />
  </div>
}