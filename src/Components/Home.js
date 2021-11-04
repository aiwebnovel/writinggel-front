import React, {useContext} from "react";
import { Link} from 'react-router-dom'
import Layout from "./Layout";
import { Box, Grid, Card, CardBody, CardHeader, ResponsiveContext } from "grommet";
import { Magic} from "grommet-icons";
import "../styles/Main.scss";
import { toast } from "react-toastify";

import LinkObject from "./app/LinkObject";

const Home = () => {
    
    const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <Box 
      justify="center"
      align="center"
      className="MainHome"
      >
        <Grid
          columns={ size !== "small" ? { count: 4, size: "auto" } : '100%'}
          gap='medium'
          fill={size !== 'small' ? false : true}
        >
          {LinkObject.map((item)=>(
             <Link to={{
               pathname:item.link,
               state: {
                 title : item.title
               }
             }}>
             <Card background='#f9f9f9' key={item.id}>
               <CardHeader className='cardTop'>
                 <Magic color='#fff' />
               </CardHeader>
               <CardBody className='cardTitle'>{item.title}</CardBody>
             </Card>
           </Link>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
