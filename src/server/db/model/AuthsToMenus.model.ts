import {
	Table,
	ForeignKey,
	Model,
	Column,
	BelongsToMany,
	AfterSync,
	PrimaryKey,
	BelongsTo,
} from "sequelize-typescript";
import { OneMenu, GetMenuListSchema } from "@schema/AuthsToMenus.schema";
import Auth from "./Auth.model";
import Menu from "./Menu.model";
import Screen from "./Screen.model";

@Table({
	comment: "권한_별_메뉴",
})
class AuthsToMenus extends Model<AuthsToMenus> {
	@BelongsTo(() => Auth)
	auth: Auth;

	@PrimaryKey
	@ForeignKey(() => Auth)
	@Column({
		comment: "FK_권한_일련_번호",
		allowNull: false,
	})
	authSeqNo: number;

	@BelongsTo(() => Menu)
	menu: Menu;

	@PrimaryKey
	@ForeignKey(() => Menu)
	@Column({
		comment: "FK_메뉴_일련_번호",
		allowNull: false,
	})
	menuSeqNo: number;

	@Column({
		comment: "메뉴_순서",
		allowNull: true,
	})
	menuOrder?: number;

	@AfterSync
	static async _sync() {
		await AuthsToMenus.create({
			authSeqNo: (await Auth.findOne({
				attributes: ["authSeqNo"],
				where: {
					authName: "root",
				},
			}))!.authSeqNo,
			menuSeqNo: (await Menu.findOne({
				attributes: ["menuSeqNo"],
				where: {
					menuName: "관리",
				},
			}))!.menuSeqNo,
		});

		await AuthsToMenus.create({
			authSeqNo: (await Auth.findOne({
				attributes: ["authSeqNo"],
				where: {
					authName: "root",
				},
			}))!.authSeqNo,
			menuSeqNo: (await Menu.findOne({
				attributes: ["menuSeqNo"],
				where: {
					menuName: "권한별 메뉴관리",
				},
			}))!.menuSeqNo,
		});

		await AuthsToMenus.create({
			authSeqNo: (await Auth.findOne({
				attributes: ["authSeqNo"],
				where: {
					authName: "root",
				},
			}))!.authSeqNo,
			menuSeqNo: (await Menu.findOne({
				attributes: ["menuSeqNo"],
				where: {
					menuName: "권한 관리",
				},
			}))!.menuSeqNo,
		});
	}
}

export default AuthsToMenus;
