// TypeScript programs tend to have types that are used in many different places that all depend on each other. Because of this, it’s usually a good idea to centralize type definitions into a file, or multiple files, that don’t depend on anything else.

export interface LoginCredentials {
  email: string
  password: string
}

export interface SubredditSuggestionRequest {
  post_markdown: string
}

// Commented-out fields are mere ideas at this point.
export interface SubredditSuggestionResponse {
  status: 'OK' | 'Error'
  // original_post: string
  message: string // for error messages, etc.
  best_subreddit: string // NB: does not contain "/r/"
  // other_subreddits: string[]
}

export interface TextPost {
  title: string
  body: string
}

export interface ApplicationState {
  username: string
  password: string

  isLoadingFromDS: boolean
  isLoadingFromBackend: boolean

  inProgressPost: TextPost

  searchText: string // for searching a user's own posts

  savedPosts: TextPost[]
}

export const initialApplicationState: ApplicationState = {
  username: '',
  password: '',

  isLoadingFromDS: false,
  isLoadingFromBackend: false,

  inProgressPost: { title: '', body: '' },

  searchText: '',

  savedPosts: [],
}
