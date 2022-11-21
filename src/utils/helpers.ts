export const getCorrectPluralFormText = (number: number, text: string): string =>
{
	switch(text){
		case "день":{
			if (number >= 10 && number <=20 || (number % 10 == 0) || (number % 10 >= 5))
				return "дней";
			else if (number % 10 == 1)
				return "день";
			else
				return "дня"
		}

	}
	return text;
}