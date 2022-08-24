import React from "react";
import ReactiveForm from "../../../reactive-form/reactive-form";
import {Link, Navigate} from "react-router-dom";
import FormControl from "../../../reactive-form/form-control";
import Validators from "../../../validators/validators";
import FormGroup from "../../../commons/form-group/form-group";
import AdminService from "../../../services/admin.service";
import UsersService from "../../../services/users.service";

export default class New extends React.Component {

    data = new ReactiveForm({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required])
    });


    state = {
        clicked: false,
        loading: false,
        submitted: false,
        go_back: false
    }

    componentDidMount() {
        document.title = 'Admin | Testimonials | New'
    }

    render() {
        return (
            <div id={'new'}>
                {this.state.go_back ? <Navigate to={'../'}/> : null}
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container align-center">
                    <div className="card col-md-6 mt-3">
                        <div className="card-header">New Testimonial</div>
                        <div className="card-body">
                            <form onSubmit={e => this.submit(e)}>
                                <FormGroup clicked={this.state.clicked}
                                           name={'Name'}
                                           form_control={this.data.get('name')}
                                />
                                <FormGroup clicked={this.state.clicked}
                                           name={'Description'}
                                           form_control={this.data.get('description')}
                                           className={'mt-3'}
                                />
                                <FormGroup clicked={this.state.clicked}
                                           type={'file'}
                                           name={'image'}
                                           form_control={this.data.get('image')}
                                           className={'mt-3'}
                                           on_change={e => {
                                               this.image = e.target.files.item(0)
                                           }}
                                />
                                <div className="align-right mt-3">
                                    <Link to={'../'} className={'btn'}>Back</Link>
                                    <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @param {Event<HTMLFormElement>} e
     */
    submit(e) {
        e.preventDefault()
        this.setState({clicked: true}, () => {
            if (this.data.valid && !this.state.submitted && this.image) {
                this.setState({submitted: true, loading: true}, () => {
                    const form_data = new FormData();
                    for (let name in this.data.value) {
                        if (name === 'image') continue;
                        form_data.append(name, this.data.value[name]);
                    }
                    form_data.append('image', this.image, this.image.name);
                    AdminService.testimonials.new(form_data).then(r => {
                        if (r.success) {
                            this.setState({go_back: true});
                        } else {
                            console.log(r);
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