import React from 'react';
import styled from 'styled-components';

const Home = () => {
    return (
        <Container>
            <HeroSection>
                <HeroContent>
                    <Headline>Welcome to Register</Headline>
                    <SubHeadline>Managing Student Records Efficiently</SubHeadline>
                    {/* <CTAButton>Get Started</CTAButton> */}
                </HeroContent>
            </HeroSection>
            <IntroSection>
                <Title>About Our System</Title>
                <Description>
                    Our system helps schools and colleges manage student records with ease and efficiency.
                </Description>
                <FeaturesGrid>
                    <FeatureCard>
                        <Icon>🎓</Icon>
                        <FeatureTitle>Student Management</FeatureTitle>
                        <FeatureDescription>Manage all student records in one place.</FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <Icon>🔒</Icon>
                        <FeatureTitle>Secure Data</FeatureTitle>
                        <FeatureDescription>Your data is safe with our advanced security measures.</FeatureDescription>
                    </FeatureCard>
                </FeaturesGrid> 
            </IntroSection>
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
    100% { opacity: 0; }  }
   animation: fadeIn 0.5s ease-out;
    
`;

const HeroSection = styled.section`
    background: linear-gradient(to right, #00796b, #004d40);
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px; /* Add padding for small screens */
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin-top: -40px; /* Adjust space for smaller screens */
    }

    @media (max-width: 480px) {
        margin-top: -40px; /* Adjust space for very small screens */
    }
`;

const HeroContent = styled.div``;

const Headline = styled.h1`
    font-size: 3rem;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
    }
`;

const SubHeadline = styled.h1`
    font-size: 1.5rem;
   
   

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;



const IntroSection = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;
    text-align: center;

    @media (max-width: 768px) {
        padding: 40px 15px;
    }

    @media (max-width: 480px) {
        padding: 30px 10px;
    }
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const FeaturesGrid = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FeatureCard = styled.div`
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 30%;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }

    @media (max-width: 768px) {
        width: 80%; /* Adjust width for mobile */
    }

    @media (max-width: 480px) {
        width: 100%; /* Full width for very small screens */
        padding: 15px; /* Reduce padding */
    }
`;

const Icon = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const FeatureDescription = styled.p`
    font-size: 1rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

export default Home;
