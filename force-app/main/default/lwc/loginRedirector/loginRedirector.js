import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getParameters from '@salesforce/apex/LoginRedirectionCommunity.getParameters';
export default class LoginRedirector extends NavigationMixin(LightningElement) {

    connectedCallback(){
        console.log('Login redirector')
        getParameters().
        then((data) => {
            if(data){
                var accountID, contactID, showTeam, profile
                if(location.search === ''){
                    console.log('user---', data, data.Contact, data.Contact?.AccountId)
                    accountID = data.Contact?.AccountId; // Replace with your Account ID
                    contactID = data.Contact?.Id; // Replace with your Contact ID
                    showTeam = data.Contact?.showTeamRecord__c;
                    profile = ( data.Contact?.Role__c === 'Driver/Manager' || data.ProfileId === 'Manager') ? 'Manager' : ( data.Contact?.Role__c === 'Driver/Admin' ||  data.Contact?.Role__c === 'Admin') ? 'Admin' : 'Driver';
                    document.title = (data.Profile?.Name === 'Community Portal User - Driver') ? 'Driver Dashboard' : (data.Profile?.Name === 'Community Portal User - Super Manager') ? 'Admin Dashboard' : 'Dashboard';       
                    /* Navigate to dashboard based on user's role */
                    this[NavigationMixin.Navigate]({
                        type: 'comm__namedPage',
                        attributes: {
                            name: 'dashboard__c'
                        },
                        state:{
                            accid: accountID,
                            id: contactID,
                            showteam: showTeam,
                            profile: profile
                        }
                    });

                   
                }
            } 
        }).catch(error =>{
                console.log("Error--", error.message)
        })
    }
    
}