public with sharing class LoginRedirectionCommunity {
  @AuraEnabled(cacheable=true)
  public static object getParameters() {   
      User u = new User();         
      u = [SELECT id,Profile.Name,contactid,contact.Accountid,contact.showTeamRecord__c FROM user WHERE id =: userinfo.getuserid()];
      return u;
  }

  @AuraEnabled
  public static object getProfile() {   
      User u = new User();         
      u = [SELECT id,Profile.Name FROM user WHERE id =: userinfo.getuserid()];
      return u;
  }
}