import { z } from 'zod'
import type { ToolFn } from '../../types'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  description: 'A tool to generate an image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        'The prompt to generate an image with a diffusion model like DALL-E. Use original user message to generate this prompt'
      ),
  }),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  return response.data[0].url || 'Failed to generate image'
}
