const typingText = document.getElementById('typing-text');
const names = ['Phasacola Grey Kalista','Web Developer', 'Mahasiswa SI'];
let namaIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentName = names[nameIndex];
    if (isDeleting){
        typingText.textContent = currentName.substring(0,charIndex-1);
        charIndex--;
    } else {
        typingText.textContent =currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 50:100;
    if (!isDeleting && charIndex === currentName.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1)% names.length;
        delay = 500;
    }
    setTimeout(typeEffect, delay);
}
typeEffect();

    //

    const projects = [
        {title: 'Website Profil', desc:' Website Profil dengan HTML & CSS', image:'https://via.placeholder.com/300x200/2563eb/fff?text=profil'},{title:'Kalkulator JS', desc: 'Kalkulator interaktif', image:'https://via.placeholder.com/300x200/2563eb/fff?text=kalkulator'},{title: 'Form Interaktif', desc:'Form pendaftaran dengan validasi', image:'https://via.placeholder.com/300x200/2563eb/fff?text=form'},
    ];

   const projectGrid = document.getElementById('project-grid');
    projects.forEach(project=>{
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML =`
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        `;
        card.addEventListener('click', ()=> {
            alert(`Anda memilih proyek:${project.title}`);
        });
        projectGrid.appendChild(card);
});

