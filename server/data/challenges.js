const htmlChallenges = {
  beginner: [
    {
      id: 'html-b-1',
      title: 'Create a Simple Heading',
      description: 'Create an HTML page with an h1 heading that says "Hello World"',
      expectedOutput: '<h1>Hello World</h1>',
      testCases: [
        { input: '', expected: '<h1>Hello World</h1>', description: 'Contains h1 tag' },
        { input: '', expected: 'Hello World', description: 'Contains correct text' },
        { input: '', expected: 'h1', description: 'Uses h1 tag' }
      ]
    },
    {
      id: 'html-b-2',
      title: 'Create a Paragraph',
      description: 'Create a paragraph tag with text "This is a paragraph"',
      expectedOutput: '<p>This is a paragraph</p>',
      testCases: [
        { input: '', expected: '<p>This is a paragraph</p>', description: 'Contains p tag' },
        { input: '', expected: 'This is a paragraph', description: 'Contains correct text' },
        { input: '', expected: 'p', description: 'Uses p tag' }
      ]
    },
    {
      id: 'html-b-3',
      title: 'Create a Link',
      description: 'Create an anchor tag linking to "https://example.com" with text "Click Here"',
      expectedOutput: '<a href="https://example.com">Click Here</a>',
      testCases: [
        { input: '', expected: '<a', description: 'Contains anchor tag' },
        { input: '', expected: 'href="https://example.com"', description: 'Has correct href' },
        { input: '', expected: 'Click Here', description: 'Contains correct text' }
      ]
    }
  ],
  moderate: [
    {
      id: 'html-m-1',
      title: 'Create a Form',
      description: 'Create a form with input field (name="username") and submit button',
      expectedOutput: '<form><input type="text" name="username"><button type="submit">Submit</button></form>',
      testCases: [
        { input: '', expected: '<form', description: 'Contains form tag' },
        { input: '', expected: 'name="username"', description: 'Has username input' },
        { input: '', expected: 'type="submit"', description: 'Has submit button' },
        { input: '', expected: '<input', description: 'Contains input tag' },
        { input: '', expected: '<button', description: 'Contains button tag' }
      ]
    },
    {
      id: 'html-m-2',
      title: 'Create a Table',
      description: 'Create a table with 2 rows and 2 columns',
      expectedOutput: '<table><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>',
      testCases: [
        { input: '', expected: '<table', description: 'Contains table tag' },
        { input: '', expected: '<tr', description: 'Contains tr tag' },
        { input: '', expected: '<td', description: 'Contains td tag' },
        { input: '', expected: 'Cell 1', description: 'Has first cell content' },
        { input: '', expected: 'Cell 4', description: 'Has last cell content' }
      ]
    }
  ],
  hard: [
    {
      id: 'html-h-1',
      title: 'Create a Complex Form',
      description: 'Create a registration form with username, email, password fields and submit button',
      expectedOutput: '<form><input type="text" name="username" placeholder="Username"><input type="email" name="email" placeholder="Email"><input type="password" name="password" placeholder="Password"><button type="submit">Register</button></form>',
      testCases: [
        { input: '', expected: '<form', description: 'Contains form tag' },
        { input: '', expected: 'type="text"', description: 'Has text input' },
        { input: '', expected: 'type="email"', description: 'Has email input' },
        { input: '', expected: 'type="password"', description: 'Has password input' },
        { input: '', expected: 'name="username"', description: 'Has username field' },
        { input: '', expected: 'name="email"', description: 'Has email field' },
        { input: '', expected: 'name="password"', description: 'Has password field' },
        { input: '', expected: 'type="submit"', description: 'Has submit button' }
      ]
    }
  ]
};

const getChallengeByDifficulty = (difficulty) => {
  return htmlChallenges[difficulty] || [];
};

const getRandomChallenge = (difficulty) => {
  const challenges = getChallengeByDifficulty(difficulty);
  if (challenges.length === 0) return null;
  return challenges[Math.floor(Math.random() * challenges.length)];
};

module.exports = {
  htmlChallenges,
  getChallengeByDifficulty,
  getRandomChallenge
};
