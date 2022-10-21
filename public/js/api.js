var resp;
var chart=new Chart(document.querySelector('.my_bots'));

var options = {
	hour: 'numeric',
	minute: 'numeric'
};


		
async function GetData() {
	var host=(document.getElementById('host').value);
	var port=(document.getElementById('port').value);
	var token=(document.getElementById('token').value);
	var count=(document.getElementById('count').value);
	var date=[];
	var bots=[];
	var all_bots=[];
	document.querySelector('.wait').textContent = "Please wait for a response from the API...";
	var URL="/api/?"+"host="+host+"&port="+port+"&token="+token+"&count="+count;
	const response = await fetch(URL, {
		method: "GET",
		headers: { "Accept": "application/json" }
	});
	if (response.ok === true) {
		
		try {
			resp = await response.json();
			resp = resp.result;
			resp.sort(function(a, b){return a.id - b.id});
			for (x=0; x < resp.length ; x++) {
				var localDate=new Date(resp[x].dateTime);
				localDate.setMinutes(localDate.getMinutes() + 15);
				date[x]=localDate.toLocaleString("ru", options);
				bots[x]=resp[x].involvedInCount;
				all_bots[x]=resp[x].numberMiners;
			}
			document.querySelector('.wait').textContent = "";
			chart.destroy();
			PaintMyBots (date,bots);
		} catch (err) {
			document.querySelector('.wait').textContent = "API request failed";
		}
	}
	else document.write("Request error");
}
	
async function PaintMyBots(dt, threads) {
	chart=new Chart( 
	document.querySelector('.my_bots'), 
		{ 
		type: 'line', 
		data: { 
			labels: dt, 
			datasets: [ 
				{ 
				label: 'Number of your threads',
				data: threads, 
				borderColor: 'teal'
				}
			]
		},
			options: {} 
		}
	);
}
		
