import React from "react";
import { IComponent } from "ag-grid-community";

class TextCellEditor implements IComponent<any> {
	eInput: HTMLInputElement;

	init(params) {
		const input = document.createElement("input");
		input.setAttribute("style", "width : 100%; height : 100%; border:none;");
		input.value = params.value || "";

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

export default TextCellEditor;
