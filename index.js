const http=require("http");
const fs=require("fs");
const requests=require("requests");

const mainfile=fs.readFileSync("index.html","utf-8");

// api.openweathermap.org/data/2.5/weather?q=Jhansi&appid=06904afccd52e504b58e14ff098800b5
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Jhansi&appid=06904afccd52e504b58e14ff098800b5")
        .on("data",function(chunk){
            const object=JSON.parse(chunk);
            const arrData=[object];
            console.log((arrData[0].main.temp - 273.15).toFixed(1) + "° C")


            myweatherstate='<i class="fa fa-cloud" style="font-size:100px;color:grey;"></i>';

            let realtime=mainfile.replace(
                 "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "° C")).replace("{%city%",arrData[0].name)
                 .replace("{%weathericon%}",myweatherstate)

            res.write(realtime,"utf-8")
            res.end()
        })
        .on("end",function(err){
            // if(err) throw err;
            console.log("ended successfully");
        })
    }
})


server.listen(3000,()=>{
    console.log("server running at port 3000");
})
