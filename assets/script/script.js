
const hamBtn = document.querySelector('.hamburger');
const layerMenu = document.querySelector('.primary-navigation ');
const navLink = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.logo');

// remove active link
const linkAction = () => {
    layerMenu.classList.remove('active');
    hamBtn.classList.remove('active');
     document.body.classList.remove('body-overflow');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

// hamburger menu
hamBtn.addEventListener('click', function () {
	    hamBtn.classList.toggle('active'); 
	    layerMenu.classList.toggle('active');
	    document.body.classList.toggle('body-overflow');
});

const navbar = document.querySelector('nav');
 // Dynamic Background Switch Handler on Scroll
   window.addEventListener("scroll", function() {
        // Run scroll location calculation cleanly across devices
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        // Trigger style modification after moving down 50px
        if (scrollPosition > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

   // scroll sections active link 
   const sections = document.querySelectorAll('section[id]');
   const scrollActive = () => {
    const scrollY = window.pageYOffset; 
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        sectionClass = document.querySelector('.header a[href*=' + sectionId + ']'
         );
        if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight ) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');

        }
    });
}
window.addEventListener('scroll', scrollActive);

// smooth scrool clik the link

for( let i = 0; i < navLink.length; i++ ){
         navLink[i].addEventListener('click', function(event) {
                // call the smoothScroll function
               function smoothScroll(event) {
                   event.preventDefault();
                   const targetId = event.currentTarget.getAttribute('href') === '#' ? 'header' :  event.currentTarget.getAttribute('href');
                   const duration = 1000;
                   const targetPosition = document.querySelector(targetId).offsetTop;
                   const startPosition = window.pageYOffset;
                   const distance = targetPosition - startPosition;
                  let start = null;
                  window.requestAnimationFrame(step);
                  function step(timestamp) {
                    if( !start ) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, isInOutQuadCubic(progress, startPosition, distance, duration));
                    if( progress < duration) window.requestAnimationFrame(step);
                     function isInOutQuadCubic(t, b, c, d) {
                          t /= d / 2;
                          if( t < 1 ) return c / 2 * t * t * t + b;
                          t -= 2
                          return c / 2 * (t * t * t + 2) + b; 
                      }
                  }
               } 
               smoothScroll(event);
         });
    }


// Form Message
   // Inisialisasi EmailJS di luar fungsi agar dipanggil sekali saja saat load
(function () {
  emailjs.init("6bdvKfymngas2cJEl"); // Account Public key
})(); 

// --- PROTEKSI BOT (DYNAMIC ACTION) ---
let isHumanVerified = false;
const emailForm = document.getElementById('emailForm');

function verifyHumanInteracted() {
  isHumanVerified = true;
  // Hapus listener setelah aktif agar menghemat memori perangkat
  emailForm.removeEventListener('mousemove', verifyHumanInteracted);
  emailForm.removeEventListener('focusin', verifyHumanInteracted);
  emailForm.removeEventListener('touchstart', verifyHumanInteracted);
}

// Deteksi gerakan mouse, ketikan, atau sentuhan layar pada form
emailForm.addEventListener('mousemove', verifyHumanInteracted);
emailForm.addEventListener('focusin', verifyHumanInteracted);
emailForm.addEventListener('touchstart', verifyHumanInteracted);
// -------------------------------------

// Event Listener Submit utama berada di tag script
emailForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah reload halaman bawaan HTML

  // --- JALANKAN CEK PROTEKSI SPAM BOT ---
  const honeypotValue = document.getElementById('company_phone').value;
  
  // Jika honeypot terisi ATAU tidak ada interaksi manusia sama sekali
  if (honeypotValue !== "" || !isHumanVerified) {
    console.warn("Spam bot detected and blocked.");
    
    // Gagal secara senyap (Mengelabui bot agar mengira form sukses dikirim)
    document.getElementById('modalMessage').innerText = `Thank you! Your message has been sent.`;
    document.getElementById('successModal').classList.add('show');
    emailForm.reset();
    setTimeout(() => {
      document.getElementById('successModal').classList.remove('show');
    }, 3000);
    
    return; // Stop eksekusi, EmailJS tidak akan ditembak
  }

  // Jika lolos seleksi bot, jalankan fungsi kirim pesan utama
  sendMessage();
});

function validateForm() {
  let isValid = true;

  // Ambil element
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Regex untuk validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset error dahulu
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error-input'));

  // Validasi Name
  if (name.value.trim() === "") {
    document.getElementById('name-error').style.display = 'block';
    name.classList.add('error-input');
    isValid = false;
  }

  // Validasi Email
  if (!emailRegex.test(email.value.trim())) {
    document.getElementById('email-error').style.display = 'block';
    email.classList.add('error-input');
    isValid = false;
  }

  // Validasi Subject
  if (subject.value.trim() === "") {
    document.getElementById('subject-error').style.display = 'block';
    subject.classList.add('error-input');
    isValid = false;
  }

  // Validasi Message
  if (message.value.trim() === "") {
    document.getElementById('message-error').style.display = 'block';
    message.classList.add('error-input');
    isValid = false;
  }

  return isValid;
}

function sendMessage() {
  // Jalankan fungsi validasi, jika gagal (false) maka stop proses kirim
  if (!validateForm()) return;

  const btnSubmit = document.getElementById('btnSubmit');
  btnSubmit.disabled = true;
  btnSubmit.innerText = "Sending...";

  let serviceID = "service_a7pz4t8"; // Email Services ID 
  let templateID = "template_gkt7byc"; // Email Template ID 

  let params = {
    sendername : document.querySelector('#name').value, 
    senderemail : document.querySelector('#email').value,
    subject : document.querySelector('#subject').value,
    message : document.querySelector('#message').value
  };

  emailjs.send(serviceID, templateID, params)
  .then( res => {
    // 1. Ubah teks pesan di dalam modal sesuai nama pengirim
    document.getElementById('modalMessage').innerText = `Thank you, ${params.sendername}! Your message has been sent.`;
    
    // 2. Munculkan Modal
    const modal = document.getElementById('successModal');
    modal.classList.add('show');

    // 3. Kosongkan semua input & textarea
    emailForm.reset();

    // Reset status verifikasi manusia setelah form kosong kembali bersih
    isHumanVerified = false;
    emailForm.addEventListener('mousemove', verifyHumanInteracted);
    emailForm.addEventListener('focusin', verifyHumanInteracted);
    emailForm.addEventListener('touchstart', verifyHumanInteracted);

    // 4. Tutup modal secara otomatis setelah 3 detik (3000ms)
    setTimeout(() => {
       modal.classList.remove('show');
    }, 3000);
  })
  .catch( err => {
    alert("Gagal mengirim email, coba lagi nanti.");
    console.error(err);
  })
  .finally(() => {
    // Kembalikan tombol ke keadaan semula
    btnSubmit.disabled = false;
    btnSubmit.innerText = "Send Message";
  });  
}


