<img src="https://github.com/puneeth072003/GfG-hackthon-project/assets/119479391/91b6981b-5ce1-4e9c-a9b6-58dbd9ea1ad2" alt="Visit" style="width: 200px; height: auto;">

---

# Vitista: Your Personal Health Companion

Vitista is a comprehensive personal healthcare app designed to empower individuals on their journey to optimal well-being. With a user-centric approach, Vitista integrates cutting-edge technology and user-friendly features to provide a holistic solution for health monitoring, fitness management, and overall wellness.

# Features

| Features                                | Description                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| User-Friendly Interface                 | Use a visually appealing and responsive design to enhance the user experience.    |
| BMI Tracking                            | Display the calculated BMI along with information about the user's weight status. |
| Breast Cancer Detection Algorithm       | Provide personalized diets based on user preferences, health and goals.           |
| Diet Suggestions                        | Provide personalized diets based on user preferences, health and goals.           |
| Integration with Google Fitness Tracker | Implement an algorithm that assesses breast cancer risk based on certain factors  |
| Sleep Cycle Monitoring                  | Analyze sleep patterns and provide suggestions for improving sleep quality.       |
| Educational Resources                   | Include articles explaining the dietary recommendations and other Blogs           |
| Mobile Optimization                     | Optimize the website for mobile devices for User Convinience.                     |
| Privacy and Security Measures           | Comply with relevant data protection regulations to build trust with users.       |
| Continuous Improvement                  | Regularly update and improve algorithms based on the latest research.             |
| Visualizations and Graphs               | Use graphs to represent sleep cycles, and other health-related data.              |

## Technologies Used

### Backend

| Technology             | Description                         |
| ---------------------- | ----------------------------------- |
| Golang                 | Server-side programming             |
| ONNX                   | Saved format of models              |
| Python                 | Running the machine learning models |
| Googleapis/fitness API | Gathering the sleep data            |
| MongoDB                | Database for storing the data       |
| GIN                    | Routing for the server              |
| Testify                | Testing framework                   |

---

### Frontend

| Technology   | Description                  |
| ------------ | ---------------------------- |
| React        | JavaScript library for UI    |
| Redux        | State management for React   |
| Axios        | HTTP client for API requests |
| shadcn/ui    | UI Components                |
| Tailwind CSS | UI Framework                 |
| SCSS/CSS     | Styling                      |
| Jest/Enzyme  | Testing                      |

---

# Getting started

1. Clone the repository
2. Run the frontend server
   ```bash
   cd Frontend && npm i && npm run dev
   ```
3. Run the backend server
   - setup the virtual environment
     ```bash
     cd Backend/script && pip install onnxruntime numpy pillow tensorflow
     ```
   - install the dependencies and run sever
     ```bash
     cd ../src/vitista && go mod tidy && go run .
     ```

---

# Contributors

We would like to thank the following contributors who have dedicated their time and effort to this project:

1. [@puneeth072003](https://github.com/puneeth072003)

   - Contribution: Backend devlopment.

2. [@soorya-u](https://github.com/soorya-u)

   - Contribution: Frontend development.

3. [@zaedhasan](https://github.com/zaedhasan)
   - Contribution: Model training.

## Directory Structure

```
└── Backend/
    └── src/
        └── vitista/
            ├── controllers/
            │   ├── connectDb.go
            │   ├── getAllSch.go
            │   ├── home.go
            │   └── schedule.go
            ├── dietPlanner/
            │   ├── BMI.go
            │   └── Planner.go
            ├── googleFit/
            │   ├── auth.go
            │   └── callback.go
            ├── login/
            │   ├── login.go
            │   └── signIn.go
            ├── runners/
            │   ├── imgProcessing.go
            │   └── modelProcessing.go
            ├── test/
            │   └── GetHome_test.go
            ├── .env
            ├── go.mod
            ├── main.go
            ├── .air.toml
            └── .gitignore

            .
└── Frontend/
    ├── public/
    │   └── favicon.ico
    ├── src/
    │   ├── assets/
    │   │   ├── bg-desktop.png
    │   │   ├── bg-tablet.png
    │   │   ├── bg-mobile.png
    │   │   ├── icon.png
    │   │   ├── logo.png
    │   │   └── default_profile_pic.png
    │   ├── components/
    │   │   ├── custom/
    │   │   │   └── Contains Custom Components
    │   │   └── ui/
    │   │       └── Contains UI Components
    │   ├── interface/
    │   │   └── index.ts
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── pages/
    │   │   ├── BMI/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Connect/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Diet/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Fit/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Form/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── home/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── NotFound/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── PersonalTracker/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   ├── Record/
    │   │   │   ├── index.tsx
    │   │   │   └── style.css
    │   │   └── RiskAssessment/
    │   │       ├── index.tsx
    │   │       └── style.css
    │   ├── redux/
    │   │   ├── hooks/
    │   │   │   └── index.ts
    │   │   ├── slices/
    │   │   │   ├── formPayload/
    │   │   │   │   └── index.ts
    │   │   │   ├── loadingSpinner/
    │   │   │   │   └── index.ts
    │   │   │   └── userStorage/
    │   │   │       └── index.ts
    │   │   └── store.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .env
    ├── .gitignore
    ├── .eslintrc.cjs
    ├── components.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.js
```
