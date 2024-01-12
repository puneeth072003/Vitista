package model

import (
	"fmt"
)

func giveModelPath(model string) string{
	placeholderPath := "../../../models/%s.pkl"
	FinalPath := fmt.Sprintf(placeholderPath, model)
	return FinalPath
}