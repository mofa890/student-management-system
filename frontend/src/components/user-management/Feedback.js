
//   user-management/Feedback.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Feedback = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);

    const handleSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/feedback`, { feedbackText });
            setFeedbackText(''); // Clear the textarea after submission
            setShowThankYou(true);

            setTimeout(() => {
                setShowThankYou(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <Container>
            <HeroSection>
                <HeroContent>
                    <Headline>Feedback</Headline>
                    <SubHeadline>We Value Your Feedback</SubHeadline>
                </HeroContent>
            </HeroSection>
            <ContentSection>
                <Title>Share Your Thoughts</Title>
                <Description>
                    Your feedback is essential for us to improve our system and provide a better user experience.
                    Please let us know your thoughts, suggestions, or any issues you have encountered.
                </Description>
                <FeedbackForm>
                    <TextArea
                        placeholder="Write your feedback here..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </FeedbackForm>
                {showThankYou && <ThankYouPopup>Thank you for your feedback!</ThankYouPopup>}
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
   animation: fadeIn 0.5s ease-out;
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

const HeroContent = styled.div``;

const Headline = styled.h1`
    font-size: 3rem;
    margin-bottom: 10px;
`;

const SubHeadline = styled.h1`
    font-size: 1.5rem;
`;

const ContentSection = styled.section`
    padding: 50px 20px;
    background-color: #f3e5f5;
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

const FeedbackForm = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
    background-color: transparent;
    color: black;
    // border: none;
    // padding: 10px 20px;
    height:35px;
    width:80px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
     border: 0.5px solid black;

    &:hover {
        transition: border-color 0.3s ease;
        background-color:  #00796b;
   
    }
`;
const ThankYouPopup = styled.div`
     
    position: fixed;
    bottom: 150px;
    right: 625px;
    background-color: transparent;
    color: black;
     text-align: center;
    background-color: #f0f0f0; /* Optional: Add a background */
    font-size: 14px;
     transform: translateX(-50%); /* Center horizontally */
    transform: translateY(-50%); /* Center horizontally */
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: fadeInOut 3s;

    @keyframes fadeInOut {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }
`;

export default Feedback;
