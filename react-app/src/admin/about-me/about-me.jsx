import React from "react";
import Loading from "../../commons/loading/loading";
import AdminService from "../../services/admin.service";
import Config from "../../Config";
import {Link, Navigate} from "react-router-dom";
import {Helpers} from "../../Helpers";
import UsersService from "../../services/users.service";

export default class AboutMe extends React.Component {
    state = {
        loading: true,
        about_me_image: null,
        data: {
            clients: null,
            experience: null,
            projects: null
        }
    }

    componentDidMount() {
        document.title = 'Admin | About Me'
        Promise.all([
            AdminService.aboutMe.image(),
            AdminService.aboutMe.index()
        ])
            .then(([image, index]) => {
                this.setState({
                    loading: false,
                    about_me_image: image.url,
                    data: {
                        clients: index.clients,
                        experience: index.experience,
                        projects: index.projects
                    }
                });
            });
    }

    render() {
        return (
            <div id="about-me">
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container">
                    <h2 className="align-center mt-3">About Me</h2>
                    <div className="align-right mt-3">
                        <Link to={'../'} className={'btn btn-primary'}>Back</Link>
                    </div>
                    <table className="table mt-3">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.data).map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td>{Helpers.title_case(row)}</td>
                                    <td>{this.state.data[row]}</td>
                                    <td>
                                        <button onClick={() => this.edit(row, this.state.data[row])}
                                                className={'btn btn-primary'}>Edit
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    {this.state.about_me_image ?
                        <img className={'mt-3'} src={Config.api + this.state.about_me_image} alt=""/> : null}
                    <div className="align-center mt-3">
                        <label htmlFor="file" className={'btn btn-primary'}>Upload</label>
                        <input onChange={e => this.upload(e)} type="file" id={'file'} style={{display: "none"}}/>
                        {this.state.about_me_image ? <button className={'btn btn-primary'}
                                                             onClick={this.delete.bind(this)}>Remove</button> : null}
                    </div>
                    {this.state.loading ? <Loading/> : null}
                    <div className="mt-3"></div>
                </div>
            </div>
        );
    }

    /**
     * @param {Event} event
     */
    upload(event) {
        this.setState({loading: true}, () => {
            /**
             * @type File
             */
            const file = event.target.files.item(0);
            const formData = new FormData();
            formData.append('file', file, file.name);
            AdminService.aboutMe.image_upload(formData).then(r => {
                if (r.success) {
                    this.setState({loading: false, about_me_image: r.url});
                }
            });
        });
    }

    delete() {
        if (window.confirm('Are you sure you want to delete this image?')) {
            this.setState({loading: true}, () => {
                AdminService.aboutMe.image_delete().then(r => {
                    if (r.success) {
                        this.setState({loading: false, about_me_image: null});
                    }
                });
            });
        }
    }

    /**
     * @param {string} name
     * @param {string} value
     */
    edit(name, value) {
        const new_data = window.prompt(`How many "${Helpers.title_case(name)}" do you have?`, value)
        if (new_data) {
            this.setState({loading: true}, () => {
                AdminService.aboutMe.edit({name, value: new_data}).then(r => {
                    if (r.success) {
                        const data = this.state.data;
                        data[name] = new_data
                        this.setState({loading: false, data});
                    }
                });
            });
        }
    }
}