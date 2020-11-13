import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OneMenu } from "./Menu.reducer";

export interface User {
	userSeqNo: number;
	authSeqNo: number;
}

interface State {
	user: User | undefined;
}
const initialState: State = {
	user: undefined,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
