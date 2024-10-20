const predefinedRoadmaps = {
    "Web Development": {
        stages: [
            { stage: "Introduction to HTML", difficulty: "beginner", description: "Learn the structure of web pages using HTML." },
            { stage: "Introduction to CSS", difficulty: "beginner", description: "Learn how to style web pages with CSS." },
            { stage: "JavaScript Basics", difficulty: "intermediate", description: "Learn programming fundamentals using JavaScript." },
            { stage: "Advanced JavaScript and Frameworks", difficulty: "advanced", description: "Dive into JS frameworks like React or Vue." }
        ],
        videos: [
            { title: "HTML Crash Course", url: "https://www.youtube.com/embed/UB1O30fR-EE" },
            { title: "CSS Crash Course", url: "https://www.youtube.com/embed/yfoY53QXEnI" }
        ]
    },
    "Machine Learning": {
        stages: [
            { stage: "Introduction to Machine Learning", difficulty: "beginner", description: "Learn the basics of machine learning." },
            { stage: "Data Preprocessing", difficulty: "beginner", description: "Understand how to clean and prepare data." },
            { stage: "Building Models", difficulty: "intermediate", description: "Learn about various ML algorithms." },
            { stage: "Advanced Deep Learning", difficulty: "advanced", description: "Master advanced topics like neural networks." }
        ],
        videos: [
            { title: "Machine Learning Introduction", url: "https://www.youtube.com/embed/GwIo3gDZCVQ" }
        ]
    }
};

let currentRoadmap = [];

// Function to generate a dynamic roadmap based on user input
function generateRoadmap() {
    const topic = document.getElementById('topicInput').value;
    if (!predefinedRoadmaps[topic]) {
        alert("Roadmap not available for this topic!");
        return;
    }

    currentRoadmap = predefinedRoadmaps[topic].stages;

    // Clear previous roadmap
    const roadmapContainer = document.getElementById('roadmap-container');
    roadmapContainer.innerHTML = '';
    
    // Display roadmap section
    document.getElementById('roadmap-section').classList.remove('hidden');
    document.getElementById('downloadBtn').classList.remove('hidden');

    // Generate roadmap items
    currentRoadmap.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'roadmap-item';
        li.innerHTML = `
            <span>${item.stage}</span>
            <input type="checkbox" class="roadmap-checkbox" onchange="updateProgress()">
        `;
        li.addEventListener('click', () => toggleDescription(index));
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'roadmap-description';
        descriptionDiv.innerText = item.description;
        li.appendChild(descriptionDiv);
        roadmapContainer.appendChild(li);
    });

    // Display resources section
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    predefinedRoadmaps[topic].videos.forEach(video => {
        const iframe = document.createElement('iframe');
        iframe.src = video.url;
        iframe.title = video.title;
        videoContainer.appendChild(iframe);
    });

    document.getElementById('resources-section').classList.remove('hidden');
    updateProgress();
}

// Function to toggle description
function toggleDescription(index) {
    const descriptions = document.querySelectorAll('.roadmap-description');
    descriptions[index].classList.toggle('hidden');
}

// Function to suggest topics dynamically
function suggestTopics() {
    const input = document.getElementById('topicInput').value;
    const suggestions = document.getElementById('topicSuggestions');
    suggestions.innerHTML = '';

    const matchingTopics = Object.keys(predefinedRoadmaps).filter(topic => topic.toLowerCase().includes(input.toLowerCase()));
    matchingTopics.forEach(topic => {
        const div = document.createElement('div');
        div.innerText = topic;
        div.addEventListener('click', () => {
            document.getElementById('topicInput').value = topic;
            suggestions.innerHTML = '';
        });
        suggestions.appendChild(div);
    });
}

// Function to filter roadmap based on difficulty
function filterRoadmap() {
    const difficulty = document.getElementById('difficulty').value;
    const roadmapContainer = document.getElementById('roadmap-container');
    roadmapContainer.innerHTML = '';

    currentRoadmap.forEach((item, index) => {
        if (difficulty === 'all' || item.difficulty === difficulty) {
            const li = document.createElement('li');
            li.className = 'roadmap-item';
            li.innerHTML = `
                <span>${item.stage}</span>
                <input type="checkbox" class="roadmap-checkbox" onchange="updateProgress()">
            `;
            li.addEventListener('click', () => toggleDescription(index));
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'roadmap-description';
            descriptionDiv.innerText = item.description;
            li.appendChild(descriptionDiv);
            roadmapContainer.appendChild(li);
        }
    });

    updateProgress();
}

// Function to update progress bar
function updateProgress() {
    const checkboxes = document.querySelectorAll('.roadmap-checkbox');
    const completed = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progress = (completed / checkboxes.length) * 100;
    document.getElementById('progressBar').value = progress;
}

// Function to download roadmap as text file
function downloadRoadmap() {
    let text = 'Your Learning Roadmap:\n\n';
    currentRoadmap.forEach((item, index) => {
        text += `${index + 1}. ${item.stage} - ${item.description}\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'roadmap.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Function to toggle light/dark theme
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    themeBtn.textContent = body.classList.contains('dark-theme') ? '☀️ Light Mode' : '🌙 Dark Mode';
}
