import OpenAI from 'openai'

const getWeather = (__input: object) => Promise.resolve('hot, 90 deg')

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    toolArgs: JSON.parse(toolCall.function.arguments),
    userMessage,
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      return Promise.resolve(
        new Error(`Unknown too: ${toolCall.function.name}`)
      )
  }
}
