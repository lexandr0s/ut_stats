const host='0.0.0.0';
const port=4000;

const express = require("express");
const api = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


api.use(express.static(`${__dirname}/public`));


async function reqAPI(apihost,apitoken,blocks) {
	
	var URL=apihost;
	var resp;

	xhr.open("POST", URL, false);
	xhr.setRequestHeader('Content-Type', 'application/json');
	try {
		xhr.timeout = 30000;
		xhr.send(JSON.stringify({
			method: "getMiningBlocks",
			params: {},
			filter: {
				sortBy: "",
				offset: "",
				limit: blocks
				}, 
            token: apitoken
		}));
		
		if (xhr.status != 200) {
			console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
			resp='error';
		} else {
			resp=xhr.responseText;
		}
		
	} catch(err) {
		console.log('Ошибка запроса к Utopia API',err);
		resp='error';
	}
	
	return resp;
}


api.get("/api", async function(req, res){
	var url=req.query.host+":"+req.query.port+"/api/1.0"
	var token=req.query.token;
	var count=req.query.count;
	const data=await reqAPI (url,token,count);
	res.send(data);
});


api.listen(port, host, function(){
    console.log(`Server ready to connect on http://${host}:${port}`);
});