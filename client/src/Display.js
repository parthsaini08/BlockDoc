import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json" assert {type:"json"};

let account=null;

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

  try{

  const otheradress=document.getElementById('cid').value;
  console.log(otheradress);
  let datarray;
  if(otheradress)
  {
    datarray= await contract.display(otheradress);
    console.log(datarray);
  }else{
    datarray=await contract.display(account);
  }
  const isempty=Object.keys(datarray).length==0;
  if(!isempty)
  {
    const str=datarray.toString();
    const str_array=str.split(",");
    console.log(str);
    console.log(str_array);
    let im=document.getElementById("imagearray");
    im.innerHTML='';
    const images=str_array.map((item,i)=>{
        
        
        let text='<td color="white"><a href="https://'+item+'" target="_blank">https://'+item+'</a></td>';
        im.innerHTML+=text;
    })
  }
  else{
    alert("No image to display");
  }
    }
    catch(e)
    {
        alert("You don't have access to this account's data.");
    }
};