import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jQueryMinified from '@salesforce/resourceUrl/jQueryMinified';
import EMC_Header_Scripts from '@salesforce/resourceUrl/EMC_Header_Scripts';
export default class ToastLWR extends LightningElement {

    @api fireToastr(message, variant){
        switch (variant) {
            case 'success': toastr.success(message);
                break;
            case 'error': toastr.error(message);
                break;
            case 'info': toastr.info(message);
                break;
            case 'warning': toastr.warning(message);
                break;
        }
    }

    initToast(){
        toastr.options.positionClass = "toast-top-right";
        toastr.options.closeButton = true;
        /*toastr.options.disableTimeOut = true;*/
        toastr.options.progressBar = false;
        toastr.options.fadeOut = 6000;
        /*toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut= 960000;
        toastr.options.hideDuration = 0;*/
    }

    renderedCallback(){
        // Load Jquery
        loadScript(this, jQueryMinified)
        .then(() => {
            // Load Js Toast Script
            loadScript(this, EMC_Header_Scripts + '/EMC_Header_Scripts/js/toastr.min.js')
            .then(() => {
                //console.log('toastr loaded')
                this.initToast();
            }).catch((error)=>{
                console.log("Error while loading toastr script", error)
            })
        }).catch(() =>{
            console.log("Error while loading toaste script", error)
        })
    }
}