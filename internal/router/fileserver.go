package router

import (
"github.com/go-chi/chi"
"net/http"
"os"
"path/filepath"
)

func FileServerRouter(path string) http.Handler {
	r := chi.NewRouter()

	workDir, _ := os.Getwd()
	filesDir := filepath.Join(workDir, "web/public")

	fs := http.StripPrefix("/", http.FileServer(http.Dir(filesDir)))

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	})
	return r
}
