const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors');

const PORT = process.env.SECONDARY_PUBLIC_PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Data from db.json
const loadData = () => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const dataBuffer = fs.readFileSync(dbPath);
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return { doors: [] };
    }
};

// Save Data to db.json
const saveData = (data) => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error saving data:', e);
    }
};

// Get all doors
app.get('/doors', (_, res) => {
    const data = loadData();
    res.json(data.doors);
});

// Get door by ID
app.get('/doors/:id', (req, res) => {
    const data = loadData();
    const door = data.doors.find((d) => d.id === req.params.id);
    door ? res.json(door) : res.status(404).json({ message: 'Door not found' });
});

// Add new door
app.post('/doors', (req, res) => {
    const data = loadData();
    const newDoor = { id: (data.doors.length + 1).toString(), ...req.body };
    data.doors.push(newDoor);
    saveData(data);
    res.status(201).json(newDoor);
});

// Update door
app.put('/doors/:id', (req, res) => {
    const data = loadData();
    const index = data.doors.findIndex((d) => d.id === req.params.id);
    
    if (index !== -1) {
        data.doors[index] = { ...data.doors[index], ...req.body };
        saveData(data);
        res.json(data.doors[index]);
    } else {
        res.status(404).json({ message: 'Door not found' });
    }
});

// Delete door
app.delete('/doors/:id', (req, res) => {
    const data = loadData();
    const index = data.doors.findIndex((d) => d.id === req.params.id);

    if (index !== -1) {
        const deletedDoor = data.doors.splice(index, 1);
        saveData(data);
        res.json(deletedDoor);
    } else {
        res.status(404).json({ message: 'Door not found' });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

