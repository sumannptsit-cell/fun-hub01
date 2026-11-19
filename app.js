import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 4001;


// 1. MUST set the View Engine to EJS
app.set('view engine', 'ejs');

// 2. MUST serve the "public" folder for styling and assets
app.use(express.static('public'));

// Mock fallbacks database for api outages
const backupActivities = [
  { activity: "Learn the basic open chords on a guitar.", type: "music" },
  { activity: "Organize a visual space on your computer or desk.", type: "busywork" },
  { activity: "Go for a walk around the block without your phone.", type: "relaxation" },
  { activity: "Bake a quick treat using ingredients in your pantry.", type: "cooking" },
  { activity: "Sketch or draw a still life of an object nearby.", type: "recreational" },
  { activity: "Watch a documentary about an unfamiliar subject.", type: "education" }
];

// Main GET Home Route (Loads the Dashboard initial state)
app.get('/', (req, res) => {
  // Always render views/index.ejs (never send raw strings!)
  res.render('index', { data: null, type: null, error: null });
});

// GET: Joke Hub Route
app.get('/joke', async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');
    let jokeText = '';
    if (response.data.type === 'single') {
      jokeText = response.data.joke;
    } else {
      jokeText = `${response.data.setup} ... ${response.data.delivery}`;
    }
    res.render('index', { 
      data: { content: jokeText, category: response.data.category }, 
      type: 'joke', 
      error: null 
    });
  } catch (error) {
    console.error("Joke fetch failed:", error.message);
    res.render('index', { data: null, type: 'joke', error: "Joke server is offline. Please try again!" });
  }
});

// GET: Trivia Quiz Route
app.get('/trivia', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    if (response.data.results && response.data.results.length > 0) {
      const item = response.data.results[0];
      const answers = [...item.incorrect_answers, item.correct_answer];
      answers.sort(() => Math.random() - 0.5); // Shuffle answers randomly

      res.render('index', { 
        data: { 
          question: item.question, 
          correct: item.correct_answer, 
          all_answers: answers,
          category: item.category,
          difficulty: item.difficulty
        }, 
        type: 'trivia', 
        error: null 
      });
    } else {
      throw new Error("No quiz results received.");
    }
  } catch (error) {
    console.error("Trivia Quiz fetch failed:", error.message);
    res.render('index', { data: null, type: 'trivia', error: "Failed to load a Trivia question. Give it another shot!" });
  }
});

// GET: Boredom Buster Route (Safe Fallback integration)
app.get('/activity', async (req, res) => {
  try {
    const response = await axios.get('https://bored-api.appbrewery.com/random', { timeout: 3000 });
    res.render('index', { 
      data: { activity: response.data.activity, type: response.data.type }, 
      type: 'activity', 
      error: null 
    });
  } catch (error) {
    console.warn("Bored API timeout or crash. Triggering resilient mock database fallback...");
    const backupActivity = backupActivities[Math.floor(Math.random() * backupActivities.length)];
    res.render('index', { 
      data: { activity: backupActivity.activity, type: backupActivity.type }, 
      type: 'activity', 
      error: null 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Fun Hub is running on http://localhost:${PORT}`);
});