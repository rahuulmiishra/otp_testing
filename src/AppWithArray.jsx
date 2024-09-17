import { useState } from "react";
import "./App.css";
import FormWrapper from "./form-wrapper";

const Inputs = [
  {
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    value: "",
    id: "first_name",
    name: "first_name",
    error: "",
    disabled: false,
    readonly: false,
    required: true,
  },
  {
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    value: "",
    id: "last_name",
    name: "last_name",
    error: "",
    disabled: false,
    readonly: false,
  },
  {
    type: "text",
    label: "Email",
    placeholder: "Enter your email",
    value: "",
    id: "email",
    name: "email",
    error: "",
    disabled: false,
    readonly: false,
    required: true,
  },
  {
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    value: "",
    id: "phone",
    name: "phone",
    error: "",
    disabled: false,
    readonly: false,
  },
  {
    type: "checkbox",
    label: "Accept Terms and Conditions",
    value: "accept_terms",
    id: "accept_terms",
    name: "accept_terms",
    error: "",
    disabled: false,
    readonly: false,
    checked: false,
  },
];

function App() {
  const [inputs, setInputs] = useState(structuredClone(Inputs));

  function onInputChange({ id, index, value, checked, type }) {
    const oldState = structuredClone(inputs);

    if (type === "checkbox") {
      oldState[index].checked = checked;
    } else {
      oldState[index].value = value;
    }

    oldState[index].error = "";
    setInputs(oldState);
  }

  function onInputBlur({ id, index, value, checked, type }) {
    const oldState = structuredClone(inputs);

    if (type === "text") {
      if (value.length < 3) {
        oldState[index].error = `Invalid Field ${oldState[index].label}`;
      }
    }

    setInputs(oldState);
  }

  function handleCancel() {
    setInputs(structuredClone(Inputs));
  }

  function handleSubmit() {
    const params = {};

    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        if (input.checked) {
          params[input.name] = input.value;
        }
      } else {
        params[input.name] = input.value;
      }

      if (input.accept_terms === "YES") {
      }
    });

    console.log(params);
  }

  function needToDisableSubmit() {
    let disable = false;

    for (let input of inputs) {
      if (input.required && !input.value) {
        disable = true;
        break;
      }
    }

    return disable;
  }

  const disableSubmit = needToDisableSubmit(inputs);

  return (
    <>
      <FormWrapper
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        onBlur={onInputBlur}
        onInputChange={onInputChange}
        inputs={inputs}
        disableSubmit={disableSubmit}
      />
    </>
  );
}

export default App;
