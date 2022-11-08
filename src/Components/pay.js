import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { toast } from 'react-toastify';

export default function Pay() {
  const config = {
    public_key: 'FLWPUBK_TEST-041b59e378e8156458c446b3f25206fe-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'KES',
    payment_options: 'card,mobilemoney,ussd,mpesa',
    customer: {
      email: 'uwakblessing1@gmail.com',
       phone_number: '08095794273',
      name: 'Uwak Bboi',
    },
    customizations: {
      title: 'Deposit Amount',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


  return (
    <div className="App container">
     <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
               
               if(response.status == "successful"){
                return toast.success("Transaction Completed");
                closePaymentModal()
               }
                 // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}