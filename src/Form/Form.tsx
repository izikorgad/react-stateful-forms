import * as React from "react";

export interface FormProps {
    onSubmit(fields:  { name: string, value: any } []);
    name: string;
    header?: string;
}

export interface FormState {
    fields: any;
}

export class Form extends React.Component<FormProps, any> {

    constructor(props) {
        super(props);
        this.doSubmit = this.doSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        const fields = {};
        React.Children.forEach(this.props.children,
            (item: any) => {
                const name = item.props.name;
                const value = item.props.value;
                fields[ name ] = value;
            });
        this.state = { fields: fields };
    }

    inner_form;

    doSubmit(e) {

        e.preventDefault();

        if (!this.validate())
            return;

        console.debug("Submitting values:", this.state.fields);

        this.props.onSubmit(Object.keys(this.state.fields).map(
            (name) => {
                return { name: name, value: this.state.fields[ name ] };
            }));
    }

    toArray(obj) {
        const array = [];
        // iterate backwards ensuring that length is an UInt32
        for (let i = obj.length >>> 0; i--;) {
            array[ i ] = obj[ i ];
        }
        return array;
    }

    validate() {

        const validationErrors = [];

        if (this.inner_form.checkValidity && !this.inner_form.checkValidity()) {
            const inputsArray = this.toArray(this.inner_form.elements);
            inputsArray.filter((item: any) =>
                item.type !== "submit" && item.type !== "button" && !item.validity.valid)
                .forEach((item) => validationErrors.push({ name: item.name, validationMessage: item.validationMessage }));
        }


        React.Children.forEach(this.props.children,
            (item: any) => {
                if (item.props && item.props.validator) {
                    const customErr = item.props.validator(this.state.fields[ item.props.name ]);
                    if (customErr) {
                        const exitingErr = validationErrors.filter((err) => (err.name === item.props.name && err.validationMessage === customErr));
                        if (!exitingErr || exitingErr.length === 0) {
                            this.inner_form.elements[ item.props.name ].setCustomValidity(customErr);
                            validationErrors.push({ name: item.props.name, validationMessage: customErr });
                        }
                    }
                }
            });

        if (validationErrors.length > 0) {
            this.setState({ ...this.state, validationErrors: validationErrors });
            return false;
        }

        this.setState({ ...this.state, validationErrors: undefined });
        return true;

    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const updatedFields = { ...this.state.fields };
        updatedFields[ name ] = value;

        this.setState({ ...this.state, fields: updatedFields });
    }

    renderValidationErrors() {
        if (!this.state.validationErrors || this.state.validationErrors.length === 0)
            return "";

        const errs = this.state.validationErrors
            .map((item) => <li className="validationErr"><span className="validationErrTitle">{ `${item.name}: ` }</span>
                { `${item.validationMessage}.` }</li>);

        return <ul className="validationErrList">{ errs }</ul>;
    }

    render() {

        return (
            <form ref={ (form) => this.inner_form = form } className="form"
                onSubmit={ this.doSubmit }
                onChange={ this.handleChange }>
                { this.props.header ? <h1>{ this.props.header }</h1> : "" }
                { this.renderValidationErrors() }
                { this.props.children }
                <input type="submit" onClick={ this.doSubmit } />
            </form>
        );
    }

}

