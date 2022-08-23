import React from "react";
import FormGroup from "../../commons/form-group/form-group.jsx";
import Loading from "../../commons/loading/loading.jsx";
import ContactService from "../../services/contact.service.js";
import Validators from "../../validators/validators.js";
import './contact.scss';

export default class Contact extends React.Component {

    data = {
        name: "",
        email: "",
        message: ""
    }

    valid = {
        name: false,
        email: false,
        message: false
    }

    state = {
        clicked: false,
        loading: false,
        submitted: false
    }


    submit(e) {
        e.preventDefault();
        this.setState({ clicked: true });
        if (!Object.values(this.valid).includes(false) && !this.submitted) {
            this.setState({submitted: true, loading: true}, () => {
                ContactService.sendMessage(this.data).then((res) => {
                    if(res.success){
                        alert("Your message was stored successfully. To verify your message, please check your email.");
                        this.setState({loading: false, submitted: false});
                        e.target.reset()
                    }else if(res.url){
                        window.location.href = res.url;
                    }else if (res.error){
                        alert(res.error)
                        this.setState({loading: false, submitted: false});
                    }
                }).catch(err => {
                    console.error(err);
                    this.setState({loading: false, submitted: false});
                })
            });
        }
    }


    setValue(name, { value, valid }) {
        this.data[name] = value;
        this.valid[name] = valid;
    }
    render() {
        return (
            <section id="contact">
                <h5>Get in touch</h5>
                <h2>Contact me</h2>
                <div className="container">
                    <div className="options">
                        <div className="option">
                            <i className="fa-solid fa-envelope"></i>
                            <h4>Email</h4>
                            <h5>atikurrahaman386@gmail.com</h5>
                            <a href="mailto:atikurrahaman386@gmail.com">Send message</a>
                        </div>
                        <div className="option">
                            <i className="fa-brands fa-facebook-messenger"></i>
                            <h4>Messanger</h4>
                            <h5>A.R. Jibon</h5>
                            <a href="https://m.me/atiurrahaman.jibon/" target="_blank" rel="noreferrer">Send message</a>
                        </div>
                        <div className="option">
                            <i className="fa-brands fa-whatsapp"></i>
                            <h4>Whatsapp</h4>
                            <h5>A.R. Jibon</h5>
                            <a rel="noreferrer" href="https://api.whatsapp.com?send=+8801919403058/" target="_blank">Send message</a>
                        </div>
                    </div>
                    <form /* [formGroup]="data" (ngSubmit)="submit()" */ onSubmit={(e) => this.submit(e)}>
                        {/*<FormGroup clicked={this.state.clicked} name="Your Full Name" type="text" validators={[Validators.required]} onValueChange={e => this.setValue('name', e)} />*/}
                        {/*<FormGroup clicked={this.state.clicked} name="Email" type="email" validators={[Validators.required, Validators.email]} onValueChange={e => this.setValue('email', e)} />*/}
                        {/*<FormGroup clicked={this.state.clicked} name="Your Message" type="textarea" validators={[Validators.required]} onValueChange={e => this.setValue('message', e)} />*/}
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
                {this.state.loading ? <Loading /> : null}
            </section>
        )
    }
}