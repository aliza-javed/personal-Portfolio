'use strict';

// Utility: Toggle any element's "active" class
const toggleActive = (elem) => elem.classList.toggle("active");

// === Sidebar Toggle ===
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => toggleActive(sidebar));

// === Testimonials Modal ===
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const testimonialItems = document.querySelectorAll("[data-testimonials-item]");

const openModal = () => {
  modalContainer.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

testimonialItems.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent = item.querySelector("[data-testimonials-title]").textContent;
    modalText.textContent = item.querySelector("[data-testimonials-text]").textContent;
    openModal();
  });
});

modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// === Page Navigation ===
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.textContent.trim().toLowerCase();

    pages.forEach(page => {
      const pageName = page.dataset.page;
      const isActive = pageName === targetPage;

      page.classList.toggle("active", isActive);
    });

    navLinks.forEach(nav => nav.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});

// === Contact Form Validation ===
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// === Portfolio Filter (if used) ===
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // Note: typo — should be [data-select-value]

const applyFilter = (value) => {
  filterItems.forEach(item => {
    const match = value === "all" || item.dataset.category === value;
    item.classList.toggle("active", match);
  });
};

select?.addEventListener("click", () => toggleActive(select));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.textContent.toLowerCase();
    selectValue.textContent = item.textContent;
    toggleActive(select);
    applyFilter(value);
  });
});

let activeFilterBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.toLowerCase();
    selectValue.textContent = btn.textContent;
    applyFilter(value);

    activeFilterBtn.classList.remove("active");
    btn.classList.add("active");
    activeFilterBtn = btn;
  });
});
