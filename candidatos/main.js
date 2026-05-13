document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    const indicadores = document.querySelectorAll('.step');
    let actual = 0;

    btn.addEventListener('click', () => {
        // Validación básica
        const inputs = pasos[actual].querySelectorAll('input[required]');
        let valido = true;
        inputs.forEach(i => { if(!i.value) valido = false; });

        if(valido && actual < pasos.length - 1) {
            pasos[actual].classList.add('hidden');
            indicadores[actual].classList.remove('active');
            indicadores[actual].classList.add('completed');
            
            actual++;
            
            pasos[actual].classList.remove('hidden');
            indicadores[actual].classList.add('active');

            if(actual === pasos.length - 1) btn.textContent = "Finalizar";
        } else if (!valido) {
            alert("Completa los campos obligatorios");
        }
    });
});
