import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json " assert {type:"json"};
let account=null;
let contra,statusglobal,addglobal,admin_address=config.admin_address;

window.addEventListener('load',async function(){
    window.ethereum.on("chainChanged",()=>{
        window.location.reload();
    })
    window.ethereum.on("accountsChanged",()=>{
        window.location.reload();
    })
  
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer=provider.getSigner();
    const address=await signer.getAddress();
    //set account
    account=address;
    console.log(address);
    let contractaddress=config.contractaddress;
  
    const contract=new ethers.Contract(
        contractaddress,Upload.abi,signer
    );
      contra=contract;
    
    if(account!=admin_address)
        window.location.href='status.html';
})





document.getElementById("submit").onclick = async function fetchvalues() {
    const addressuser=document.getElementById("address").value;
    addglobal=addressuser;
   let statuslist= await contra.checkstatusadmin(addressuser);
   statusglobal=statuslist;
    console.log(statuslist);
    var table = document.getElementById('tables');
    table.innerHTML='';
    let check=false;
      for(let i=0;i<statuslist.length;i++)
      {
          console.log(statuslist[i].user);
          console.log(statuslist[i].index);
          console.log(statuslist[i].url);
          console.log(statuslist[i].status);
      
            // create a table element
       let state="Disapproved";
       if(statuslist[i].status==0)
            state="Pending";
        else if(statuslist[i].status==1)
        state="Approved";
        
        if(state=="Pending")
        {
            check=true;
        let text='<tr id="'+statuslist[i].index+'"><td>'+'<a href="https://'+statuslist[i].url+'" target="_blank">'+statuslist[i].url+'</a></td><td><button id="update_approve_'+statuslist[i].index+'">Approve</button></td><td><button id="update_disapprove_'+statuslist[i].index+'">Disapprove</button></td></tr>';
        table.innerHTML+=text;
        }
        
      }

      if(check==false)
            alert("No Pending applications");
      // Get all buttons that start with "update"
  // Get all buttons that start with "update"
  const buttons = document.querySelectorAll("button[id^='update_approve_']");
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    
        button.addEventListener("click", async function() {
          // Extract the text after "update-"
          const id = button.id.substring(15);
        //   console.log(`Button ${text} was clicked!`);
          await contra.approverequest(addglobal,id);
          console.log("done");
          var rowToRemove = document.getElementById(id);
        rowToRemove.parentNode.deleteRow(rowToRemove.rowIndex);
        });
  }
  // For the disapprove button
  const buttonsd = document.querySelectorAll("button[id^='update_disapprove_']");
  
  for (let i = 0; i < buttonsd.length; i++) {
    const button = buttonsd[i];
    
        button.addEventListener("click", async function() {
          // Extract the text after "update-"
          const id = button.id.substring(18);
        //   console.log(`Button ${text} was clicked!`);
          await contra.disapproverequest(addglobal,id);
          console.log("done");
          var rowToRemove = document.getElementById(id);
            rowToRemove.parentNode.deleteRow(rowToRemove.rowIndex);
        });
  }
};
  

