window.onscroll = () => {
  document.querySelector("header").classList.toggle("scrolled", window.scrollY > 50);
};

let currentIndex = 0;

function moveCarousel(dir) {
  const track = document.getElementById('track');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  
  // Calculamos cuántos elementos se ven a la vez (3 en PC, 1 en móvil)
  const itemsVisible = window.innerWidth <= 768 ? 1 : 3;
  const maxIndex = totalItems - itemsVisible;

  // Actualizamos el índice respetando los límites
  currentIndex = Math.max(0, Math.min(currentIndex + dir, maxIndex));

  // Calculamos el desplazamiento exacto basándonos en el ancho del primer elemento
  const gap = 15; // El gap que pusiste en el CSS
  const itemWidth = items[0].offsetWidth + gap;
  
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav");
const body = document.body;

hamburger.onclick = () => { const isOpening = !hamburger.classList.contains("active");

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show");
  body.classList.toggle("no-scroll");

  if (!isOpening) {
    resetMenu();
  }
};

document.querySelectorAll(".has-drop > a").forEach(link => {
  link.onclick = (e) => {
    if (window.innerWidth <= 768) {
      const parentLi = link.parentElement;
      const dropdown = parentLi.querySelector(".drop");

      if (dropdown) {
        e.preventDefault();

        const siblings = parentLi.parentElement.children;

        Array.from(siblings).forEach(el => {
          if (el !== parentLi) {
            el.classList.remove("active");
          }
        });

        parentLi.classList.toggle("active");
      }
    }
  };
});

function resetMenu() {
  document.querySelectorAll(".has-drop").forEach(el => {
    el.classList.remove("active");
  });
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {

      const href = link.getAttribute("href");

      const isToggle = link.parentElement.classList.contains("has-drop");

      if (!isToggle && href) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("show");
        body.classList.remove("no-scroll");
        resetMenu();
      }
    }
  });
});

document.querySelectorAll("nav a[href*='#']").forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").split("#")[1];
    const target = document.getElementById(targetId);

    if (target && window.innerWidth <= 768) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbyj4RtYhhwN1Bfm0UB6ZT1oYi8jkltBtAMGTRv2lkhei0N0ac6Ua3oItv_6zFCvPlGS8Q/exec';
const form = document.getElementById('contact-form');
const btn = document.getElementById('submit-btn');
const responseMsg = document.getElementById('form-response');

form.addEventListener('submit', e => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerText = 'Enviando...';
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors'})
    .then(response => {
       responseMsg.innerText = "¡Mensaje enviado con éxito!";
       responseMsg.style.display = "block";
       responseMsg.style.color = "#4CAF50";
       form.reset();
       btn.disabled = false;
       btn.innerText = 'Enviar Mensaje';
    })
    .catch(error => {
       responseMsg.innerText = "Error al enviar. Inténtalo de nuevo.";
       responseMsg.style.display = "block";
       responseMsg.style.color = "#ff4d4d";
       btn.disabled = false;
       btn.innerText = 'Enviar Mensaje';
    });
});