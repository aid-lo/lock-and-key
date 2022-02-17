import {createElement} from "../../modules/common";
import Singleton from "../../patterns/singleton";
import Auth from "../../modules/authentication";

import "./style.css";

/**
 * Login form API.
 */
export default Singleton(functions => createElement('div', {}, container => {

	/**
	 * The password input box.
	 * @type HTMLInputElement
	 */
	const input = createElement('input', {
		required: true,
		autofocus: true,
		id: "login-input",
		name: "password",
		type: "password",
		placeholder: "Master Password",
		oninvalid: event => { // TODO
			//event.preventDefault();
			console.log("Invalid event caught");
		}
	});

	/**
	 * The form submit button.
	 * @type HTMLInputElement
	 */
	const submit = createElement('input', {
		id: "login-submit",
		type: "submit",
		value: "Unlock"
	});

	/**
	 * Authentication succeeded callback.
	 */
	const authSuccess = () => { // TODO
		functions.destroy();
	};

	/**
	 * Authentication failed callback.
	 * @return void
	 */
	const authFail = () => {
		input.disabled = submit.disabled = false;
		submit.value = "Unlock";
		input.value = "";
		input.focus();
	};

	/**
	 * Authenticate the login form.
	 * @param {Event} [event]
	 * @return void
	 */
	const authenticate = event => {
		if (event) event.preventDefault();
		input.disabled = submit.disabled = true;
		submit.value = "...";
		setTimeout(Auth.unlock(input.value) ? authSuccess : authFail, 2000);
	};

	container.classList.add("overlay-container");
	container.append(createElement('form',
		{
			id: "login-form",
			onsubmit: authenticate
		},
		form => form.append(
			createElement('label', {
				for: "login-input",
				innerText: "Password"
			}),
			input,
			submit
		)
	));
}));
