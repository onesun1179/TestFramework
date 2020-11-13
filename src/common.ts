import * as R from "ramda";
import moment from "moment";

/**
 * 미확정 객체에만 사용!!!
 * test[test][test][test]  // 에러 발생
 * chkObjNull([test, test, test, test]) // undefined
 * */
type ChkObjNullArrEl = Record<string, any> | string;
export const chkObjNull = (chkEls: ChkObjNullArrEl[]) => {
	let _result: Record<string, any> = {};
	if (
		chkEls.some((el) => {
			const isFirst = R.keys(_result).length === 0;
			const isString = R.is(String, el);

			if (isFirst && isString) {
				return true;
			} else if (isFirst) {
				_result = el as Record<string, any>;
				return false;
			} else if (isString) {
				_result = _result[el as string];
				return !_result;
			} else {
				return true;
			}
		})
	) {
		return undefined;
	} else {
		return _result;
	}
};

export const removeTbNames = (sqlResults: any[]) => {
	return sqlResults.map((result) => {
		const _result: Record<string, any> = {};
		for (const [key, value] of Object.entries(result)) {
			const temp = key.split(".");
			_result[temp[temp.length - 1] as string] = value;
		}
		return _result;
	});
};

export const convertDate = (date: Date, format = "YYYY-MM-DD hh:mm:ss") => {
	return moment(date).format(format);
};
//
// export const mapAndFilter = (array : T[]) => {
// 	const result:any[]
// }
