import { OrderStatus, OrderStatusLabel } from "../../utils/enums/status";
import { IIngredientDetails } from "./ingredient";

export interface IFeed {
	orders: ReadonlyArray<CFeedItem>;
	success: boolean;
	total: number;
	totalToday: number;
}

export class CFeedItem {
	ingredients: Array<string> = [];
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
		let sum = 0;
		this.ingredientsData.forEach((value) => {
			sum += value.count * value.ingredient.price;
		});
		return sum;
	}

	ingredientsData: Array<{ ingredient: IIngredientDetails; count: number }> =
		[];

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
		const allIngredientsMap = allIngredients.reduce((acc, current) => {
			acc.set(current._id, current);
			return acc;
		}, new Map() as Map<string, IIngredientDetails>);

		const mapData = this.ingredients.reduce((map, ingredient) => {
			const ingredientData = allIngredientsMap.get(ingredient);
			if (ingredientData) {
				let mapData = map.get(ingredientData);
				if (mapData) {
					map.set(ingredientData, ++mapData);
				} else {
					map.set(ingredientData, 1);
				}
			}
			return map;
		}, new Map() as Map<IIngredientDetails, number>);

		this.ingredientsData = Array.from(mapData).map((elem) => {
			return {
				ingredient: elem[0],
				count: elem[1],
			};
		});
	}
}
