package main

import (
	home "vitista/personal_healthcare_app/controllers"
	diet "vitista/personal_healthcare_app/dietPlanner"
	fit "vitista/personal_healthcare_app/googeFit"
	login "vitista/personal_healthcare_app/login"
	model "vitista/personal_healthcare_app/runners"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	routeGroup := r.Group("/v1")
	{
		routeGroup.GET("/home",home.GetHome)
		routeGroup.GET("/modelProcessing",model.RunModel)
		routeGroup.POST("/savePayload",home.SavePayload)
		routeGroup.POST("/login",login.Login)
		routeGroup.GET("/signin",login.SignIn)
		routeGroup.GET("/readcookie",login.ReadCookie)
		routeGroup.GET("/getall",home.GetAll)
		routeGroup.GET("/fit",fit.GetFit)
		routeGroup.GET("/fit/callback",fit.GooglefitCallback)
		routeGroup.GET("/suggest_meal_plan",diet.SuggestMealPlan)
	}
	r.Run("localhost:8080")
}