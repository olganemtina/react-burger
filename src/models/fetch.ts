export type TRequestMethod = "GET" | "POST" | "PATCH";

export interface IRequestData<T>{
	url: string;
	method: TRequestMethod,
	headers: Record<string, string>,
	formData: T,
}

export interface IResponseData<T>{
	success: boolean;
	refreshToken: string;
	accessToken: string;
  	data?: T;
  	message?: string;
  	headers?: Headers;
}

export interface ICustomResponse extends Body {
	readonly headers: Headers;
	readonly ok: boolean;
	readonly redirected: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly trailer: Promise<Headers>;
	readonly type: ResponseType;
	readonly url: string;
	clone(): Response;
	json(): any;
  }