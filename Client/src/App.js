import React,{useState,useEffect} from 'react'
import Products from './components/Products'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = "http://localhost:8000"
const App = () => {
  const [product,setProduct] = useState([])
  const [payment,setPayment] = useState(false);
  const[orderId,setOrderId] = useState('')
  const [paymentId,setPAymentId] = useState('')
  const [signature,setSignature] = useState("")
  useEffect(()=>{
    getProducts();
  },[])

  const getProducts = async () =>{
    const res = await axios.get(`${baseUrl}/products`)
    console.log(res)
    if(res.status == 200){
      setProduct(res.data)
    }
  }
const payNow = async(prodId)=>{
  const res = await axios.get(`${baseUrl}/order/${prodId}`)
  console.log(res)
  alert(prodId);
  if(res.status !==200 ){
    return;
  }

  var options = {
    "key": "rzp_test_KdmPif9u69gA6O", // Enter the Key ID generated from the Dashboard
    "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": res.data.currency,
    "name": "Script",
    "description": res.data.notes.desc,
    "image": "https://example.com/your_logo",
    "order_id":res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)

        setOrderId(response.razorpay_order_id)
        setPAymentId(response.razorpay_payment_id)
        setSignature(response.razorpay_signature)
        setPayment(true)
    },
    "prefill": {
        "name": "sobha",
        "email": "sobha@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.open();
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});

}
 
  return (
    <div className="col-md-12 col-sm-6 text-center">
      <h1 className="text-center m-3 text-primary">
        Welcome to Car Store Room</h1>
  
    <div>
      <h3>Payment Details here!</h3>
      <div className="border">
      {payment && (
        <div>
         <p><b>payment Id:</b>{paymentId}</p>
         <p><b>Order Id:</b> {orderId}</p>
         <p><b>Signature Id:</b> {signature} </p>
          </div>
      )}
      </div>
    </div>
    <Products product={product} payNow={payNow} />
    </div>

  )
}

export default App
