import { ReactNode } from "react";
import { ColDef } from "ag-grid-community";

export type Auth = {
	key: Auth["authSeqNo"];
	authSeqNo: number;
	authName: string;
	updatedUserSeqNo?: number;
	createdUserSeqNo?: number;
	updatedAt?: string;
	createdAt?: string;
};
export type Column = {
	headerName: string;
	field: string;
	sortable?: boolean;
	editable?: boolean;
	//
	filter?:
		| "agTextColumnFilter"
		| "agNumberColumnFilter"
		| "agDateColumnFilter"
		| false;
};

export type ClientColumn = ColDef;

export type GetAuthList = {
	in: {
		authName?: number;
	};
	out: {
		authList: Auth[];
		columns: Column[];
	};
};

export type GetTableData = {
	in: void;
	out: {
		columns: Column[];
		data: { [key: string]: any }[];
	};
	client: {
		columns: ClientColumn[];
		data: { [key: string]: any; _updated: boolean }[];
	};
};
