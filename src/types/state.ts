import TextPost from './post';

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
