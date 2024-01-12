package model

import (
	"github.com/gin-gonic/gin"
)

func RunModel(c *gin.Context) {
	c.JSON(200, gin.H{"path": getImage("Puneeth")})

	// modelPath := giveModelPath("Breast_Cancer_Predictor")

	// // Create a backend receiver
	// backend := gorgonnx.NewGraph() 

	// model := onnx.NewModel(backend)

	// // read the onnx model
	// b, _ := ioutil.ReadFile(modelPath)
	// // Decode it into the model
	// err := model.UnmarshalBinary(b)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// input := map[string]float64{
    //     "texture_se":      0.9063,
    //     "area_se":         153.40,
    //     "smoothness_se":   0.006399,
    //     "concavity_se":    0.05373,
    //     "concavity_worst": 0.7119,
    // }
	// model.SetInput(0, input)
	// err = backend.Run()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// // Check error
	// output, _ := model.GetOutputTensors()
	// fmt.Println(output[0])
}
