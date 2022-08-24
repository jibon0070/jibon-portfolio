import React from "react";
import FormGroup from "../../commons/form-group/form-group.jsx";
import Loading from "../../commons/loading/loading.jsx";
import ContactService from "../../services/contact.service.js";
import Validators from "../../validators/validators.js";
import './contact.scss';
import ReactiveForm from "../../reactive-form/reactive-form";
import FormControl from "../../reactive-form/form-control";

export default class Contact extends React.Component {

    data = new ReactiveForm({
        name : new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required])
    })

    state = {
        loading: false,
        clicked: false,
        submitted: false
    }

    /**
     * @param {Event<HTMLFormElement>} e
     */
    submit(e) {
        e.preventDefault();
        this.setState({ clicked: true });
        if (this.data.valid && !this.state.submitted) {
            this.setState({submitted: true, loading: true}, () => {
                ContactService.sendMessage(this.data.value).then((res) => {
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
                    <form onSubmit={(e) => this.submit(e)}>
                        <FormGroup clicked={this.state.clicked} name={'Your Full Name'} form_control={this.data.get('name')} />
                        <FormGroup clicked={this.state.clicked} name={'Email'} form_control={this.data.get('email')} />
                        <FormGroup clicked={this.state.clicked} type={'textarea'} name={'Message'} form_control={this.data.get('message')} />
                        {/*<FormGroup clicked={this.state.clicked} name="Your Message" type="textarea" validators={[Validators.required]} onValueChange={e => this.setValue('message', e)} />*/}
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
                {this.state.loading ? <Loading /> : null}
            </section>
        )
    }
}