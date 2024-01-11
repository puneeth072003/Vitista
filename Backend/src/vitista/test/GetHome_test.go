package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	home "vitista/personal_healthcare_app/controllers"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetHome(t *testing.T) {
	r := gin.Default()
	r.GET("/v1/home", home.GetHome)

	req, err := http.NewRequest("GET", "/v1/home", nil)
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	r.ServeHTTP(recorder, req)

	assert.Equal(t, http.StatusOK, recorder.Code)

	expectedResponse := `{"message":"Hello from home!"}`
	assert.Equal(t, expectedResponse, recorder.Body.String())
}