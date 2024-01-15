package fit

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func GetFit(c *gin.Context) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	payload := c.Request.URL.Query()
	payload.Add("client_id", os.Getenv("CLIENT_ID"))
	payload.Add("redirect_uri", "http://localhost:8080/v1/fit/callback")
	payload.Add("scope", "https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_glucose.read")
	payload.Add("response_type", "code")
	payload.Add("access_type", "offline")
	payload.Add("prompt", "consent")

	loginURL:= "https://accounts.google.com/o/oauth2/v2/auth?" + payload.Encode()
	
	c.Redirect(http.StatusTemporaryRedirect, loginURL)
	// c.JSON(http.StatusOK, gin.H{"redirectUrl": loginURL})
}