import { LightningElement, api } from 'lwc';
import checkUserNameForCommunity from '@salesforce/apex/ForgotCommunityPasswordController.checkUserNameForCommunity';
import resetPasswordForCommunity from '@salesforce/apex/ForgotCommunityPasswordController.resetPasswordForCommunity';
import Check_Username from '@salesforce/label/c.Check_Username';
import Not_Available_any_User from '@salesforce/label/c.Not_Available_any_User';
import Forgot_Password from '@salesforce/label/c.Forgot_Password';

export default class AdminForgotPasswdForm extends LightningElement {

    @api email;

    handleEmailChange(event) {
        this.email = event.target.value;
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

    handlePasswd() {
        if(this.email.length == 0) {
            this.showToastEvent({message:'Please enter work email address', type:'error'});
            this.template.querySelector('.field-container').classList.add('field-error');
        } else {
            this.showToastEvent({message:Check_Username, type:'info'});
            setTimeout(() => {
                checkUserNameForCommunity({
                    username: this.email
                }).then(result => {
                        if(result == 'valid') {
                            setTimeout(() => {
                                this.showToastEvent({message:Forgot_Password, type:'info'});
                                resetPasswordForCommunity({
                                    username: this.email
                                }).then(result => {
                                        if(result != null) {
                                            const startIndex = result.indexOf("[") + 1;
                                            const endIndex = result.indexOf("]");
                                            const url = result.substring(startIndex, endIndex);
                                            location.href = url;
                                        }
                                    })
                                    .catch(error => {
                                        console.log('Error from resetPasswordForCommunity' + JSON.stringify(error));
                                    });
                            }, 3300);
                        } else {
                            setTimeout(() => {
                                this.showToastEvent({message:Not_Available_any_User, type:'error'});
                                this.template.querySelector('.field-input').value = '';
                            }, 3300);
                        }
                    })
                    .catch(error => {
                        console.log('Error from checkUserNameForCommunity' + JSON.stringify(error));
                        this.template.querySelector('.field-input').value = '';
                    });
            }, 3300);
        }
    }
}