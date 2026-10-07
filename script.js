// ========================================================
// PORTFOLIO JAVASCRIPT: NIGHT MODE TOGGLE & INTERACTIONS
// Uses CSS Media Query default detection with manual override
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const heroThemeToggleBtn = document.getElementById('hero-theme-toggle');
  const themeStatusText = document.getElementById('theme-status-text');
  const htmlElement = document.documentElement;

  // Media Query for Browser Default Theme Detection
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Check if user previously saved a manual preference
  const savedTheme = localStorage.getItem('theme');

  function getEffectiveTheme() {
    if (savedTheme) {
      return savedTheme;
    }
    return darkModeMediaQuery.matches ? 'dark' : 'light';
  }

  function updateThemeUI(theme, isAuto = false) {
    if (theme) {
      htmlElement.setAttribute('data-theme', theme);
    } else {
      htmlElement.removeAttribute('data-theme');
    }

    const currentMode = theme || (darkModeMediaQuery.matches ? 'dark' : 'light');
    const labelText = isAuto 
      ? (currentMode === 'dark' ? 'AUTO [NIGHT]' : 'AUTO [LIGHT]') 
      : (currentMode === 'dark' ? 'NIGHT' : 'LIGHT');

    if (themeStatusText) {
      themeStatusText.textContent = labelText;
    }

    const nextLabel = currentMode === 'dark' ? 'Switch to light mode' : 'Switch to night mode';
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', nextLabel);
      themeToggleBtn.setAttribute('title', nextLabel);
    }
    if (heroThemeToggleBtn) {
      heroThemeToggleBtn.setAttribute('aria-label', nextLabel);
      heroThemeToggleBtn.setAttribute('title', nextLabel);
    }
  }

  // Initialize theme on page load
  if (savedTheme) {
    updateThemeUI(savedTheme, false);
  } else {
    // Rely on CSS media query detection by default
    updateThemeUI(darkModeMediaQuery.matches ? 'dark' : 'light', true);
  }

  // Listen to browser / system default theme changes live
  darkModeMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      updateThemeUI(newSystemTheme, true);
    }
  });

  // Toggle function for both header and in-hero buttons
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || (darkModeMediaQuery.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme, false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (heroThemeToggleBtn) {
    heroThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Mobile navigation drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dynamic copyright year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================================
  // 3. PIXEL ART SKILLS SECTION: INTERACTIVE ENGINE
  // - Category filtering (All, Languages, AI/ML, Frameworks, Tools)
  // - Real-time keyword search
  // - Interactive Retro Skill Inspector HUD & Telemetry
  // - 8-Bit Web Audio Sound Effects Engine
  // - Animated 10-segment stamina progress bar fill
  // ========================================================

  const skillsData = {
    python: {
      name: "Python",
      kicker: "CORE PROGRAMMING LANGUAGE",
      rank: "RANK: MASTER",
      level: "LVL: 95/100",
      status: "STATUS: EQUIPPED",
      desc: "Primary multi-paradigm language applied in developing high-throughput AI pipelines, asynchronous REST APIs, and automated sensor data streaming architectures.",
      checklist: [
        "Dynamic object-oriented programming & clean modular modules",
        "Deep learning model training and hyperparameter search",
        "High-performance asynchronous data fetching & stream processing"
      ],
      metrics: { prod: 96, algo: 94, opt: 92, clean: 98 },
      filename: "python_pipeline.py",
      code: `import torch, asyncio
from pydantic import BaseModel

class InferencePipeline:
    def __init__(self, model_name: str):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.engine = load_weights(model_name).to(self.device)

    async def predict(self, tensor_payload):
        return await self.engine.forward(tensor_payload)`
    },
    cpp: {
      name: "C++",
      kicker: "SYSTEMS & ALGORITHMIC COMPUTING",
      rank: "RANK: EXPERT",
      level: "LVL: 88/100",
      status: "STATUS: READY",
      desc: "Low-level systems programming emphasizing RAII, manual memory management, pointer safety, and high-frequency sensor signal processing.",
      checklist: [
        "Cache-efficient memory structures & custom allocators",
        "STL container optimization & deterministic latency",
        "Embedded hardware interfacing & sensor loop interrupts"
      ],
      metrics: { prod: 91, algo: 95, opt: 96, clean: 90 },
      filename: "sensor_fast_buffer.cpp",
      code: `#include <vector>
#include <algorithm>

template <typename T>
class CircularSensorBuffer {
private:
    std::vector<T> data_;
    size_t head_ = 0;
public:
    explicit CircularSensorBuffer(size_t capacity) : data_(capacity, 0) {}
    inline void push(T val) noexcept {
        data_[head_ = (head_ + 1) % data_.size()] = val;
    }
};`
    },
    sql: {
      name: "SQL",
      kicker: "RELATIONAL DATABASE ARCHITECTURE",
      rank: "RANK: EXPERT",
      level: "LVL: 90/100",
      status: "STATUS: READY",
      desc: "Relational database modeling, query tuning, indexing strategies, analytical window functions, and transactional integrity guarantees.",
      checklist: [
        "Complex multi-table analytical joins & CTE subqueries",
        "B-tree and composite indexing for high-QPS lookups",
        "Normalized relational schema & foreign key integrity"
      ],
      metrics: { prod: 93, algo: 89, opt: 94, clean: 95 },
      filename: "query_analytics.sql",
      code: `WITH TelemetryRanked AS (
  SELECT 
    device_id, reading_val, recorded_at,
    ROW_NUMBER() OVER (PARTITION BY device_id ORDER BY recorded_at DESC) as rnk
  FROM sensor_readings
  WHERE recorded_at >= NOW() - INTERVAL '24 HOURS'
)
SELECT device_id, reading_val FROM TelemetryRanked WHERE rnk = 1;`
    },
    ml: {
      name: "Machine Learning",
      kicker: "STATISTICAL AI & PREDICTIVE MODELS",
      rank: "RANK: MASTER",
      level: "LVL: 92/100",
      status: "STATUS: READY",
      desc: "End-to-end predictive modeling covering supervised classification, regression, dimensionality reduction, and cross-validation pipelines.",
      checklist: [
        "Hypothesis testing, outlier detection & feature engineering",
        "Ensemble modeling: Random Forests, Gradient Boosted Trees",
        "Rigorous hyperparameter tuning & precision-recall trade-offs"
      ],
      metrics: { prod: 92, algo: 94, opt: 91, clean: 94 },
      filename: "ml_ensemble_pipeline.py",
      code: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', GradientBoostingClassifier(n_estimators=150, learning_rate=0.05))
])
pipeline.fit(X_train, y_train)
accuracy = pipeline.score(X_test, y_test)`
    },
    dl: {
      name: "Deep Learning",
      kicker: "NEURAL NETWORK ARCHITECTURES",
      rank: "RANK: EXPERT",
      level: "LVL: 90/100",
      status: "STATUS: READY",
      desc: "Deep neural representations, custom loss objectives, backpropagation mathematical dynamics, and gradient descent optimization routines.",
      checklist: [
        "Multi-layer perceptron & deep residual block design",
        "AdamW & Cosine Annealing learning rate scheduling",
        "Overfitting mitigation via Dropout & Batch Normalization"
      ],
      metrics: { prod: 90, algo: 93, opt: 91, clean: 93 },
      filename: "neural_backprop.py",
      code: `import torch
import torch.nn as nn

class DeepResidualBlock(nn.Module):
    def __init__(self, channels: int):
        super().__init__()
        self.fc1 = nn.Linear(channels, channels)
        self.act = nn.GELU()
        self.norm = nn.LayerNorm(channels)

    def forward(self, x):
        return x + self.norm(self.act(self.fc1(x)))`
    },
    nlp: {
      name: "NLP",
      kicker: "NATURAL LANGUAGE PROCESSING",
      rank: "RANK: EXPERT",
      level: "LVL: 88/100",
      status: "STATUS: READY",
      desc: "Computational linguistics, BPE tokenization, dense semantic embeddings, similarity indexing, and transformer attention mechanisms.",
      checklist: [
        "Subword tokenization & vocabulary distribution analysis",
        "Vector cosine similarity & semantic retrieval",
        "Text classification, sentiment analysis & entity extraction"
      ],
      metrics: { prod: 89, algo: 91, opt: 88, clean: 92 },
      filename: "semantic_embedder.py",
      code: `from sentence_transformers import SentenceTransformer
import numpy as np

encoder = SentenceTransformer('all-MiniLM-L6-v2')
doc_vectors = encoder.encode(["Document A", "Document B"])
query_vector = encoder.encode(["Search query"])

cosine_sim = np.dot(doc_vectors, query_vector.T)`
    },
    cv: {
      name: "Computer Vision",
      kicker: "SPATIAL IMAGE PERCEPTION",
      rank: "RANK: ADVANCED",
      level: "LVL: 86/100",
      status: "STATUS: READY",
      desc: "Image tensor preprocessing, convolution kernels, feature maps, object bounding reticles, and spatial neural architectures.",
      checklist: [
        "Convolutional Neural Networks (CNNs) & feature filters",
        "Image augmentation, normalization, & tensor reshaping",
        "Precipitation & sensor camera optical pattern detection"
      ],
      metrics: { prod: 86, algo: 90, opt: 87, clean: 91 },
      filename: "vision_cnn_module.py",
      code: `import torch.nn as nn

class ConvFeatureExtractor(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )`
    },
    genai: {
      name: "Generative AI",
      kicker: "FRONTIER LLMS & AGENTIC ARCHITECTURES",
      rank: "RANK: MASTER",
      level: "LVL: 91/100",
      status: "STATUS: READY",
      desc: "Retrieval-augmented generation (RAG) pipelines, context caching, prompt evaluation benchmarks, and multi-step agent orchestration.",
      checklist: [
        "Vector DB hybrid search & context window augmentation",
        "Few-shot structured JSON schema prompting",
        "Agent reasoning loops & function tool calling"
      ],
      metrics: { prod: 93, algo: 92, opt: 90, clean: 95 },
      filename: "rag_orchestrator.py",
      code: `async def query_rag_engine(user_prompt: str, vector_store):
    relevant_chunks = await vector_store.search(user_prompt, k=4)
    system_ctx = "\\n".join([c.text for c in relevant_chunks])
    return await llm_client.generate(
        system_instruction=f"Context:\\n{system_ctx}",
        prompt=user_prompt
    )`
    },
    pytorch: {
      name: "PyTorch",
      kicker: "DEEP LEARNING TENSOR FRAMEWORK",
      rank: "RANK: MASTER",
      level: "LVL: 93/100",
      status: "STATUS: READY",
      desc: "Dynamic tensor computation, automatic differentiation (Autograd), CUDA tensor acceleration, and modular nn.Module architectures.",
      checklist: [
        "Custom autograd backward functions & tensor operations",
        "Multi-GPU distributed training with DDP",
        "TorchScript JIT model compilation & latency reduction"
      ],
      metrics: { prod: 94, algo: 93, opt: 95, clean: 93 },
      filename: "train_loop_step.py",
      code: `import torch

scaler = torch.cuda.amp.GradScaler()
for batch_x, batch_y in dataloader:
    optimizer.zero_grad(set_to_none=True)
    with torch.cuda.amp.autocast():
        loss = criterion(model(batch_x.cuda()), batch_y.cuda())
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`
    },
    tensorflow: {
      name: "TensorFlow",
      kicker: "PRODUCTION ML & GRAPH EXECUTION",
      rank: "RANK: EXPERT",
      level: "LVL: 87/100",
      status: "STATUS: READY",
      desc: "Static graph computation with tf.function, Keras functional API, SavedModel format, and serving production inference containers.",
      checklist: [
        "Keras functional API & custom callbacks",
        "TensorFlow Dataset (tf.data) streaming pipelines",
        "Model quantization & TFLite embedded deployment"
      ],
      metrics: { prod: 90, algo: 88, opt: 91, clean: 90 },
      filename: "tf_saved_model.py",
      code: `import tensorflow as tf

@tf.function(input_signature=[tf.TensorSpec(shape=[None, 32], dtype=tf.float32)])
def serve_inference(x_input):
    return export_model(x_input)

tf.saved_model.save(export_model, "prod_export/v1", signatures={'serving_default': serve_inference})`
    },
    sklearn: {
      name: "Scikit-learn",
      kicker: "CLASSICAL MACHINE LEARNING PIPELINES",
      rank: "RANK: MASTER",
      level: "LVL: 92/100",
      status: "STATUS: READY",
      desc: "Pre-processing transformations, scikit-learn composable pipelines, classification, cross-validated hyperparameter grids, and model evaluation metrics.",
      checklist: [
        "ColumnTransformer heterogeneous preprocessing",
        "Stratified K-Fold validation & ROC-AUC evaluation",
        "Principal Component Analysis (PCA) dimensionality reduction"
      ],
      metrics: { prod: 93, algo: 92, opt: 91, clean: 96 },
      filename: "sklearn_pipeline.py",
      code: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), num_cols),
    ('cat', OneHotEncoder(drop='first'), cat_cols)
])
full_pipeline = Pipeline([('prep', preprocessor), ('clf', LogisticRegression())])`
    },
    fastapi: {
      name: "FastAPI",
      kicker: "HIGH-PERFORMANCE ASYNC REST APIS",
      rank: "RANK: EXPERT",
      level: "LVL: 90/100",
      status: "STATUS: READY",
      desc: "High-throughput asynchronous Python microservices, strict Pydantic v2 schemas, automated OpenAPI documentation, and dependency injection.",
      checklist: [
        "Non-blocking async event loop endpoints",
        "Strict request/response type validation via Pydantic",
        "JWT authentication middleware & CORS protection"
      ],
      metrics: { prod: 95, algo: 88, opt: 93, clean: 97 },
      filename: "api_routes.py",
      code: `from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Sensor & AI Inference API", version="2.0")

class InferencePayload(BaseModel):
    sensor_id: str
    readings: list[float]

@app.post("/api/v1/predict")
async def predict_status(payload: InferencePayload):
    return {"status": "ok", "alert_level": analyze(payload.readings)}`
    },
    pandas: {
      name: "Pandas",
      kicker: "DATA WRANGLING & DATAFRAMES",
      rank: "RANK: MASTER",
      level: "LVL: 94/100",
      status: "STATUS: READY",
      desc: "DataFrame manipulation, ETL cleaning pipelines, vectorized datetime parsing, group aggregations, and multi-index reshaping.",
      checklist: [
        "Efficient vectorized masking & data sanitization",
        "Resampling, rolling windows & temporal sensor analysis",
        "Merge, concat, and pivot tables without data loss"
      ],
      metrics: { prod: 96, algo: 91, opt: 93, clean: 95 },
      filename: "pandas_etl_cleaning.py",
      code: `import pandas as pd

df = pd.read_csv("telemetry_logs.csv", parse_dates=["timestamp"])
df["clean_val"] = df["reading"].clip(lower=0.0, upper=100.0)
hourly_agg = df.set_index("timestamp").resample("1H")["clean_val"].agg(["mean", "max", "count"])
print(hourly_agg.head())`
    },
    numpy: {
      name: "NumPy",
      kicker: "VECTORIZED NUMERICAL COMPUTING",
      rank: "RANK: MASTER",
      level: "LVL: 92/100",
      status: "STATUS: READY",
      desc: "Multi-dimensional ndarray operations, broadcasting arithmetic, matrix linear algebra decompositions, and low-level memory striding.",
      checklist: [
        "Vectorized broadcasting eliminating Python loop bottlenecks",
        "Linear algebra matrix dot products & eigenvalues",
        "Fast Fourier Transforms (FFT) for sensor wave analysis"
      ],
      metrics: { prod: 94, algo: 95, opt: 97, clean: 94 },
      filename: "numpy_broadcasting.py",
      code: `import numpy as np

sensor_matrix = np.random.randn(1000, 64)
weights = np.random.randn(64, 16)
# Vectorized matrix transformation with zero loop overhead
normalized = (sensor_matrix - sensor_matrix.mean(axis=0)) / sensor_matrix.std(axis=0)
projection = np.dot(normalized, weights)`
    },
    git: {
      name: "Git",
      kicker: "DISTRIBUTED VERSION CONTROL",
      rank: "RANK: MASTER",
      level: "LVL: 91/100",
      status: "STATUS: READY",
      desc: "Source tree hygiene, atomic commit conventions, interactive rebasing, branch management, cherry-picking, and merge conflict resolution.",
      checklist: [
        "Feature branch lifecycle & git flow conventions",
        "Interactive rebase (squash / reword) for clean linear history",
        "Git bisect for rapid regression bug localization"
      ],
      metrics: { prod: 95, algo: 90, opt: 92, clean: 98 },
      filename: "git_workflow.sh",
      code: `# Branch hygiene & atomic rebase workflow
git checkout -b feature/sensor-alert-pipeline
git add -p
git commit -m "feat(sensor): implement non-blocking rain threshold alerts"
git fetch origin main && git rebase -i origin/main`
    },
    github: {
      name: "GitHub",
      kicker: "COLLABORATIVE CI/CD & REPO OPS",
      rank: "RANK: MASTER",
      level: "LVL: 93/100",
      status: "STATUS: READY",
      desc: "Collaborative software engineering: pull request reviews, GitHub Actions automation, release artifact packaging, and security secret scanning.",
      checklist: [
        "Automated GitHub Actions CI/CD matrix testing",
        "Detailed Pull Request documentation & code review rigor",
        "Protected branch rules & automated vulnerability alerts"
      ],
      metrics: { prod: 97, algo: 89, opt: 92, clean: 98 },
      filename: "ci_pipeline.yml",
      code: `name: Continuous Integration & Verification
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt && pytest --cov=src`
    }
  };

  // ----------------------------------------------------
  // 8-BIT WEB AUDIO SFX ENGINE
  // ----------------------------------------------------
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem('pixel_sfx') === 'true';
  const sfxToggleBtn = document.getElementById('pixel-sfx-toggle');

  function updateSfxButtonUI() {
    if (!sfxToggleBtn) return;
    const icon = sfxToggleBtn.querySelector('.sfx-icon');
    const text = sfxToggleBtn.querySelector('.sfx-text');
    if (sfxEnabled) {
      if (icon) icon.textContent = '🔊';
      if (text) text.textContent = 'SFX: ON';
      sfxToggleBtn.classList.add('active-sfx');
    } else {
      if (icon) icon.textContent = '🔇';
      if (text) text.textContent = 'SFX: OFF';
      sfxToggleBtn.classList.remove('active-sfx');
    }
  }
  updateSfxButtonUI();

  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('pixel_sfx', sfxEnabled);
      updateSfxButtonUI();
      if (sfxEnabled) {
        play8BitSound(587.33, 'triangle', 0.08); // D5 chime
      }
    });
  }

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function play8BitSound(freq, type = 'square', duration = 0.05) {
    if (!sfxEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function playArpeggio() {
    if (!sfxEnabled) return;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((f, i) => {
      setTimeout(() => play8BitSound(f, 'square', 0.06), i * 50);
    });
  }

  // ----------------------------------------------------
  // FILTERING & LIVE SEARCH
  // ----------------------------------------------------
  const filterTabs = document.querySelectorAll('.pixel-tab');
  const skillCards = document.querySelectorAll('.pixel-card');
  const searchInput = document.getElementById('pixel-skill-search');
  const searchClearBtn = document.getElementById('pixel-search-clear');
  const activeCountEl = document.getElementById('hud-active-count');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;
    const q = searchQuery.toLowerCase().trim();

    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = (!q || text.includes(q));

      if (matchesCat && matchesSearch) {
        card.classList.remove('filtered-out');
        visibleCount++;
      } else {
        card.classList.add('filtered-out');
      }
    });

    if (activeCountEl) {
      activeCountEl.textContent = visibleCount;
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = tab.getAttribute('data-filter') || 'all';
      play8BitSound(440, 'triangle', 0.04);
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });
  }

  // ----------------------------------------------------
  // RETRO SKILL INSPECTOR HUD SYNC
  // ----------------------------------------------------
  const inspectorIconWrap = document.getElementById('inspector-icon-display');
  const inspectorKicker = document.getElementById('inspector-category-kicker');
  const inspectorTitle = document.getElementById('inspector-skill-title');
  const inspectorRankPill = document.getElementById('inspector-rank-pill');
  const inspectorLevelPill = document.getElementById('inspector-level-pill');
  const inspectorStatusPill = document.getElementById('inspector-status-pill');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorChecklist = document.getElementById('inspector-checklist');
  const inspectorFilename = document.getElementById('inspector-code-filename');
  const inspectorCode = document.getElementById('inspector-code-snippet');
  const inspectorLog = document.getElementById('inspector-log');
  const inspectorLogText = document.getElementById('inspector-log-text');
  const runTestBtn = document.getElementById('inspector-run-test-btn');

  const metricProd = document.getElementById('metric-prod');
  const metricProdFill = document.getElementById('metric-prod-fill');
  const metricAlgo = document.getElementById('metric-algo');
  const metricAlgoFill = document.getElementById('metric-algo-fill');
  const metricOpt = document.getElementById('metric-opt');
  const metricOptFill = document.getElementById('metric-opt-fill');
  const metricClean = document.getElementById('metric-clean');
  const metricCleanFill = document.getElementById('metric-clean-fill');

  function updateInspector(skillId, cardElement) {
    const data = skillsData[skillId];
    if (!data) return;

    // Update active visual on cards
    skillCards.forEach(c => c.classList.remove('active-equipped'));
    if (cardElement) {
      cardElement.classList.add('active-equipped');
    }

    // Sync icon SVG clone
    if (inspectorIconWrap && cardElement) {
      const sourceSvg = cardElement.querySelector('.pixel-icon-svg');
      if (sourceSvg) {
        inspectorIconWrap.innerHTML = sourceSvg.outerHTML;
      }
    }

    if (inspectorKicker) inspectorKicker.textContent = data.kicker;
    if (inspectorTitle) inspectorTitle.textContent = data.name;
    if (inspectorRankPill) inspectorRankPill.textContent = data.rank;
    if (inspectorLevelPill) inspectorLevelPill.textContent = data.level;
    if (inspectorStatusPill) inspectorStatusPill.textContent = data.status;
    if (inspectorDesc) inspectorDesc.textContent = data.desc;

    if (inspectorChecklist) {
      inspectorChecklist.innerHTML = data.checklist.map(item => `<li>${item}</li>`).join('');
    }

    // Update Telemetry metrics
    if (metricProd) metricProd.textContent = data.metrics.prod + '%';
    if (metricProdFill) metricProdFill.style.width = data.metrics.prod + '%';
    if (metricAlgo) metricAlgo.textContent = data.metrics.algo + '%';
    if (metricAlgoFill) metricAlgoFill.style.width = data.metrics.algo + '%';
    if (metricOpt) metricOpt.textContent = data.metrics.opt + '%';
    if (metricOptFill) metricOptFill.style.width = data.metrics.opt + '%';
    if (metricClean) metricClean.textContent = data.metrics.clean + '%';
    if (metricCleanFill) metricCleanFill.style.width = data.metrics.clean + '%';

    // Update code snippet
    if (inspectorFilename) inspectorFilename.textContent = data.filename;
    if (inspectorCode) inspectorCode.textContent = data.code;

    // Reset log
    if (inspectorLog) inspectorLog.style.display = 'none';
  }

  // Attach card event listeners
  skillCards.forEach(card => {
    const skillId = card.getAttribute('data-skill-id');

    card.addEventListener('click', () => {
      playArpeggio();
      updateInspector(skillId, card);
    });

    card.addEventListener('mouseenter', () => {
      play8BitSound(330, 'square', 0.02);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playArpeggio();
        updateInspector(skillId, card);
      }
    });
  });

  // Initialize with Python
  const initialCard = document.querySelector('.pixel-card[data-skill-id="python"]');
  if (initialCard) {
    updateInspector('python', initialCard);
  }

  // Simulated Test Run
  if (runTestBtn) {
    runTestBtn.addEventListener('click', () => {
      playArpeggio();
      if (!inspectorLog || !inspectorLogText) return;
      inspectorLog.style.display = 'flex';
      inspectorLogText.textContent = 'Executing test suite...';

      setTimeout(() => {
        const activeCard = document.querySelector('.pixel-card.active-equipped');
        const activeName = activeCard ? activeCard.querySelector('.skill-name').textContent : 'Selected Skill';
        inspectorLogText.textContent = `PASS: [${activeName}] Verified (100% assertions passed, latency: 11ms) ✨`;
        play8BitSound(880, 'triangle', 0.1);
      }, 350);
    });
  }

  // ----------------------------------------------------
  // ANIMATED PROGRESS BAR FILL ON SCROLL
  // ----------------------------------------------------
  const skillsSection = document.getElementById('skills');
  const meterFills = document.querySelectorAll('.pixel-meter-fill');

  if ('IntersectionObserver' in window && skillsSection) {
    // Set initial width to 0
    meterFills.forEach(fill => {
      const targetWidth = fill.style.width;
      fill.setAttribute('data-target-width', targetWidth);
      fill.style.width = '0%';
    });

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          meterFills.forEach((fill, index) => {
            setTimeout(() => {
              const target = fill.getAttribute('data-target-width') || '90%';
              fill.style.width = target;
            }, index * 40);
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  }
});
