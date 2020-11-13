import { Table, Column, Model } from "sequelize-typescript";

@Table({
	comment: "에러_로그",
})
export default class ErrorLog extends Model<ErrorLog> {
	@Column({
		comment: "PK_에러로그_일련_번호",
		primaryKey: true,
		autoIncrement: true,
	})
	errorSeqNo: number;

	@Column({
		comment: "상태코드",
	})
	statusCode: number;

	@Column({
		comment: "에러로그 메세지",
	})
	errorLogMessage: string;

	@Column({
		comment: "에러로그 스택",
	})
	errorStack: string;
}
