export interface ILoginFormData {
	email: string;
	password: string;
}

export interface IUserData {
	email: string;
	name: string;
}

export interface IRegisterFormData extends ILoginFormData {
	name: string;
}

export interface IResetFormData {
	token: string;
	password: string;
}
