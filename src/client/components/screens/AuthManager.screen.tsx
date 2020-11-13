import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	CSSProperties,
} from "react";
import { Button } from "antd";
import withStyles, { WithStylesProps } from "react-jss";
import Axios from "@client/utils/axios";
import { GetTableData } from "@schema/Auth.schema";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import {
	ICellEditorParams,
	IComponent,
	GridApi,
	CellValueChangedEvent,
	FirstDataRenderedEvent,
	RefreshCellsParams,
} from "ag-grid-community";
import TextCellEditor from "@components/TextCellEditor";
import NumericCellEditor from "../NumericCellEditor";

interface HomeProps extends WithStylesProps<typeof styles> {}
interface Home {}
const styles = (theme) => ({
	wrapper: {
		width: "100%",
		height: "100%",
	},
});
const MenuByAuthManage = ({ classes }: HomeProps) => {
	const undoBtnRef = useRef<HTMLButtonElement>(null);
	const redoBtnRef = useRef<HTMLButtonElement>(null);

	const [gridApi, setGridApi] = useState<GridApi>();
	const [gridColumnApi, setGridColumnApi] = useState(null);
	const [gridOptions, setGridOptions] = useState<{
		columnDefs: GetTableData["out"]["columns"];
		rowData: GetTableData["out"]["data"];
	}>({
		columnDefs: [],
		rowData: [],
	});

	/**
	 * 그리드 API 셋팅
	 * */
	const onGridReady = (params) => {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	/**
	 * 셀 변경 후 포커스 아웃 시
	 * */
	const onCellValueChanged = useCallback((params: CellValueChangedEvent) => {
		const undoSize = params.api.getCurrentUndoSize();
		const redoSize = params.api.getCurrentRedoSize();
		if (undoBtnRef.current && redoBtnRef.current) {
			undoBtnRef.current.disabled = undoSize < 1;
			redoBtnRef.current.disabled = redoSize < 1;
		}
	}, []);

	/**
	 * 최초 그리드 생성 시
	 * */
	const onCellValueFirst = useCallback((params: FirstDataRenderedEvent) => {
		if (undoBtnRef.current && redoBtnRef.current) {
			undoBtnRef.current.disabled = true;
			redoBtnRef.current.disabled = true;
		}
	}, []);

	useEffect(() => {
		(async () => {
			await init();
		})();
	}, []);

	const init = async () => {
		const ax = new Axios<GetTableData>();
		const result = await ax.transaction("/auth/getTableData");
		await setGridOptions({
			columnDefs: result.columns.map((column) => {
				return {
					...column,
					cellEditorSelector,
					cellStyle(params) {
						if (params._isUpdated) {
						}
					},
				};
			}),
			rowData: result.data,
		});
	};

	const undo = () => {
		gridApi!.undoCellEditing();
	};

	const redo = () => {
		gridApi!.redoCellEditing();
	};

	const refreshAll = async () => {
		await init();
	};

	return (
		<div className={classes.wrapper}>
			<Button onClick={undo} ref={undoBtnRef}>
				undo
			</Button>
			<Button onClick={redo} ref={redoBtnRef}>
				redo
			</Button>
			<Button onClick={refreshAll}>refreshAll</Button>
			<div
				className="ag-theme-alpine"
				style={{ height: "100%", width: "100%" }}
			>
				<AgGridReact
					onGridReady={onGridReady}
					columnDefs={gridOptions.columnDefs}
					rowData={gridOptions.rowData}
					stopEditingWhenGridLosesFocus={true}
					onFirstDataRendered={onCellValueFirst}
					onCellValueChanged={onCellValueChanged}
					enableRangeSelection={true}
					enableFillHandle={true}
					undoRedoCellEditing={true}
					undoRedoCellEditingLimit={5}
					enableCellChangeFlash={true}
					components={{
						NumericCellEditor,
						TextCellEditor,
					}}
				></AgGridReact>
			</div>
		</div>
	);
};

function cellEditorSelector(param: ICellEditorParams) {
	switch (param.colDef.filter) {
		case "agNumberColumnFilter":
			return { component: "NumericCellEditor" };
		default:
			return { component: "TextCellEditor" };
	}
	return { component: "TextCellEditor" };
}
export default withStyles(styles)(MenuByAuthManage);
