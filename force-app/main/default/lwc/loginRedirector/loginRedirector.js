import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getParameters from '@salesforce/apex/LoginRedirectionCommunity.getParameters';
export default class LoginRedirector extends NavigationMixin(LightningElement) {
    // @wire(redirectOnPage)
    // redirect({data, error}) {
    //     if(data){
    //         location.href = location.origin + data;
    //         console.log("page reference 2--", data)
    //     }else if(error) {
    //         console.log("Error--", error)
    //     }
       
    // }
	/*@wire(getParameters)
    setParameters({data, error}) {
        var accountID, contactID, url
        if (data) {
            if(location.search === ''){
                console.log('user---', data, data.Contact, data.Contact?.AccountId)
                accountID = data.Contact?.AccountId; // Replace with your Account ID
                contactID = data.Contact?.Id; // Replace with your Contact ID
                url = (data.Profile?.Name === 'Community Portal User') ? new URL(`${location.pathname}dashboard`, location.href) : (data.Profile?.Name === 'Community Portal User - Super Manager') ?  url = new URL(`${location.pathname}dashboard`, location.href) : location.href;
                document.title = (data.Profile?.Name === 'Community Portal User') ? 'Driver Dashboard' : (data.Profile?.Name === 'Community Portal User - Super Manager') ? 'Admin Dashboard' : 'Dashboard';
                url.searchParams.append('accid', accountID);
                url.searchParams.append('id', contactID);
                window.history.replaceState({}, '', url);
               // location.assign(url);
            }
        } else if(error) {
           console.log("Error--", error)
        }
    }*/

    myValue;
    pageRef;
    @wire(CurrentPageReference) handleStateChange(pageReference) {
      this.myValue = pageReference.state.c__myValue;
      this.pageRef = pageReference;
      console.log("Page---", this.pageRef);
    }

    connectedCallback(){
        console.log('Login redirector')
        getParameters().
        then((data) => {
            if(data){
                var accountID, contactID, showTeam, url
                if(location.search === ''){
                    console.log('user---', data, data.Contact, data.Contact?.AccountId)
                    accountID = data.Contact?.AccountId; // Replace with your Account ID
                    contactID = data.Contact?.Id; // Replace with your Contact ID
                    showTeam = data.Contact?.showTeamRecord__c;
                    document.title = (data.Profile?.Name === 'Community Portal User') ? 'Driver Dashboard' : (data.Profile?.Name === 'Community Portal User - Super Manager') ? 'Admin Dashboard' : 'Dashboard';
                    /*url = (data.Profile?.Name === 'Community Portal User') ? new URL(`${location.pathname}dashboard`, location.href) : (data.Profile?.Name === 'Community Portal User - Super Manager') ?  url = new URL(`${location.pathname}dashboard`, location.href) : location.href;
                    url.searchParams.append('accid', accountID);
                    url.searchParams.append('id', contactID);
                    window.history.replaceState({}, '', url);*/
                    //location.assign(url);
                    this[NavigationMixin.Navigate]({
                        type: 'comm__namedPage',
                        attributes: {
                            name: 'dashboard__c'
                        },
                        state:{
                            accid: accountID,
                            id: contactID,
                            showteam: showTeam
                        }
                      });
                 }
            } 
        }).catch(error =>{
                console.log("Error--", JSON.parse(JSON.stringify(error)))
        })
    }
    
}