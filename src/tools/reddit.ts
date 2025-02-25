import { z } from 'zod'
import fetch from 'node-fetch'
import type { ToolFn } from '../../types'

export const redditToolDefinition = {
  name: 'reddit',
  description:
    'Use this tool to get the latest posts from Reddit. It will return a JSON object with the title, link, subreddit, author, and upvotes of each post.',
  parameters: z.object({}),
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async () => {
  const response = await fetch('https://www.reddit.com/r/nba/.json')
  const json = await response.json()

  const posts = json.data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(posts, null, 2)
}
