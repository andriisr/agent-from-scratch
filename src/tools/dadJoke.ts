import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const dadJokeToolDefintion = {
  name: 'dad_joke',
  description: 'A tool to get a random dad joke',
  parameters: z.object({}),
}

type Args = z.infer<typeof dadJokeToolDefintion.parameters>

interface Response {
  joke: string
}

export const dadJoke: ToolFn<Args, string> = async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })

  const json = (await response.json()) as Response
  return json.joke
}
