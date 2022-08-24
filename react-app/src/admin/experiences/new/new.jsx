import React from "react";
import FormGroup from "../../../commons/form-group/form-group";
import ReactiveForm from "../../../reactive-form/reactive-form";
import FormControl from "../../../reactive-form/form-control";
import Validators from "../../../validators/validators";
import {Link, Navigate} from "react-router-dom";
import Loading from "../../../commons/loading/loading";
import AdminService from "../../../services/admin.service";
import UsersService from "../../../services/users.service";

export default class New extends React.Component {
    data = new ReactiveForm({
        title: new FormControl('', [Validators.required]),
        experience: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required])
    });

    state = {
        clicked: false,
        loading: false,
        submitted: false,
        go_back: false
    }

    componentDidMount() {
        document.title = 'Admin | Experience | New'
    }

    render() {
        return (
            <div id="new">
                {this.state.go_back ? <Navigate to={'../'}/> : null}
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container align-center">
                    <div className="card mt-3 col-md-6">
                        <div className="card-header">New Experience</div>
                        <div className="card-body">
                            <form onSubmit={e => this.submit(e)}>
                                <FormGroup clicked={this.state.clicked} name={'Title'}
                                           form_control={this.data.get('title')}/>
                                <FormGroup clicked={this.state.clicked} className={'mt-3'} name={'Experience'}
                                           type={'number'} form_control={this.data.get('experience')}/>
                                <FormGroup options={[
                                    {
                                        name: 'Frontend',
                                        value: 'frontend'
                                    },
                                    {
                                        name: 'Backend',
                                        value: 'backend'
                                    }
                                ]} type={'select'} clicked={this.state.clicked} className={'mt-3'} name={'Category'}
                                           form_control={this.data.get('category')}/>
                                <div className="align-right mt-3">
                                    <Link to={'../'} className={'btn'}>Back</Link>
                                    <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        )
    }

    /**
     * @param {Event} e
     */
    submit(e) {
        e.preventDefault();
        this.setState({clicked: true}, () => {
            if (this.data.valid && !this.state.submitted) {
                this.setState({loading: true, submitted: true}, () => {
                    AdminService.experiences.new(this.data.value).then(r => {
                        if (r.success)
                            this.setState({go_back: true});
                        else {
                            this.setState({loading: false, submitted: false});
                        }
                    });
                });
            }
        });
    }
}