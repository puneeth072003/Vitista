import onnxruntime
import numpy as np
from PIL import Image  # For working with images
from tensorflow.keras.preprocessing import image

onnx_model_path = "./models/Brain_Tumor.onnx"
sess = onnxruntime.InferenceSession(onnx_model_path)

#Function to preprocess the image.
def preprocess_image(img_path):
          img=image.load_img(img_path,target_size=(150,150))
          img_array=image.img_to_array(img)
          img_array=np.expand_dims(img_array,axis=0)
          img_array/=255.0
          return img_array
                    

def predict_tumor_type_onnx(img_path):
          img_array=preprocess_image(img_path)

          # Convert the input data to ONNX format
          input_name=sess.get_inputs()[0].name 
          input_data={input_name:img_array.astype(np.float32)}

          # Run the ONNX model
          pred_onnx=sess.run(None,input_data)

          # Extract prediction results
          predictions=pred_onnx[0]
          classes=["Glioma.","Meningioma.","Not a tumor.","Pituitary."]
          predicted_class=classes[np.argmax(predictions)]
          confidence=predictions[0][np.argmax(predictions)]
          return predicted_class,confidence

user_image_path="./assets/braintest.jpg"

try:
          Image.open(user_image_path)

except Exception as e:
        print(f'Error opening the image. Please provide path without inverted commas.: {e}')
        exit()

predicted_class,confidence=predict_tumor_type_onnx(user_image_path)


print("Predicted Tumor Type: ",predicted_class)
print("Confidence: ", confidence)