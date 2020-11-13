import { Column, Table, Model, HasMany, AfterSync } from "sequelize-typescript";
import fs from "fs";
import path from "path";
import Menu from "./Menu.model";

@Table({
	comment: "아이콘",
})
class Icon extends Model<Icon> {
	@Column({
		primaryKey: true,
		comment: "PK_아이콘_이름",
	})
	iconName: string;

	@HasMany(() => Menu)
	menus: Menu[];

	@AfterSync
	static async _sync() {
		const projectPath = process.env.INIT_CWD;

		if (!projectPath) {
			throw Error("none projectPath");
		}

		const iconNames = fs
			.readdirSync(
				path.join(projectPath, "node_modules", "@ant-design", "icons"),
			)
			.reduce<string[]>((result, iconFileName) => {
				return /.+\.d\.ts$/.test(iconFileName)
					? [...result, iconFileName.replace(".d.ts", "")]
					: result;
			}, []);

		// 빈테이블 일시
		if ((await Icon.count()) === 0) {
			await Icon.bulkCreate(
				iconNames.map((iconName) => ({
					iconName,
				})),
			);
		} else {
			/*패키지 => 테이블*/
			// 테이블 내 패키지에 없는 아이콘이 있을 수 있음.
			const alReadyTableIcons = await Icon.findAll({
				attributes: ["iconName"],
			});
			const alReadyTableIconNames = alReadyTableIcons.map(
				(alReadyTableIconName) => alReadyTableIconName.iconName,
			);
			const insertIconNames = iconNames.filter(
				(iconName) => !alReadyTableIconNames.includes(iconName),
			);

			for await (const insertIconName of insertIconNames) {
				await Icon.create({
					iconName: insertIconName,
				});
			}

			/*테이블 => 패키지*/
			const inTableIcons = await Icon.findAll({
				attributes: ["iconName"],
			});

			const deleteIcons = inTableIcons.filter(
				({ iconName }) => !iconNames.includes(iconName),
			);

			for await (const { iconName } of deleteIcons) {
				await Icon.destroy({
					where: {
						iconName,
					},
				});
			}
		}

		const totalCount = await Icon.count();

		console.log(`
			총 아이콘 개수    : ${totalCount}
		`);
	}
}

export default Icon;
