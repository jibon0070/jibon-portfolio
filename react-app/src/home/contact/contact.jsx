import React from "react";
import './contact.scss';

export default class Contact extends React.Component {
    render() {
        return (
            <section id="contact">
                <h5>Get in touch</h5>
                <h2>Contact me</h2>
                <div className="container">
                    <div className="options">
                        <div className="option">
                            <mat-icon>email</mat-icon>
                            <h4>Email</h4>
                            <h5>atikurrahaman386@gmail.com</h5>
                            <a href="mailto:atikurrahaman386@gmail.com">Send message</a>
                        </div>
                        <div className="option">
                            <mat-icon>send</mat-icon>
                            <h4>Messanger</h4>
                            <h5>A.R. Jibon</h5>
                            <a href="https://m.me/atiurrahaman.jibon/" target="_blank">Send message</a>
                        </div>
                        <div className="option">
                            <mat-icon>whatsapp</mat-icon>
                            <h4>Whatsapp</h4>
                            <h5>A.R. Jibon</h5>
                            <a href="https://api.whatsapp.com?send=+8801919403058/" target="_blank">Send message</a>
                        </div>
                    </div>
                    <form /* [formGroup]="data" (ngSubmit)="submit()" */>
                        <input type="text" /* formControlName="name" */ placeholder="Your Full Name" />
                        <input type="text" /* formControlName="email" */ placeholder="Your Email" />
                        <textarea /* formControlName="message" */ placeholder="Your Message"></textarea>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </section>
        )
    }
}