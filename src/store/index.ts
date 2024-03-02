import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import controlSlice from '@/store/controlSlice'
import learningSlice from '@/store/learningSlice'

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    controlSlice: controlSlice.reducer,
    learningSlice: learningSlice.reducer,
  },
})

setupListeners(store.dispatch)

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
