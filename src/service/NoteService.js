import http from "../http-common";
import ArchiveService from "./ArchiveService";
class NoteService {
    getAll(folderId) {
        return http.get("/notes/folder/" + folderId);
    }

    getWithSearch(searchTerm) {
        return http.get("/notes?searchTerm=" + searchTerm)
    }

    getById(id) {
        return http.get(`/notes/${id}`);
    }

    create(folderId, data) {
        return http.post(`/notes/create/${folderId}`, data);
    }

    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http
            .delete('/notes/' + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    createItem(noteId, data) {
        return http
            .post(`/notes/${noteId}/items`, data);
    }

    deleteItem(id) {
        return http
            .delete(`/items/${id}`);
    }
}

export default new NoteService();