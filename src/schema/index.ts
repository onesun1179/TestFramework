export type CanSendType =
	| undefined
	| boolean
	| number
	| string
	| CanSendType[]
	| { [key: string]: CanSendType };

export type SchemaDefaultType = {
	in: {
		[key: string]: CanSendType;
	} | void;
	out:
		| {
				[key: string]: CanSendType;
				error?: boolean;
				message?: string;
		  }
		| undefined;

	client?: any;
};
