import {
	Table,
	Column,
	Model,
	HasMany,
	BelongsToMany,
	AfterSync,
	DataType,
} from "sequelize-typescript";
import AuthsToMenus from "@model/AuthsToMenus.model";
import { GetTableData } from "@schema/Auth.schema";
import moment from "moment";

import { convertDate } from "@common";
import User from "./User.model";
import Menu from "./Menu.model";

@Table({
	comment: "권한",
})
class Auth extends Model<Auth> {
	@Column({
		comment: "PK_권한 일련 번호",
		type: DataType.BIGINT,
		primaryKey: true,
		autoIncrement: true,
	})
	authSeqNo: number;

	@Column({
		comment: "권한 이름",
		allowNull: false,
		unique: true,
	})
	authName: string;

	@HasMany(() => User)
	users: User[];

	@BelongsToMany(() => Menu, () => AuthsToMenus)
	menus: Menu[];

	@AfterSync
	static async _sync() {
		await Auth.findOrCreate({
			where: { authName: "root" },
		});
		await Auth.findOrCreate({
			where: { authName: "client" },
		});
	}

	static async getData(): Promise<Auth[]> {
		const data = await Auth.findAll();
		return data;
	}
}

export default Auth;
