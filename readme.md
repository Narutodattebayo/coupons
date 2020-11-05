Requirements- node(v12 and above),mongo(v4 and above)

1.Run npm install
2.npm run local(for running locally on port 2222)
2.Create coupon 
   endpoint- POST REQUEST http://localhost:2222/admin/coupon
   PARAMETERS-{

"code":"couP1",
"startDate":"2020-11-10T12:04:30.155Z",
"endDate":"2020-11-13T12:04:30.155Z",
"minAmountForApplicability":50,
"type":"PERCENTAGE",
"discountOffered":10,
"maxDiscountLimit":20,  //for percentage type of coupon only  
}

3.Coupon list-  GET REQUEST http://localhost:2222/admin/coupon?page=1&limit=1

4.Apply coupon- GET http://localhost:2222/admin/applyCoupon?cartAmount={amount}&couponCode=${CODE}
