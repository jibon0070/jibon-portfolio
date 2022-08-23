import React from "react";
import FormGroup from "../../commons/form-group/form-group";
import Validators from "../../validators/validators";
import ReactiveForm from "../../reactive-form/reactive-form";
import FormControl from "../../reactive-form/form-control";
import {Link, Navigate} from "react-router-dom";
import UsersService from "../../services/users.service";
import Loading from "../../commons/loading/loading";

export default class Login extends React.Component {
    data = new ReactiveForm({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    state = {
        clicked: false,
        navigate_to_admin: UsersService.is_logged_in,
        loading: false
    }

    submit(e) {
        e.preventDefault();
        this.setState({clicked: true}, () => {
            if (this.data.valid && !this.state.submitted) {
                this.setState({submitted: true, loading: true}, () => {
                    UsersService.login(this.data.value).then(res => {
                        if (res.error) {
                            if (res.error === 'username') {
                                this.data.get('username').set_error({username: 'Invalid username or email.'})
                            } else if (res.error === 'password') {
                                this.data.get('password').set_error({username: 'Invalid password.'})
                            } else {
                                console.trace(this);
                                throw new DOMException('Contact Server Admin')
                            }
                            this.setState({submitted: false, loading: false});
                        } else if (res.token) {
                            UsersService.set_token(res.token)
                            UsersService.$is_logged_in.emit(true);
                            this.setState({navigate_to_admin: true})
                        }
                    });
                });
            }
        });
    }

    render() {
        return (
            <div id="login">
                {this.state.navigate_to_admin ? <Navigate to='/admin'/> : null}
                <div className="col-md-6 text-center">
                    <div className="card mt-3">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={this.submit.bind(this)}>
                                <FormGroup clicked={this.state.clicked} name='Username or email'
                                           form_control={this.data.get('username')}/>
                                <FormGroup type='password' clicked={this.state.clicked} name='Password' className='mt-3'
                                           form_control={this.data.get('password')}/>
                                <div className="mt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Link to='/' className='btn btn-primary'>Home</Link>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        )
    }
}