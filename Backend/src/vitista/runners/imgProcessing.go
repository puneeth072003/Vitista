package model

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func HandleFileUpload(c *gin.Context) {
    currentDir, err := os.Getwd()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting current working directory"})
        return
    }

    uploadDirectory := filepath.Join(currentDir, "../..", "script/assets")
    // Parse the form data to retrieve the file
    file, err := c.FormFile("image")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Error retrieving the file"})
        return
    }
    
    // Save the file with name "braintest.jpg"
    filename := "braintest.jpg"
    uploadPath := filepath.Join(uploadDirectory, filename)
    if err := c.SaveUploadedFile(file, uploadPath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
}
