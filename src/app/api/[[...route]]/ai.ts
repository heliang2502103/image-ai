import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { replicate } from '@/lib/replicate'

const app = new Hono()
  .post(
    '/remove-bg',
    zValidator(
      'json',
      z.object({
        image: z.string()
      })
    ),
    async (c) => {
      const { image } = c.req.valid('json')

      const input = {
        image: image
      }

      const output: unknown = await replicate.run(
        'cjwbw/rmgb:e89200fbc08c5c5e9314e246db83a79d43f16c552dc4005e46cd7896800a989e',
        { input }
      )

      const res = output as string
      return c.json({ data: res })
    }
  )
  .post(
    '/generate-image',
    zValidator(
      'json',
      z.object({
        prompt: z.string()
      })
    ),
    async (c) => {
      const { prompt } = c.req.valid('json')
      console.log(prompt)
      const output: unknown = await replicate.run(
        'pwntus/flux-albert-einstein:2ed2f6d1a8563caa2cfada419dffc68b52881bab9bac30c0b8cbe05a4dcae0e5',
        {
          input: {
            model: 'dev',
            prompt: prompt,
            lora_scale: 1,
            num_outputs: 1,
            aspect_ratio: '1:1',
            output_format: 'webp',
            guidance_scale: 3.5,
            output_quality: 80,
            prompt_strength: 0.8,
            extra_lora_scale: 0.8,
            num_inference_steps: 28
          }
        }
      )
      const res = output as Array<string>
      return c.json({ data: res[0] })
    }
  )

export default app
