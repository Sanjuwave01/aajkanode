import express from "express";
const router = express.Router();
import TronWeb from 'tronweb'
import verifyuser from "../utils/Verify";

router.get("/", async (req, res) => {
    try {
        const tronWeb = new TronWeb(
            'https://api.trongrid.io',
            'https://api.trongrid.io',
            'https://api.trongrid.io'
        );
        const newWallet = await tronWeb.createAccount();
        console.log(newWallet);
        res.status(200).json({
            message: "Success",
            newWallet
        })


    } catch (error) {
        console.log(error)
    }
});

router.post('/transfer', verifyuser, async (req, res) => {
    try {

   const HttpProvider = TronWeb.providers.HttpProvider;
      const fullNode = new HttpProvider("https://api.trongrid.io");
      // const fullNode = new HttpProvider("http://192.168.1.162:8090");
      const solidityNode = new HttpProvider("https://api.trongrid.io");
      const eventServer = new HttpProvider("https://api.trongrid.io");
      const privateKey = req.body.privateKey;
      const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


      const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

      const ACCOUNT = req.body.from;
      if(!tronWeb.isAddress(req.body.to)){
          return res.status(403).json({
              message: "Address not found",

          })
      } 
      const {
          abi
      } = await tronWeb.trx.getContract(CONTRACT);
      // console.log(JSON.stringify(abi));

      const contract = tronWeb.contract(abi.entrys, CONTRACT);

      const balance = await contract.methods.balanceOf(ACCOUNT).call();
      const exactbalance = balance.toString() / 1000000;
      console.log("balance:", exactbalance);
      if (exactbalance) {
          const resp = await contract.methods.transfer(req.body.to, req.body.amount).send();
          console.log("transfer:", resp);
      } else {
         return res.status(403).json({
              message: "Insufficent Balance",

          })
      }


  } catch (error) {
      console.log(error)
  }
})


export default router;
