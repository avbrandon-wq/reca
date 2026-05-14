// Esperamos a que el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    const btnSiguiente = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    const indicadores = document.querySelectorAll('.step');
    let pasoActual = 0;

    btnSiguiente.addEventListener('click', () => {
        // 1. Validar si el paso actual tiene los campos obligatorios llenos
        const inputs = pasos[pasoActual].querySelectorAll('input[required]');
        let todoValido = true;

        inputs.forEach(input => {
            if (!input.value) {
                todoValido = false;
                input.style.borderColor = 'red'; // Feedback visual simple
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (todoValido) {
            // 2. Ocultar paso actual
            pasos[pasoActual].classList.add('hidden');
            indicadores[pasoActual].classList.remove('active');
            indicadores[pasoActual].classList.add('completed');

            // 3. Avanzar al siguiente
            pasoActual++;

            if (pasoActual < pasos.length) {
                pasos[pasoActual].classList.remove('hidden');
                indicadores[pasoActual].classList.add('active');
            }

            // 4. Si llegamos al último paso, cambiamos el texto del botón
            if (pasoActual === pasos.length - 1) {
                btnSiguiente.textContent = "Finalizar y Agendar";
                btnSiguiente.style.backgroundColor = "#28a745"; // Verde éxito
            }
        } else {
            alert("Por favor, completa los campos obligatorios.");
        }
    });
});
