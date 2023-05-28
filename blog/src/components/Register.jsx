import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const navigate = useNavigate()

    async function register(e){
        e.preventDefault()
        const req = await fetch('http://localhost:1337/api/register',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({email, password, rePassword}),
        })
        // alert(req)
        if(req.status == 200){
            alert('successfully register')
            navigate('../sign-in')
        }
        else{
            alert('Duplicate Email')
        }
    }
  return (
    <div className='m-5 d-flex justify-content-center'>
        <Form className='shadow-lg p-5 rounded mt-5 ' onSubmit={register}>
            <h2 className='text-primary p-2'>Register</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control type="password" placeholder="Retype Password" required onChange={(e)=>setRePassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-3' disabled={password!=rePassword}>
            Register
        </Button>
        { password != rePassword && <p className='text-danger'>password does not match</p>}
        <p className='pt-3 pb-3'>Already Registered <span><Link to='../sign-in'>Sign in</Link></span></p>
        </Form>
    </div>
  );
}

export default Register;