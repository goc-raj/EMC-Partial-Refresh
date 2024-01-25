import { LightningElement, wire } from 'lwc';
import bgImageAutumn from "@salesforce/resourceUrl/LoginPageBGAutumn";
import bgImageSpring from "@salesforce/resourceUrl/LoginPageBGSpring";
import bgImageSummer from "@salesforce/resourceUrl/LoginPageBGSummer";
import bgImageWinter from "@salesforce/resourceUrl/LoginPageBGWinter";
import SVG_LOGO from '@salesforce/resourceUrl/eExplorerLogo';
import globalStyles from '@salesforce/resourceUrl/LoginFormStyle';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class AdminCommunityLogin extends LightningElement {

    mainElement;
    isSignIn = true;
    eExplorerLogo = SVG_LOGO;
    email;

    renderedCallback() {
        this.mainElement = this.template.querySelector('.main-container');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        if (currentMonth >= 2 && currentMonth <= 4) {
            this.mainElement.style.backgroundImage = `url(${bgImageSpring})`;
        } else if (currentMonth >= 5 && currentMonth <= 7) {
            this.mainElement.style.backgroundImage = `url(${bgImageSummer})`;
        } else if (currentMonth >= 8 && currentMonth <= 10) {
            this.mainElement.style.backgroundImage = `url(${bgImageAutumn})`;
        } else {
            this.mainElement.style.backgroundImage = `url(${bgImageWinter})`;
        }
    }

    connectedCallback() {
        loadStyle(this, globalStyles);
    }

    showForgotPasswd(event) {
        this.email = event.detail.enteredEmail;
        this.isSignIn = !this.isSignIn;
        let subDivElement = this.template.querySelector('.sub-container');
        subDivElement.style.height = 'auto';
        document.title = 'Forgot Password';
    }

    showToast(event) {
        this.dispatchEvent(
            new CustomEvent("toast", {
                detail: event.detail
            })
        );
    }

}