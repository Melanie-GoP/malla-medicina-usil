const cursos = [
  {
    id: "atencion_integral",
    nombre: "👩‍⚕️ Atención Integral",
    requisitos: []
  },
  {
    id: "english_i",
    nombre: "🇬🇧 English I",
    requisitos: []
  },
  {
    id: "english_ii",
    nombre: "🇬🇧 English II",
    requisitos: ["english_i"]
  },
  {
    id: "morfo_sistema_nervioso",
    nombre: "🧠 Morfofuncional Sist. Nervioso",
    requisitos: ["atencion_integral"]
  }
];

const estadoCursos = JSON.parse(localStorage.getItem("estadoCursos")) || {};

const container = document.getElementById("grid-container");

function puedeDesbloquear(curso) {
  return curso.requisitos.every(req => estadoCursos[req] === true);
}

function actualizarCursos() {
  document.querySelectorAll(".curso").forEach(div => {
    const id = div.dataset.id;
    const curso = cursos.find(c => c.id === id);

    if (estadoCursos[id]) {
      div.classList.remove("bloqueado");
      div.classList.add("aprobado");
    } else if (puedeDesbloquear(curso)) {
      div.classList.remove("bloqueado");
      div.classList.remove("aprobado");
    } else {
      div.classList.add("bloqueado");
      div.classList.remove("aprobado");
    }
  });

  localStorage.setItem("estadoCursos", JSON.stringify(estadoCursos));
}

function crearCurso(curso) {
  const div = document.createElement("div");
  div.className = "curso bloqueado";
  div.textContent = curso.nombre;
  div.dataset.id = curso.id;

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;
    estadoCursos[curso.id] = !estadoCursos[curso.id];
    actualizarCursos();
  });

  container.appendChild(div);
}

// Inicializar estado si no está definido
cursos.forEach(curso => {
  if (!(curso.id in estadoCursos)) {
    estadoCursos[curso.id] = false;
  }
  crearCurso(curso);
});

actualizarCursos();

// Botón de reinicio
document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar la malla?")) {
    cursos.forEach(curso => estadoCursos[curso.id] = false);
    actualizarCursos();
  }
});

