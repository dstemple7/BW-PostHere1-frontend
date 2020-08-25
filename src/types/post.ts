export default interface TextPost {
  title: string
  body: string
  recs: SubredditSuggestion[]
}

export interface SubredditSuggestion {
  sub: string
  probability: number
}
