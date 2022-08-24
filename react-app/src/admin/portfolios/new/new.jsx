import React from "react";
import ReactiveForm from "../../../reactive-form/reactive-form";
import FormControl from "../../../reactive-form/form-control";
import Validators from "../../../validators/validators";
import FormGroup from "../../../commons/form-group/form-group";
import Loading from "../../../commons/loading/loading";
import {Link, Navigate} from "react-router-dom";
import AdminService from "../../../services/admin.service";
import UsersService from "../../../services/users.service";

export default class New extends React.Component {

    data = new ReactiveForm({
        title: new FormControl('', [Validators.required]),
        github_link: new FormControl(),
        live_link: new FormControl(),
        image: new FormControl('', [Validators.required])
    })

    state = {
        clicked: false,
        submitted: false,
        loading: false,
        go_back: false
    }

    render() {
        return (
            <div id={'new'}>
                {this.state.go_back ? <Navigate to={'../'}></Navigate> : null}
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container align-center">
                    <div className="card mt-3 col-md-6">
                        <div className="card-header">New Portfolio</div>
                        <div className="card-body">
                            <form onSubmit={e => this.submit(e)}>
                                <FormGroup clicked={this.state.clicked} name={'Title'}
                                           form_control={this.data.get('title')}/>
                                <FormGroup className={'mt-3'} clicked={this.state.clicked} name={'Github Link'}
                                           form_control={this.data.get('github_link')}/>
                                <FormGroup className={'mt-3'} clicked={this.state.clicked} name={'Live Link'}
                                           form_control={this.data.get('live_link')}/>
                                <FormGroup on_change={e => {
                                    this.image = e.target.files.item(0)
                                }} accept={'image/*'} className={'mt-3'} clicked={this.state.clicked}
                                           name={'Image'} type={'file'}
                                           form_control={this.data.get('image')}/>
                                <div className="align-right mt-3">
                                    <Link to={'../'} className={'btn'}>Back</Link>
                                    <button className={'btn btn-primary'}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }

    /**
     * @param {Event<HTMLFormElement>} e
     */
    submit(e) {
        e.preventDefault();
        this.setState({clicked: true}, () => {
            if (this.data.valid && !this.state.submitted && this.image) {
                this.setState({submitted: true, loading: true}, () => {
                    const form_data = new FormData();
                    for (let name in this.data.value) {
                        if (name !== 'image') {
                            form_data.append(name, this.data.value[name])
                        }
                    }
                    form_data.append('image', this.image, this.image.name)
                    AdminService.portfolios.new(form_data).then(r => {
                        if (r.success) {
                            this.setState({go_back: true});
                        } else {
                            this.setState({submitted: false, loading: false});
                        }
                    });
                });
            }
        });
    }

    /**
     * @type {File}
     */
    image
}