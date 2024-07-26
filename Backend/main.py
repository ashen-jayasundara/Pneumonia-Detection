from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import torch
import torch.nn as nn
import torchvision.transforms as transforms


app = Flask(__name__)
cors = CORS(app, origins='*')


# Define the ConvolutionalVisionTransformer model
class ConvolutionalVisionTransformer(nn.Module):
    def __init__(self, num_classes=2):
        super(ConvolutionalVisionTransformer, self).__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
        self.layer1 = self._make_layer(64, 128, 3)
        self.layer2 = self._make_layer(128, 256, 4, stride=2)
        self.layer3 = self._make_layer(256, 512, 6, stride=2)
        self.layer4 = self._make_layer(512, 1024, 3, stride=2)
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model=1024, nhead=8), num_layers=6)
        self.fc = nn.Linear(1024, num_classes)

    def _make_layer(self, in_channels, out_channels, blocks, stride=1):
        layers = []
        layers.append(nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=stride, bias=False))
        layers.append(nn.BatchNorm2d(out_channels))
        layers.append(nn.ReLU(inplace=True))
        for _ in range(1, blocks):
            layers.append(nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1, bias=False))
            layers.append(nn.BatchNorm2d(out_channels))
            layers.append(nn.ReLU(inplace=True))
        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        x = x.unsqueeze(1)  # Add sequence dimension
        x = self.transformer(x)
        x = x.squeeze(1)
        x = self.fc(x)
        return x

# Load your pre-trained model
model = ConvolutionalVisionTransformer(num_classes=2)
model.load_state_dict(torch.load('equalsized_7_21_14.pth', map_location=torch.device('cpu')))
model.eval()

# Define the transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = transform(img).unsqueeze(0)
        
        with torch.no_grad():
            outputs = model(img)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            percentage = probabilities[1].item() * 100
            label = 'Pneumonia' if percentage > 50 else 'Normal'
        
        return jsonify({'label': label, 'percentage': percentage})

@app.route('/api/users', methods=['GET'])

def get_users():
    return jsonify({'users': ['John', 'Alice', 'Bob']})

if __name__ == '__main__':
    app.run(debug=True, port='8080')