function updateClock() {
    const clock = document.getElementById('clock');
    const small_clock = document.getElementById('small-clock');
    const small_date = document.getElementById('small-date');
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;

    clock.textContent = `[ ${formattedTime} ]`;
    small_clock.textContent = formattedTime;
    small_date.textContent = formattedDate;
}

setInterval(updateClock, 1000);
updateClock();
