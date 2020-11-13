import {
	Column,
	Model,
	Table,
	BelongsTo,
	HasMany,
	ForeignKey,
	AfterSync,
	BelongsToMany,
} from "sequelize-typescript";
import AuthsToMenus from "@model/AuthsToMenus.model";
import Auth from "./Auth.model";
import Icon from "./Icon.model";
import Screen from "./Screen.model";

@Table({
	comment: "메뉴",
})
class Menu extends Model<Menu> {
	@Column({
		comment: "PK_메뉴_일련_번호",
		primaryKey: true,
		autoIncrement: true,
	})
	menuSeqNo: number;

	@Column({
		comment: "메뉴명",
		allowNull: false,
	})
	menuName: string;

	@BelongsTo(() => Menu, {})
	parentMenu?: Menu;

	@ForeignKey(() => Menu)
	@Column({
		comment: "FK_부모_메뉴_일련_번호",
		allowNull: true,
	})
	parentMenuSeqNo?: number;

	@HasMany(() => Menu)
	menus?: Menu[];

	@BelongsTo(() => Screen)
	screen?: Screen;

	@ForeignKey(() => Screen)
	@Column({
		comment: "FK_화면_일련_번호",
		allowNull: true,
	})
	screenSeqNo?: number;

	@BelongsTo(() => Icon)
	icon?: Icon;

	@ForeignKey(() => Icon)
	@Column({
		comment: "FK_아이콘_이름",
		allowNull: true,
	})
	iconName?: string;

	@BelongsToMany(() => Auth, () => AuthsToMenus)
	auths: Auth[];

	@AfterSync
	static async _sync() {
		const baseMenu = await Menu.create({
			menuName: "관리",
			iconName: (await Icon.findOne({
				attributes: ["iconName"],
				where: {
					iconName: "SettingOutlined",
				},
			}))!.iconName,
		});

		await Menu.create({
			menuName: "권한별 메뉴관리",
			parentMenuSeqNo: baseMenu.menuSeqNo,
			screenSeqNo: (await Screen.findOne({
				attributes: ["screenSeqNo"],
				where: {
					screenName: "MenuAuth",
				},
			}))!.screenSeqNo,
		});

		await Menu.create({
			menuName: "권한 관리",
			parentMenuSeqNo: baseMenu.menuSeqNo,
			screenSeqNo: (await Screen.findOne({
				attributes: ["screenSeqNo"],
				where: {
					screenName: "AuthManager",
				},
			}))!.screenSeqNo,
		});
	}
}

export default Menu;
