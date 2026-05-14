document.addEventListener('DOMContentLoaded', () => {
    // Generar ID Único
    const idUnico = `RECA-${Math.floor(10000 + Math.random() * 90000)}`;
    document.getElementById('cv-id-num').textContent = idUnico;

    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    let actual = 0;

    // Sincronización de campos
    const inputs = ['nombre', 'cedula', 'cel', 'responsable', 'tipo-dis'];
    inputs.forEach(id => {
        const el = document.getElementById(`in-${id}`);
        if(el) {
            el.addEventListener('input', (e) => {
                const targetId = id === 'tipo-dis' ? 'cv-dis' : `cv-${id}`;
                document.getElementById(targetId).textContent = e.target.value.toUpperCase();
            });
        }
    });

    // Vista previa de foto
    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('cv-foto-prev').src = reader.result;
        reader.readAsDataURL(e.target.files[0]);
    });

    // Navegación
    btn.addEventListener('click', () => {
        const requeridos = pasos[actual].querySelectorAll('[required]');
        let esValido = true;
        requeridos.forEach(r => { if(!r.value) esValido = false; });

        if(esValido) {
            pasos[actual].classList.add('hidden');
            actual++;
            if(pasos[actual]) pasos[actual].classList.remove('hidden');
            if(actual === pasos.length - 1) btn.style.display = 'none';
        } else {
            alert("Por favor, complete los campos obligatorios.");
        }
    });
});
