import { Table, Column, HasMany, Model, AfterSync } from "sequelize-typescript";
import Menu from "./Menu.model";

@Table({
	comment: "화면",
})
class Screen extends Model<Screen> {
	@Column({
		comment: "PK_화면 일련 번호",
		primaryKey: true,
		autoIncrement: true,
	})
	screenSeqNo: number;

	@Column({
		comment: "화면 이름",
		allowNull: false,
		unique: true,
	})
	screenName: string;

	@Column({
		comment: "컴포넌트 이름",
		allowNull: false,
	})
	componentName: string;

	@HasMany(() => Menu)
	menus: Menu[];

	@AfterSync
	static async _sync() {
		// await Screen.create({
		// 	screenName: "Home",
		// 	componentName: "Home",
		// });

		await Screen.create({
			screenName: "MenuAuth",
			componentName: "MenuAuth",
		});

		await Screen.create({
			screenName: "AuthManager",
			componentName: "AuthManager",
		});
	}
}

export default Screen;
