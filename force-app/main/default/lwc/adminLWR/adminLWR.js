import { LightningElement, track, api, wire } from 'lwc';
import Profile from '@salesforce/schema/User.ProfileId';
import videoLink from '@salesforce/apex/GetDriverData.getVideoLink';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class AdminLWR extends LightningElement {
    _contactId;
    _accountId;
    isTeamShow;
    currentUserProfileId;
    Role;
    customSetting;
    /*Get parameters from URL*/
    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }

   /* constructor(){
        super();
        this._contactId = this.getUrlParamValue(location.href, "id");
        this._accountId = this.getUrlParamValue(location.href, "accid");;
        this.isTeamShow = this.getUrlParamValue(location.href, "showteam");;
        console.log('Constructor:--', this.getUrlParamValue(location.href, "id"))
    }*/

    
    @wire(getRecord, { recordId: USER_ID, fields: [Profile] })
    userDetails({ error, data }) {
        if (data) {
            this.currentUserProfileId = data.fields.ProfileId.value;
            this.Role = (this.currentUserProfileId === '00e31000001FRDWAA4' || this.currentUserProfileId === '00e31000001FRDXAA4') ? 'Manager' : (this.currentUserProfileId === '00e31000001FRDZAA4' || this.currentUserProfileId === '00e31000001FRDYAA4' || this.currentUserProfileId === '00eE1000000ZnAjIAK') ? 'Admin' : 'Driver'
            console.log("Profile id", this.currentUserProfileId, "Role", this.Role)
        } else if (error) {
            this.error = error;
        }
    }

    connectedCallback() {
        document.title = 'Admin Dashboard'
        let chart = '{"NonCompliant":14.3,"Compliant":85.7,"Complete":95.9183673469387755102040816326531,"missingPacketandmissingInsurance":1.02040816326530612244897959183673,"missingInsurance":0,"missingpacket":3.06122448979591836734693877551020}'
        this.complianceList = chart;
        this._contactId = this.getUrlParamValue(location.href, "id");
        this._accountId = this.getUrlParamValue(location.href, "accid");;
        this.isTeamShow = this.getUrlParamValue(location.href, "showteam");
        videoLink()
        .then((result)=>{
            if(result){
                this.customSetting = JSON.parse(result)
            }
                console.log("video list",result)
        }).catch((err)=>{
                console.log("Error--", err.message)
        })
      
        console.log('Constructor:--', this.getUrlParamValue(location.href, "id"))
    }

    fireToast() {
        toastr.success('Email sent!');
    }


}