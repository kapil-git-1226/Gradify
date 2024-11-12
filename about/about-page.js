// Function to fetch team data from JSON file
async function fetchTeamData() {
    try {
        const response = await fetch('about-page.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading team data:', error);
        return null;
    }
}

// Function to create a member card
function createMemberCard(member) {
    return `
        <div class="team-member">
            <div class="member-photo">
                <img src="${member.photo}" alt="${member.name}">
            </div>
            <h3 class="member-name">${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <div class="social-links">
                <a href="mailto:${member.social.email}" title="Email">📧</a>
                <a href="${member.social.linkedin}" title="LinkedIn" target="_blank">💼</a>
                <a href="${member.social.github}" title="GitHub" target="_blank">📁</a>
            </div>
        </div>
    `;
}

// Function to render team section
function renderTeamSection(data, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = data.map(member => createMemberCard(member)).join('');
    }
}

// Initialize the page
async function initializePage() {
    const teamData = await fetchTeamData();
    if (teamData) {
        renderTeamSection(teamData.coreTeam, 'coreTeamGrid');
        renderTeamSection(teamData.guidance, 'guidanceGrid');
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);