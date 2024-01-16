import { LightningElement } from 'lwc';
import login from '@salesforce/apex/adminCommunityLoginController.login';

export default class AdminLoginForm extends LightningElement {

    hidePassword = true;
    inputFields = {
        email : '',
        passwd : ''
    }

    handleInputChange(event) {
        this.inputFields = {
            ...this.inputFields,
            [event.target.name]: event.target.value
        };
    }

    handleShowHidePassword() {
        this.hidePassword = !this.hidePassword;
    }

    handleForgotPasswd() {
        let paramData = {enteredEmail: this.inputFields.email};
        let showPaaswdForm = new CustomEvent('showpasswdform', {detail: paramData});
        this.dispatchEvent(showPaaswdForm);
    }

    handleFocus(event) {
        event.target.parentElement.classList.remove('field-error');
        event.target.parentElement.classList.add('contBorder');
    }

    handleFocusOut(event) {
        event.target.parentElement.classList.remove('field-error');
        event.target.parentElement.classList.remove('contBorder');
    }

    showToastEvent(detail) {
        this.dispatchEvent(
            new CustomEvent("showtoast", {
                detail: detail
            })
        );
    }

    handleLogin() {
        this.template.querySelector('.errorText').innerHTML = '';
        if(this.inputFields.email.length == 0) {
            this.showToastEvent({message:'Please enter work email address', type:'error'});
            this.template.querySelector('.field-container1').classList.add('field-error');
        }
        if(this.inputFields.passwd.length == 0) {
            this.showToastEvent({message:'Please enter password', type:'error'});
            this.template.querySelector('.field-container2').classList.add('field-error');
        }
        else if(this.inputFields.email.length != 0) {
            console.log('Email : ' + this.inputFields.email);
            console.log('Type Email : ' + typeof(this.inputFields.email));
            console.log('Pass : ' + this.inputFields.passwd);
            console.log('Type Pass : ' + typeof(this.inputFields.passwd));
            login({
                username: this.inputFields.email,
                password: this.inputFields.passwd
            }).then(result => {
                    console.log('Result : ' + JSON.parse(JSON.stringify(result)));
                    let resObj = JSON.parse(result);
                    if(resObj.isValid == "valid") {
                        if(resObj.pgReference != null || resObj.pgReference != undefined) {
                            const startIndex = resObj.pgReference.indexOf("[") + 1;
                            const endIndex = resObj.pgReference.indexOf("]");
                            const url = resObj.pgReference.substring(startIndex, endIndex);
                            location.href = url;
                        } else {
                            this.showToastEvent({message:'Your password is incorrect', type:'error'});
                            if(resObj.remainingAttempt != 0) {
                                this.template.querySelector('.errorText').innerHTML = "You have " + resObj.remainingAttempt  + " attempts before you are locked out.";
                            } else {
                                console.log('Inside Lockedout');
                                this.template.querySelectorAll('.field-input').forEach(element => {
                                    element.disabled = true;
                                });
                                this.template.querySelector('.submitButton').disabled = true;
                                this.template.querySelector('.submitButton').classList.add('submitButtonDisabled');
                                this.template.querySelector('.errorText').innerHTML = "You are locked out for 15 minutes.";
                                setTimeout(() => {
                                    this.template.querySelector('.errorText').innerHTML = '';
                                    this.showToastEvent({message:"You are now locked in. You can try again to Sign in!", type:'info'});
                                    this.template.querySelectorAll('.field-input').forEach(element => {
                                        element.value = '';
                                    });
                                    this.template.querySelectorAll('.field-input').forEach(element => {
                                        element.disabled = false;
                                    });
                                    this.template.querySelector('.submitButton').disabled = false;
                                    this.template.querySelector('.submitButton').classList.remove('submitButtonDisabled');
                                    this.inputFields.email = '';
                                    this.inputFields.passwd = '';
                                }, 10000);
                            }
                        }
                    } else {
                        this.template.querySelector('.errorText').innerHTML = "Your username or password is incorrect. Try again.";
                        this.template.querySelectorAll('.field-input').forEach(element => {
                            element.value = '';
                        });
                        this.inputFields.email = '';
                        this.inputFields.passwd = '';
                    }
                })
                .catch(error => {
                    this.template.querySelector('.errorText').innerHTML = "Your username or password is incorrect. Try again.";
                    this.template.querySelectorAll('.field-input').forEach(element => {
                        element.value = '';
                    });
                    this.inputFields.email = '';
                    this.inputFields.passwd = '';
                    console.log('Error : ' + JSON.stringify(error));
                });
        }
    }
}