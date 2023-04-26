
console.log(document.getElementById("menu"))

async function getContests() {
    let cardContainer = document.getElementById("contestContainer")
    try {
      await  axios.get('http://localhost:3030/getContests').then((response)=>{
      //await  axios.get('https://giveaway.thecryptolaunchpad.com/getContests').then((response)=>{
            console.log(response.data)
           // data.forEach(resultArray => {});
             let el  ='' ;
            let  timerEl = []
           response.data.forEach((item, index)=>{
                el = el  + getCard(
                    item.contestName,
                    item.imageUrl,
                    item.numberOfWinners, 
                    item.prizeWorth,
                    item.announcementDate,
                    item.contestants_addresses,
                    index,
                    item.winners,
                    item.tasks
                    
                    );
                    timerEl.push({time:item.announcementDate ,id:`contest_${index}`})
                   
           })
          //console.log(timerEl)

            cardContainer.innerHTML = el
            timerEl.forEach((item)=>{
                if(item.time > (Math.round(Date.now() / 1000))){
                timerListener(item.time, item.id)
                
                }else{
                    $("#winner_"+item.id).html('Result');
                    $("#"+item.id).text('Campaign Finished');
                    $("#"+item.id).css('color', 'red');
                }
              

            })

           
        });
      
      
    
    } catch (error) {
        console.log(error);
    }
}
getContests() ;

function updateModalList(addresses , elId){
     let adds = (addresses.split(","))
    
    let el = document.getElementById(elId) ;
    console.log(adds)
    let trs = '' ;
     if(el){
          adds.forEach((item , index)=>{
             trs = trs + 	`<tr>
							<th scope="row">${index +1 }</th>
							<td>${item}</td>
						</tr>`
          }) ;
     let tableContent = `
     <thead>
		<tr>
			<th >#</th>
			<th>Address</th>
	   </tr>
	</thead>
	<tbody>${trs}</tbody>
                     `
    if(adds[0] == '' && elId =="result_model")
       tableContent = `<div style ="display: flex;justify-content: center;"><strong>Winners not announced yet</strong><div>` ;
      
      el.innerHTML  = tableContent 
     }
}



function updateModalListTasks(tasks , elId){
    let adds = (tasks.split(","))
   console.log(adds)
    let el = document.getElementById(elId) ;
    console.log(adds)
    let trs = '' ;
    if(el){
         adds.forEach((item , index)=>{
            trs = trs + 	`<tr>
                           <th scope="row">${index +1 }</th>
                           <td>
                           <div class="form-check form-switch">
							<form class=" bg-white px-4" action="">
								<div class="form-check mb-2">
								  <input onChange="selectTask()" class="form-check-input" type="checkbox" name="task" id="radio${index +1 }" />
								  <label class="form-check-label" for="task">
                                  ${item }
								  </label>
								</div>
							</form>
						</div>

                         </td>
                       </tr>`
         }) ;
    let tableContent = `
    <thead>
       <tr>
           <th >#</th>
           <th>Tasks</th>
      </tr>
   </thead>
   <tbody>${trs}</tbody>

                    `
   if(adds[0] == '' && elId =="result_model")
      tableContent = `<div style ="display: flex;justify-content: center;"><strong>Winners not announced yet</strong><div>` ;
     
     el.innerHTML  = tableContent 
    }
}

const getCard = ( name,imageUrl,
                  noOfWinners,
                  prizeWorth, 
                  time ,
                 paricipants, 
                 index ,
                 winners,
                 tasks
                 ) => {
     //timerListener(time, `contest_${index}`)
     return `
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                       
                        <h3 class="text-center alert alert-info mb-0">${name}</h3>
                        <div class="banner-img">
                            <img src="${imageUrl}" alt="Image 1">
                        </div>

                        <div class="dates">
                          <div class="ends">
                              <strong>ENDS ON</strong> ${(new Date(time*1000)).toDateString()}
                          </div>
                          <hr>
                          <div class="ends">
                            <strong>RESULT IN</strong>
                            <div id = ${`contest_${index}`} ></div>
                        
                        </div>
                      </div>
                        <div class="stats">

                            <div>
                                <strong>Prize Worth</strong> ${prizeWorth}
                            </div>

                            <div>
                                <strong>participant</strong> ${paricipants.length}
                            </div>

                            <div>
                                <strong>Winners</strong> ${noOfWinners}
                            </div>

                        </div>

                        <div class="footerair">
                        <a id = ${`tasks_contest_${index}`}  type="button" class="Cbtn Cbtn-participate" data-toggle="modal" data-target="#modalParticipate"
                        onclick = "updateModalListTasks('${(tasks)}' ,'task_model')">Participate Now</a>
                          <a type="button" class="Cbtn Cbtn-primary" data-toggle="modal" data-target="#modalParticipants" 
                          onclick = "updateModalList('${(paricipants)}' ,'participants_address')">participants</a>
                          <a id = ${`winner_contest_${index}`} type="button" class="Cbtn Cbtn-danger" data-toggle="modal" data-target="#modalResult"
                           onclick = "updateModalList('${(winners)}' ,'result_model')">Result</a>

                        </div>
                    </div>
                </div> 
            </div>
     `

}

 function timerListener(time, id){
    setInterval(()=>{
        console.log(id)
     document.getElementById(id).innerHTML =    timer(time)
    }, 1000);

 }

function timer(countDownDate) {
var now = new Date().getTime();
var timeleft = countDownDate*1000 - now;
    
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
console.log(days,hours, minutes , seconds)
 return `
   
             ${days}:${hours}:${minutes}:${seconds}
	  
 `
}



function selectTask(contestIndex) {
    const radioButtons = document.querySelectorAll('input[name="task"]');
        var is_checked = false;
        for (const radioButton of radioButtons) {
                is_checked = radioButton.checked;
                if(!is_checked) break;
            }
console.log("is_checked"+is_checked)
if(!is_checked){
    document.getElementById('address_wrapper').innerHTML = "";   
}else{
    var dummy = '<span><strong>Input your Wallet Address:</strong> <input placeholder="0x50aF1b6...............f6e5eDB3ae67" type="text" class="form-control"></span>\r\n  <input  style="margin-top:5px;float:right" class="btn btn-success" type="button" value="Submit" onClick="selectTask()">';
    document.getElementById('address_wrapper').innerHTML += dummy;    
}
}
