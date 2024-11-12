// Fetch and initialize the notes data
let notesData = null;

async function fetchNotesData() {
    try {
        const response = await fetch('notes-data.json');
        notesData = await response.json();
        initializeSemesters();
    } catch (error) {
        console.error('Error loading notes data:', error);
    }
}

// Initialize semester dropdown
function initializeSemesters() {
    const semesterSelect = document.getElementById('semesterSelect');
    const semesters = notesData.semesters;

    // Clear existing options except the first one
    semesterSelect.innerHTML = '<option value="">Select Semester</option>';

    // Add semester options
    semesters.forEach(semester => {
        const option = document.createElement('option');
        option.value = semester.id;
        option.textContent = semester.name;
        semesterSelect.appendChild(option);
    });
}

// Handle semester selection
document.getElementById('semesterSelect').addEventListener('change', function(e) {
    const subjectSelect = document.getElementById('subjectSelect');
    const selectedSemesterId = e.target.value;

    if (selectedSemesterId) {
        const semester = notesData.semesters.find(sem => sem.id === selectedSemesterId);
        populateSubjects(semester.subjects);
        subjectSelect.disabled = false;
    } else {
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        subjectSelect.disabled = true;
        clearNotes();
    }
});

// Handle subject selection
document.getElementById('subjectSelect').addEventListener('change', function(e) {
    const selectedSubjectId = e.target.value;
    const selectedSemesterId = document.getElementById('semesterSelect').value;

    if (selectedSubjectId && selectedSemesterId) {
        const semester = notesData.semesters.find(sem => sem.id === selectedSemesterId);
        const subject = semester.subjects.find(sub => sub.id === selectedSubjectId);
        displayNotes(subject.notes);
    } else {
        clearNotes();
    }
});

// Populate subjects dropdown
function populateSubjects(subjects) {
    const subjectSelect = document.getElementById('subjectSelect');
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';

    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });
}

// Format date for display
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Display notes in the grid
function displayNotes(notes) {
    const notesGrid = document.getElementById('notesGrid');
    
    if (!notes || notes.length === 0) {
        notesGrid.innerHTML = '<div class="no-notes">No notes available for this subject.</div>';
        return;
    }

    notesGrid.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3 class="note-title">${note.title}</h3>
            <div class="note-info">
                <div>${note.description}</div>
                <div style="margin-top: 0.5rem">
                    ${note.pageCount} pages • ${note.type} • Updated ${formatDate(note.uploadDate)}
                </div>
            </div>
            <a href="${note.driveLink}" target="_blank" class="note-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                Download Notes
            </a>
        </div>
    `).join('');
}

// Clear notes grid
function clearNotes() {
    const notesGrid = document.getElementById('notesGrid');
    notesGrid.innerHTML = '<div class="no-notes">Select a semester and subject to view notes.</div>';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchNotesData);
