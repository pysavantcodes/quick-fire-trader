const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const payload = {
    phone_number: '25454709929220',
    amount: 1500,
    currency: 'KES',
    email: 'i@need.money',
    tx_ref: this.generateTransactionReference(),
}
flw.MobileMoney.mpesa(payload)
    .then(console.log)
    .catch(console.log);