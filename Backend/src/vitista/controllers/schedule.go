package home

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type DateRange struct {
  From string
  To string
}
type Payload struct {
  Tablet string
  DateRange DateRange
  Period string
  Time string
}

func SavePayload(c *gin.Context) {
	client, err := ConnectToMongoDB()
    if err != nil {
        fmt.Println("Error connecting to MongoDB:", err)
        return
    }
    defer client.Disconnect(context.Background())

	// Handling the request payload
    var payload Payload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})  
		return
    }

    err = insertDataIntoMongoDB(client,payload)
    if err != nil {
        fmt.Println("Error inserting data into MongoDB:", err)
        return
    }
}

func insertDataIntoMongoDB(client *mongo.Client, payload Payload) error {
    databaseName := "scheduleData"
    collectionName := "userData"

    collection := client.Database(databaseName).Collection(collectionName)

    // Inserting the payload data into MongoDB
    _, err := collection.InsertOne(context.Background(), payload)
    if err != nil {
        return err
    }

    fmt.Println("Data inserted into MongoDB!!!")
    return nil
}