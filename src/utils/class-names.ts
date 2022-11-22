export function classNames(...args: (string | number | boolean)[]) {
	const result = args
		.map((arg) => arg.toString())
		.filter(Boolean)
		.join(" ");
	return result;
}
