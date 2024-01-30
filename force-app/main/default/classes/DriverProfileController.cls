global class DriverProfileController {
    @AuraEnabled
    public static String getDriverData() {
            List<contactValueWrapper> driverData = new List<contactValueWrapper>(); 
            List<Contact> conList = [SELECT id,FirstName,Role__c,Driving_States__c,account.Schedule_Goto_Meeting__c,Activation_Date__c, System_Notification__c FROM Contact WHERE id =: userinfo.getuserid() ];
            contactValueWrapper contactWrap = new contactValueWrapper ();
            if(conList.size() > 0){
                contactWrap.ScheduleGotoMeeting = conList[0].account.Schedule_Goto_Meeting__c != null ? conList[0].account.Schedule_Goto_Meeting__c : '' ;
                contactWrap.activationDate = conList[0].Activation_Date__c != null ? conList[0].Activation_Date__c: null;   
                contactWrap.systemNotification = conList[0].System_Notification__c;            
            }  
            
            contactWrap.last2Month = String.escapeSingleQuotes(WrapperUtils.getpastYearReimbursement(userinfo.getuserid())); 
            driverData.add(contactWrap);
            return JSON.serialize(driverData).unescapeHtml4();
    }

    global class contactValueWrapper {
         global string ScheduleGotoMeeting {get;set;}
         global Date activationDate {get;set;}
         global string systemNotification {get;set;}
         global string last2Month {get;set;}
     }
}