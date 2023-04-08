import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json " assert {type:"json"};
let account=null;
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
  
      const addresslist=await contract.shareAccess();
      const options=addresslist;
      let sel=document.getElementById("sharepeople");
      for(let i=0;i<options.length;i++)
      {
          let opt=options[i][0];
          let t='<br>'+opt;
          sel.innerHTML+=t;
      }
})


document.getElementById("submit").onclick = async function storeFiles() {
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

  const addressuser=document.getElementById("address").value;
    await contract.sendrequest(addressuser);
    console.log('shared');
  
};