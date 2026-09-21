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
        { title: "ВКонтакте", link: "https://vk.com/nikoollaayyy" },
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
    
    // --- Маска ввода для телефона (+7 и ровно 10 цифр) ---
    const phoneInput = document.getElementById("form-phone");
    if (phoneInput) {
        phoneInput.addEventListener("focus", () => {
            if (!phoneInput.value) phoneInput.value = "+7 ";
        });

        phoneInput.addEventListener("input", (e) => {
            let value = e.target.value;
            if (!value.startsWith("+7 ")) {
                value = "+7 " + value.replace(/\D/g, "");
            }
            let rawNumbers = value.substring(2).replace(/\D/g, "");
            if (rawNumbers.startsWith("7") || rawNumbers.startsWith("8")) {
                rawNumbers = rawNumbers.substring(1);
            }
            if (rawNumbers.length > 10) rawNumbers = rawNumbers.substring(0, 10);

            let formatted = "+7 ";
            if (rawNumbers.length > 0) formatted += "(" + rawNumbers.substring(0, 3);
            if (rawNumbers.length >= 4) formatted += ") " + rawNumbers.substring(3, 6);
            if (rawNumbers.length >= 7) formatted += "-" + rawNumbers.substring(6, 8);
            if (rawNumbers.length >= 9) formatted += "-" + rawNumbers.substring(8, 10);
            e.target.value = formatted;
        });

        phoneInput.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value.length <= 4) {
                e.preventDefault();
            }
        });
        // --- Валидация для поля "Ваше имя" (только буквы и пробелы) ---
    // Находим поле ввода по атрибуту name="name"
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
        nameInput.addEventListener("input", (e) => {
            // Регулярное выражение удаляет всё, кроме русских/английских букв и пробелов
            e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
        });
    }

    }

    // Рендеринг контента страницы
    document.title = profileConfig.siteTitle;
    if (document.getElementById("user-name")) document.getElementById("user-name").innerText = profileConfig.name;
    if (document.getElementById("user-tagline")) document.getElementById("user-tagline").innerText = profileConfig.tagline;
    if (document.getElementById("user-bio")) document.getElementById("user-bio").innerText = profileConfig.bio;
    if (document.getElementById("user-avatar")) document.getElementById("user-avatar").src = profileConfig.avatar;
    if (document.getElementById("gallery-title")) document.getElementById("gallery-title").innerText = profileConfig.galleryHeading;

    // Кнопки соц. сетей
    const linksBox = document.getElementById("social-links");
    if (linksBox) {
        linksBox.innerHTML = profileConfig.socials.map(s => 
            `<a href="${s.link}" class="btn-social" target="_blank" rel="noopener noreferrer">${s.title}</a>`
        ).join('');
    }

    // Галерея
    const grid = document.getElementById("gallery-grid");
    if (grid) {
        grid.innerHTML = profileConfig.items.map(data => `
            <div class="gallery-item" onclick="openLightbox('${data.src}', '${data.caption}')">
                <img src="${data.src}" alt="${data.caption}">
                <div class="gallery-overlay"><span>${data.caption}</span></div>
            </div>
        `).join('');
    }

   // Мгновенный скролл
document.getElementById("scroll-to-gallery")?.addEventListener("click", () => {
    document.getElementById("gallery-target")?.scrollIntoView({ behavior: "auto", block: "start" });
});

    // Параллакс фоновых фигур
    document.addEventListener("mousemove", (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        document.querySelectorAll(".eps-shape").forEach((shape, idx) => {
            shape.style.transform = `translate(${mouseX * (idx + 1) * 15}px, ${mouseY * (idx + 1) * 15}px) scale(1.05)`;
        });
    });
    document.addEventListener("mouseleave", () => {
        document.querySelectorAll(".eps-shape").forEach(shape => shape.style.transform = "none");
    });

    // Модальное окно Lightbox
    const modal = document.getElementById("lightbox");
    window.openLightbox = (src, text) => {
        if (!modal) return;
        modal.style.display = "flex";
        document.getElementById("lightbox-img").src = src;
        document.getElementById("lightbox-caption").innerText = text;
    };
    document.querySelector(".lightbox-close")?.addEventListener("click", () => modal.style.display = "none");
    modal?.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

    // --- Интеграция реальной отправки на Formspree (без проверок) ---
    const contactForm = document.querySelector(".contact-form");
    const submitBtn = document.querySelector(".btn-submit");

    contactForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerText = "Отправка...";

        // Отправляем данные на ваш Formspree URL методом POST
        fetch("https://formspree.io/f/mnpnpbbn", {
            method: "POST",
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(() => {
            submitBtn.classList.add("btn-success");
            submitBtn.innerText = "Успешно отправлено! ✓";
            contactForm.reset();
        })
        .catch(() => {
            submitBtn.innerText = "Ошибка отправки";
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove("btn-success");
                submitBtn.innerText = "Отправить сообщение";
            }, 3000);
        });
    });
});
