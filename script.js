
$('input').css('textTransform', 'capitalize');


$(document).ready(function(){
   $(document).on('keypress',function(e) {
      if(e.which == 13) {
         $("#form-submit").submit(function(event){
            performSearch(event);
         });
      }
   });
})


$(document).ready(function(){
   var day=new Date().getDate();
   var month=new Date().getMonth();
   var year=new Date().getFullYear();
   var hour=new Date().getHours();
   var minute=new Date().getMinutes();
   var second=new Date().getSeconds();
   month=month+1
   var dates=day+"."+month+"."+year+" "+ hour+":"+minute;
   $("#DateNow").html(dates);
})

//Bu kısım Değiştirildi Şamil ile olan Mesajlarda Default olan hali bulunmakta.

function performSearch(event){
   var request;
   event.preventDefault();

   request = $.ajax({
      url:"https://api.openweathermap.org/data/2.5/weather",
      type:"GET",
      data:{
         q:$("#city").val(),
         appid:"f7dccee04bc28824ca233f8499fa29e2",
         units:"metric"
      }
   });
   request.done(function(response){
      formatSearch(response);
   })

}

function formatSearch(jsonObject){
   $("#DateNow").hide();
   $("#bodytwo").css("padding-bottom","2%")

   var city_name=jsonObject.name;
   var city_weather=jsonObject.weather[0].description;
   var city_temp=jsonObject.main.temp;
   var city_tempmin=jsonObject.main.temp_min;
   var city_tempmax=jsonObject.main.temp_max;
   var city_wind=jsonObject.wind.speed;
   var city_winddeg=jsonObject.wind.deg;
   var city_feels=jsonObject.main.feels_like;
   var city_pressure=jsonObject.main.pressure;
   var city_humidity=jsonObject.main.humidity;
   var city_icon=jsonObject.weather[0].icon;
   var city_timezone=jsonObject.timezone;
   var city_date=jsonObject.dt;
   //var city_sunrise=jsonObject.sys.sunrise;

   var date=new Date();
   var timestr=date.toLocaleDateString();
   $("#city-icon img").attr("src",'http://openweathermap.org/img/wn/'+city_icon+'@4x.png')
   $(".alltimes").show();
   $("#city-timezone").text(timestr);
   $("#city-pressure").text(city_pressure +" Pres hPa");
   $("#city-humidity").text(city_humidity +"% Hum RHhr");
   $("#city-wind").text(city_wind + " Km/H");
   $("#city-winddeg").text(city_winddeg+" WindDeg");
   $("#city-weather").text(city_weather);
   $("#city-temp").text(city_temp+" Temp °C");
   $("#city-tempmin").text(city_tempmin+" Min °C");
   $("#city-tempmax").text(city_tempmax+" Max °C");
   $("#city-feels").text(city_feels +" Feel °C");


   $('#body').css('background-image', 'url(https://source.unsplash.com/1600x1000/?' + city_name + ')');

   $(document).ready(function(){
      if(city_weather=="Clouds"){
         $("i").hide();
         $("#bulut").show();
      }if(city_weather=="Snow"){
         $("i").hide();
         $("#kar").show();
      }if(city_weather=="Rain"){
         $("i").hide();
         $("#yagmur").show();
      }if(city_weather=="Clear"){
         $("i").hide();
         $("#clear").show();
      }if(city_weather=="Mist"){
         $("i").hide();
         $("#smog").show();
      }
   })

   $(".alltimes2").show();


   $("#baslik a").text(city_name);
   $(document).ready(function(){
      $("#baslik").click(function(){
         $("#baslik a").attr("href",'https://tr.wikipedia.org/wiki/' + city_name +'')
      })
   })

   $("#locationclick").show();
   $(document).ready(function(){
      $("#locationclick").click(function(){
         $("#locationclick").attr("href",'https://www.google.com/maps/place/ '+ city_name +'')
      })
   })

   $("input").hide();
   $("#buton2").show();
   $("#searchicon").hide();
   $("#buton2").click(function(){
      location.reload();
   })


}


