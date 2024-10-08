import { client } from '@/lib/hono'
import { useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { json } from 'stream/consumers'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'], 200>

type RequestType = InferRequestType<
  (typeof client.api.projects)['$post']
>['json']

export const useCreateProject = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json })

      if(!response.ok) {
        throw new Error('Something went wrong')
      }

      return await response.json()
    },
    onSuccess:() => {
      toast.success('Project created')

    //  项目查询
    },
    onError:() => {
      toast.error('Failed to create project')
    }
  })
  return mutation
}
