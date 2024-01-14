package main

import (
	home "vitista/personal_healthcare_app/controllers"
	login "vitista/personal_healthcare_app/login"
	model "vitista/personal_healthcare_app/runners"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routeGroup := r.Group("/v1") 
	{
		routeGroup.GET("/home",home.GetHome)
		routeGroup.GET("/modelProcessing",model.RunModel)
		routeGroup.POST("/savePayload",home.SavePayload)
		routeGroup.POST("/login",login.Login)
		routeGroup.GET("/signin",login.SignIn)
		routeGroup.GET("/readcookie",login.ReadCookie)
	}
	r.Run("localhost:8080")
}