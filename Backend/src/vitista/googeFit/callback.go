package fit

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
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

	AdditionalSleepInfo(AccessToken,c)

	// GetSleepData(AccessToken, c)
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


func AdditionalSleepInfo(accessToken string, c *gin.Context) {
	fmt.Println("Getting additional sleep info...")
	// Construct the API endpoint URL
	userID := "me"

	// Set the start and end times
	// startTimeMillis := time.Date(2019, 12, 5, 0, 0, 0, 0, time.UTC).Unix() * 1000
	// endTimeMillis := time.Date(2019, 12, 17, 23, 59, 59, 999999999, time.UTC).Unix() * 1000

	endTimeMillis := time.Now().Unix() * 1000
	startTimeMillis := time.Now().AddDate(0, 0, -7).Unix() * 1000

	// Build the request body JSON payload
	requestBody := []byte(fmt.Sprintf(`{
		"aggregateBy": [
			{
				"dataTypeName": "com.google.sleep.segment"
			}
		],
		"endTimeMillis": %d,
		"startTimeMillis": %d
	}`, endTimeMillis, startTimeMillis))

	// Build the URL
	url := fmt.Sprintf("https://www.googleapis.com/fitness/v1/users/%s/dataset:aggregate", userID)

	// Create the HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		log.Fatalf("Error creating the request: %v", err)
	}

	// Set the Authorization header
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error making the request: %v", err)
	}
	defer response.Body.Close()

	// Read the response body
	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatalf("Error reading the response body: %v", err)
	}

	// Print the response body
	fmt.Println(string(body))

	c.JSON(http.StatusOK, gin.H{"AdditionalSleepData": string(body)})

}