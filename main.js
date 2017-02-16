/**
 * Created by loketa on 2/13/17.
 */
var app  = new Vue({
    el:'#app',
    data:{
        message123:'Hello123123!',
        tempUnit:'Celsius',
        temp:'',
        location:'',
        iconUrl:'',
        weather:''
    },
    created:function () {
        this.initData();
    },
    methods:{
        initData:function(){
            var that  = this;
            axios.get("http://ipinfo.io/json").then(function (response) {
                that.location=response.data.city + ',' + response.data.region + ',' + response.data.country;
                that.getWeatherData(that.location);
            });
        },
        getWeatherData:function (city) {
            var that = this;
            var apiKey= "99bfc12bbcebb1a9c9a91c59ebacba3a";
            var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
            var data;
            axios.get(queryUrl).then(function (response) {
                data=response.data;
                that.getTemp(data.main.temp);
                that.getWeather(data.weather[0].main);
                that.getIcon(data.weather[0].icon);
            });
        },
        getIcon:function (iconId) {
            this.iconUrl = "http://openweathermap.org/img/w/" + iconId +".png";
        },
        getTemp:function (temp) {
            this.temp=temp;
        },
        getWeather:function (weather) {
            this.weather=weather;
        },
        covertTempUnit:function () {
            if(this.tempUnit==="Celsius"){
                this.tempUnit="Fahrenheit";
            }
            else{
                this.tempUnit="Celsius";
            }
        }
    },
    computed:{
        unitTemperature:function () {
            if(this.temp===""){
                return "";
            }
            if(this.tempUnit==="Celsius"){
                return parseInt(this.temp-273.15)+"°";
            }
            else{
                return parseInt((this.temp-273.15)*9/5+32)+"°";
            }
        }  
    }
});
