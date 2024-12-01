class PYQApp {
    constructor() {
      this.subjects = {
        '1': ['C++', 'Engineering Mathematics'],
        '2': ['Data Structures Algorithms', 'Fundamental of Digital Logics'],
        '3': ['Operating Systems', 'Database Management'],
        '4': ['Software Engineering', 'Discrete Mathematics'],
        '5': ['Artificial Intelligence', 'Cyber Security'],
        '6': ['Web Technologies', 'Mobile Application Development'],
        '7': ['Data Science', 'Blockchain'],
        '8': ['Capstone Project', 'Advanced Machine Learning']
      };
      
      this.currentSemester = null;
      this.currentSubject = null;
      this.init();
    }
  
    init() {
      this.setupSemesterDropdown();
      this.setupEventListeners();
    }
  
    setupSemesterDropdown() {
      const semesterDropdown = document.querySelector('#semester-select .dropdown-content');
      semesterDropdown.innerHTML = Object.keys(this.subjects).map(semesterId => 
        `<button data-semester="${semesterId}">Semester ${semesterId}</button>`
      ).join('');
    }
  
    setupEventListeners() {
      // Dropdown toggle logic
      document.querySelectorAll('.select-wrapper').forEach(wrapper => {
        const btn = wrapper.querySelector('.select-btn');
        btn.addEventListener('click', () => {
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
  
      // Semester selection event delegation
      const semesterDropdown = document.querySelector('#semester-select .dropdown-content');
      semesterDropdown.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
          this.handleSemesterSelect(button.dataset.semester);
        }
      });
  
      // Subject selection event delegation
      const subjectDropdown = document.querySelector('#subject-select .dropdown-content');
      subjectDropdown.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
          this.handleSubjectSelect(button.textContent);
        }
      });
    }
  
    handleSemesterSelect(semesterId) {
      this.currentSemester = semesterId;
  
      // Update semester button text
      document.querySelector('#semester-select .select-btn').textContent = `Semester ${semesterId}`;
  
      const subjectSelect = document.getElementById('subject-select');
      const subjectDropdown = subjectSelect.querySelector('.dropdown-content');
  
      // Populate subject dropdown for selected semester
      subjectDropdown.innerHTML = this.subjects[semesterId].map(subject => 
        `<button data-subject="${subject}">${subject}</button>`
      ).join('');
  
      // Show subject dropdown
      subjectSelect.style.display = 'block';
      subjectSelect.querySelector('.select-btn').textContent = 'Select Subject';
  
      // Clear notes grid
      document.getElementById('notes-grid').innerHTML = '';
  
      // Close semester dropdown
      document.getElementById('semester-select').classList.remove('active');
    }
  
    handleSubjectSelect(subject) {
      this.currentSubject = subject;
  
      // Update subject button text
      document.querySelector('#subject-select .select-btn').textContent = subject;
  
      // Send selected semester and subject to backend
      this.fetchPYQs(this.currentSemester, this.currentSubject);
  
      // Close subject dropdown
      document.getElementById('subject-select').classList.remove('active');
    }

    fetchPYQs(semester, subject) {
      fetch(`http://localhost:3000/api/pyqs/getpyqs?semester=${semester}&subject=${encodeURIComponent(subject)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(pyqs => {
        console.log(pyqs)
        this.displayPYQs(pyqs);
      })
      .catch(error => {
        console.error('Error fetching PYQs:', error);
      });
    }
  
    displayPYQs(pyqs) {
      const notesGrid = document.getElementById('notes-grid');
      notesGrid.innerHTML = pyqs.map(pyq => `
        <div class="note-card">
          <a href="${pyq.pdfUrl}" target="_blank" class="note-link">
            <div class="note-thumbnail-wrapper">
              <img class="note-thumbnail" src="${pyq.thumbnail}" alt="${pyq.title}">
              <div class="pdf-icon">📄</div>
            </div>
            <div class="note-info">
              <h3 class="note-title">${pyq.title}</h3>
              <p class="note-description">${pyq.description}</p>
            </div>
          </a>
        </div>
      `).join('');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new PYQApp();
  });