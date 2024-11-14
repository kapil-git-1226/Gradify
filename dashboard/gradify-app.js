// Fetch and load JSON data
async function loadData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        console.log(data);
        initializePage(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}


function initializePage(data) {
    renderNavigation(data.navigation);
    renderMobileMenu(data.navigation.links);
    renderHeroSection(data.hero, data.features, data.importantDocuments);
}

function renderNavigation(navData) {
    const navContainer = document.querySelector('.nav-container');
    navContainer.innerHTML = ''; 

    const logo = document.createElement('a');
    logo.href = navData.logo.link;
    logo.className = 'logo';
    logo.textContent = navData.logo.text;
    navContainer.appendChild(logo);

    const navLinks = document.createElement('nav');
    navLinks.className = 'nav-links';
    navData.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.link;
        a.textContent = link.text;
        navLinks.appendChild(a);
    });
    navContainer.appendChild(navLinks);

    const profileBtn = document.createElement('button');
    profileBtn.className = 'profile-btn';
    profileBtn.textContent = 'Profile';
    navContainer.appendChild(profileBtn);

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.onclick = toggleMenu;
    
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('span');
        line.className = 'hamburger-line';
        hamburger.appendChild(line);
    }
    navContainer.appendChild(hamburger);
}

function renderMobileMenu(links) {
    const existingMenu = document.getElementById('mobileMenu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.link;
        a.textContent = link.text;
        mobileMenu.appendChild(a);
    });

    document.body.insertBefore(mobileMenu, document.querySelector('.main-content'));
}

function renderHeroSection(hero, features, documents) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = ''; 

    const heroSection = document.createElement('div');
    heroSection.className = 'hero-section';

    const heroText = document.createElement('div');
    heroText.className = 'hero-text';

    const title = document.createElement('h1');
    title.textContent = hero.title;
    heroText.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.textContent = hero.subtitle;
    heroText.appendChild(subtitle);

    hero.description.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        heroText.appendChild(p);
    });

    const featureButtons = document.createElement('div');
    featureButtons.className = 'feature-buttons';

    features.forEach(feature => {
        const link = document.createElement('a');
        link.href = feature.link;
        
        const button = document.createElement('button');
        button.className = 'feature-btn';
        
        const icon = document.createElement('span');
        icon.textContent = feature.icon;
        
        button.appendChild(icon);
        button.appendChild(document.createTextNode(feature.text));
        link.appendChild(button);
        featureButtons.appendChild(link);
    });
    heroText.appendChild(featureButtons);

    // Add important documents
    const importantDocs = document.createElement('div');
    importantDocs.className = 'important-docs';

    const docsTitle = document.createElement('h2');
    docsTitle.textContent = documents.title;
    importantDocs.appendChild(docsTitle);

    const docsGrid = document.createElement('div');
    docsGrid.className = 'docs-grid';

    documents.documents.forEach(doc => {
        const docLink = document.createElement('a');
        docLink.href = doc.link;
        docLink.className = 'doc-link';
        docLink.textContent = doc.text;

        const arrow = document.createElement('span');
        arrow.textContent = '↗';
        docLink.appendChild(arrow);

        docsGrid.appendChild(docLink);
    });

    importantDocs.appendChild(docsGrid);
    heroText.appendChild(importantDocs);
    heroSection.appendChild(heroText);
    mainContent.appendChild(heroSection);
}

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger-menu');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', loadData);
