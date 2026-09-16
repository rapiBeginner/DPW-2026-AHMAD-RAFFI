function initNavToggle(){
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) retrun;

    toggleBtn.addEventListener("click", function(){
        nav.classList.toggle("nav-open");
    });
}
