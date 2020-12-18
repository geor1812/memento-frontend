import http from "../http-common";
import ArchiveService from "./ArchiveService";
class NoteService {
    getAll() {
        return http.get("/notes");
    }

    getWithSearch(searchTerm) {
        return http.get("/notes?searchTerm=" + searchTerm)
    }

    getById(id) {
        return http.get(`/notes/${id}`);
    }

    create(data) {
        return http
            .post("/notes", data);
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
}

export default new NoteService();