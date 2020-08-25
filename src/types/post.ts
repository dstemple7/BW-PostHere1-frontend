export default interface TextPost {
  title: string
  body: string
  recs: SubredditSuggestion[]
}

export interface SubredditSuggestion {
  subreddit: string
  probability: number
}
