import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import PageNotFound from "../../commons/page-not-found/page-not-found";
import AdminService from "../../services/admin.service";
import Loading from "../../commons/loading/loading";
import Config from "../../Config";
import New from "./new/new";

class Component extends React.Component {
    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        document.title = 'Admin | Portfolios'
        AdminService.portfolios.index().then(r => {
            this.setState({loading: false, data: r});
        });
    }

    render() {
        return (
            <div id={'portfolios'}>
                <div className="container">
                    <h1 className={'align-center mt-3'}>Portfolios</h1>
                    <div className="align-right mt-3">
                        <Link to={'../../'} className={'btn'}>Back</Link>
                        <Link to={'new'} className={'btn btn-primary'}>New</Link>
                    </div>
                    {
                        this.state.data?.length ?
                            <table className="table mt-3">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Github</th>
                                    <th>Live</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((row, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{row.id}</td>
                                            <td>{row.title}</td>
                                            <td>{row.github_link ?
                                                <a href={row.github_link} target='_blank'>Link</a> : null}</td>
                                            <td>{row.live_link ?
                                                <a href={row.live_link} target='_blank'>Link</a> : null}</td>
                                            <td>
                                                <img style={{width: '150px'}} src={Config.api + row.image_link}
                                                     alt="Broken"/>
                                            </td>
                                            <td>
                                                <button className={'btn'} onClick={() => this.delete(row.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table> :
                            <p className={'align-center mt-3'}>No data available</p>}
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }

    /**
     * @param {string} id
     */
    delete(id) {
        if (window.confirm('Are you sure you want to delete this portfolio?')) {
            this.setState({loading: true}, () => {
                AdminService.portfolios.delete(id).then(r => {
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

export default class Portfolios extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path={''} element={<Component/>}/>
                    <Route path={'new'} element={<New/>}/>

                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </div>
        );
    }
}