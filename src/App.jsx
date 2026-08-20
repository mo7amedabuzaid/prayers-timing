import React from 'react'
import MainContent from './component/MainContent'
import Container from '@mui/material/Container';

export default function App() {
  return (
    <>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh"}}>
  <Container maxWidth="lg">
<MainContent/>
       </Container>
</div>
    </>
  );
  }

