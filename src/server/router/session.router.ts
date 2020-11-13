import express from "express";
import { GetSession, SetSession } from "@schema/Session.schema";

const router = express.Router();
router.post("/getSession", (req, res) => {
	req.transaction<GetSession>((key) => {
		return { value: req.getSession(key.key) };
	});
});

router.post("/setSession", async (req, res, next) => {
	req.transaction<SetSession>(({ key, value }) => {
		req.setSession(key, value);
		return { result: true };
	});
});

export default router;
