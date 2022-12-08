export enum OrderStatus {
	done = "done",
	pending = "pending",
	created = "created",
}

export const OrderStatusLabel = new Map<string, string>([
	[OrderStatus.done, "Выполнен"],
	[OrderStatus.pending, "Готовится"],
	[OrderStatus.created, "Создан"],
]);
