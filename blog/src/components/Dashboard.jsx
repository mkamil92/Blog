import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from 'react';

import { Collapse, Form } from 'react-bootstrap';

export default function Dashboard(){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAddPost, setShowAddPost] = useState(false);
    const handleAddPostClose = () => setShowAddPost(false);
    const handleAddPostShow = () => setShowAddPost(true);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const email = localStorage.getItem('email');

    const [allPosts, setAllPosts] = useState();

    const[activePostData, setActivePostData] = useState();

    const [editBtn, setEditBtn] = useState(false);

    const [editTitle, setEditTitle] = useState();
    const [editDescription, setEditDescription] = useState();


    useEffect(()=>{
        populatePosts();
    },[])

    async function submit(e){
        e.preventDefault()
        const req = await fetch('http://localhost:1337/api/post',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({title, description, email})
        })
        populatePosts();

    }

    async function populatePosts(){
        const req = await fetch('http://localhost:1337/api/get-posts',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({email})
        })
        const data = await req.json()
        // console.log(data.posts[0])
        let tempData = data.posts.map(post=>(
            <div className="col-lg-3 col-sm-12 col-md-6 mt-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" />
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {post.description}
                        </Card.Text>
                        <Button variant="primary" className='m-1' onClick={()=>{handleShow(); setActivePostData(post);}}>View</Button>
                        <Button variant="secondary" className='m-1' onClick={()=>{handleShow(); setActivePostData(post);}}>Edit</Button>
                        <Button variant="danger" className='m-1' onClick={(e)=>{deletePost(e,post);}}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        ))
        console.log(tempData)
        setAllPosts(tempData)
    }

    async function submitEditedPost(e){
        e.preventDefault();
        const activeTitle = activePostData && activePostData.title;
        const activeDescription = activePostData && activePostData.description;
        const req = await fetch('http://localhost:1337/api/edit',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({activeTitle, activeDescription, editTitle, editDescription, email})
        })
        handleAddPostClose()
        populatePosts();

    }

    async function deletePost(e,post){
        e.preventDefault();
        const activeTitle = post.title;
        const activeDescription = post.description;
        const req = await fetch('http://localhost:1337/api/delete',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({activeTitle, activeDescription})
        })
        populatePosts();
    }

    return(
        <div className='m-5'>
            <h1 className='bg-primary text-center rounded text-white p-2'>Your Posts</h1>
            <button className='bg-danger text-center rounded border border-none text-white p-2 w-100' onClick={handleAddPostShow}>Add Post +</button>
            <div className="container">
                <div className="row">
                    {allPosts && allPosts}
                </div>
            </div>

        {/* Modal for viewing and eding post data */}
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title>Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='bg-white text-dark p-3 mb-3 rounded shadow-lg'>
                    {activePostData &&
                        <div>
                            <h3>Title: {activePostData.title}</h3>
                            <p className='fs-5'>Description: {activePostData.description}</p>
                        </div>
                    }
                </div>
                <Button
                    onClick={() => setEditBtn(!editBtn)}
                    aria-controls="example-collapse-text"
                    aria-expanded={editBtn}
                    className='bg-primary ps-3 pe-3'
                >
                    Edit Post
                </Button>
                <Collapse in={editBtn}>
                    <div id="example-collapse-text">
                        <Form onSubmit={(e)=>{submitEditedPost(e); handleAddPostClose()}}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fs-4'>Title</Form.Label>
                                <Form.Control type="text" defaultValue={activePostData && activePostData.title} required onChange={e=>setEditTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fs-4'>Your Post</Form.Label>
                                <Form.Control as="textarea" rows={8} required defaultValue={activePostData && activePostData.description} onChange={e=>setEditDescription(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </div>
                </Collapse>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={(e)=>{submitEditedPost(e);handleClose()} }>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showAddPost} onHide={handleAddPostClose} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title>Post</Modal.Title>
            </Modal.Header>
                <Form onSubmit={(e)=>{submit(e); handleAddPostClose()}}>
                
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" required onChange={e=>setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Your Post</Form.Label>
                            <Form.Control as="textarea" rows={8} required onChange={e=>setDescription(e.target.value)} />
                        </Form.Group>
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleAddPostClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Form>
        </Modal>
    </div>
    )
}