# lemonsqueeze

## Get Started

Install depedencies included into `package.json`:
`npm install`

Run the project:
`npm index.js`

Go to [http://localhost:3000](http://localhost:3000)

## Set Database

Create required tables:

```
CREATE TABLE questions (
    questionId INTEGER PRIMARY KEY AUTOINCREMENT,
    surveyPageId INTEGER,
    questionText TEXT,
    questionType VARCHAR(50),
    options TEXT,
    availablePoints INTEGER
);
```
