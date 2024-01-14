package home

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)
func GetAll(c *gin.Context) {
    username:=ReadCookieReturnfn(c)
	client, err := ConnectToMongoDB()
	if err != nil {
        fmt.Println("Error connecting to MongoDB:", err)
        return
    }
	defer client.Disconnect(context.Background())


	// Access the "schedules" collection
	collection := client.Database("scheduleData").Collection("userData")

	// Query the database for schedules with the given username
	filter := bson.D{{Key: "username", Value: username}}
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query the database"})
	}
	defer cursor.Close(context.TODO())

	// Iterate through the results and store them in a slice
	var schedules [] Payload
	for cursor.Next(context.TODO()) {
		var schedule Payload
		err := cursor.Decode(&schedule)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode schedule data"})
			return
		}
		schedules = append(schedules, schedule)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error during cursor iteration"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"schedules": schedules})
}

// Read a cookie
func ReadCookieReturnfn(c *gin.Context) string{
		username, err := c.Cookie("username")
		if err != nil {
			fmt.Println("Error reading cookie:", err)
			return ""
		}
	fmt.Printf("Username from cookie: %s \n", username)
	return username
}