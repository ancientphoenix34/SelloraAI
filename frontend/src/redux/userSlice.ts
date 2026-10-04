import type { IUser } from "@/App";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    user: IUser | null
    loading: boolean
}
const initialState: IUserState = {
    user: null,
    loading: true
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        logOutUser: (state) => {
            state.user = null
            state.loading = false
        }
    }
})
export default userSlice.reducer
export const { setUser, setLoading, logOutUser } = userSlice.actions