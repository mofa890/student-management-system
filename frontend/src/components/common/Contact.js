import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    return (
        <Container>
            <HeroSection>
                <HeroContent>
                    <Headline>Contact Us</Headline>
                    <SubHeadline>We’re Here to Help</SubHeadline>
                </HeroContent>
            </HeroSection>
            <ContentSection>
                <Title>Get in Touch</Title>
                <Description>
                    Have questions or need assistance? Reach out to us using the contact information below.
                    We are here to help and will respond as soon as possible.
                </Description>
                <ContactDetails>
                    <Detail>Email: mfa75251@gmail.com</Detail>
                    <Detail>Phone: +919984465674</Detail>
                </ContactDetails>
            </ContentSection>
        </Container>
    );
};

// Styled components
const Container = styled.div`
    width: 100%;
    overflow: hidden;
    
  
`;

const HeroSection = styled.section`
     background: linear-gradient(to right, #00796b, #004d40);
    color: white;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const HeroContent = styled.div`
   @keyframes fadeOut {
        0% { opacity: 1; }
         90% { opacity: 1; }
         100% { opacity: 0; }
      }
   animation: fadeIn 0.5s ease-out;`;

const Headline = styled.h1`
    font-size: 3rem;
    margin-bottom: 10px;
`;

const SubHeadline = styled.h1`
    font-size: 1.5rem;
`;

const ContentSection = styled.section`
    padding: 50px 20px;
    background-color: #e1f5fe;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 40px;
`;

const ContactDetails = styled.div`
    font-size: 1.2rem;
      @media (max-width: 1200px) {
        font-size: 1.2rem;
        position:relative;
        top:-10px;
        right:375px;

      
       
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    
    }

`;

const Detail = styled.p`
    margin: 10px 0;
    font-size:13px;
    position:relative;
    top:25px;
    left:500px;
     font-family: 'Jost', sans-serif;
`;

export default Contact;
