document.addEventListener('DOMContentLoaded', () => {
    const btnSiguiente = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    const indicadores = document.querySelectorAll('.step');
    let pasoActual = 0;

    btnSiguiente.addEventListener('click', () => {
        const inputsObligatorios = pasos[pasoActual].querySelectorAll('input[required]');
        let esValido = true;

        inputsObligatorios.forEach(input => {
            if (!input.value) esValido = false;
        });

        if (esValido && pasoActual < pasos.length - 1) {
            // Ocultar actual y marcar como completado
            pasos[pasoActual].classList.add('hidden');
            indicadores[pasoActual].classList.remove('active');
            
            pasoActual++;

            // Mostrar siguiente y activar indicador
            pasos[pasoActual].classList.remove('hidden');
            indicadores[pasoActual].classList.add('active');

            if (pasoActual === pasos.length - 1) {
                btnSiguiente.textContent = "Finalizar Postulación";
            }
        } else if (!esValido) {
            alert("Por favor, completa los campos requeridos antes de continuar.");
        }
    });
});
