import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json " assert {type:"json"};
let account=null,admin_address=config.admin_address;
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
  
      const statuslist=await contract.showstatus();
      console.log(statuslist);
      var table = document.getElementById('tables');
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

        let text='<tr><td>'+(Number(statuslist[i].index)+1)+'</td><td><a href="https://'+statuslist[i].url+'" target="_blank">'+statuslist[i].url+'</a></td><td>'+state+'</td></tr>';
        table.innerHTML+=text;
      }

      if(account==admin_address)
    window.location.href='status_admin.html';
})