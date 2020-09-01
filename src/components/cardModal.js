import React, {useState, useEffect} from 'react';
import { withRouter, useHistory, useParams, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import PostCard from "../components/postCard";
import Modal from '@material-ui/core/Modal';
import useImperativeQuery from "../utils/imperativeQuery"
import {GET_POST_BY_ID } from "../gql/queryData.js";
import {gql, useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import { printIntrospectionSchema } from 'graphql';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



const CardModal = (props) => {
    const history = useHistory();
    const postId = props.match.params.postId
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(true);
    const getPostById = useImperativeQuery(GET_POST_BY_ID);
    
    const fetchPostbyId = async () => {
        const {data} = await getPostById({
            postId: postId
        })
        console.log(data)
        console.log(data["getPost"])
        setPost(data["getPost"])
    };

    useEffect( () => {
        fetchPostbyId()
    }, [])

    let handleClose = () => {
        setOpen(false);
        history.goBack();
      };

    return (
        
        <Modal
        open={open} 
        onClose={handleClose}>
        <Fade in={open}>
        <div 
            style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
           >
         {post && 
            <PostCard author={post.createdby.username} text={post.text} postID={post.id} time={post.timeStamp} likes={post.likes} flagCount={post.numFlags} flags={post.flags} tags={post.tags} img={post.img} isApproved={true} id={post.id} />
         }
         </div>
         </Fade>
         </Modal>
    
    )
}

export default CardModal;