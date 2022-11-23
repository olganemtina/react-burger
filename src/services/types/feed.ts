import { IIngredientDetails } from "./ingredient";
import { OrderStatus, OrderStatusLabel } from "./status";

export interface IFeed {
	orders: ReadonlyArray<CFeedItem>;
	success: boolean;
	total: number;
	totalToday: number;
}

export class CFeedItem {
	ingredients: ReadonlyArray<string> = [];
	_id!: string;
	status!: OrderStatus;
	number!: number;
	createdAt!: string;
	updatedAt!: string;
	name: string = "";
}

export class FeedItemWithIngredients extends CFeedItem {
	constructor(data: CFeedItem) {
		super();
		this.ingredients = data.ingredients;
		this._id = data._id;
		this.status = data.status;
		this.number = data.number;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
		this.name = data.name;
	}

	get totalPrice(): number {
		return this.ingredientsData.reduce((sum, current) => {
			sum += current.price;
			return sum;
		}, 0);
	}

	ingredientsData: IIngredientDetails[] = [];

	get statusCaption(): string | undefined {
		return OrderStatusLabel.get(this.status as OrderStatus);
	}

	get createdAtDate(): Date {
		return new Date(this.createdAt);
	}

	get howDaysAgo(): string {
		return this.createdAtDate?.getHowMuchDaysAgo() || "";
	}

	setIngredients(allIngredients: IIngredientDetails[]) {
		// this.ingredientsData = allIngredients.filter((ingredient) =>
		// 	this.ingredients.find((id) => id === ingredient._id)
		// );
		const allIngredientsMap = allIngredients.reduce((acc, current) => {
			acc.set(current._id, current);
			return acc;
		}, new Map() as Map<string, IIngredientDetails>);

		this.ingredientsData = this.ingredients
			.map((ingredient) => {
				return allIngredientsMap.get(ingredient);
			})
			.filter(
				(ingredient): ingredient is IIngredientDetails =>
					!!ingredient
			);
	}
}
