package diet

import (
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserInfo struct {
	Name          string  `form:"name"`
	Age           int     `form:"age"`
	Weight        float64 `form:"weight"`
	Height        float64 `form:"height"`
	ActivityLevel string  `form:"activity_level"`
}

func calculateCalories(user UserInfo) int {
	var activityMultiplier float64

	switch user.ActivityLevel {
	case "low":
		activityMultiplier = 1.2
	case "medium":
		activityMultiplier = 1.5
	case "high":
		activityMultiplier = 1.8
	default:
		activityMultiplier = 1.2
	}

	basalMetabolicRate := 10*user.Weight + 6.25*user.Height - 5*float64(user.Age)
	totalCalories := int(basalMetabolicRate * activityMultiplier)
	return totalCalories
}

func SuggestMealPlan(c *gin.Context) {
	var user UserInfo

	// Get values from the URL query
	user.Name = c.Query("name")
	user.Age, _ = strconv.Atoi(c.Query("age"))
	user.Weight, _ = strconv.ParseFloat(c.Query("weight"), 64)
	user.Height, _ = strconv.ParseFloat(c.Query("height"), 64)
	user.ActivityLevel = c.Query("activity_level")

	totalCalories := calculateCalories(user)

	proteinRatio := 0.3
	fatRatio := 0.3
	carbRatio := 0.4

	proteinCalories := int(math.Floor(float64(totalCalories) * proteinRatio))
	fatCalories := int(math.Floor(float64(totalCalories) * fatRatio))
	carbCalories := int(math.Floor(float64(totalCalories) * carbRatio))

	result := gin.H{
		"Proteins":      proteinCalories,
		"Fats":          fatCalories,
		"Carbohydrates": carbCalories,
	}

	c.JSON(200, gin.H{"DailyrequiredValues": result})
}

