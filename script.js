const spaceData = {
  panorama: {
    index: "01",
    title: "Panorama Hall",
    kicker: "Панорама · Dinner · Show",
    image: "assets/panorama-hall.jpg",
    copy: "Головна сцена вечора: панорама Львова, живі виступи, вечірні софіти та столи для розмов, які не хочеться завершувати.",
    capacity: "до 80 гостей",
    format: "вечеря · події"
  },
  terrace: {
    index: "02",
    title: "Літня тераса",
    kicker: "Open air · Sunset · City view",
    image: "assets/roof-day.jpg",
    copy: "Вечері просто неба, рожеві заходи сонця й відчуття, ніби все місто стало декорацією саме для вашого столика.",
    capacity: "до 200 гостей",
    format: "вечеря · вечірки"
  },
  dome: {
    index: "03",
    title: "Купол",
    kicker: "Intimate · Nature · Skyline",
    image: "assets/dome-tree.jpg",
    copy: "Камерний простір із деревом, що росте крізь поверхи, панорамними вікнами й особливо тихою атмосферою для близьких розмов.",
    capacity: "до 30 гостей",
    format: "побачення · вечеря"
  },
  vocal: {
    index: "04",
    title: "Vocal Bar Karaoke",
    kicker: "Karaoke · Dance · Night",
    image: "assets/bar-stairs.jpg",
    copy: "Тропічний настрій, дзеркальна стеля, музика й караоке. Простір для компаній, які точно не планують завершувати вечір рано.",
    capacity: "до 60 гостей",
    format: "караоке · party"
  },
  banquet: {
    index: "05",
    title: "Бенкетний зал",
    kicker: "Wedding · Birthday · Event",
    image: "assets/white-bar.jpg",
    copy: "Вишуканий зал для святкувань із розмахом: мармур, м’які крісла, багато зелені й виразна стеля як головний акцент події.",
    capacity: "до 100 гостей",
    format: "весілля · бенкет"
  }
};

const moodCopy = {
  date: "Тихе світло, панорама вечірнього міста й стіл для двох.",
  party: "Караоке, live show, авторські коктейлі й танці до останньої пісні.",
  celebration: "Власний простір, святкова подача й команда, яка подбає про деталі.",
  skyline: "Вечеря просто неба там, де захід сонця стає частиною сервірування."
};

const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu-button]");
const booking = document.querySelector("[data-booking]");
const bookingForm = document.querySelector("[data-booking-form]");

window.addEventListener("load", () => {
  setTimeout(() => document.querySelector(".loader")?.classList.add("is-hidden"), 500);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", scrollY > 45);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.classList.toggle("is-active", open);
  menuButton.setAttribute("aria-expanded", String(open));
  body.classList.toggle("is-locked", open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.classList.remove("is-active");
    menuButton.setAttribute("aria-expanded", "false");
    body.classList.remove("is-locked");
  });
});

document.querySelectorAll("[data-mood]").forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    document.querySelectorAll("[data-mood]").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll("[data-mood-image]").forEach((image) => image.classList.toggle("is-active", image.dataset.moodImage === mood));
    button.classList.add("is-active");
    document.querySelector("[data-mood-copy]").textContent = moodCopy[mood];
  });
});

document.querySelectorAll("[data-space-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.spaceTab;
    const space = spaceData[key];
    const image = document.querySelector("[data-space-image]");
    document.querySelectorAll("[data-space-tab]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    image.classList.add("is-switching");

    setTimeout(() => {
      image.src = space.image;
      image.alt = space.title;
      document.querySelector("[data-space-index]").textContent = space.index;
      document.querySelector("[data-space-kicker]").textContent = space.kicker;
      document.querySelector("[data-space-title]").textContent = space.title;
      document.querySelector("[data-space-copy]").textContent = space.copy;
      document.querySelector("[data-space-capacity]").textContent = space.capacity;
      document.querySelector("[data-space-format]").textContent = space.format;
      document.querySelector("[data-booking-space]").value = space.title;
      image.classList.remove("is-switching");
    }, 220);
  });
});

const openBooking = () => {
  booking.showModal();
  body.classList.add("is-locked");
};

const closeBooking = () => {
  booking.close();
  body.classList.remove("is-locked");
};

document.querySelectorAll("[data-open-booking]").forEach((button) => button.addEventListener("click", openBooking));
document.querySelector("[data-close-booking]")?.addEventListener("click", closeBooking);

booking?.addEventListener("click", (event) => {
  const box = booking.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeBooking();
});

booking?.addEventListener("close", () => {
  body.classList.remove("is-locked");
  setTimeout(() => {
    bookingForm.hidden = false;
    document.querySelector("[data-booking-success]").hidden = true;
  }, 200);
});

const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = local;
  dateInput.value = local;
}

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingForm.hidden = true;
  document.querySelector("[data-booking-success]").hidden = false;
});

document.querySelector("[data-top]")?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("[data-year]").textContent = new Date().getFullYear();
