const Question = require('../models/Question');

const seedQuestions = [
  // Original 10 questions from frontend mockData.js
  {
    question: "What is the primary purpose of the 'aria-label' attribute?",
    options: ["To style the element with CSS", "To provide a label for screen readers", "To set the element's ID", "To hide the element from view"],
    correctAnswer: 1,
  },
  {
    question: "Which HTML element is used to define an unstructured list?",
    options: ["<ol>", "<li>", "<ul>", "<list>"],
    correctAnswer: 2,
  },
  {
    question: "What does WCAG stand for?",
    options: ["Web Content Accessibility Guidelines", "World Content Accessibility Group", "Web Compatibility and Graphics", "Web Core Accessibility Group"],
    correctAnswer: 0,
  },
  {
    question: "Which of these is a valid way to increase contrast?",
    options: ["Light gray text on white background", "White text on black background", "Yellow text on light green background", "Blue text on purple background"],
    correctAnswer: 1,
  },
  {
    question: "What is the purpose of a 'skip link'?",
    options: ["To skip the current question", "To navigate to the next website", "To bypass repetitive content like navigation bars", "To skip the login process"],
    correctAnswer: 2,
  },
  {
    question: "Which attribute is used to group related form elements?",
    options: ["<group>", "<section>", "<fieldset>", "<div>"],
    correctAnswer: 2,
  },
  {
    question: "What does 'semantic HTML' mean?",
    options: ["Using HTML for styling", "Using tags that describe the meaning of the content", "Using only <div> and <span> for everything", "Writing code that only computers can read"],
    correctAnswer: 1,
  },
  {
    question: "Which property is key for 'Reduced Motion' support?",
    options: ["prefers-reduced-motion", "motion-sensitivity", "no-animation", "static-ui"],
    correctAnswer: 0,
  },
  {
    question: "In React, which hook is often used for side effects?",
    options: ["useState", "useContext", "useSideEffect", "useEffect"],
    correctAnswer: 3,
  },
  {
    question: "Why should you use 'tabindex=\"0\"'?",
    options: ["To make a non-interactive element focusable in natural order", "To remove an element from tab order", "To force an element to be first in tab order", "To change the font size"],
    correctAnswer: 0,
  },
  // 5 additional questions for variety
  {
    question: "What does the 'alt' attribute on <img> provide?",
    options: ["A tooltip", "Alternative text for screen readers", "A caption below the image", "A link to the image source"],
    correctAnswer: 1,
  },
  {
    question: "Which ARIA role should a navigation menu use?",
    options: ["role='menu'", "role='navigation'", "role='nav'", "role='menubar'"],
    correctAnswer: 1,
  },
  {
    question: "What is the minimum contrast ratio for normal text under WCAG AA?",
    options: ["3:1", "4.5:1", "7:1", "2:1"],
    correctAnswer: 1,
  },
  {
    question: "Which React hook is used to manage component state?",
    options: ["useRef", "useEffect", "useState", "useContext"],
    correctAnswer: 2,
  },
  {
    question: "What is the purpose of 'aria-live' regions?",
    options: ["To animate content", "To announce dynamic changes to screen readers", "To validate form input", "To lazy-load content"],
    correctAnswer: 1,
  },
];

const count = Question.count();
if (count === 0) {
  Question.bulkInsert(seedQuestions);
  console.log(`Seeded ${seedQuestions.length} questions.`);
} else {
  console.log(`Questions table already has ${count} entries. Skipping seed.`);
}
