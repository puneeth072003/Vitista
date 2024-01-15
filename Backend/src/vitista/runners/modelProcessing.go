package model

import (
	"bytes"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func Tumorhandler(c *gin.Context) {
    // Command to execute the Python script (no arguments)
    cmd := exec.Command("python", "../../../script/BrainTumorRunner.py")

    // Capture output in a buffer
    var out bytes.Buffer
    cmd.Stdout = &out

    // Execute the command
    err := cmd.Run()
    if err != nil {
        c.String(500, err.Error()) // Handle error
        return
    }

    // Get the Python script's output
    output := out.String()

    // Return the output as a response
    c.String(200, output)
}
