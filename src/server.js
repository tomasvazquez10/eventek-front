const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());


// Middleware para manejar solicitudes JSON
app.use(bodyParser.json());

// Ruta para obtener el contenido del archivo JSON
app.get('/api/sales', (req, res) => {
  const filePath = path.join(__dirname, 'assets/sales.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.send(JSON.parse(data));
  });
});

// Ruta para escribir en el archivo JSON
app.post('/api/sales', (req, res) => {
  const newSale = req.body;
  const filePath = path.join(__dirname, 'assets/sales.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const sales = JSON.parse(data);
    sales.push(newSale);

    fs.writeFile(filePath, JSON.stringify(sales, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }
      res.status(200).send('Sale saved successfully');
    });
  });
});


//EVENTS

// Ruta para obtener el contenido del archivo JSON
app.get('/api/events', (req, res) => {
  const filePath = path.join(__dirname, 'assets/events.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.send(JSON.parse(data));
  });
});

app.post('/api/events', (req, res) => {
  const newSale = req.body;
  const filePath = path.join(__dirname, 'assets/events.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const sales = JSON.parse(data);
    sales.push(newSale);

    fs.writeFile(filePath, JSON.stringify(sales, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }
      res.status(200).send('Sale saved successfully');
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

