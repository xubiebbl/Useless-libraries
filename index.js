const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginTabs = document.querySelectorAll('.login-tab');
const loginForms = document.querySelectorAll('.login-form');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        loginTabs.forEach(t => t.classList.remove('active'));
        loginForms.forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        const targetForm = document.getElementById(tab.dataset.tab + 'Login');
        if (targetForm) {
            targetForm.classList.add('active');
        }
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    console.log('登录信息:', { username, password, rememberMe });
    alert('登录功能预留，未来将集成用户认证系统');
    
    loginModal.classList.remove('active');
});
                                       