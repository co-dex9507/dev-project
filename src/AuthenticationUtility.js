// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Input from '@mui/material/Input';
// import React from 'react'
// import { useEffect, useState } from 'react';
// import { auth } from './firebase-config';
// import Avatar from '@mui/material/Avatar';

// //refactor and break sign up and log in into separate components

// function AuthenticationUtility() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [open, setOpen] = useState(false);
//   const [openSignIn, setOpenSignIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const handleOpen = () => setOpen(true);
//   const handleOpenSignIn = () => setOpenSignIn(true);

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   const signUp = (event) => {
//     event.preventDefault();
//     auth
//       .createUserWithEmailAndPassword(email, password).
//       then((authUser => {
//         return authUser.user.updateProfile({
//           displayName: username,
//         })
//       }))
//       .catch((error) => alert(error.message));
//     setOpen(false);
//   };

//   const signIn = (event) => {
//     event.preventDefault();
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .catch((error) => alert(error.message));

//     setOpenSignIn(false);
//   };

//   const signOut = (event) => {
//     auth.signOut();
//   }

//   const isSignedIn = (event) => {
//     if(authUser)
//       setUser(authUser);
//   }

// }



