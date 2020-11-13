export type ModelColumn = {
	comment?: string;
	type: any;
};
export type Column = {
	title: string;
	dataIndex: string;
	key: string;
	editable: boolean;
};

export type _Column<T = any> = {
	title: string;
	dataIndex: string;
	key: string;
	sorter: (prev: T, after: T) => number;
};

export type GetTableData = {
	in: {
		tableName: string;
	};
	out: {
		columns: Column[];
		result: any[];
	};
	client: {
		columns: _Column[];
	};
};
