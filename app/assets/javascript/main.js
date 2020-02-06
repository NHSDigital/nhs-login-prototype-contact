// devmode function toggle

function toggleDevMode(){
    const devModeButton = document.querySelector('#nhsuk-footer ul li a[href*="#"]');
    devModeButton.addEventListener('click', function (event) {
        event.preventDefault();
        if(window.location.href.indexOf('devMode=') === -1){
            window.location.href = window.location.href + '?devMode=1'; 
        }
        else{
            window.location.href = '/clear-data';
        }
    }, false);
}

toggleDevMode();