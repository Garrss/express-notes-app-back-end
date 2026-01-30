import NoteRepositories from '../repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

const noteRepositories = new NoteRepositories();

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validated;
  const note = await noteRepositories.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

export const getNotes = async (req, res) => {
  const notes = await noteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', { notes: notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await noteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', note);
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    body,
    tags
  } = req.validated;

  const note = await noteRepositories.editNote({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await noteRepositories.deleteNoteById(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};
