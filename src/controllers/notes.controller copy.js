const notesCtrl = {};

// Models
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, placa, marca, modelo, tipo, color, description, cant_cambios, referencia } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!placa) {
    errors.push({ text: "Please Write a placa" });
  }
  if (!marca) {
    errors.push({ text: "Please Write a marca" });
  }
  if (!modelo) {
    errors.push({ text: "Please Write a modelo" });
  }
  if (!tipo) {
    errors.push({ text: "Please Write a tipo" });
  }
  if (!color) {
    errors.push({ text: "Please Write a color" });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (!cant_cambios) {
    errors.push({ text: "Please Write a cant_cambios" });
  }
  if (!referencia) {
    errors.push({ text: "Please Write a Referencia" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      placa,
      marca,
      modelo,
      tipo,
      color,
      description,
      cant_cambios,
      referencia,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/notes");
  }
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;