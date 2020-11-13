import React from "react";
import { IComponent } from "ag-grid-community";

class NumericCellEditor implements IComponent<any> {
	eInput: HTMLInputElement;

	init(params) {
		const input = document.createElement("input");
		input.setAttribute("style", "width : 100%; height : 100%");
		input.value = params.value || "";
		input.addEventListener("keypress", (e) => {
			if (!/\d/.test(e.key)) {
				e.preventDefault();
			}
		});

		this.eInput = input;
	}

	afterGuiAttached() {
		this.eInput.focus();
	}

	getValue() {
		return this.eInput.value;
	}

	getGui(): HTMLElement {
		return this.eInput;
	}
}

export default NumericCellEditor;
