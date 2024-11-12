class NotesApp {
    constructor() {
        this.data = null;
        this.currentSemester = null;
        this.currentSubject = null;
        this.init();
    }

    async init() {
        try {
            // Fetch data
            const response = await fetch('pyqs-page.json');
            this.data = await response.json();
            
            // Set page title
            document.title = this.data.pageTitle;
            
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
                    <button class="profile-btn">${this.data.navigation.profileButton.text}</button>
                </div>
            </nav>
            
            <main class="main-content">
                <h2>${this.data.mainContent.heading.icon} ${this.data.mainContent.heading.text}</h2>
                
                <div class="selectors-container">
                    <div class="select-wrapper" id="semester-select">
                        <button class="select-btn" aria-label="${this.data.mainContent.selectors.semester.aria}">
                            ${this.data.mainContent.selectors.semester.defaultText}
                        </button>
                        <div class="dropdown-content">
                            ${Object.entries(this.data.semesters).map(([id, sem]) =>
                                `<button data-semester="${id}">${sem.name}</button>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="select-wrapper" id="subject-select" style="display: none;">
                        <button class="select-btn" aria-label="${this.data.mainContent.selectors.subject.aria}">
                            ${this.data.mainContent.selectors.subject.defaultText}
                        </button>
                        <div class="dropdown-content"></div>
                    </div>
                </div>
                
                <div id="notes-grid" class="notes-grid"></div>
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
        subjectSelect.querySelector('.select-btn').textContent = 
            this.data.mainContent.selectors.subject.defaultText;
        document.getElementById('notes-grid').innerHTML = '';
        
        // Close dropdown
        document.getElementById('semester-select').classList.remove('active');
    }

    handleSubjectSelect(subjectId) {
        this.currentSubject = subjectId;
        const subject = this.data.semesters[this.currentSemester].subjects[subjectId];
        
        // Update subject button text
        document.querySelector('#subject-select .select-btn').textContent = subject.name;
        
        // Display notes
        this.displayNotes(subject.notes);
        
        // Close dropdown
        document.getElementById('subject-select').classList.remove('active');
    }

    displayNotes(notes) {
        const notesGrid = document.getElementById('notes-grid');
        notesGrid.innerHTML = notes.map(note => `
            <div class="note-card">
                <a href="${note.pdfUrl}" target="_blank" class="note-link">
                    <div class="note-thumbnail-wrapper">
                        <img class="note-thumbnail" src="${note.thumbnail}" alt="${note.title}">
                        <div class="pdf-icon">📄</div>
                    </div>
                    <div class="note-info">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-description">${note.description}</p>
                    </div>
                </a>
            </div>
        `).join('');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});