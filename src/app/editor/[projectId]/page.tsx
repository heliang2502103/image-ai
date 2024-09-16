
import Editor from '@/features/editer/components/editor'
import { protectServer } from '@/features/auth/utils'

const EditorProjectIdPage = async () => {
  await protectServer()
  return (
    <Editor/>
  )
}

export default EditorProjectIdPage