export interface MatchParams {
	id: string;
  }

export interface IRouterParams{
	path: string;
	exact: boolean;
}

export type TRouteForUnauthorizedUsers<T> = {
	[Property in keyof T]: T[Property]
} & {
	children: React.ReactNode,
}