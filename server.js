const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json({ limit: '10mb' })); 

app.post('/api/save-image', (req, res) => {
  const { image, label } = req.body;

  if (!label) {
    return res.status(400).send('Label is required.');
  }

  const timestamp = Date.now();
  const folderPath = path.join(__dirname, 'public', 'images', label);
  
  const filePath = path.join(folderPath, `${timestamp}.png`);

  // Check if the label folder exists; if not, create it
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Save the image in the label-specific folder
  fs.writeFile(filePath, image, 'base64', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving image');
    }
    res.send('Image saved successfully');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
