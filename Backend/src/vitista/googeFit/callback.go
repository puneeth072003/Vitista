package fit

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func GooglefitCallback(c *gin.Context) {
	callbackcode := c.Query("code")

	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	data := url.Values{
        "grant_type": {"authorization_code"},
        "code":       {callbackcode},
        "redirect_uri": {"http://localhost:8080/v1/fit/callback"},
        "client_id":   {os.Getenv("CLIENT_ID")},
        "client_secret": {os.Getenv("CLIENT_SECRET")},
    }
	req, err := http.NewRequest("POST", "https://oauth2.googleapis.com/token", bytes.NewBufferString(data.Encode()))
    if err != nil {
        panic(err)
    }
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

	jsonResponse := string(body)

	var tokenResponse struct {
		AccessToken  string `json:"access_token"`
		ExpiresIn    int    `json:"expires_in"`
		RefreshToken string `json:"refresh_token"`
		Scope        string `json:"scope"`
		TokenType    string `json:"token_type"`
	}

	// Decode the JSON response
	errr := json.Unmarshal([]byte(jsonResponse), &tokenResponse)
	if errr != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	// Access the access token
	AccessToken := tokenResponse.AccessToken
	fmt.Println("Access Token:", AccessToken)

	// scopes := []string{
	// 	"https://www.googleapis.com/auth/fitness.sleep.read",
	// 	"https://www.googleapis.com/auth/fitness.nutrition.read",
	// 	"https://www.googleapis.com/auth/fitness.blood_pressure.read",
	// 	"https://www.googleapis.com/auth/fitness.blood_glucose.read",
	// }

	GetSleepData(AccessToken, c)
}

func GetSleepData(accessToken string, c *gin.Context) {

	fmt.Println("Getting sleep data...")
	// Construct the API endpoint URL
	apiURL := constructAPIURL()

	// Create an HTTP request
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		fmt.Println("Error creating HTTP request")
		return
	}

	// Set the Authorization header with the access token
	req.Header.Set("Authorization", "Bearer "+accessToken)

	// Make the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error making HTTP request")
		return
	}
	defer resp.Body.Close()

	// Read and parse the response body
	var sleepData interface{}
	err = json.NewDecoder(resp.Body).Decode(&sleepData)
	if err != nil {
		fmt.Println("Error decoding JSON")
		return
	}



	c.JSON(http.StatusOK, gin.H{"SleepData": sleepData,"Status":"Success"})
}

func constructAPIURL() string {
	endTime := time.Now().Format("2006-01-02T15:04:05.999Z")
	startTime := time.Now().AddDate(0, 0, -7).Format("2006-01-02T15:04:05.000Z")
	activityType := "72"

	// Build the URL with parameters
	url := fmt.Sprintf("https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=%s&endTime=%s&activityType=%s",
		startTime, endTime, activityType)

	return url
}