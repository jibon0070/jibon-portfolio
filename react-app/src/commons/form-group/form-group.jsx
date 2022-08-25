import React, {createRef} from "react";

export default class FormGroup extends React.Component {
    ref = createRef();
    state = {
        touched: false, dirty: false, valid: false, errors: {}
    }

    componentDidMount() {
        if (!this.props.form_control || !this.props.name) throw new DOMException('Invalid implementation of form group');
        this.props.form_control.set_ref_and_state(this.ref, this.setState.bind(this))
    }


    render() {
        return <div id="form-group"
                    className={this.props.className + " form-group"}>
            {this.props.type === 'select' ?
                <select
                    ref={this.ref}
                    onChange={this.props.form_control.on_change}
                    className={(!this.state.valid && (this.state.dirty || this.state.touched) || !this.state.valid && this.props.clicked ? 'is-invalid ' : '') + 'form-control'}
                    onBlur={this.props.form_control.on_blur}
                >
                    <option value="">Select {this.props.name}</option>
                    {this.props.options?.map((row, i) => {
                        return <option key={i} value={row.value}>{row.name}</option>
                    })}
                </select> :
                this.props.type === 'textarea' ?
                    <textarea
                        ref={this.ref}
                        placeholder={this.props.name}
                        onChange={this.props.form_control.on_change}
                        className={(!this.state.valid && (this.state.dirty || this.state.touched) || !this.state.valid && this.props.clicked ? 'is-invalid ' : '') + 'form-control'}
                        onBlur={this.props.form_control.on_blur}
                    ></textarea> :
                    <input
                        autoComplete="new-password"
                        ref={this.ref}
                        type={this.props.type ?? 'text'}
                        placeholder={this.props.name}
                        onChange={e => {
                            this.props.form_control.on_change(e);
                            this.props.on_change?.(e);
                        }}
                        className={(!this.state.valid && (this.state.dirty || this.state.touched) || !this.state.valid && this.props.clicked ? 'is-invalid ' : '') + 'form-control'}
                        onBlur={this.props.form_control.on_blur}
                        accept={'image/*'}
                    />}
            {!this.state.valid && (this.state.dirty || this.state.touched) || !this.state.valid && this.props.clicked ?
                <div className="invalid-feedback">
                    {Object.keys(this.state.errors).includes('required') ?
                        <span>{this.props.name} is required.</span> : null}
                    {Object.keys(this.state.errors).includes('username') ?
                        <span>{this.state.errors.username}</span> : null}
                    {Object.keys(this.state.errors).includes('password') ?
                        <span>{this.state.errors.password}</span> : null}
                    {/*{JSON.stringify(this.state.errors)}*/}
                </div> : null}
        </div>;
    }
}
