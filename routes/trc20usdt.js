import express from "express";
const router = express.Router();
import TronWeb from 'tronweb'

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


router.post('/transfer', async (req, res) => {
    const HttpProvider = TronWeb.providers.HttpProvider;
    try {
        const fullNode = new HttpProvider("https://api.trongrid.io");

        const solidityNode = new HttpProvider("https://api.trongrid.io");
        const eventServer = new HttpProvider("https://api.trongrid.io");
        const privateKey = req.body.privateKey;
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
        const account = tronWeb.address.fromPrivateKey(req.body.privateKey);

        const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        const ACCOUNT = account;
        
        const {
            abi
        } = await tronWeb.trx.getContract(CONTRACT);
        // console.log(JSON.stringify(abi));

        const contract = tronWeb.contract(abi.entrys, CONTRACT);

        const balance = await contract.methods.balanceOf(ACCOUNT).call();
        const exactbalance = balance.toString() / 1000000;
        console.log("balance:", exactbalance);
        if (exactbalance) {
            await contract.transferFrom(
                ACCOUNT, //address _from
                req.body.to, //address _to
                req.body.amount - 0.5 //amount
            ).send({
                feeLimit: 100000
            }).then(output => {

                console.log('- Output:', output, '\n');

                return res.status(200).json({
                    output

                })

            });




        } else {
            return res.status(403).json({
                message: "Insufficent Balance",

            })
        }
    } catch (error) {
        return res.status(403).json({
            error

        })
    }
})


export default router;
