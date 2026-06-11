import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <Container>
            <HeroSection>
                <HeroContent>
                    <Headline>About Us</Headline>
                    <SubHeadline>Learn More About Our System</SubHeadline>
                </HeroContent>
            </HeroSection>
            <ContentSection>
                <Title>Our Mission</Title>
                <Description>
                    Our goal is to provide a seamless and efficient system for managing student records in educational institutions.
                    We focus on creating a user-friendly experience while ensuring robust data security and useful features.
                </Description>
                <MissionPoints>
                    <Point>📚 Easy Record Management</Point>
                    <Point>🔒 Secure Data Storage</Point>
                    <Point>🔍 Comprehensive Analytics</Point>
                </MissionPoints>
            </ContentSection>
        </Container>
    );
};

// Styled components
const Container = styled.div`
    width: 100%;
    overflow: hidden;
        @keyframes fadeOut {
        0% { opacity: 1; }
         90% { opacity: 1; }
         100% { opacity: 0; }
      }
   animation: fadeIn 0.5s ease-out;`;

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
    padding: 20px;
    position: relative;
`;

const Headline = styled.h1`
    font-size: 3rem;
    margin-bottom: 10px;
`;

const SubHeadline = styled.h1`
    font-size: 1.5rem;

`;

const ContentSection = styled.section`
    padding: 50px 20px;
    background-color: #f0f4f4;
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

const MissionPoints = styled.ul`
    list-style: none;
    padding: 0;
    font-size: 1.2rem;
`;

const Point = styled.li`
    margin-bottom: 10px;
`;

export default About;
