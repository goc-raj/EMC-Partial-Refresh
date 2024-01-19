import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class RedirectorLWR extends LightningElement {
    contactId;
    accountId;
    showTeam;
    profileId;
    Role;
    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }

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

    connectedCallback(){
        this.contactId = this.getUrlParamValue(location.href, "id");
        this.accountId = this.getUrlParamValue(location.href, "accid");
        this.showTeam = this.getUrlParamValue(location.href, "showteam");
        this.profileId =  this.getUrlParamValue(location.href, "profile");
        this.Role = (this.profileId === '00e31000001FRDWAA4' || this.profileId === '00e31000001FRDXAA4') ? 'Manager' : (this.profileId === '00e31000001FRDZAA4' || this.profileId === '00e31000001FRDYAA4' || this.profileId === '00eE1000000ZnAjIAK') ? 'Admin' : 'Driver'
    }
}