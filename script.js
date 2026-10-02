document.getElementById("year").textContent = new Date().getFullYear();

/* Menu mobile */
const menu = document.querySelector(".menu");
const nav = document.getElementById("nav");

function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "Menu";
}

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Fechar" : "Menu";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* Interação em três etapas */
const form = document.getElementById("quiz-form");
const fields = [...form.querySelectorAll("fieldset")];
const back = document.getElementById("back");
const next = document.getElementById("next");
const error = document.getElementById("quiz-error");
const result = document.getElementById("quiz-result");

let step = 0;

function showStep(focus = false) {
  fields.forEach((field, index) => {
    field.hidden = index !== step;
  });

  back.hidden = step === 0;

  next.textContent = step === 2 ? "Ver meu resumo" : "Continuar";

  document.getElementById("step-label").textContent = `ETAPA ${step + 1} DE 3`;

  document.getElementById("progress").style.width =
    `${((step + 1) / 3) * 100}%`;

  error.textContent = "";

  if (focus) {
    fields[step].querySelector("input").focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selected = fields[step].querySelector("input:checked");

  if (!selected) {
    error.textContent = "Escolha uma opção para continuar.";
    return;
  }

  if (step < 2) {
    step++;
    showStep(true);
    return;
  }

  const answers = fields.map((field) => {
    return field.querySelector("input:checked").value;
  });

  const summary = answers.join(".\n") + ".";

  document.getElementById("summary").textContent = summary;

  const message =
    `Oi, Julia! Vim pelo seu site.\n\n` +
    `${summary}\n\n` +
    "Gostaria de conhecer seu acompanhamento.";

  document.getElementById("personal-link").href =
    "https://wa.me/5534991442979?text=" + encodeURIComponent(message);

  form.hidden = true;
  result.hidden = false;

  document.getElementById("step-label").textContent = "SUAS ESCOLHAS";

  document.getElementById("personal-link").focus();
});

back.addEventListener("click", () => {
  if (step > 0) {
    step--;
  }

  showStep(true);
});

form.addEventListener("change", () => {
  error.textContent = "";
});

document.getElementById("restart").addEventListener("click", () => {
  form.reset();

  step = 0;
  result.hidden = true;
  form.hidden = false;

  showStep(true);
});

showStep();
