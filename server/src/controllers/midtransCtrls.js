const midtransClient = require('midtrans-client');
const { v4 } = require("uuid");

const createMidtrans = (req, res, next) => {
    try {
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_ID
        });

        let parameter = {
            "transaction_details": {
                "order_id": v4(),
                "gross_amount": req.body.cost
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

        snap.createTransaction(parameter)
            .then((transaction) => {
                let transactionToken = transaction.token;
                // console.log('transactionToken:', transactionToken);
                res.json(transactionToken)
            })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMidtrans
}