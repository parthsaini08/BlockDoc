import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'
import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json " assert {type:"json"};

let account=null;
function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM0MzZBMjQ0YzMzQjc1RkZDRTJDMWI4ZTc3QTIzNUUxNmYyMWQ5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA3NjQ4NjA4MjIsIm5hbWUiOiJkYXRhcG9pbnQifQ.dxSo1vtfUCeJZeC0HTYHcJW2_j2Uxnmkpc-dR4JAipU'
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getFiles() {
  const fileInput = document.querySelector('input[type="file"]')
  return fileInput.files
}

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
  let contractaddress=config.contractaddress;

  const contract=new ethers.Contract(
      contractaddress,Upload.abi,signer
  );

  const files = getFiles()
  console.log("reached")
  const client = makeStorageClient()
  const cid = await client.put(files)
  const imghash=cid+'.ipfs.w3s.link';
  console.log(imghash);
//             // const signer=contract.connect(provider.getSigner());
  contract.add(account,imghash);
  alert("Successfully uploaded");
  console.log('stored files with cid:', cid)
  return cid
};


