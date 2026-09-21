// 1. Конфигурация данных Николая Маслова (Все ссылки привязаны и проверены)
const profileConfig = {
    siteTitle: "Николай Маслов | Персональная страница",
    name: "Маслов Николай Александрович",
    tagline: "Студент РТУ МИРЭА | ИИ & Анализ Данных",
    avatar: "Фото/image_EMD_AL.png", 
    
    bio: "Мне 18 лет, живу в Москве на ВДНХ. С детства обожал Minecraft, пытался запустить свой сервер, что и привело меня в программирование! Сдал ЕГЭ по информатике, выучил JavaScript, Python, HTML/CSS и React. Поступил в Институт кибербезопасности и цифровых технологий РТУ МИРЭА.",
    
    // Блок твоих социальных сетей
    socials: [
        { title: "Telegram", link: "https://t.me/uzelaaa" },
        { title: "ВКонтакте", link: "https://vk.ru/nikoollaayyy" },
        { title: "YouTube", link: "https://youtube.com/@u_s_e_r_s?si=E_CkHumsLWadBKgA" }
    ],

    galleryHeading: "Моя жизнь, учеба и увлечения",
    items: [
        { caption: "Мой Московский Выпускной", src: "Фото/image_moFeWh.png" },
        { caption: "Вид на любимый район ВДНХ и Останкино сверху", src: "Фото/image_Til1pL.png" },
        { caption: "Флаг Института кибербезопасности и цифровых технологий", src: "Фото/image_c58R0X.png" },
        { caption: "Кампус Института кибербезопасности (ИКБ) РТУ МИРЭА на Стромынке, 20", src: "Фото/image_qplLkv.png" },
        { caption: "Дача", src: "Фото/image_ZwI4Hf.png" }
    ]
};

// 2. Интерактивная логика лендинга
document.addEventListener("DOMContentLoaded", () => {
    // Рендеринг базового контента
    document.getElementById("site-title").innerText = profileConfig.siteTitle;
    document.getElementById("user-name").innerText = profileConfig.name;
    document.getElementById("user-tagline").innerText = profileConfig.tagline;
    document.getElementById("user-bio").innerText = profileConfig.bio;
    document.getElementById("user-avatar").src = profileConfig.avatar;
    document.getElementById("gallery-title").innerText = profileConfig.galleryHeading;

    // Генерация кнопок соц. сетей
    const linksBox = document.getElementById("social-links");
    profileConfig.socials.forEach(social => {
        const a = document.createElement("a");
        a.href = social.link;
        a.className = "btn-social";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerText = social.title;
        linksBox.appendChild(a);
    });

    // Генерация галереи с Lightbox
    const grid = document.getElementById("gallery-grid");
    profileConfig.items.forEach(data => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        const img = document.createElement("img");
        img.src = data.src;
        img.alt = data.caption;
        const overlay = document.createElement("div");
        overlay.className = "gallery-overlay";
        const text = document.createElement("span");
        text.innerText = data.caption;

        overlay.appendChild(text);
        item.appendChild(img);
        item.appendChild(overlay);
        grid.appendChild(item);

        item.addEventListener("click", () => {
            openLightbox(data.src, data.caption);
        });
    });

    // Настройка плавного скролла
    document.getElementById("scroll-to-gallery").addEventListener("click", () => {
        document.getElementById("gallery-target").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Эффект мягкого зума фоновых фигур при движении мыши
    const backgroundLayer = document.querySelector(".vector-bg-emulation");
    if (backgroundLayer) {
        document.addEventListener("mousemove", (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            const shapes = document.querySelectorAll(".eps-shape");
            shapes.forEach((shape, idx) => {
                const depth = (idx + 1) * 15; 
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                shape.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
        });

        document.addEventListener("mouseleave", () => {
            const shapes = document.querySelectorAll(".eps-shape");
            shapes.forEach((shape) => {
                shape.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });
    }

    // Интеграция Formspree AJAX
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = contactForm.querySelector(".btn-submit");

    window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
    
    formspree('initForm', {
        formElement: '#contact-form',
        formId: 'mnpnpbbn',
        
        onSubmit: () => {
            submitBtn.innerText = "Отправка...";
            formStatus.style.color = "var(--primary-color)";
            formStatus.innerText = "ИИ обрабатывает данные и передает на сервер...";
        },
        
        onSuccess: () => {
            submitBtn.classList.add("btn-success");
            submitBtn.innerText = "Отправлено ✓";
            formStatus.style.color = "var(--success-color)";
            formStatus.innerText = `Спасибо! Сообщение и контакты успешно доставлены на почту Николая (nikolay092008@ya.ru).`;
            
            contactForm.reset(); 

            setTimeout(() => {
                submitBtn.classList.remove("btn-success");
                submitBtn.innerText = "Отправить сообщение";
                formStatus.innerText = "";
            }, 4000);
        },
        
        onFailure: () => {
            formStatus.style.color = "#d63031";
            formStatus.innerText = "Произошла ошибка отправки. Проверьте правильность заполнения полей.";
            submitBtn.innerText = "Отправить сообщение";
        }
    });

    // Элементы Lightbox
    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");

    function openLightbox(src, text) {
        modal.style.display = "flex";
        modalImg.src = src;
        modalCaption.innerText = text;
    }
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });
});
