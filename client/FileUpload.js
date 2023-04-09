import config from "./config.json " assert {type:"json"};
let account=null;
let admin_address=config.admin_address;
const fillaccount=async()=>{
    if(typeof window.ethereum !== 'undefined'){

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
        
    const ab=document.getElementById("account");
    let text=(account?"Account:  "+account:"Please login!");
    if(ab)
        ab.innerHTML=text;
}
};
document.getElementById('button_status').onclick=()=>{
    //check for the user or the admin
    console.log("insider");
    if(account==admin_address)
        window.location.href='status_admin.html';
    else 
        window.location.href='status.html';

}
fillaccount();