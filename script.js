
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
   var city_name=jsonObject.name;
   var city_weather=jsonObject.weather[0].main;
   var city_temp=jsonObject.main.temp;
   var city_tempmin=jsonObject.main.temp_min;
   var city_tempmax=jsonObject.main.temp_max;
   var city_wind=jsonObject.wind.speed;
   var city_winddeg=jsonObject.wind.deg;
   var city_feels=jsonObject.main.feels_like;
   var city_pressure=jsonObject.main.pressure;
   var city_humidity=jsonObject.main.humidity;
   var city_timezone=jsonObject.dt;
   //var city_sunrise=jsonObject.sys.sunrise;

   var date=new Date(city_timezone*1000);
   var timestr=date.toLocaleDateString();
   //var city_icon=jsonObject.weather[0].icon;
   //var celciusmaxsm=$("#celciusmax").val();
   //$(".icon").show();
   //$(".icon").attr("src",'http://openweathermap.org/img/wn/' + city_icon + '@2x.png')
   //$("#times").show();
   //$(".alltimes").show();
   //$("#city-timezonefirst").text(date);
   $(".alltimes").show();
   $("#city-timezone").text(timestr);
   $("#pressicon img").show();
   $("#humidityicon img").show();
   $("#city-pressure").text(city_pressure +" Pres");
   $("#city-humidity").text(city_humidity +"% Hum");
   $("#celcius").show();
   $("#feelcelcius").show();
   $("#celciusmin").show();
   $("#celciusmax").show();
   $("#windsembol").show();
   $("#winddegsembol").show();
   $("#city-wind").text(city_wind + " Km/H");
   $("#city-winddeg").text(city_winddeg+" Degree");
   $("#city-weather").text(city_weather);
   $("#city-temp").text(city_temp);
   $("#city-tempmin").text(city_tempmin+" Min");
   $("#city-tempmax").text(city_tempmax+" Max");
   $("#city-feels").text(city_feels +" Feel");
   //$("#baslik").html(city_name);

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

   $("#baslik a").text(city_name);
   $(document).ready(function(){
      $("#baslik").click(function(){
         $("#baslik a").attr("href",'https://tr.wikipedia.org/wiki/' + city_name +'')
      })
   })

   $("#location").show();
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


