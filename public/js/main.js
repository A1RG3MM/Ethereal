document.addEventListener("DOMContentLoaded", () => {
    const stage = document.querySelector('.loading')
    const loading = document.querySelector('.text-flex');

    loading.style.transition = "0.5s ease";
    loading.style.transform = "scale(1.5)";
    loading.style.opacity = 1;
    loading.style.filter = "blur(0)";

    setTimeout(() => {
        loading.style.transform = "scale(0.1)"
        loading.style.opacity = 0;
        setTimeout(() => {
            stage.style.transition = "0.5s ease";
            stage.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(stage);
                document.querySelector('.bottom').style.bottom = 0;
                document.querySelector('.bottom').style.opacity = 1;
                document.querySelector('.bottom').style.transform = 'scale(1)';
                document.querySelector('.bottom').style.filter = 'blur(0)'
            }, 250);
        }, 500);
    }, 3000);
})