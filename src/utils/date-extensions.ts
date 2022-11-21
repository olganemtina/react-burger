import { getCorrectPluralFormText } from "./helpers";


declare global {
	interface Date {
		getHowMuchDaysAgo(): string
	}
 }

 Date.prototype.getHowMuchDaysAgo = function (): string {
	const now = new Date();
	const diff = Math.round((now.getTime() - this.getTime()) / (1000 * 60 * 60 * 24));
	let result: string = "";
	switch (diff){
		case 0:{
			result = "Сегодня";
			break;
		}
		case 1:{
			result = "Вчера";
			break;
		}
		case 2:{
			result = "Позавчера";
			break;
		}
		default:{
			result = `${diff} ${getCorrectPluralFormText(diff, "день")} назад`;
			break;
		}
	}
	const time = ('0' + this.getHours()).slice(-2) + ':' + ('0' + this.getMinutes()).slice(-2) 
	result = `${result}, ${time}`;
	return result;
 };

 export{}
