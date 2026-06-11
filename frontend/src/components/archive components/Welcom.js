import React from 'react';
import styled from 'styled-components';
import GetStarted from './GetStarted';
import { useState } from 'react';

const Welcome = () => {
    const [showGetStarted, setShowGetStarted] = useState(false);
    const handleGetStartedClick = () => {
        setShowGetStarted(true);
    };
    if (showGetStarted) {
        return <GetStarted />;
    }
    return (
        <Container>
            <HeroSection>
                <HeroContent>
                    <Headline>Welcome to  Register</Headline>
                    <SubHeadline>Managing Student Records Efficiently</SubHeadline>
                    <CTAButton onClick={handleGetStartedClick}>Get Started</CTAButton>
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
                    <FeatureCard>
                        <Icon>📊</Icon>
                        <FeatureTitle>Analytics</FeatureTitle>
                        <FeatureDescription>Get insights with powerful data analytics tools.</FeatureDescription>
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
`;

const HeroSection = styled.section`
    background: linear-gradient(to right, #0062E6, #33AEFF);
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const HeroContent = styled.div``;

const Headline = styled.h1`
    font-size: 3rem;
    margin-bottom: 10px;
`;

const SubHeadline = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

const CTAButton = styled.button`
    background-color: white;
    color: #0062E6;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
        color: white;
    }
`;

const IntroSection = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;
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

const FeaturesGrid = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const FeatureCard = styled.div`
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 30%;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

const Icon = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
    font-size: 1rem;
`;

export default Welcome;
