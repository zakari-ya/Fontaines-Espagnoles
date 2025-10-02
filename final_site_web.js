 // Lightbox functionality for ALL product images
        document.addEventListener('DOMContentLoaded', function() {
            const productImgs = document.querySelectorAll(
                // Only inside Products section and product cards
                '#products img'
            );
            const lightbox = document.getElementById('lightbox-overlay');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxClose = document.getElementById('lightbox-close');

            // Listener on all product images
            productImgs.forEach(img => {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', function(e) {
                    lightbox.classList.add('active');
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt || '';
                });
            });

            // Close on click anywhere on overlay except image
            lightbox.addEventListener('click', function(e) {
                if(e.target === lightbox || e.target === lightboxClose) {
                    lightbox.classList.remove('active');
                    lightboxImg.src = '';
                    lightboxImg.alt = '';
                }
            });

            // ESC to close
            window.addEventListener('keydown', function(e) {
                if(lightbox.classList.contains('active') && e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    lightboxImg.src = '';
                    lightboxImg.alt = '';
                }
            });
        });
        // Professional Language Toggle Functionality (guarded for pages without the toggle)
        (function() {
            const languageToggle = document.getElementById('languageToggle');
            const languageStatus = document.getElementById('languageStatus');
            if (!languageToggle || !languageStatus) return;
            function updateLanguageStatus(isArabic) {
                languageToggle.setAttribute('aria-checked', isArabic);
                languageStatus.textContent = isArabic 
                    ? 'Current language: Arabic' 
                    : 'Current language: French';
            }
            languageToggle.addEventListener('change', function() {
                const isArabic = this.checked;
                // Add transition class to body to smooth the layout changes
                document.body.classList.add('language-transition');
                // Update language and direction
                document.documentElement.lang = isArabic ? 'ar' : 'fr';
                document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
                // Update accessibility attributes
                updateLanguageStatus(isArabic);
                // Smoothly transition between languages
                setTimeout(() => {
                    // Hide/Show language elements
                    document.querySelectorAll('[data-lang="fr"]').forEach(el => 
                        el.classList.toggle('hidden', isArabic));
                    document.querySelectorAll('[data-lang="ar"]').forEach(el => 
                        el.classList.toggle('hidden', !isArabic));
                    // Remove transition class after changes are complete
                    setTimeout(() => {
                        document.body.classList.remove('language-transition');
                    }, 100);
                }, 300);
            });
            // Initialize
            updateLanguageStatus(false);
        })();
        
        // WhatsApp Functionality
        function openWhatsApp(productName = '') {
            let message;
            if(document.documentElement.lang === 'ar') {
                message = productName 
                    ? `مرحبا، أرغب في شراء المنتج: ${productName}`
                    : "مرحبا، أنا مهتم بالنوافير الإسبانية ومنتجات ديكور الحديقة لديكم";
            } else {
                message = productName 
                    ? `Bonjour, je souhaite acheter le produit : ${productName}`
                    : "Bonjour, je m'intéresse à vos fontaines espagnoles et produits de décoration jardin";
            }
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/212655185604?text=${encodedMessage}`, '_blank');
        }
        
        function orderProduct(productName) {
            if(document.documentElement.lang === 'ar') {
                // Map French product names to Arabic equivalents
                const productNames = {
                    'Fontaine Espagnole Classique': 'نافورة إسبانية كلاسيكية',
                    'Table Jardin en Grès': 'طاولة حديقة فخارية',
                    'Collection de Vases en Grès': 'مجموعة جرار فخارية',
                    'Plantes Méditerranéennes': 'نباتات متوسطية',
                    'Fontaine Mural Andalouse': 'نافورة جدارية أندلسية',
                    'Pack Jardin Complet': 'حزمة حديقة كاملة'
                };
                openWhatsApp(productNames[productName] || productName);
            } else {
                openWhatsApp(productName);
            }
        }
        
        function sendMessage() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if(!name || !email || !message) {
                alert(document.documentElement.lang === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Veuillez remplir tous les champs');
                return;
            }
            
            let fullMessage;
            if(document.documentElement.lang === 'ar') {
                fullMessage = `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message}`;
            } else {
                fullMessage = `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`;
            }
            const encodedMessage = encodeURIComponent(fullMessage);
            window.open(`https://wa.me/212655185604?text=${encodedMessage}`, '_blank');
        }
        
        // FAQ Toggle Functionality
        document.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });
        
       // Smooth scrolling for anchor links with sticky header offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const header = document.querySelector('header.sticky');
                const offset = header ? header.offsetHeight : 0;
                const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
                window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
            });
        });

        // Simple Language Toggle Buttons (FR/AR) for non-professional pages
        document.addEventListener('DOMContentLoaded', function() {
        const btnFR = document.getElementById('btn-fr');
        const btnAR = document.getElementById('btn-ar');
        function setLanguage(isArabic) {
          document.documentElement.lang = isArabic ? 'ar' : 'fr';
          document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
          document.querySelectorAll('[data-lang="fr"]').forEach(el =>
            el.classList.toggle('hidden', isArabic));
          document.querySelectorAll('[data-lang="ar"]').forEach(el =>
            el.classList.toggle('hidden', !isArabic));
          btnFR.classList.toggle('active', !isArabic);
          btnAR.classList.toggle('active', isArabic);
        }
        btnFR.addEventListener('click', function() { setLanguage(false); });
        btnAR.addEventListener('click', function() { setLanguage(true); });
        // Démarrage : FR par défaut
        setLanguage(false);
      });