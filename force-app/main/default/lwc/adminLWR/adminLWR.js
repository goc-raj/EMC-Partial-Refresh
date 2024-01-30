import { LightningElement, track, api, wire } from 'lwc';
import videoLink from '@salesforce/apex/GetDriverData.getVideoLink';

export default class AdminLWR extends LightningElement {
    contactId;
    accountId;
    isTeamShow;
    role;
    customSetting;

    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }
    
    constructor(){
        super();
        console.log("inside constructor")
        videoLink()
        .then((result)=>{
            if(result){
                this.customSetting = JSON.parse(result)
            }
                console.log("video list",result)
        }).catch((err)=>{
                console.log("Error--", err.message)
        })
    }

   /* @wire(CurrentPageReference) handleStateChange(pageReference) {
        if(pageReference){
            this._contactId = pageReference.state?.id;
            this._accountId = pageReference.state?.accid;
            this.isTeamShow = pageReference.state?.showteam;
        }
        console.log("Page---", this._contactId,  pageReference);
    }*/
    
   /*@wire(getRecord, { recordId: USER_ID, fields: [Profile] })
    userDetails({ error, data }) {
        if (data) {
            this.currentUserProfileId = data.fields.ProfileId.value;
            this.Role = (this.currentUserProfileId === '00e31000001FRDWAA4' || this.currentUserProfileId === '00e31000001FRDXAA4') ? 'Manager' : (this.currentUserProfileId === '00e31000001FRDZAA4' || this.currentUserProfileId === '00e31000001FRDYAA4' || this.currentUserProfileId === '00eE1000000MdU9IAK') ? 'Admin' : 'Driver'
            console.log("Profile id", this.currentUserProfileId, "Role", this.Role)
        } else if (error) {
            this.error = error;
        }
    }*/

    connectedCallback() {
       // let chart = '{"NonCompliant":14.3,"Compliant":85.7,"Complete":95.9183673469387755102040816326531,"missingPacketandmissingInsurance":1.02040816326530612244897959183673,"missingInsurance":0,"missingpacket":3.06122448979591836734693877551020}'
       // this.complianceList = chart;
      document.title = "Admin Dashboard"
      this.contactId = this.getUrlParamValue(location.href, "id");
      this.accountId = this.getUrlParamValue(location.href, "accid");
      this.isTeamShow = this.getUrlParamValue(location.href, "showteam");
      this.role =  this.getUrlParamValue(location.href, "profile");
      //this.role = (this.profileId === '00e31000001FRDWAA4' || this.profileId === '00e31000001FRDXAA4') ? 'Manager' : (this.profileId === '00e31000001FRDZAA4' || this.profileId === '00e31000001FRDYAA4' || this.profileId === '00eE1000000ZnAjIAK') ? 'Admin' : 'Driver'
    }

    fireToast() {
        toastr.success('Email sent!');
    }


}