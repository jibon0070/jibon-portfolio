import React from "react";
import {Link, Navigate} from "react-router-dom";
import Loading from "../../commons/loading/loading";
import AdminService from "../../services/admin.service";
import UsersService from "../../services/users.service";

export default class Contacts extends React.Component {
    state = {
        loading: true,
        data: []
    }

    componentDidMount() {
        document.title = "Admin | Contacts"
        AdminService.contacts.index().then(r => {
            console.log(r);
            this.setState({loading: false, data: r});
        });
    }

    render() {
        return (
            <div id={'contacts'}>
                {this.state.loading ? <Loading/> : null}
                {!UsersService.is_logged_in ? <Navigate to={'/auth/login'}/> : null}
                <div className="container">
                    <h2 className="align-center mt-3">Contacts</h2>
                    <div className="align-right"><Link to={'../'} className="btn">Back</Link></div>
                    {this.state.data.length ? <table className="table mt-3">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.message}</td>
                                        <td>{this.format(row.created_at)}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => this.delete(row.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table> :
                        <p className="align-center mt-3">No data available.</p>}
                </div>
            </div>
        );
    }

    /**
     * @param {string} id
     */
    delete(id) {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            this.setState({loading: true}, () => {
                AdminService.contacts.delete(id).then(r => {
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

    /**
     * @param {string} seconds
     * @return {string}
     */
    format(seconds) {
        const date = new Date(seconds * 1000);
        const hours = date.getHours();
        return `${this.#number_padding(hours > 12 ? hours - 12 : hours)}:${this.#number_padding(date.getMinutes())} ${this.#number_padding(date.getDate())}/${this.#number_padding(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2)}`;
    }

    /**
     * @param {number|string} num
     * @return {string}
     */
    #number_padding(num) {
        if (num < 10) return `0${num}`
        return `${num}`;
    }
}