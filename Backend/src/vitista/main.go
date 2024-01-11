package main

import (
	home "vitista/personal_healthcare_app/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routeGroup := r.Group("/v1") 
	{
		routeGroup.GET("/home",home.GetHome)
		routeGroup.GET("/modelProcessing",home.RunModel)
	}
	r.Run("localhost:8080")
}