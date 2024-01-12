package model

import (
	"fmt"
)

func getImage(name string) string{
	placeholderPath := "../assets/%s.jpg"
	FinalPath := fmt.Sprintf(placeholderPath, name)
    // img, err := imaging.Open("../assets/image.jpg")
    // if err != nil {
    //     fmt.Println("Error opening image:", err)
    //     return
    // }

    // processedImage := convertImageForModel(img)
	return FinalPath
}
