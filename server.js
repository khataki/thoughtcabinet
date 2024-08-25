const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/thoughtCabinet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Определение схемы и модели для мысли
const thoughtSchema = new mongoose.Schema({
  title: String,
  details: String,
  status: String,
  solution: String,
});

const Thought = mongoose.model('Thought', thoughtSchema);

// Получение всех мыслей
app.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой мысли
app.post('/thoughts', async (req, res) => {
  const thought = new Thought(req.body);
  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Обновление мысли
app.put('/thoughts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, details, status, solution } = req.body;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { title, details, status, solution },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Удаление мысли
app.delete('/thoughts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);
    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting thought' });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));