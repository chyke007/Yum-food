import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export const persistConfig = {
  key: 'root',
  storage,
}