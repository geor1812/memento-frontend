import http from "../http-common";
class FolderService {
    getAll() {
        return http.get("/folders");
    }

    create(data) {
        return http.post("/folders", data);
    }

    update(id, data) {
        return http.put(`/folders/${id}`, data);
    }

    delete(id) {
        return http.delete(`/folders/${id}`);
    }
}

export default new FolderService();