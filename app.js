const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const port = 3000;

const tasks = ['task one', 'task two', 'task three'];
const workTasks = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// =============================================
// DAY LIST
// =============================================
app.get('/', (req, res) => {
  const day = date.getDate();
  res.render('list', { listTitle: day, tasks: tasks });
});

app.post('/', (req, res) => {
  const task = req.body.addTask;

  if (req.body.list === 'Work List') {
    workTasks.push(task);
    res.redirect('/work');
  } else {
    tasks.push(task);
    res.redirect('/');
  }
});

// =============================================
// WORK LIST
// =============================================
app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', tasks: workTasks });
});

app.post('/work', (req, res) => {
  const task = req.body.addTask;
  workTasks.push(task);
  res.redirect('/work');
});

// =============================================
// ABOUT
// =============================================
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
