var howManyTimes = {
	setCookie: function(cookiename, dataarray)
	{
		//from http://www.w3schools.com/js/js_cookies.asp
		
		//set an expiration date to 10 years from today
		var exdate=new Date();
		exdate.setYear(exdate.getFullYear()+10);
	
		//set a cookie
		var cookievalue = dataarray + "; expires=" + exdate.toUTCString();
		document.cookie = cookiename + "=" + cookievalue;
	},
	getCookie: function(cookiename)
	{
		//from http://www.w3schools.com/js/js_cookies.asp
		
		var i;
		var x;
		var y;
		var ARRcookies = document.cookie.split(";");
		for (i=0;i<ARRcookies.length; i++)
		{
			x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y= ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x = x.replace(/^\s+|\s+$/g,"");
			if(x==cookiename)
			{
				return y;
			}
		}
	},
	checkCookie: function() {
		var todayDate = new Date();
		var todayDay = todayDate.getDay();
	
		//set the data to be blank 
		var a = [0,0,0,0,0,0,0];
	
		var arraystring = this.getCookie("frequency");
	
		// check if there's a cookie set already
		if (arraystring != null && arraystring != "")
		{
			//if there is, use that as the data
			a = arraystring.split("|");

		}
		else
		{

		}
	
		//add one to today's total
		a[todayDay] = parseInt(a[todayDay]) + 1;
	
		//set the cookie with the new data
		arraystring = a.join("|");
		this.setCookie("frequency",arraystring);
	
		//build the chart with the new data
		this.buildChart(a)
	},
	buildChart: function(dataarray)
	{
		for (var i = dataarray.length - 1; i >= 0; i--){
			dataarray[i] = parseInt(dataarray[i])
		};
	
		//put sunday at the end
		dataarray.push(dataarray.shift())
	
		var chart;
		//build a new highchart
		chart = new Highcharts.Chart({
			chart: {
			  renderTo: 'chart',
			  defaultSeriesType: 'column',

			},
			title: {
				text: null
			},
			subtitle: {
				enabled: false
			},
		  credits: {
			enabled: false
		  },
		
			xAxis: {
			lineColor: "#666666",
			tickColor: "#666666",
				categories: [
				'Monday',
				'Tuesday', 
				'Wednesday', 
				'Thursday', 
				'Friday', 
				'Saturday',
				'Sunday'],
			labels: {
				style: {
					color: "#333333",
					fontFamily: 'Helvetica, Arial,  sans-serif', 
					fontSize: '10px'
				}
			}
			},
			yAxis: {
				min: 0,
				title: {
				text: ''
				},
			opposite: true,
			allowDecimals: false,
			labels: {
				style: {
					color: "#333333",
					fontFamily: 'Helvetica, Arial,  sans-serif', 
					fontSize: '10px'
				}
			}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {
				var s
				if(this.y != 1)
				{
					s = " times"
				}
				else
				{
					s = " time"
				}
				return ''+
					this.x +': '+ this.y + s;
				}
			},
			plotOptions: {
				column: {
				pointPadding: 0.00,
				color: "#DD3333",
				borderColor: "#9955555",
				borderWidth: 1,
				
				shadow: false,
				borderWidth: 0
				}
			},
				series: [{
					data: dataarray
				}]
		});
	

	}

}

$(document).ready(function(){
	howManyTimes.checkCookie()
})

