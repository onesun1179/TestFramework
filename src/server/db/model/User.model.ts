import {
	Table,
	Column,
	Model,
	BelongsTo,
	ForeignKey,
	DataType,
	Contains,
	DeletedAt,
	AfterSync,
} from "sequelize-typescript";

import crypto from "crypto";
import Auth from "./Auth.model";
import ErrorLog from "./ErrorLog.model";

@Table({
	comment: "사용자",
})
class User extends Model<User> {
	/* Column */
	@Column({
		primaryKey: true,
		autoIncrement: true,
		comment: "PK_사용자_일련번호",
		type: DataType.BIGINT,
	})
	userSeqNo: number;

	@Column({
		comment: "사용자_이름",
		allowNull: false,
	})
	userName: string;

	@Contains("@")
	@Column({
		comment: "사용자_이메일",
		allowNull: false,
	})
	userEmail: string;

	@Column({
		comment: "사용자_비밀번호",
		allowNull: false,
	})
	userPassword: string;

	@BelongsTo(() => Auth, {
		onDelete: "SET NULL",
	})
	auth: Auth;

	@ForeignKey(() => Auth)
	authSeqNo: number;

	/* Column -END*/

	@AfterSync
	static async _sync() {
		const {
			CRYPTO_SALT,
			CRYPTO_ITERATION,
			CRYPTO_KEY_LEN,
			CRYPTO_DIGEST,
			CRYPTO_ENCODING,
		} = process.env;

		await crypto.pbkdf2(
			"1234",
			CRYPTO_SALT as string,
			Number(CRYPTO_ITERATION),
			Number(CRYPTO_KEY_LEN),
			CRYPTO_DIGEST as string,
			async (err, derivedKey) => {
				if (err) throw err;

				const userPassword = await derivedKey.toString(
					CRYPTO_ENCODING as BufferEncoding,
				);

				await User.create({
					userName: "이동원",
					userEmail: "onesun1179@naver.com",
					userPassword,
					authSeqNo: (await Auth.findOne({
						attributes: ["authSeqNo"],
						where: {
							authName: "root",
						},
					}))!.authSeqNo,
				});
			},
		);
	}

	static async loginUser({
		userEmail,
		userDecodedPassword,
	}: {
		userDecodedPassword: User["userPassword"];
		userEmail: User["userEmail"];
	}): Promise<
		{ authSeqNo: User["authSeqNo"]; userSeqNo: User["userSeqNo"] } | undefined
	> {
		const outKeys = ["authSeqNo", "userSeqNo"];

		const result = await User.findOne({
			attributes: outKeys,
			where: {
				userEmail,
				userPassword: userDecodedPassword,
			},
		});

		return result
			? {
					authSeqNo: result.authSeqNo,
					userSeqNo: result.userSeqNo,
			  }
			: undefined;
	}

	static async findSessionUser({
		userSeqNo,
	}: {
		userSeqNo: User["userSeqNo"];
	}): Promise<
		{ authSeqNo: User["authSeqNo"]; userSeqNo: User["userSeqNo"] } | undefined
	> {
		const outKeys = ["authSeqNo", "userSeqNo"];
		const result = await User.findOne({
			attributes: outKeys,
			where: {
				userSeqNo,
			},
		});
		return result
			? {
					authSeqNo: result.authSeqNo,
					userSeqNo: result.userSeqNo,
			  }
			: undefined;
	}
}

export default User;
