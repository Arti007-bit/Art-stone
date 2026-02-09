document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. مدیریت منوی موبایل ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // بستن منو وقتی روی لینکی کلیک شد
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 2. مدیریت تم تاریک و روشن (Dark Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // چک کردن تنظیمات ذخیره شده در مرورگر
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️'; // آیکون خورشید
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // --- 3. اسکرول نرم (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // ارتفاع هدر را در نظر می‌گیرد
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. انیمیشن ساده هنگام اسکرول (Fade In) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // اعمال انیمیشن به کارت‌های محصول
    const cards = document.querySelectorAll('.product-card, .blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

// --- 5. تابع افزودن به سبد خرید (نمایشی) ---
function addToCart(productName) {
    // در یک پروژه واقعی، اینجا اطلاعات به سرور یا Context ارسال می‌شود
    const message = document.createElement('div');
    message.textContent = `"${productName}" به سبد خرید اضافه شد! 🛒`;
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.left = '20px';
    message.style.backgroundColor = '#2E2E2E';
    message.style.color = '#fff';
    message.style.padding = '15px 25px';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    message.style.zIndex = '2000';
    message.style.animation = 'fadeInOut 3s forwards';

    document.body.appendChild(message);

    // حذف پیام بعد از 3 ثانیه
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// اضافه کردن استایل انیمیشن پیام به صورت داینامیک
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);
