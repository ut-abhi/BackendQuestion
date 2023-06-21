const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;


const fetchStudents = async () => {
  try {
    const response = await fetch('https://utljncpx54.execute-api.ap-northeast-1.amazonaws.com/default/Students-API');
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};

app.get('/students', async (req, res) => {
  try {
    const students = await fetchStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/students/sort', async (req, res) => {
  try {
    const students = await fetchStudents();
    const sortedStudents = students.sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/students/filter/:college', async (req, res) => {
  try {
    const students = await fetchStudents();
    const college = req.params.college;
    const filteredStudents = students.filter((student) => student.college === college);
    res.json(filteredStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}) ;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});