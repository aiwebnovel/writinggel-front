import React, {useContext} from "react";
import  {Link} from 'react-router-dom';
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";

const FairyTaleDetail = () => {

  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box
      width='100%'
      height={size !=='small' ? '100%' : '80vh'}
      justify='center'
      align="center"
      pad="large"
      className="DetailBox"
      >
        <div className="DetailHeader">
          <p>멤버십에 가입하면 무제한 이용 가능한 서비스 입니다.</p>
          <button className='intoServiceBtn'>멤버십 가입</button>
        </div>
        <div className="DetailBody">
          <p>동화 서비스에 대한 설명이 들어갈 예정입니다.</p>
          <p>누가 사용하면 좋을까요? 어떻게 활용할 수 있을까요? 등등</p>
          <Link to='/app/fairytale'>
            <button className='intoServiceBtn'>서비스 이용하기</button>
          </Link>
        </div>
      </Box>
    </Layout>
  );
};

export default FairyTaleDetail;
