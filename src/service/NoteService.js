import http from "../http-common";
import ArchiveService from "./ArchiveService";
class NoteService {
    getAll() {
        return http.get("/notes");
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
}

export default new NoteService();