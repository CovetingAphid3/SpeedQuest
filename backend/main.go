// main.go
package main

import (
    "fmt"
    "net/http"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer ws.Close()

    for {
        _, msg, err := ws.ReadMessage()
        if err != nil {
            fmt.Println(err)
            break
        }
        fmt.Printf("%s sent: %s\n", ws.RemoteAddr(), string(msg))
    }
}

func main() {
    http.HandleFunc("/ws", handleConnections)
    http.Handle("/", http.FileServer(http.Dir("../frontend/dist")))
    fmt.Println("Server started on :8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("Error starting server:", err)
    }
}

