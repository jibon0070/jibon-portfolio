import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import PageNotFound from "../../commons/page-not-found/page-not-found";
import Loading from "../../commons/loading/loading";
import AdminService from "../../services/admin.service";
import Config from "../../Config";

class Component extends React.Component {
    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        document.title = 'Admin | Testimonials'
        AdminService.testimonials.index().then(r => {
            this.setState({loading: false, data: r});
        });
    }

    render() {
        return (
            <div id={'testimonials'}>
                <div className="container">
                    <h2 className="align-center mt-3">Testimonials</h2>
                    <div className="align-right mt-3">
                        <Link to={'new'} className={'btn btn-primary'}>New</Link>
                        <Link to={'../../'} className={'btn'}>Back</Link>
                    </div>
                    {this.state.data.length ?
                        <table className="table mt-3">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td><img style={{width: '150px'}} src={Config.api + row.image_link} alt={'broken'} /></td>
                                        <td>
                                            <button className={'btn btn-primary'} onClick={() => this.delete(row.id)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table> :
                        <p className="mt-3 align-center">No data available.</p>}
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }

    /**
     * @param {string} id
     */
    delete(id){
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            this.setState({loading: true}, () => {
                AdminService.testimonials.delete(id).then(r => {
                    if (r.success) {
                        const data = this.state.data.filter(row => {
                            return row.id !== id
                        });
                    this.setState({loading: false, data});
                    }
                });
            });
        }
    }
}

export default class Testimonials extends React.Component {
    render() {
        return (
            <Routes>
                <Route path={''} element={<Component/>}/>

                <Route path={'*'} element={<PageNotFound/>}/>
            </Routes>
        );
    }
}