//this is the api
import Upload from "./artifacts/contracts/Upload.sol/Upload.json" assert { type: "json" };
import config from "./config.json " assert {type:"json"};

let account=null;
const loadprovider=async()=>{
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
        let contractaddress=config.contractaddress;

        const contract=new ethers.Contract(
            contractaddress,Upload.abi,signer
        );
        //setcontract
        console.log(contract)
        //setprovider logic
        console.log(provider)
    }
    else{
        console.error("Metamask in not installed");
    }
    const ab=document.getElementById("account");
    if(ab)
        ab.innerHTML="Account ";
};
loadprovider();