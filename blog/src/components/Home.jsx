import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home({setPostData}) {
    const history = useNavigate();

    const [allPosts, setAllPosts] = useState();

    function buttonClicked(){
        history("post")
    }


    useEffect(()=>{
        populatePosts();
    },[])

    async function populatePosts(){
        const req = await fetch('http://localhost:1337/api/get-all-posts')
        const data = await req.json()
        // console.log(data.posts[0])
        console.log(data.posts[0])
        let tempData = data.posts.map(post=>(
            <div className="col-lg-3 col-sm-12 col-md-6 mt-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" />
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {post.description}
                        </Card.Text>
                        <div className="text-center">
                            <Button variant="primary" onClick={()=>{setPostData(post);buttonClicked()}}>Go to Post</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        ))
        console.log(tempData)
        setAllPosts(tempData)
        
    }

  return (
    <div className='m-5'>
        <h1 className='bg-primary text-center rounded text-white p-2'>All Posts</h1>
        <div className="container">
            <div className="row">
                {allPosts}
            </div>
        </div>
        
    </div>
  );
}

export default Home;