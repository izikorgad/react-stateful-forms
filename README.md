
react-stateful-forms
============

[![npm version](https://img.shields.io/npm/v/react-stateful-forms.svg?style=flat-square)](https://www.npmjs.com/package/react-stateful-forms)
[![npm downloads](https://img.shields.io/npm/dm/react-stateful-forms.svg?style=flat-square)](https://www.npmjs.com/package/react-stateful-forms)

React Stateful Forms Library.

## Install

```sh
$ npm install react-stateful-forms --save
```

## Features

- React Form component infrastructure.
- No redux/flux required.
- Built-in custom validation error.

## Usage
```javascript
import { Form, Field } from "react-stateful-forms";

  render() {
      ...

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

          <Field title="Subscribe"
            name="subscribe"
            value={ false }
            required
            inputType="checkbox" />

        </Form>
    ...
}

```
