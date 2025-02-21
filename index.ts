import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'
import { logMessage } from './src/ui'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: 'get_weather',
  desciption: 'use this to get weather',
  parameters: z.object({
    resoning: z.string().describe('why did you pick this tool?'),
  }),
}

const reponse = await runAgent({ userMessage, tools: [weatherTool] })
