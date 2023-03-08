import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './Post.css';
import { db } from "../../firebase-config";
import { Button } from '@mui/material';
import firebase from 'firebase/compat/app';
import AddCommentIcon from '@mui/icons-material/AddComment';

function Post({ user, postId, username, caption, imageUrl }) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);



  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    );
    setComment('');
  }
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt={username} src="static/images/avatar/1.jpg"></Avatar>
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="logo" />
      <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
      <div className="post_comments"> 
        {
          comments.map((comment) => 
              <p>
              <strong>{comment.username}</strong> {comment.text}
              </p>
          )
        }
      </div>
      <form className="post_input">
        <input className="post_commentbox" type="text" placeholder="say something" value={comment} onChange={(e) => setComment(e.target.value)}></input>
        <Button className="post_button" disabled={!comment} onClick={postComment}>Post</Button>
      </form>
    </div>
  )
}

export default Post;
