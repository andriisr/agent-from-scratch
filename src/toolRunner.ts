import OpenAI from 'openai'
import { generateImage } from './tools/generateImage'
import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    toolArgs: JSON.parse(toolCall.function.arguments),
    userMessage,
  }

  switch (toolCall.function.name) {
    case 'generate_image':
      return generateImage(input)
    case 'dad_joke':
      return dadJoke(input)
    case 'reddit':
      return reddit(input)
    default:
      return Promise.resolve(
        new Error(`Unknown too: ${toolCall.function.name}`)
      )
  }
}
