package login

import (
	"context"
	"fmt"

	home "vitista/personal_healthcare_app/controllers"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type userData struct {
  Username string
  Password string
}

func Login(c *gin.Context) {
	client, err := home.ConnectToMongoDB()
    if err != nil {
        fmt.Println("Error connecting to MongoDB:", err)
        return
    }
    defer client.Disconnect(context.Background())

	// Handling the request payload
    var payload userData
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})  
		return
    }

	// checks the user is there or not in the database
	if exists, checkErr := checkUser(client, payload.Username); checkErr != nil {
		fmt.Println("Error checking user existence:", checkErr)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	} else if exists {
		c.JSON(400, gin.H{"error": "Username is taken!"})
		return
	}

    err = insertDataIntoMongoDB(client,payload)
    if err != nil {
        fmt.Println("Error inserting data into MongoDB:", err)
        return
    }else{
		c.SetCookie("username", payload.Username, 8080, "/", "localhost", false, true)
		fmt.Println("Cookie set successfully!!!")
		c.JSON(200, gin.H{"message": "User logged in successfully!","username":payload.Username})
	}
}

func insertDataIntoMongoDB(client *mongo.Client, payload userData) error {
    databaseName := "scheduleData"
    collectionName := "users"

    collection := client.Database(databaseName).Collection(collectionName)

    // Inserting the payload data into MongoDB
    _, err := collection.InsertOne(context.Background(), payload)
    if err != nil {
        return err
    }

    fmt.Println("Data inserted into MongoDB!!!")
    return nil
} 

func checkUser(client *mongo.Client, username string) (bool, error) {
	databaseName := "scheduleData"
	collectionName := "users"

	collection := client.Database(databaseName).Collection(collectionName)

	filter := bson.D{{Key: "username", Value: username}}

	var existingUser userData
	err := collection.FindOne(context.Background(), filter).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		// User not found
		return false, nil
	} else if err != nil {
		// An error occurred
		return false, err
	}
	// User found
	return true, nil
}