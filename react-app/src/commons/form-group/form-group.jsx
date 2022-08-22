import React from "react";
import "./form-group.scss";
export default class FormGroup extends React.Component {
    state = {
        value: "",
        errors: {},
        dirty: false,
        touched: false
    }
    onChange(value) {
        this.setState({ value: value }, async () => {
            let errors = {};
            if (this.props.validators)
                for (let validatorFn of this.props.validators) {
                    const error = await validatorFn(value);
                    if (error)
                        errors = { ...error };
                }
            if (this.props.asyncValidators) {
                for (let asyncValidatorFn of this.props.asyncValidators) {
                    const error = await asyncValidatorFn(this.state.value);
                    if (error)
                        errors = { ...error };
                }
            }
            this.setState({ errors }, () => {
                this.props.onValueChange?.({ value: this.state.value, valid: !Object.keys(this.state.errors).length });
            });
        });
    }
    componentDidMount() {
        if (this.props.value)
            this.setState({ value: this.props.value }, () => {
                this.onChange(this.state.value);
            });
        else
            this.onChange(this.state.value);
    }
    render() {
        return (
            <div id="form-group" className="form-group">
                {
                    this.props.type !== "textarea" ?
                        (
                            <input className={(((Object.keys(this.state.errors).length && (this.state.dirty || this.state.touched)) || (Object.keys(this.state.errors).length && this.props.clicked)) ? 'is-invalid ' : '') + 'form-control'} placeholder={this.props.name} onChange={e => {
                                const value = e.target.value;
                                // console.log(value);
                                this.setState({ dirty: true }, () => {
                                    this.onChange(value);
                                })
                            }} onBlur={() => {
                                this.setState({ touched: true })
                            }} type={this.props.type} value={this.props.value} />
                        ) :
                        (
                            <textarea className={(((Object.keys(this.state.errors).length && (this.state.dirty || this.state.touched)) || (Object.keys(this.state.errors).length && this.props.clicked)) ? 'is-invalid ' : '') + 'form-control'} placeholder={this.props.name} value={this.props.value} onChange={e => {
                                const value = e.target.value;
                                this.setState({ dirty: true }, () => {
                                    this.onChange(value);
                                })
                            }} onBlur={() => this.setState({touched: true})}></textarea>
                        )
                }
                {
                    ((Object.keys(this.state.errors).length && (this.state.dirty || this.state.touched)) || (Object.keys(this.state.errors).length && this.props.clicked)) ?
                        (<div className="invalid-feedback">
                            {
                                Object.keys(this.state.errors).includes('required') ?
                                    (<span>{this.props.name} is requied.</span>) :
                                    null
                            }
                            {
                                Object.keys(this.state.errors).includes('email') ?
                                    (<span>{this.state.errors.email}</span>) :
                                    null
                            }
                        </div>)
                        : null
                }
            </div>
        )
    }
}