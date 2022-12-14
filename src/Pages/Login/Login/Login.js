import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Login.css';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true });
    }
    let errorElement;
    if (error) {
        errorElement = <p className="text-danger">Error: {error?.message}</p>
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log(email, password);
        signInWithEmailAndPassword(email, password)
    }

    const navigateRegister = () => {
        navigate('/register')
    }

    const resetPassword = async () =>{
        const email = emailRef.current.value;
        if(email){
            await sendPasswordResetEmail(email);
          toast('Sent email');
        }
        else{
            toast('Please Enter Your Email Address')
        }
        
    }


    return (
        <div className="width mx-auto border border-info rounded-3 p-5">
            <h1 className="text-info text-center">Please Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>

                <Button className="w-100 bg-info text-white" type="submit">
                    Login
                </Button>
            </Form>
             {errorElement}
            <p className="mt-2">New to Bikes labs? <Link to='/register' className="text-info pe-auto text-decoration-none " onClick={navigateRegister}>Please Register</Link></p>
            <p className="mt-2">Forget Password? <button className="text-info pe-auto text-decoration-none btn btn-link" onClick={resetPassword}>Reset Password</button></p>
            <SocialLogin></SocialLogin>
            <ToastContainer/>
        </div>

    );
};

export default Login;