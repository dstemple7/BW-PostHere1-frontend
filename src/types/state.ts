import TextPost from './post'

export interface ApplicationState {
  signupErrorMessage: string
  loginErrorMessage: string

  isLoadingFromDS: boolean
  isLoadingFromBackend: boolean

  inProgressPost: TextPost

  searchText: string // for searching a user's own posts

  savedPosts: TextPost[]
}

export const initialApplicationState: ApplicationState = {
  signupErrorMessage: '',
  loginErrorMessage: '',

  isLoadingFromDS: false,
  isLoadingFromBackend: false,

  inProgressPost: { title: '', body: '', recs: [] },

  searchText: '',

  savedPosts: [],
}
