import { LightningElement, api } from 'lwc';

export default class MileagePreview extends LightningElement {
    @api mileageList
    formatDate(date){
        let dateObj = new Date(date);
        var objectDate = dateObj.toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        });
    
        return objectDate
    }
    
    formatDateTime(datetime){
        let time = new Date(datetime);
        let convertedTime = time.toLocaleTimeString("en-US", {
          timeZone: "America/Panama",
          hour: "2-digit",
          minute: "2-digit",
        });
    
        return convertedTime
    }
    
    formatBinding(aJ){
        const formatJSON = aJ.map(item => {
            const container = {};
            container.Id = item.Id; 
            container.Date = (item.Trip_Date__c) ? this.formatDate(item.Trip_Date__c) : ''; 
            container.IsSelected = false; 
            container.checkinicon = false; 
            container.TrackingTolltip = this.checkinTolltip; 
            container.Status = item.Trip_Status__c; 
            container.rowSelected = "tbody-header"; 
            container.iconcolor = "checkin_icon"; 
            container.timeColor = 'start_time';
            container.StartTime = (item.ConvertedStartTime__c) ? this.formatDateTime(item.ConvertedStartTime__c) : ''; 
            container.dated = '-'; 
            container.EndTime = (item.ConvertedEndTime__c) ? this.formatDateTime(item.ConvertedEndTime__c) : ''; 
            container.Name = item.EmployeeReimbursement__r.Contact_Id_Name__c;
            container.Mileage = parseFloat(item.Mileage__c.toFixed(2));
            container.FromLocation = item.Original_Origin_Name__c == undefined ? item.Origin_Name__c == undefined ? '' : item.Origin_Name__c : item.Original_Origin_Name__c;
            container.FromName = item.Original_Origin_Name__c == undefined ? '' : item.Original_Origin_Name__c;
            container.Triporigion = item.Trip_Origin__c;
            container.ToLocation = item.Original_Destination_Name__c == undefined ? item.Destination_Name__c == undefined ? '' : item.Destination_Name__c : item.Original_Destination_Name__c;
            container.ToName = item.Original_Destination_Name__c == undefined ? '' : item.Original_Destination_Name__c;
            container.Toorigion = item.Trip_Destination__c;
            container.weekday = item.Day_Of_Week__c == undefined ? '' : item.Day_Of_Week__c.substring(0, 3);
            container.Tags = item.Tag__c == undefined ? '' : item.Tag__c;
            container.Notes = item.Notes__c == undefined ? '' : item.Notes__c;
            container.Activity = item.Activity__c == undefined ? '' : item.Activity__c;
            container.DriveTime = item.Driving_Time__c == undefined ? 0 : item.Driving_Time__c;
            container.StayTime = item.Stay_Time__c == undefined ? 0 : item.Stay_Time__c;
            container.fromlatitude = item.From_Location__Latitude__s == undefined ? undefined : item.From_Location__Latitude__s;
            container.fromlongitude = item.From_Location__Longitude__s == undefined ? undefined : item.From_Location__Longitude__s;
            container.tolatitude = item.To_Location__Latitude__s == undefined ? undefined : item.To_Location__Latitude__s;
            container.tolongitude = item.To_Location__Longitude__s == undefined ? undefined : item.To_Location__Longitude__s;
            container.tripId = item.Trip_Id__c == undefined ? undefined : item.Trip_Id__c;
            container.triplog = item.Triplog_Map__c == undefined ? '' : item.Triplog_Map__c;
            container.timezone = item.TimeZone__c == undefined ? '' : item.TimeZone__c;
            container.waypoint = item.Way_Points__c == undefined ? undefined : item.Way_Points__c;
            container.EmailID = item.EmployeeReimbursement__r.Contact_Id__r.External_Email__c;
            container.TrackingStyle = item.Tracing_Style__c == undefined ? '' : item.Tracing_Style__c;
            container.approverejecticon = null; 
            container.approverejecticon1 = null; 
            container.approvecheckin = false;
            container.rejectcheckin = false;
            container.State = item.Trip_Destination_State__c;
            container.milegeLockDate = item.EmployeeReimbursement__r.Mileage_Lock_Date__c == undefined ? '' : item.EmployeeReimbursement__r.Mileage_Lock_Date__c
        
            return container;
        })

        return formatJSON
    }

    connectedCallback(){
        if(this.mileageList){
            let data = JSON.parse(this.mileageList);
            this.currentData = this.formatBinding(data);
        }
    }
}