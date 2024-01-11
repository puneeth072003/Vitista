package home

import "github.com/gin-gonic/gin"

func RunModel(c *gin.Context) {
    c.JSON(200, gin.H{"path": getImage("Puneeth")})
}
