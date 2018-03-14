import * as React from "react";

export interface FieldProps {
    value: any;
    name: string;
    title: string;
    inputType: string;
    validator?: (value: any) => string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    onChange?: (e) => void;
}

export interface FieldState {
    newValue: any;
    validationErrors?: string;
}

export class Field extends React.Component<FieldProps, FieldState> {

    constructor(props) {
        super(props);
        this.state = { newValue: props.value };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    inner_input;

    onChange(e) {
        const newValue = e.target.value;
        const validationErrors = this.validate(newValue);
        console.debug("validationErrors", validationErrors);
        this.setState({ ...this.state, validationErrors: validationErrors, newValue: newValue });
        // this.setState({...this.state,newValue:e.target.value});
    }

    onBlur(e) {
        const newValue = e.target.value;
        const validationErrors = this.validate(newValue);
        console.debug("validationErrors", validationErrors);
        this.setState({ ...this.state, validationErrors: validationErrors });
    }

    validate(value) {

        if (this.props.required) {
            if (!value)
                return "This is a mandatory filed!";

            let oneRadioIsChecked = false;
            if (this.props.inputType === "radio") {
                const radios = document.getElementsByName(this.props.name);
                for (let i = 0, length = radios.length; i < length; i++) {
                    if ((radios[ i ] as HTMLInputElement).checked) {
                        // do whatever you want with the checked radio
                        oneRadioIsChecked = true;

                        // only one radio can be logically checked, don't check the rest
                        break;
                    }
                }
                if (!oneRadioIsChecked)
                    return "This is a mandatory filed!";
            }

        }

        if (this.props.validator) {
            const customErr = this.props.validator(value);
            if (customErr)
                this.inner_input.setCustomValidity(customErr);
            else
                this.inner_input.setCustomValidity("");
            return customErr;

        }

        return undefined;

    }


    render() {
        return (
            <div className={ "field" }>
                <div className={ "fieldContent" }>
                    <span className={ "title" }>{ this.props.title }</span>
                    <input ref={ (input) => this.inner_input = input } type={ this.props.inputType }
                        name={ this.props.name }
                        onChange={ this.onChange }
                        onBlur={ this.onBlur }
                        value={ this.state.newValue }
                        required={ this.props.required }
                        disabled={ this.props.disabled }
                    />
                </div>
                {
                    this.state.validationErrors ?
                        <div className={ "validationErr" }>
                            <span >{ this.state.validationErrors }</span>
                        </div>
                        :
                        ""
                }
            </div>
        );
    }
}
