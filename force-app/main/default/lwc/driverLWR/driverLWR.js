import { LightningElement } from 'lwc';
import videoLink from '@salesforce/apex/GetDriverData.getVideoLink';
export default class DriverLWR extends LightningElement {
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

    connectedCallback(){
        document.title = "Driver Dashboard"
        this.contactId = this.getUrlParamValue(location.href, "id");
        this.accountId = this.getUrlParamValue(location.href, "accid");
        this.isTeamShow = this.getUrlParamValue(location.href, "showteam");
        this.role =  this.getUrlParamValue(location.href, "profile");
    }

    /*locationList;
		locations;
    mileage = [{
        id: 'a0BNt00000AogTzMAJ',
        latitude: 35.74773,
        longitude: -119.24879,
        endlatitude: 36.33765,
        endlongitude: -119.64669,
        timeZone:'US/Pacific'
    },{
        id: 'a0BNt00000AcSi3MAF',
        latitude: 37.17235,
        longitude: -120.79819,
        endlatitude: 37.17136,
        endlongitude: -120.79148,
        timeZone:'US/Pacific'
    }]
    connectedCallback(){
        document.title = 'Driver Dashboard'
        let locate = {"modal":"[{\"attributes\":{\"type\":\"Contact\",\"url\":\"/services/data/v59.0/sobjects/Contact/0033r00003gQbvIAAS\"},\"Id\":\"0033r00003gQbvIAAS\",\"Name\":\"Al Zablocki\",\"Driving_States__c\":\"MI;WI\"}]","background":"#F7F7F7","border":"#F7F7F7","height":"127","width":"160","mapType":"USA","arrayList":["AB","BC","MB","NB","NL","NT","NS","NU","ON","PE","QC","SK","YT"]}
        let locations = {
            "modal": [
                {
                    "attributes": {
                        "type": "Contact",
                        "url": "/services/data/v59.0/sobjects/Contact/0033r00003e4z2zAAA"
                    },
                    "Id": "0033r00003e4z2zAAA",
                    "Name": "Brian Nuffer",
                    "Address__c": "a0e0Z00000Gnnt3QAB",
                    "Fixed_Amount__c": 442.38,
                    "MailingCity": "Grand Rapids",
                    "MailingState": "MI",
                    "Map_Country__c": "USA",
                    "MailingPostalCode": "49525",
                    "Reimbursement_Frequency__c": "Monthly Reimbursement",
                    "Half_Fixed_Amount__c": 204.18,
                    "Address__r": {
                        "attributes": {
                            "type": "Address__c",
                            "url": "/services/data/v59.0/sobjects/Address__c/a0e0Z00000Gnnt3QAB"
                        },
                        "Location_Lat_Long__Latitude__s": 43.03149560000001,
                        "Location_Lat_Long__Longitude__s": -85.58179109999999,
                        "Id": "a0e0Z00000Gnnt3QAB"
                    },
                    "lat": 43.03149560000001,
                    "lon": -85.58179109999999,
                    "amount": "$442.38",
                    "address": "Grand Rapids, MI 49525"
                },
                {
                    "attributes": {
                        "type": "Contact",
                        "url": "/services/data/v59.0/sobjects/Contact/0030Z00003SHawMQAT"
                    },
                    "Id": "0030Z00003SHawMQAT",
                    "Name": "Frank Saverino",
                    "Address__c": "a0e0Z00000GnkT0QAJ",
                    "Fixed_Amount__c": 392.16,
                    "MailingCity": "Bloomingdale",
                    "MailingState": "IL",
                    "Map_Country__c": "USA",
                    "MailingPostalCode": "60108",
                    "Reimbursement_Frequency__c": "Monthly Reimbursement",
                    "Half_Fixed_Amount__c": 181,
                    "Address__r": {
                        "attributes": {
                            "type": "Address__c",
                            "url": "/services/data/v59.0/sobjects/Address__c/a0e0Z00000GnkT0QAJ"
                        },
                        "Location_Lat_Long__Latitude__s": 41.9575285,
                        "Location_Lat_Long__Longitude__s": -88.0809036,
                        "Id": "a0e0Z00000GnkT0QAJ"
                    },
                    "lat": 41.9575285,
                    "lon": -88.0809036,
                    "amount": "$392.16",
                    "address": "Bloomingdale, IL 60108"
                },
                {
                    "attributes": {
                        "type": "Contact",
                        "url": "/services/data/v59.0/sobjects/Contact/0030Z00003SHb0lQAD"
                    },
                    "Id": "0030Z00003SHb0lQAD",
                    "Name": "Jennifer Barry",
                    "Address__c": "a0e0Z00000GnsqjQAB",
                    "Fixed_Amount__c": 371.76,
                    "MailingCity": "Geneva",
                    "MailingState": "OH",
                    "Map_Country__c": "USA",
                    "MailingPostalCode": "44041",
                    "Reimbursement_Frequency__c": "Monthly Reimbursement",
                    "Half_Fixed_Amount__c": 171.58,
                    "Address__r": {
                        "attributes": {
                            "type": "Address__c",
                            "url": "/services/data/v59.0/sobjects/Address__c/a0e0Z00000GnsqjQAB"
                        },
                        "Location_Lat_Long__Latitude__s": 41.8050539,
                        "Location_Lat_Long__Longitude__s": -80.94814889999999,
                        "Id": "a0e0Z00000GnsqjQAB"
                    },
                    "lat": 41.8050539,
                    "lon": -80.94814889999999,
                    "amount": "$371.76",
                    "address": "Geneva, OH 44041"
                },
                {
                    "attributes": {
                        "type": "Contact",
                        "url": "/services/data/v59.0/sobjects/Contact/0030Z00003SHb0qQAD"
                    },
                    "Id": "0030Z00003SHb0qQAD",
                    "Name": "Scott Crowley",
                    "Address__c": "a0e0Z00000GnoW8QAJ",
                    "Fixed_Amount__c": 403.95,
                    "MailingCity": "Rochester",
                    "MailingState": "MN",
                    "Map_Country__c": "USA",
                    "MailingPostalCode": "55901",
                    "Reimbursement_Frequency__c": "Monthly Reimbursement",
                    "Half_Fixed_Amount__c": 186.44,
                    "Address__r": {
                        "attributes": {
                            "type": "Address__c",
                            "url": "/services/data/v59.0/sobjects/Address__c/a0e0Z00000GnoW8QAJ"
                        },
                        "Location_Lat_Long__Latitude__s": 44.0780552,
                        "Location_Lat_Long__Longitude__s": -92.5098914,
                        "Id": "a0e0Z00000GnoW8QAJ"
                    },
                    "lat": 44.0780552,
                    "lon": -92.5098914,
                    "amount": "$403.95",
                    "address": "Rochester, MN 55901"
                }
            ],
            "background": "#FFFFFF",
            "border": "#FFFFFF",
            "height": "200",
            "width": "260",
            "navigation": false,
            "vertical": "60%",
            "margin": [
                0,
                0,
                0,
                0
            ],
            "top": 0,
            "bottom": 0,
            "mapType": "USA"
        }
        this.locationList = JSON.stringify(locate);
        this.locations = JSON.stringify(locations);
    }

    showMap(event){
        let targetId = event.currentTarget.dataset.id;
        if(targetId){
            let map = this.template.querySelector('c-web-chat');
            if(map){
                this.template
                .querySelector(`c-web-chat[data-id="${targetId}"]`)
                .initMap(targetId);
            }
        }
    }*/
}