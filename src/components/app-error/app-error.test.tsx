import React from "react";
import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import { AppError } from "./app-error";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("Компонент без ошибок", () => {
	const tree = renderer.create(<AppError error="Тест" />).toJSON();
	expect(tree).toMatchSnapshot();
});
