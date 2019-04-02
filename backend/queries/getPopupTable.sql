select GetSwift_Job_Id,Current_Stage,Total_Price,Driver_ID,Total_Job_Time,HOUR(STR_TO_DATE(created_local, '%Y-%m-%d %H')) as 'Order Hour',LEFT(Created_Local, 10) as 'Order Date' from cloudhiti.getswift_api_deliveries_latest where STR_TO_DATE(created_local, '%Y-%m-%d') between '%s' and '%s' and HOUR(STR_TO_DATE(created_local, '%Y-%m-%d %H')) - 12='%s';