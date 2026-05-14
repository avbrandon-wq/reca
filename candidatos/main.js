document.addEventListener('DOMContentLoaded', () => {
    // Generar Código de Identificación Único
    const randomID = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('cv-id-num').textContent = `RECA-2026-${randomID}`;

    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    let actual = 0;

    // Actualización en tiempo real
    const inputs = ['nombre', 'email', 'tel'];
    inputs.forEach(id => {
        document.getElementById(`in-${id}`).addEventListener('input', (e) => {
            document.getElementById(`cv-${id}`).textContent = e.target.value.toUpperCase();
        });
    });

    // Manejo de la Foto
    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(){
            document.getElementById('cv-foto-prev').src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Navegación
    btn.addEventListener('click', () => {
        const inputsRequired = pasos[actual].querySelectorAll('input[required]');
        let valido = true;
        inputsRequired.forEach(i => { if(!i.value) valido = false; });

        if(valido && actual < pasos.length - 1) {
            pasos[actual].classList.add('hidden');
            actual++;
            pasos[actual].classList.remove('hidden');
            if(actual === pasos.length - 1) btn.style.display = 'none';
        } else if(!valido) {
            alert("Por favor, llena los campos obligatorios.");
        }
    });
});
