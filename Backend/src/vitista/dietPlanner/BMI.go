package diet

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func calculateBMI(weightKg float64, heightCm float64) float64 {
	if weightKg <= 0 || heightCm <= 0 {
		panic("Weight and height must be positive values.")
	}

	// Convert height to meters
	heightM := heightCm / 100.0

	bmi := weightKg / (heightM * heightM)
	return bmi
}

func interpretBMI(bmi float64) string {
	if bmi < 18.5 {
		return "Underweight"
	} else if 18.5 <= bmi && bmi < 24.9 {
		return "Normal weight"
	} else if 25 <= bmi && bmi < 29.9 {
		return "Overweight"
	} else {
		return "Obese"
	}
}

func CalculateBMIHandler(c *gin.Context) {
	weightStr := c.Query("weight")
	heightStr := c.Query("height")

	weight, err := strconv.ParseFloat(weightStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid weight"})
		return
	}

	height, err := strconv.ParseFloat(heightStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid height"})
		return
	}

	bmi := calculateBMI(weight, height)
	category := interpretBMI(bmi)

	c.JSON(http.StatusOK, gin.H{
		"bmi":      bmi,
		"category": category,
	})
}