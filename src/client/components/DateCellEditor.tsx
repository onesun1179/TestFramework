// import React from "react";
// import { IComponent } from "ag-grid-community";
//
// class DateCellEditor implements IComponent<any> {
// 	eInput: HTMLInputElement;
//
// 	init(params) {
// 		const input = document.createElement("input");
// 		input.setAttribute("style", "width : 100%; height : 100%");
// 		input.value = params.value || "";
// 		this.eInput = document.createElement('input');
// 		this.eInput.value = params.value;
// 		this.eInput.classList.add('ag-input');
// 		this.eInput.style.height = '100%';
// 		$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
//
// 		this.eInput = input;
// 	}
//
// 	afterGuiAttached() {
// 		this.eInput.focus();
// 	}
//
// 	getValue() {
// 		return this.eInput.value;
// 	}
//
// 	getGui(): HTMLElement {
// 		return this.eInput;
// 	}
// }
//
// export default NumericCellEditor;
