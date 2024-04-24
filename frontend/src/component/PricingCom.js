import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useContext } from 'react';
import { APIcontext } from '../context/SignupContext';
import { toast } from 'react-toastify';
function PricingCom(){

    const{email} = useContext(APIcontext)
    const params = {
        email: email,
    };
    async function clickHandler(e){
        var headers = { 'Content-Type': 'application/json' };

        if (!email){

            toast.success("Please login OR signup ")
            return;
        }
       
        var response = await fetch('http://localhost:4000/api/payment',{
            method:"POST",
            headers: headers,
            body: JSON.stringify(params)
            
        })

        response = await response.json()
       

        console.log(response.id)
        var options = {
            "key": "rzp_test_8Hs6LQLKA7pkwk", 
            "amount": "5000", 
            "currency": "INR",
            "name": "Acme Corp", 
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id":response.id , 
            "handler": function (response){

                axios.post('http://localhost:4000/api/paymentvalidate',{
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_order_id:response.razorpay_order_id,
                    razorpay_signature:response.razorpay_signature,
                    email:email
                })
                .then((res)=>{
                    toast.success("Payment succesfull")
                    console.log(res)})
                .catch((e)=>{
                    toast.error("Payment unsuccesfull")
                    console.log(e)})
            },
            "prefill": {
                "name": "Abhay Tagad", 
                "email": email, 
                "contact": "9000090000" 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }

    return(
        <div className=' flex flex-col items-center gap-32 py-4'>
            <div className="flex flex-col items-center text-center gap-4 w-[33%]">
                <h1 className="font-bold text-6xl">Pricing</h1>
                <p>Whether you are just trying out our service or need more, we have got you covered. </p>
            </div>

            <div className='flex gap-8  flex-col md:flex-row '>

            <div className='flex flex-col gap-6 p-4 shadow-2xl shadow-black border-2 rounded-xl '>
                    <div className='flex flex-col gap-3 text-center'>
                        <h1 className='font-bold text-xl'>Free</h1>
                        <p>For small side projects</p>
                        <p className='font-bold text-2xl'><i className="fa-sharp fa-solid fa-indian-rupee-sign" />0</p>
                        <p>Per month</p>
                    </div>

                    <div className='flex justify-center  border-y-2 py-4'>
                        <p>10 PDFs/mon included {<i className="fa-regular fa-circle-question" />}</p>
                    </div>

                    <div className='border-b-2 py-6'>
                        <p>{<i className="fas fa-check text-green-400" />} 5 Pages per PDF {<i className="fa-regular fa-circle-question" />}</p>
                        <p>{<i className="fas fa-check text-green-400" />} 4 MB size limit {<i className="fa-regular fa-circle-question" />}</p>
                        <p>{<i className="fas fa-check text-green-400" />} Mobile-friendly interface </p>
                        <p className='opacity-30' >{<i className="fas fa-check text-green-400 " />} High quality performance {<i className="fa-regular fa-circle-question" />}</p>
                        <p className='opacity-30'>{<i className="fas fa-check text-green-400"/>} Priority support </p>
                    </div>

                    <div>
                        <button onClick={clickHandler} className='w-[100%] bg-blue-100 text-black py-2 rounded-lg'>Upgarde now {<i className="fas fa-arrow-right "/>}</button>
                    </div>
                </div>

                <div className='flex flex-col gap-6 shadow-2xl shadow-black p-4 border-blue-500 border-2 rounded-xl'>
                    <div className='flex flex-col gap-3 text-center'>
                        <h1 className='font-bold text-xl'>Pro</h1>
                        <p>For large project with higher need</p>
                        <p className='font-bold text-2xl'><i className="fa-sharp fa-solid fa-indian-rupee-sign" />50</p>
                        <p>Per month</p>
                    </div>

                    <div className='flex justify-center  border-y-2 py-4'>
                        <p>10 PDFs/mon included {<i className="fa-regular fa-circle-question" />}</p>
                    </div>

                    <div className='border-b-2 py-6'>
                        <p>{<i className="fas fa-check text-green-400" />} 25 Pages per PDF {<i className="fa-regular fa-circle-question" />}</p>
                        <p>{<i className="fas fa-check text-green-400" />} 16 MB size limit {<i className="fa-regular fa-circle-question" />}</p>
                        <p>{<i className="fas fa-check text-green-400" />} Mobile-friendly interface </p>
                        <p >{<i className="fas fa-check text-green-400" />} High quality performance {<i className="fa-regular fa-circle-question" />}</p>
                        <p >{<i className="fas fa-check text-green-400"/>} Priority support </p>
                    </div>

                    <div>
                        <button onClick={clickHandler} className='w-[100%] bg-blue-500 text-white py-2 rounded-lg'>Upgarde now {<i className="fas fa-arrow-right "/>}</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PricingCom;