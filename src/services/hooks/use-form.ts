import { SyntheticEvent, useState } from "react";

export const useForm = <T>(inputValues: T) => {
	const [formData, setFormData] = useState<T>(inputValues);
	const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
		const { name, value } = event.target as HTMLInputElement;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return { formData, handleChange, setFormData };
};
