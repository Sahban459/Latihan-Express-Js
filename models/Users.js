const { DataTypes } = require("sequelize");
const database = require("../db/db");

const Users = database.define("users", {
  nama: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  alamat: {
    type: DataTypes.TEXT,
  },
  jk: {
    type: DataTypes.ENUM(['Perempuan', "Laki-Laki"]),
  },
  jumlah_saudara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Peserta = database.define("peserta", {
  nama: {
    type: DataTypes.STRING,
  },
  sekolah: {
    type: DataTypes.STRING,
  },
  jurusan: {
    type: DataTypes.TEXT,
  },
  no_hp: {
    type: DataTypes.NUMBER,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {Users, Peserta};
