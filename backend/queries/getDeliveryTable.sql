select date(CONVERT_TZ(c.created_at, '+00:00','-7:00')  ) order_date, HOUR(CONVERT_TZ(c.created_at, '+00:00','-7:00') ) order_hour, b.field_6 driver_id ,CONVERT_TZ(a.field_17, '+00:00','-7:00')    pickup_time, CONVERT_TZ(a.field_18, '+00:00','-7:00')    dropoff_time,b.field_11 estimated_distance  ,c.id as OrderID   from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_2 join firepieorders c on a.field_12 = c.id where b.field_5 <> 'Cancelled' and date(CONVERT_TZ(c.created_at, '+00:00','-7:00') ) = '%s' and HOUR(CONVERT_TZ(c.created_at, '+00:00','-7:00') )= '%s' group by 5;