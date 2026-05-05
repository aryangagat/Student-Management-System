const ADMIN = { username: 'Aryan-Gagat', password: '1234' };
  function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (u === ADMIN.username && p === ADMIN.password) {
      localStorage.setItem('isLoggedIn', 'true');
      showApp();
    } else {
      document.getElementById('loginError').innerText = 'Invalid credentials';
    }
  }

  function logout() {
    localStorage.removeItem('isLoggedIn');
    location.reload();
  }

  function showApp() {
    document.getElementById('loginPanel').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }
  let students = JSON.parse(localStorage.getItem('students')) || [];
  let editIndex = -1;

  function displayStudents() {
    const table = document.getElementById('studentTable');
    const search = document.getElementById('search').value.toLowerCase();
    table.innerHTML = '';

    students
      .filter(s => s.name.toLowerCase().includes(search) || s.roll.includes(search) || s.course.toLowerCase().includes(search))
      .forEach((student, index) => {
        table.innerHTML += `
          <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>
              <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
          </tr>
        `;
      });
  }

  function addOrUpdateStudent() {
    const name = document.getElementById('name').value;
    const roll = document.getElementById('roll').value;
    const course = document.getElementById('course').value;

    if (!name || !roll || !course) {
      alert('Please fill all fields');
      return;
    }

    if (editIndex === -1) {
      students.push({ name, roll, course });
    } else {
      students[editIndex] = { name, roll, course };
      editIndex = -1;
      document.getElementById('submitBtn').innerText = 'Add Student';
    }

    localStorage.setItem('students', JSON.stringify(students));
    clearFields();
    displayStudents();
  }

  function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('roll').value = student.roll;
    document.getElementById('course').value = student.course;

    editIndex = index;
    document.getElementById('submitBtn').innerText = 'Update Student';
  }

  function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }

  function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('roll').value = '';
    document.getElementById('course').value = '';
  }
  if (localStorage.getItem('isLoggedIn') === 'true') {
    showApp();
  }
  displayStudents();
