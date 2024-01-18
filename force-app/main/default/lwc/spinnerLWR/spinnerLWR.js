import { LightningElement,api } from 'lwc';
import mBurseCss from '@salesforce/resourceUrl/mBurseCss';

export default class SpinnerLWR extends LightningElement {
    loader = mBurseCss + '/mburse/assets/mBurse-Icons/mburse-loading.gif';
    @api loadSpinner;
}