import * as React from "react";
import { Form, Field } from "react-stateful-forms";
const styles = require("./styles.scss");



class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.submitMyForm = this.submitMyForm.bind(this);
  }

  submitMyForm(values: any[]) {
    console.log(values);
    alert("Submitting form values:\n" + values.map((val) => `[${val.name}]: ${val.value}\n`));
  }


  render() {
    return (
      <div className={ styles.app }>
        <Form onSubmit={ this.submitMyForm } name="test_form" header="My Test Form">

          <Field title="Name"
            value="John Doe"
            name="name"
            disabled={ false }
            validator={ (value) => { if (value === "John Doe") return "Please change default value"; return undefined; } }
            required inputType="text" />

          <Field title="Male"
            value="male"
            name="gender"
            inputType="radio" />

          <Field title="Female"
            value="female"
            name="gender"
            inputType="radio" />

          <Field title="Sucscribe"
            name="sucscribe"
            value={ false }
            required
            inputType="checkbox" />

        </Form>
      </div>
    );
  }


}

export default App;

