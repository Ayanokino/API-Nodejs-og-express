const express = require('express');
const router = express.Router();
const fs = require('fs').promises; 

const dataFilePath = './data.json'; 


async function readDataFromFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}


async function saveDataToFile(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw error;
  }
}

router.get('/by-name/:name', async (req, res) => {
  const searchName = req.params.name.replace(/_/g, ' ');

  try {
    const data = await readDataFromFile();
    const result = data.find(item => item.Title === searchName);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Element not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/by-name/:name', async (req, res) => {
  const searchName = req.params.name.replace(/_/g, ' ');

  try {
    const data = await readDataFromFile();
    const index = data.findIndex(item => item.Title === searchName);

    if (index !== -1) {
      data.splice(index, 1);
      await saveDataToFile(data);
      res.json({ message: 'Element deleted successfully' });
    } else {
      res.status(404).json({ message: 'Element not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
