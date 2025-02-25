import { generateImageToolDefinition } from './generateImage'
import { dadJokeToolDefintion } from './dadJoke'
import { redditToolDefinition } from './reddit'

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefintion,
  redditToolDefinition,
]
