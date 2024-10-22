document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    } else {
        console.error('Carousel buttons not found');
    }

    // 自动轮播 - 8秒间隔
    setInterval(nextSlide, 8000);

    // 初始显示第一张幻灯片
    showSlide(0);

    // 特征项动画和文本框显示
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        const textBox = item.querySelector('.feature-text');
        
        item.addEventListener('mouseenter', () => {
            textBox.style.display = 'block';
            setTimeout(() => {
                textBox.style.opacity = '1';
            }, 10);
        });
        
        item.addEventListener('mouseleave', () => {
            textBox.style.opacity = '0';
            setTimeout(() => {
                textBox.style.display = 'none';
            }, 300);
        });
    });

    // 点击其他地方关闭文本框
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.feature-item')) {
            featureItems.forEach(item => item.classList.remove('active'));
        }
    });

    // 翻译功能
    const translations = {
        // 在这里定义您的翻译
        en: {
            // 英文翻译
        },
        zh: {
            // 中文翻译
        }
    };

    function translatePage(lang) {
        document.querySelectorAll('.translate').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // 监听语言选择的变化
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            translatePage(this.value);
        });
    }

    // 默认使用英语
    translatePage('en');

    // 搜索功能
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');

    function performSearch() {
        const searchTerm = searchBox.value;
        if (searchTerm) {
            alert('Searching for: ' + searchTerm);
            // 这里可以添加实际的搜索逻辑
        }
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }

    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    const companyIntro = document.querySelector('.company-intro');
    
    if (companyIntro) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(companyIntro);
    }

    // 处理导航栏点击事件
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#about') {
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            tabItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // 添加当前项的活动状态
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 获取所有的 "Learn More" 链接
    var learnMoreLinks = document.querySelectorAll('.product-link');
    
    // 获取模态框元素
    var modal = document.getElementById('transportModal');
    var modalImg = document.getElementById("transportImage");
    var closeBtn = document.getElementsByClassName("close")[0];

    // 为每个 "Learn More" 链接添加点击事件监听器
    learnMoreLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认的链接行为
            var transportImageSrc = this.getAttribute('data-transport-image');
            modal.style.display = "block";
            modalImg.src = transportImageSrc;
        });
    });

    // 点击关闭按钮时关闭模态框
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 点击模态框外部时关闭模态框
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            fetch("https://formsubmit.co/yl18069961810@163.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert("Thank you for your message, we will reply to you ASAP!");
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Sorry, the delivery is failed. Please try it again later");
            });
        });
    }
});
