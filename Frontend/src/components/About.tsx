import './../App.css';

const About = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 20px' }}>
      <h1>About Pneumonia Detection</h1>
      
      {/* Pneumonia Description */}
      <section style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '50px' }}>
        <h2>About Pneumonia</h2>
        <p>
          Pneumonia is an acute respiratory infection affecting the lungs, where the alveoli—tiny air sacs in the lungs—
          are filled with pus and fluid, making breathing painful and limiting oxygen intake. It is a significant public 
          health issue, particularly affecting children and the elderly. According to the World Health Organization (WHO), 
          pneumonia accounts for 15% of all deaths of children under five years old, causing an estimated 2.5 million 
          deaths annually, including 153,000 deaths in children under five.
        </p>
        <p>
          Traditionally, pneumonia diagnosis involves clinical examination and radiological tests, primarily chest X-rays,
          to visually confirm inflammation in the lungs. However, X-ray interpretation depends heavily on radiologist 
          expertise, and access to radiology equipment and trained personnel can be limited in low-resource settings. These
          limitations highlight the need for more reliable and accessible diagnostic methods, like those provided by deep 
          learning advancements.
        </p>
      </section>
      
      {/* Model Description */}
      <section style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '50px' }}>
        <h2>Our Model</h2>
        <p>
          Our pneumonia detection model combines two powerful deep learning architectures: Convolutional Neural Networks (CNNs)
          and Transformers. The model starts with convolutional layers for feature extraction, followed by transformer layers
          that capture long-range dependencies in the image data. It classifies chest X-ray images into two categories: 
          NORMAL and PNEUMONIA.
        </p>
        <p>
          The CNN layers reduce spatial dimensions and capture hierarchical features, which are then processed by transformer
          encoder layers that learn the global relationships across the image. The final layer outputs the classification 
          probabilities. This model was trained using the CrossEntropy loss function and the Adam optimizer, with a learning 
          rate scheduler ensuring efficient convergence during training.
        </p>
      </section>
      
      {/* Technologies Used */}
      <section style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2>Technologies Used</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" alt="Google Colab" width="80" />
            <p>Google Colab</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png" alt="Kaggle" width="80" />
            <p>Kaggle API</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://pytorch.org/assets/images/pytorch-logo.png" alt="PyTorch" width="80" />
            <p>PyTorch</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit-learn" width="80" />
            <p>Scikit-learn</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Flask_logo.svg/1200px-Flask_logo.svg.png" alt="Flask" width="80" />
            <p>Flask</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/React_Logo.svg" alt="React" width="80" />
            <p>React</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://vitejs.dev/logo.svg" alt="Vite" width="80" />
            <p>Vite</p>
          </div>
          <div style={{ margin: '20px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" alt="Bootstrap" width="80" />
            <p>Bootstrap</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
