const {Peserta} = require('../models/Users');
const path = require("path");
// Get all users
const getAllPeserta = async (req, res) => {
  try {
    const users = await Peserta.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getPesertaById = async (req, res) => {
  try {
    const user = await Peserta.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Peserta not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createPeserta = async (req, res) => {
  const { nama, sekolah, jurusan, no_hp, alamat } = req.body;

  // Validasi input
  if (!nama || !sekolah || !jurusan || !no_hp || !alamat) {
    return res.status(400).json({ message: "All fields are required" });
  }

 

  try {

    // Membuat user baru
    const newPeserta = await Peserta.create({
      nama,
      sekolah,
      jurusan,
      no_hp,
      alamat,
    });
    res.status(201).json(newPeserta);
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
const updatePeserta = async (req, res) => {
  try {
    const user = await Peserta.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Peserta not found' });
    }

    const { nama, sekolah, jurusan, no_hp, alamat } = req.body;

    // Validasi input
    if (!nama || !sekolah || !jurusan || !no_hp || !alamat) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!nama || !sekolah || !jurusan || !no_hp || !alamat) {
      return res.status(400).json({ message: "All fields are required" });
    }


    // Perbarui user
    const updatedData = {
      nama,
      sekolah,
      jurusan,
      no_hp,
      alamat,
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
const deletePeserta = async (req, res) => {
  try {
    const user = await Peserta.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'Peserta deleted' });
    } else {
      res.status(404).json({ message: 'Peserta not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPeserta,
  getPesertaById,
  createPeserta,
  updatePeserta,
  deletePeserta,
};
