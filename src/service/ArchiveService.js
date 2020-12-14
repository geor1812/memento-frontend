import http from "../http-common";

class ArchiveService {
    getAll() {
        return http.get("/archive");
    }

    create(data) {
        return http
            .post("/archive", data);
    }
}

export default new ArchiveService();