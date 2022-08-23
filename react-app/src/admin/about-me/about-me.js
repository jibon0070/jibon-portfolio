import React from "react";
import Loading from "../../commons/loading/loading";
import AdminService from "../../services/admin.service";
import Config from "../../Config";
import {Link} from "react-router-dom";

export default class AboutMe extends React.Component {
    state = {
        loading: true,
        about_me_image: null
    }

    componentDidMount() {
        AdminService.aboutMe.image().then(r => {
            this.setState({loading: false, about_me_image: r.url});
        });
    }

    render() {
        return (
            <div id="about-me">
                <div className="container">
                    <h2 className="align-center mt-3">About Me</h2>
                    <div className="align-right mt-3">
                        <Link to={'../'} className={'btn btn-primary'}>Back</Link>
                    </div>
                    {this.state.about_me_image ?
                        <img className={'mt-3'} src={Config.api + this.state.about_me_image} alt=""/> : null}
                    <div className="align-center mt-3">
                        <label htmlFor="file" className={'btn btn-primary'}>Upload</label>
                        <input onChange={e => this.upload(e)} type="file" id={'file'} style={{display: "none"}}/>
                        {this.state.about_me_image ? <button className={'btn btn-primary'} onClick={this.delete.bind(this)}>Remove</button>: null}
                    </div>
                    {this.state.loading ? <Loading/> : null}
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
}