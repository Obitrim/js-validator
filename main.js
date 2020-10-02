'use strict';
const formNode = document.querySelector("#formOne");
const formNodeTwo = document.querySelector("#formTwo");

initValidation(formNode, (form, data) => {
	// console.log(form, data);
	alert(JSON.stringify(data, null, 4))
});
initValidation(formNodeTwo, (form, data) => {
	// console.log(form, data);
	alert(JSON.stringify(data, null, 4))
});

function initValidation(formNode, onSubmitHandler){
	const validationErrors = [];
	const inputs = formNode.querySelectorAll("[data-v-input]");
	const selects = formNode.querySelectorAll("[data-v-select]");

	formNode.addEventListener("submit", handleSubmit);
	inputs.forEach(input => input.addEventListener("blur", handleBlur));
	inputs.forEach(input => input.addEventListener("input", handleInput));

	function handleSubmit(evt){
		evt.preventDefault();
		let formData = {};

		if(inputs.length > 0){
			inputs.forEach(input => {
				validateInput(input);
				formData[input.name] = input.value;
			});
		}
		if(selects.length > 0){
			selects.forEach(select => {
				validateInput(select);
				formData[select.name] = select.value;
			});
		}
		if(validationErrors.length === 0){
			formNode.reset();
			onSubmitHandler(formNode, formData);
		}
	}

	function handleBlur(evt){
		validateInput(evt.target);
	}

	function handleInput(evt){
		validateInput(evt.target);
	}

	function validateInput(inputNode){
		if(inputNode.validity.valid){
			let inputNodeIndex = validationErrors.indexOf(inputNode.name);
			validationErrors.splice(inputNode, 1);
			renderErrorLabel(inputNode, false);
		} else {
			validationErrors.push(inputNode.name);
			renderErrorLabel(inputNode);
		}
	}

	function renderErrorLabel(node, show = true){
		node.nextElementSibling.textContent = show ? node.validationMessage : "";
	}

	return true;
}