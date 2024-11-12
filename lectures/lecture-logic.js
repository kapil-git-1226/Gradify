// app.js

class LecturesApp {
    constructor() {
        this.data = null;
        this.currentSemester = null;
        this.currentSubject = null;
        this.init();
    }

    async init() {
        try {
            // Fetch data
            const response = await fetch('lecture-data.json');
            this.data = await response.json();
            
            // Generate initial HTML
            this.generateHTML();
            
            // Setup event listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    generateHTML() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <nav class="navbar">
                <a href="#" class="logo">${this.data.navigation.logo}</a>
                <div class="nav-links">
                    ${this.data.navigation.links.map(link => 
                        `<a href="${link.url}">${link.text}</a>`
                    ).join('')}
                    <button class="profile-btn">Profile</button>
                </div>
            </nav>
            
            <main class="main-content">
                <h2>📺 Lectures</h2>
                
                <div class="selectors-container">
                    <div class="select-wrapper" id="semester-select">
                        <button class="select-btn">Select Semester</button>
                        <div class="dropdown-content">
                            ${Object.entries(this.data.semesters).map(([id, sem]) =>
                                `<button data-semester="${id}">${sem.name}</button>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="select-wrapper" id="subject-select" style="display: none;">
                        <button class="select-btn">Select Subject</button>
                        <div class="dropdown-content"></div>
                    </div>
                </div>
                
                <div id="video-grid" class="video-grid"></div>
            </main>
        `;
    }

    setupEventListeners() {
        // Handle dropdown toggles
        document.querySelectorAll('.select-wrapper').forEach(wrapper => {
            const btn = wrapper.querySelector('.select-btn');
            btn.addEventListener('click', () => {
                // Close other dropdowns
                document.querySelectorAll('.select-wrapper.active').forEach(w => {
                    if (w !== wrapper) w.classList.remove('active');
                });
                wrapper.classList.toggle('active');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.select-wrapper')) {
                document.querySelectorAll('.select-wrapper.active').forEach(w => 
                    w.classList.remove('active')
                );
            }
        });

        // Handle semester selection
        const semesterDropdown = document.querySelector('#semester-select .dropdown-content');
        semesterDropdown.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button) {
                this.handleSemesterSelect(button.dataset.semester);
            }
        });

        // Handle subject selection
        const subjectDropdown = document.querySelector('#subject-select .dropdown-content');
        subjectDropdown.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button) {
                this.handleSubjectSelect(button.dataset.subject);
            }
        });
    }

    handleSemesterSelect(semesterId) {
        this.currentSemester = semesterId;
        const semester = this.data.semesters[semesterId];
        
        // Update semester button text
        document.querySelector('#semester-select .select-btn').textContent = semester.name;
        
        // Update subject dropdown
        const subjectSelect = document.getElementById('subject-select');
        const subjectDropdown = subjectSelect.querySelector('.dropdown-content');
        
        subjectDropdown.innerHTML = Object.entries(semester.subjects).map(([id, subject]) =>
            `<button data-subject="${id}">${subject.name}</button>`
        ).join('');
        
        // Show subject select
        subjectSelect.style.display = 'block';
        
        // Reset subject selection
        subjectSelect.querySelector('.select-btn').textContent = 'Select Subject';
        document.getElementById('video-grid').innerHTML = '';
        
        // Close dropdown
        document.getElementById('semester-select').classList.remove('active');
    }

    handleSubjectSelect(subjectId) {
        this.currentSubject = subjectId;
        const subject = this.data.semesters[this.currentSemester].subjects[subjectId];
        
        // Update subject button text
        document.querySelector('#subject-select .select-btn').textContent = subject.name;
        
        // Display videos
        this.displayLectures(subject.lectures);
        
        // Close dropdown
        document.getElementById('subject-select').classList.remove('active');
    }

    displayLectures(lectures) {
        const videoGrid = document.getElementById('video-grid');
        videoGrid.innerHTML = lectures.map(lecture => {
            // Convert embed URL to regular YouTube URL
            const youtubeUrl = this.getYoutubeUrl(lecture.videoUrl);
            
            return `
                <a href="${youtubeUrl}" target="_blank" class="video-card">
                    <div class="video-thumbnail-wrapper">
                        <img class="video-thumbnail" src="${lecture.thumbnail}" alt="${lecture.title}">
                        <div class="play-icon">▶️</div>
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">${lecture.title}</h3>
                        <p class="video-description">${lecture.description}</p>
                    </div>
                </a>
            `;
        }).join('');
    }

    // Helper function to convert embed URL to regular YouTube URL
    getYoutubeUrl(embedUrl) {
        // Extract video ID from embed URL
        const videoId = embedUrl.split('/').pop();
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new LecturesApp();
});