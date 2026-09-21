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
    // Рендеринг базового контента
    document.title = profileConfig.siteTitle;
    if (document.getElementById("user-name")) document.getElementById("user-name").innerText = profileConfig.name;
    if (document.getElementById("user-tagline")) document.getElementById("user-tagline").innerText = profileConfig.tagline;
    if (document.getElementById("user-bio")) document.getElementById("user-bio").innerText = profileConfig.bio;
    if (document.getElementById("user-avatar")) document.getElementById("user-avatar").src = profileConfig.avatar;
    if (document.getElementById("gallery-title")) document.getElementById("gallery-title").innerText = profileConfig.galleryHeading;

    // Генерация кнопок соц. сетей
    const linksBox = document.getElementById("social-links");
    if (linksBox) {
        linksBox.innerHTML = ""; 
        profileConfig.socials.forEach(social => {
            const a = document.createElement("a");
            a.href = social.link;
            a.className = "btn-social";
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.innerText = social.title;
            linksBox.appendChild(a);
        });
    }

    // Генерация галереи с Lightbox
    const grid = document.getElementById("gallery-grid");
    if (grid) {
        grid.innerHTML = ""; 
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
    }

    // Настройка плавного скролла
    const scrollBtn = document.getElementById("scroll-to-gallery");
    const galleryTarget = document.getElementById("gallery-target");
    if (scrollBtn && galleryTarget) {
        scrollBtn.addEventListener("click", () => {
            galleryTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    // Эффект мягкого параллакса фоновых фигур при движении мыши
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

    // Маска ввода для поля номера телефона
    const phoneInput = document.getElementById("form-phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            let input = e.target.value.replace(/\D/g, ""); 
            let formatted = "";

            if (!input) {
                e.target.value = "";
                return;
            }

            if (["7", "8", "9"].includes(input)) {
                if (input === "9") input = "7" + input;
                formatted = "+7 ";
                
                if (input.length > 1) {
                    formatted += "(" + input.substring(1, 4);
                }
                if (input.length >= 5) {
                    formatted += ") " + input.substring(4, 7);
                }
                if (input.length >= 8) {
                    formatted += "-" + input.substring(7, 9);
                }
                if (input.length >= 10) {
                    formatted += "-" + input.substring(9, 11);
                }
            } else {
                formatted = "+" + input.substring(0, 15);
            }
            
            e.target.value = formatted;
        });

        phoneInput.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value.length <= 4) {
                e.target.value = "";
            }
        });
    }

    // Централизованная интеграция Formspree AJAX
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    
    if (contactForm && formStatus) {
        const submitBtn = contactForm.querySelector(".btn-submit");
        
        window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
        
        formspree('initForm', {
            formElement: '#contact-form',
            formId: 'mnpnpbbn',
            
            validate: () => {
                const errors = {};
                if (phoneInput) {
                    const phoneRaw = phoneInput.value.replace(/\D/g, "");
                    if (phoneRaw.length > 0 && phoneRaw.length < 11) {
                        errors.phone = "Введите корректный номер телефона (11 цифр)";
                    }
                }
                return errors;
            },
            
            onSubmit: () => {
                submitBtn.innerText = "Отправка...";
                submitBtn.disabled = true;
                formStatus.style.color = "var(--primary-color)";
                formStatus.innerText = "ИИ обрабатывает данные и передает на сервер...";
            },
            
            onSuccess: () => {
                submitBtn.disabled = false;
                submitBtn.classList.add("btn-success");
                submitBtn.innerText = "Отправлено ✓";
                formStatus.style.color = "var(--success-color)";
                formStatus.innerText = "Спасибо! Сообщение и контакты успешно доставлены на почту Николая.";
                
                contactForm.reset(); 

                setTimeout(() => {
                    submitBtn.classList.remove("btn-success");
                    submitBtn.innerText = "Отправить сообщение";
                    formStatus.innerText = "";
                }, 4000);
            },
            
            onFailure: () => {
                submitBtn.disabled = false;
                formStatus.style.color = "#d63031";
                formStatus.innerText = "Произошла ошибка отправки. Проверьте правильность заполнения полей.";
                submitBtn.innerText = "Отправить сообщение";
            }
        });
    }

    // Элементы и логика Lightbox
    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");

    function openLightbox(src, text) {
        if (modal && modalImg && modalCaption) {
            modal.style.display = "flex";
            modalImg.src = src;
            modalCaption.innerText = text;
        }
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.style.display = "none");
        modal.addEventListener("click", (e) => { 
            if(e.target === modal) modal.style.display = "none"; 
        });
    }
});