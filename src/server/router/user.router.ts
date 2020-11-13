import express from "express";
import crypto from "crypto";
import { Login, CheckSession } from "@schema/User.schema";
import convert from "lodash/fp/convert";

const router = express.Router();

/**
 * loginModal 에서 로그인시 사용자 검사
 * */
router.post("/login", (req) => {
	const {
		CRYPTO_SALT,
		CRYPTO_ITERATION,
		CRYPTO_KEY_LEN,
		CRYPTO_DIGEST,
		CRYPTO_ENCODING,
	} = process.env;

	req.transaction<Login>(
		async ({ userEmail, userPassword, remember }, { User }) => {
			const key = await crypto.pbkdf2Sync(
				userPassword,
				CRYPTO_SALT as string,
				Number(CRYPTO_ITERATION),
				Number(CRYPTO_KEY_LEN),
				CRYPTO_DIGEST as string,
			);
			const convertedPassword = await key.toString(
				CRYPTO_ENCODING as BufferEncoding,
			);

			const result = await User.loginUser({
				userEmail,
				userDecodedPassword: convertedPassword,
			});

			if (result) {
				req.setSession("authSeqNo", result.authSeqNo);
				req.setSession("userSeqNo", result.userSeqNo);
			}

			return result;
		},
	);
});

/**
 * 사용자 세션 검사 (새로고침 시 사용)
 * */
router.post("/checkSession", (req) => {
	req.transaction<CheckSession>(async (dd, { User }) => {
		const userSeqNo = req.getSession("userSeqNo");

		if (userSeqNo) {
			const user = await User.findSessionUser({
				userSeqNo,
			});
			if (user) {
				req.setSession("authSeqNo", user.authSeqNo);
				req.setSession("userSeqNo", user.userSeqNo);
			}
			return user;
		} else {
			return undefined;
		}
	});
});

export default router;
