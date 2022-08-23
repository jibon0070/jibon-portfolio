import React from "react";
import {Link} from "react-router-dom";
import Loading from "../../commons/loading/loading";
import AdminService from "../../services/admin.service";
import Config from "../../Config";

export default class HeaderImage extends React.Component {
    state = {
        loading: true,
        header_image: null
    }

    componentDidMount() {
        AdminService.headerImage.index().then(res => {
            this.setState({loading: false, header_image: res.url});
        });
    }

    render() {
        return (
            <div id="header-image">
                <div className="container">
                    <h1 className={'align-center mt-3'}>Header Image</h1>
                    <div className="align-right mt-3">
                        <Link to={'../'} className={'btn btn-primary'}>Back</Link>
                    </div>
                    {this.state.header_image ? <img src={Config.api + this.state.header_image} alt="Broken Header Image"
                                                    className={'mt-3'}/> : null}
                    <div className="align-center mt-3">
                        <label htmlFor={'file'} className={'btn btn-primary'}>Upload</label>
                        <input onChange={e => this.upload(e)} type="file" id={'file'} accept={'image/*'}
                               style={{display: 'none'}}/>
                        {this.state.header_image ?
                            <button className={'btn'} onClick={this.delete.bind(this)}>Remove</button> : null}
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        )
    }

    delete() {

        if (window.confirm('Are you sure you want to delete this photo?')) {
            this.setState({loading: true}, () => {
                AdminService.headerImage.delete().then(res => {
                    if (res.success) {
                        this.setState({loading: false, header_image: null});
                    }
                });
            });
        }
    }

    /**
     * @param {Event} event
     */
    upload(event) {
        this.setState({loading: true, header_image: null}, () => {
            /**
             * @type File
             */
            const file = event.target.files.item(0);
            const form_data = new FormData();
            form_data.append('file', file, file.name);
            AdminService.headerImage.upload(form_data).then(r => {
                if (r.success) {
                    this.setState({loading: false, header_image: r.url});
                }
            });
        });
    }
}