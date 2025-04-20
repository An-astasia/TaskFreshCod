// Оновлює дату і час у шапці щосекунди
function updateDateTime() {
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");

  const now = new Date();
  dateEl.textContent = now.toDateString(); // Показує дату
  timeEl.textContent = now.toLocaleTimeString(); // Показує час
}

// Запускаємо оновлення дати/часу щосекунди
setInterval(updateDateTime, 1000);
updateDateTime(); // Відображає одразу після завантаження

// Обробка подій: натискання кнопки або Enter в полі вводу
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(); // Додає завдання по натисканню Enter
  }
});

// Зберігаємо завдання для кожного дня тижня (0 — неділя, 6 — субота)
const tasksByDay = {
  0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
};

let currentDay = 0; // Поточний обраний день тижня

// Обробник перемикання днів тижня по кліку
document.querySelectorAll(".week span").forEach((el, idx) => {
  el.addEventListener("click", () => {
    // Знімаємо активний клас з усіх днів
    document.querySelectorAll(".week span").forEach(span => span.classList.remove("active"));
    // Виділяємо активний день
    el.classList.add("active");
    currentDay = idx; // Змінюємо день
    renderTasks(); // Оновлюємо список завдань
  });
});

// Додає нове завдання у список для поточного дня
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim(); // Отримуємо текст і обрізаємо пробіли
  if (text === "") return; // Якщо нічого не ввели — вихід

  const task = {
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Час створення
    done: false // Завдання ще не виконане
  };

  tasksByDay[currentDay].push(task); // Додаємо у список відповідного дня
  renderTasks(); // Оновлюємо відображення
  input.value = ""; // Очищаємо поле вводу
}

// Оновлює HTML-список завдань відповідно до вибраного дня
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Очищаємо поточний список

  tasksByDay[currentDay].forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : ""); // Якщо виконано — додаємо клас done

    const taskText = document.createElement("span");
    taskText.className = "text";
    taskText.textContent = task.text; // Текст завдання

    const time = document.createElement("span");
    time.textContent = task.time; // Час створення

    const actions = document.createElement("div");
    actions.className = "actions";

    // Кнопка відмітити як виконане
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = "✔️";
    checkBtn.onclick = () => {
      task.done = !task.done; // Перемикаємо статус
      renderTasks(); // Перемальовуємо
    };

    // Кнопка видалення
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => {
      tasksByDay[currentDay].splice(index, 1); // Видаляємо завдання
      renderTasks(); // Перемальовуємо список
    };

    // Додаємо кнопки до блоку дій
    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);

    // Додаємо все в елемент списку
    li.appendChild(taskText);
    li.appendChild(time);
    li.appendChild(actions);

    // Додаємо завдання в HTML
    taskList.appendChild(li);
  });
}

// Встановлюємо поточний день тижня за замовчуванням
currentDay = new Date().getDay(); // Отримуємо індекс дня (0–6)
document.querySelectorAll(".week span")[currentDay].classList.add("active");
renderTasks(); // Відображаємо завдання
