package home

import "github.com/gin-gonic/gin"

func GetHome(c *gin.Context) {
    c.JSON(200, gin.H{"message": "Hello from home!"})
}
