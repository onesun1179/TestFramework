import React from "react";

export type State = {
	language: "ko" | "en";
};
type SetState =
	| { type: "SET_LANGUAGE"; language: State["language"] }
	| { type: "RESET"; mergeState: Partial<State> };
export const initValue: State = {
	language: "ko",
};
export function init(mergeValue: Partial<State>): State {
	return {
		...initValue,
		...mergeValue,
	};
}
export function reducer(state: State, action: SetState): State {
	switch (action.type) {
		case "SET_LANGUAGE":
			return {
				...state,
				language: action.language,
			};
		case "RESET":
			return init(action.mergeState);
		default:
			throw new Error("액션 인식못함");
	}
}
