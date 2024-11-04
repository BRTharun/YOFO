import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import './Rasa.css';

function QuizApp() {
  const [answers, setAnswers] = useState(new Array(19).fill(''));
  const [showDialog, setShowDialog] = useState(false);
  const [dosha, setDosha] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
      handleSubmit();
    }
  };

  const handleRestartQuiz = () => {
    setAnswers(new Array(questions.length).fill(''));
    setDosha('');
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };


  

  const fetchUserProfile = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      console.log('Stored Token:', storedToken);
      if (!storedToken) {
        console.error('No token found. User is not authenticated.');
        return;
      }
  
      const responseUserId = await axios.get('http://localhost:3000/user/profile', {
        headers: {
          'x-auth-token': storedToken,
        },
      });
  
      console.log('User ID Response:', responseUserId.data);
  
      const userId = responseUserId.data.user.id;
      console.log('User ID:', userId);
  
      const responseProfile = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
        headers: {
          'x-auth-token': storedToken,
        },
      });
  
      return responseProfile.data.user;
    } catch (error) {
      console.error('Error fetching user profile', error);
      throw error;
    }
  };
  

  const handleAnswer = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  


  

  const handleSubmit = async () => {
    try {
      console.log('Starting handleSubmit');
      
      const doshaCounts = {
        Vatta: 0,
        Pitta: 0,
        Kapha: 0,
      };
  
      for (const answerIndex of answers) {
        if (answerIndex === 0) {
          doshaCounts.Vatta++;
        } else if (answerIndex === 1) {
          doshaCounts.Pitta++;
        } else if (answerIndex === 2) {
          doshaCounts.Kapha++;
        }
      }
  
      console.log('Dosha Counts:', doshaCounts);
  
      let dominantDosha = '';
      if (doshaCounts.Vatta > doshaCounts.Pitta && doshaCounts.Vatta > doshaCounts.Kapha) {
        dominantDosha = 'Vatta';
      } else if (doshaCounts.Pitta > doshaCounts.Vatta && doshaCounts.Pitta > doshaCounts.Kapha) {
        dominantDosha = 'Pitta';
      } else if (doshaCounts.Kapha > doshaCounts.Vatta && doshaCounts.Kapha > doshaCounts.Pitta) {
        dominantDosha = 'Kapha';
      }
  
      console.log('Dominant Dosha:', dominantDosha);
  
      setShowDialog(true);
  
      const user = await fetchUserProfile();
  
      console.log('User after fetchUserProfile:', user);
  
      if (!user || !user._id) {
        console.error('User ID is undefined. Unable to update Rasa state.');
        return;
      }
  
      console.log('Updating Rasa state for user:', user._id);
  
      // Use dominantDosha directly instead of dosha state
      console.log('Checking dominantDosha', dominantDosha);
      await axios.put(`http://localhost:3000/user/profile/${user._id}`, {
        rasaState: dominantDosha,
      });
  
      // Update the dosha state
      setDosha(dominantDosha);
      setShowResult(true);
      console.log('Rasa state updated successfully');
  
      console.log('Rasa state updated successfully');
    } catch (error) {
      console.error('Error handling quiz submission', error);
  
      // Log the detailed error response
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };
  
  
  
  
  
  

  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  // ... (your existing code for rendering quiz questions and options)
  const questions = [
    {
      question: 'Q1: How is your body structure?',
      options: [
        'a) Thin & lean',
        'b) Medium & proportionate',
        'c) Large & well-built',
      ],
    },
    {
      question: 'Q2: How is your appetite?',
      options: [
        'a) Irregular: I feel hungry sometimes and other times I do not',
        'b) Regular: I feel hunger strongly every few hours and need food at regular intervals',
        'c) Steady: I do not feel hungry for a few hours, I can miss meals, but do not like to. I tend towards emotional eating',
      ],
    },
    {
      question: 'Q3: What is your hair texture like?',
      options: [
        'a) Thin, tends to be dry, split ends',
        'b) Medium thickness, tends to thin out, more hair fall',
        'c) Thick, luscious, tends to be more greasy than dry',
      ],
    },
    {
      question: 'Q4: How is your skin?',
      options: [
        'a) Dry, thin, & rough',
        'b) Sensitive - oily/sometimes I am prone to acne, inflammation, pimples, sweat more',
        'c) Oily/combination - I rarely use moisturizer/do not feel like it. My skin tends to be well hydrated, smooth, and soft - moist/greasy',
      ],
    },
    {
      question: 'Q5: My lifelong weight tendency has been',
      options: [
        'a) I am thin and find it difficult to gain weight',
        'b) Steady, medium, consistent and it reflects my efforts - easy to put on, easy to lose',
        'c) Slightly overweight - I have a stocky build and can gain weight easily - difficulty to lose weight',
      ],
    },
    {
      question: 'Q6: How do you respond to climate?',
      options: [
        'a) Tend to feel extremely cold easily',
        'b) I cannot stand extreme heat and tend to overheat easily',
        'c) Neutral, but I prefer warm climates - aversion to moist rainy and cool weather',
      ],
    },
    {
      question: 'Q7: How do you sleep?',
      options: [
        'a) I sleep fewer hours than normal, and my sleep tends to get disturbed. I am a light sleeper - interrupted',
        'b) Moderately. I usually sleep between 6-8 hours',
        'c) I can easily sleep for over 8 hours. My sleep tends to be heavy, long, and deeply restful - sleepy & lazy',
      ],
    },
    {
      question: 'Q8: How is your stamina?',
      options: [
        'a) Delicate - I feel exhausted easily in the evenings, after not doing much work',
        'b) Moderate, but I have a strong will and can do anything I set my mind to',
        'c) Incredible, but I am sometimes hesitant to push myself and test it. Excellent energy',
      ],
    },
    {
      question: 'Q9: Mentally, I tend to be',
      options: [
        'a) Flexible, creative, restless, quick',
        'b) Strong, determined, competitive, ambitious, smart, intellect aggressive',
        'c) Calm, stable, steady, loving, reliable',
      ],
    },
    {
      question: 'Q10: How are you as a learner?',
      options: [
        'a) I learn quickly, but also forget quickly',
        'b) I am sharp and learn whatever I set my mind to',
        'c) It takes me time to learn something but once I do I never forget it',
      ],
    },
    {
      question: 'Q11: I am...',
      options: [
        'a) Creative, free-willed, excited, quick, restless',
        'b) Ambitious, driven, analytical',
        'c) Warm, loving, kind, calm, stable',
      ],
    },
    {
      question: 'Q12: What feelings are you most prone to?',
      options: [
        'a) Feeling anxious, nervous, fear, worry',
        'b) Impatience, irritability, frustration, aggression',
        'c) Lethargy, lack of motivation, slightly depressed, slow-moving, calm reclusive',
      ],
    },
    {
      question: 'Q13: What are you prone to?',
      options: [
        'a) Pain in my joints, cracking joints',
        'b) Acidity, Acid reflux',
        'c) Prone to mucus formation in the nose, sinus, nose to chest related issues',
      ],
    },
    {
      question: 'Q14: How are your stools?',
      options: [
        'a) Dry and hard scanty, tend to constipation',
        'b) Soft, loose stools',
        'c) Heavy, thick, Sticky, oily, regular',
      ],
    },
    {
      question: 'Q15: How is your digestion?',
      options: [
        'a) Delicate - I cannot tolerate all foods, sometimes it\'s great and other times it acts up',
        'b) Strong - I can tolerate most foods and my metabolism is fast',
        'c) Slow - I feel tired after meals',
      ],
    },
    {
      question: 'Q16: What is your personality?',
      options: [
        'a) Idealistic, creative, free-flowing',
        'b) Goal-oriented, competitive, ambitious',
        'c) Calm, peaceful, slow, loyal',
      ],
    },
    {
      question: 'Q17: How do you tend to be in difficulty?',
      options: [
        'a) Nervous, anxious, worried & irritable',
        'b) Impatient & aggressive',
        'c) I am sometimes depressive, tend to avoid my emotions and avoid uncomfortable situations',
      ],
    },
    {
      question: 'Q18: Hunger',
      options: [
        'a) Irregular, anytime',
        'b) Sudden hunger pangs, sharp hunger',
        'c) Can skip any meal easily',
      ],
    },
    {
      question: 'Q19: Mood',
      options: [
        'a) Changes quickly and has frequent mood swings',
        'b) Eats at a moderate speed',
        'c) Stable',
      ],
    },
  ];

  
  

   return (
    <div className="quiz-container">
      <Nav />
      <h1 className="quiz-heading">Quiz</h1>
      <div className="quiz-app">
        {showResult ? (
          <div className="result-container">
            <h2 className="result-heading">Quiz Results</h2>
            <p className="dosha-label">Your dominant Dosha:</p>
            <p className="dosha-result">{dosha}</p>
            <button className="restart-button" onClick={handleRestartQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="question-number">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div key={currentQuestionIndex} className="question-container">
              <div className="quiz-area">
                <p className="question-text">{questions[currentQuestionIndex].question}</p>
              </div>
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <div key={optionIndex} className="option-container">
                  <button
                    onClick={() => handleAnswer(currentQuestionIndex, optionIndex)}
                    className={`option-button ${
                      answers[currentQuestionIndex] === optionIndex ? 'selected' : ''
                    }`}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


export default QuizApp;
