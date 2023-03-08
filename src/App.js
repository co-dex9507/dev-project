import React from 'react';
import './App.css';
import Post from './components/Post/Post.js';
import logo from './assets/instagramlogosmall.png';
import { useState, createContext, useEffect  } from 'react';
import { db } from './firebase-config';
import { auth } from './firebase-config';
import PostCreator from './components/Postcreator/PostCreator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function App() {

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const [postCreate, setPostCreate] = useState(false);
  const handleOpenPostCreate = () => setPostCreate(true);

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const fabStyle = {
    right: 20,
    position: 'fixed'
};

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password).
      then((authUser => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      }))
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        setUser(authUser);
      }
      else { //user logged out
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  return (
    <div className="App">
      <div className="app_Header">
        <img className="app_HeaderImage" src={logo} alt="IG Logo" />
        {(user ? (
          <Button onClick={() => auth.signOut()}>Sign Out <Avatar className="post_avatar" alt={username} src="static/images/avatar/1.jpg"></Avatar> </Button>
        ) : (
          <div>
            <Button onClick={handleOpen}>Sign Up</Button>
            <Button onClick={handleOpenSignIn}>Sign In</Button>
          </div>
        )
        )}
         <Modal open={open} onClose={() => { setOpen(false) }} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <form>
            <Box sx={styleModal}>
              <h1>register</h1>
              <Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
              <Input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
              <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </Box>
          </form>
        </Modal>
        <Modal open={openSignIn} onClose={() => { setOpenSignIn(false) }} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <form>
            <Box sx={styleModal}>
              <h1>login</h1>
              <Input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
              <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </Box>
          </form>
        </Modal>
      </div>
      <div className='app_posts'>
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      <div className='fab'> <Fab color="primary" onClick={() => { setPostCreate(true) }} aria-label="add"><AddIcon /></Fab></div>
      <Modal open={postCreate} onClose={() => {setPostCreate(false)}}>
         {(user?.displayName ? (
           <><PostCreator username={user.displayName} /></>
      ) : (
        <Box sx={styleModal}><p>Please Sign In!</p></Box>
        )
      )} 
        </Modal>
    </div>

  );
}

export default App;




