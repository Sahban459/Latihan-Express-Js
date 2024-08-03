const {Users} = require('../models/Users');
const path = require("path");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { nama, email, alamat, jk, jumlah_saudara } = req.body;

  // Validasi input
  if (!nama || !email || !alamat || !jk || !jumlah_saudara) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (jk !== 'Perempuan' && jk !== 'Laki-Laki') {
    return res.status(400).json({ message: "Invalid value for 'jk'" });
  }

  // Validasi file
  if (!req.files || !req.files.foto) {
    return res.status(400).json({ message: "Foto is required" });
  }

  const fotoFile = req.files.foto;
  const fotoPath = path.join(__dirname, '..', 'uploads', fotoFile.name);

  try {
    // Simpan file foto
    await fotoFile.mv(fotoPath);

    // Membuat user baru
    const newUser = await Users.create({
      nama,
      email,
      alamat,
      jk,
      jumlah_saudara,
      foto: fotoFile.name
    });
    res.status(201).json(newUser);
  } catch (error) {
    // Menangani error sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }

    // Error lainnya
    res.status(500).json({ message: error.message });
  }
};


// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { nama, email, alamat, jk, jumlah_saudara } = req.body;

    // Validasi input
    if (!nama || !email || !alamat || !jk || !jumlah_saudara) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (jk !== 'Perempuan' && jk !== 'Laki-Laki') {
      return res.status(400).json({ message: "Invalid value for 'jk'" });
    }

    // Perbarui user
    const updatedData = {
      nama,
      email,
      alamat,
      jk,
      jumlah_saudara,
    };

    if (req.files && req.files.foto) {
      const fotoFile = req.files.foto;
      const fotoPath = path.join(__dirname, '..', 'uploads', fotoFile.name);

      try {
        // Simpan file foto baru
        await fotoFile.mv(fotoPath);
        updatedData.foto = fotoFile.name;
      } catch (error) {
        return res.status(500).json({ message: 'Error saving photo file' });
      }
    }

    await user.update(updatedData);
    res.status(200).json(user);
  } catch (error) {
    // Menangani error lainnya
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
