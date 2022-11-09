import { InterswitchPay } from "react-interswitch";

export default function Pay() {
  const props = {
    merchantCode: "MX6072",
    payItemID: "9405967",
    customerEmail: "johndoe@gmail.com",
    customerId: "Lucifer",
    redirectURL: "http://localhost:3000",
    text: 'Pay Now',
    mode: 'TEST',
    txn_ref: "sample_txn_ref_123",
    transactionReference: Date.now().toString(),
    amount: '10000',
    currency:"404",
    className:"btn btn-primary",
    callback: (response) => {
      console.log('response: ', response)
    }
  }
  

  

  return (
    <div className="container">
      <InterswitchPay {...props} />
    </div>
  );
}
