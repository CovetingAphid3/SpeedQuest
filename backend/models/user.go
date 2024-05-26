package models

type User struct {
	Username  string `json:"username"`
	Highscore int    `json:"highscore"`
}
