import React from "react";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import AdminService from "../../services/admin.service";
import Loading from "../../commons/loading/loading";
import New from "./new/new";
import PageNotFound from "../../commons/page-not-found/page-not-found";
import UsersService from "../../services/users.service";

class Component extends React.Component {
    /**
     * @type    {
     *              {
     *                  data: {
     *                      id:string,
     *                      title:string,
     *                      experience:string,
     *                      category:string
     *              }[],
     *                  loading: boolean
     *              }
     *          }
     */
    state = {
        loading: true,
        data: []
    }

    componentDidMount() {
        document.title = 'Admin | Experience'
        AdminService.experiences.index().then(r => {
            this.setState({loading: false, data: r})
        });
    }

    render() {
        return (
            <div id="experiences">
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container">
                    <h2 className="align-center mt-3">Experiences</h2>
                    <div className="align-right mt-3">
                        <Link to='../../' className={'btn'}>Back</Link>
                        <Link to={'new'} className={'btn btn-primary'}>New</Link>
                    </div>
                    {this.state.data.length ? <table className="table mt-3">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Experience</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td>{row.id}</td>
                                    <td>{row.title}</td>
                                    <td>{row.experience} Years+</td>
                                    <td>{row.category}</td>
                                    <td>
                                        <button className={'btn btn-primary'}
                                                onClick={() => this.delete(row.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table> : <p className={'align-center'}>No Data Available</p>}
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }

    /**
     * @param {string} id
     */
    delete(id) {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            this.setState({loading: true}, () => {
                AdminService.experiences.delete(id).then(r => {
                    if (r.success) {
                        const data = this.state.data.filter(row => {
                            return row.id !== id;
                        });
                        this.setState({loading: false, data});
                    }
                });
            });
        }
    }
}

export default class Experiences extends React.Component{
    render() {
        return (
            <div>
                <Routes>
                    <Route path={''} element={<Component />} />
                    <Route path={'new'} element={<New />} />

                    <Route path={'*'} element={<PageNotFound />} />
                </Routes>
            </div>
        );
    }
}