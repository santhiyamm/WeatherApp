function weather() {

  var location = document.getElementById("location");
  var apiKey = '9ff9e15023867afda6a5c759f3c91d90'; // PLEASE SIGN UP FOR YOUR OWN API KEY
  var url = 'http://api.openweathermap.org/data/2.5/forecast';

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    location.innerHTML = 'Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '°';

     $.getJSON(url + "?lat=" + latitude + "&lon=" + longitude +"&appid=" + apiKey, function(result) {
       console.log(result);
       let list=result.list;
       let tempMax=0;
       let count=1;
       let timing=0;
       let days=2;

       list.forEach((element,index)=>{
          tempMax = Number(element.main.temp_max-273.15).toFixed(3);
          var newDate= new Date(element.dt_txt);
          var today=new Date();
          var txtToday= today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
          var txtDate=newDate.getFullYear()+"/"+(newDate.getMonth()+1)+"/"+newDate.getDate();

          console.log(txtToday);
         if(txtDate==txtToday){
           $('#temp').text(tempMax);
           $('#city').text(result.city.name);
         }
         else if(txtDate > txtToday) {
           today.setDate(today.getDate() +count);
           if(txtDate== (today.getFullYear()+"/"+(today.getMonth()+1)+"/"+(today.getDate()))){
             timing++;
             getFutureTemp(txtDate,tempMax,1,timing);
           }
           if(txtDate== (today.getFullYear()+"/"+(today.getMonth()+1)+"/"+(today.getDate()+1))){
             if(timing==8)
              timing=0;

             timing++;
             getFutureTemp(txtDate,tempMax,2,timing);
           }
           if(txtDate== (today.getFullYear()+"/"+(today.getMonth()+1)+"/"+(today.getDate()+2))){
             if(timing==8)
              timing=0;

              timing++;
             getFutureTemp(txtDate,tempMax,3,timing);
           }
           if(txtDate== (today.getFullYear()+"/"+(today.getMonth()+1)+"/"+(today.getDate()+3))){
             if(timing==8)
              timing=0;

             timing++;
             getFutureTemp(txtDate,tempMax,4,timing);
           }
           if(txtDate== (today.getFullYear()+"/"+(today.getMonth()+1)+"/"+(today.getDate()+4))){
             if(timing==8)
              timing=0;

             timing++;
             getFutureTemp(txtDate,tempMax,5,timing);
           }
         }
       });


      $('#city').html(result.city.name);
    });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }

  location.innerHTML = "Locating...";
}

function getFutureTemp(txtDate,tempMax,days,timing){
  var today=new Date();
  today.setDate(today.getDate() +days);
  var txtTodayNew= today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
  console.log(txtTodayNew);
  if(txtDate==txtTodayNew){
    $('#Day'+days+'Temp'+timing).html(tempMax);
    $('#Day'+days).html(txtTodayNew);
  }
}

weather();
