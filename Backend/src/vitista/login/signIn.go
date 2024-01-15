package login

import (
	"context"
	"fmt"

	home "vitista/personal_healthcare_app/controllers"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SignIn(c *gin.Context) {
	client, err := home.ConnectToMongoDB()
	if err != nil {
		fmt.Println("Error connecting to MongoDB:", err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	defer client.Disconnect(context.Background())

	// Extracting query parameters from the URL
	username := c.Query("username")
	password := c.Query("password")

	// Check if the provided credentials are valid
	if err := checkCredentials(client, username, password); err != nil {
		fmt.Println("Error validating credentials:", err)
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}else{
		c.SetCookie("username", username, 8080, "/", "localhost", false, true)
		fmt.Println("Cookie set successfully!!!")
	}

	c.JSON(200, gin.H{"message": "User signed in successfully!","username":username})
}

func checkCredentials(client *mongo.Client, username, password string) error {
	databaseName := "scheduleData"
	collectionName := "users"

	collection := client.Database(databaseName).Collection(collectionName)

	filter := bson.D{{Key: "username", Value: username}}

	var existingUser userData
	err := collection.FindOne(context.Background(), filter).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		// User not found
		return fmt.Errorf("user not found")
	} else if err != nil {
		// An error occurred
		return err
	}

	// Check if the provided password matches the stored password
	if existingUser.Password != password {
		return fmt.Errorf("invalid password")
	}

	return nil
}

// Read user cookie
func ReadCookie(c *gin.Context) {
		// Read a cookie
		username, err := c.Cookie("username")
		if err != nil {
			fmt.Println("Error reading cookie:", err)
			return
		}
	fmt.Printf("Username from cookie: %s", username)
	c.JSON(200, gin.H{"message": "Cookie read successfully!","username":username})
}