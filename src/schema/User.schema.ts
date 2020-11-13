import User from "../server/db/model/User.model";

export type Login = {
	in: {
		userPassword: User["userPassword"];
		userEmail: User["userEmail"];
		remember: boolean;
	};
	out:
		| {
				authSeqNo: User["authSeqNo"];
				userSeqNo: User["userSeqNo"];
		  }
		| undefined;
};

export type CheckSession = {
	in: void;
	out:
		| {
				authSeqNo: User["authSeqNo"];
				userSeqNo: User["userSeqNo"];
		  }
		| undefined;
};
