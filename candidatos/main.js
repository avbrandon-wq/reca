document.addEventListener('DOMContentLoaded', () => {
    // Generar ID único RECA
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('cv-id-num').textContent = `RECA-2026-${randomId}`;

    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    let actual = 0;

    // Sincronizar datos en tiempo real
    const inputs = ['nombre', 'cedula', 'cel', 'responsable', 'tipo-dis'];
    inputs.forEach(id => {
        const inputEl = document.getElementById(`in-${id}`);
        if(inputEl) {
            inputEl.addEventListener('input', (e) => {
                const targetId = id === 'tipo-dis' ? 'cv-dis' : `cv-${id}`;
                document.getElementById(targetId).textContent = e.target.value.toUpperCase();
            });
        }
    });

    // Carga de Foto optimizada
    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.getElementById('cv-foto-prev');
            img.src = reader.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Navegación entre capítulos
    btn.addEventListener('click', () => {
        const requiredFields = pasos[actual].querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(f => { if(!f.value) valid = false; });

        if(valid) {
            pasos[actual].classList.add('hidden');
            actual++;
            if(pasos[actual]) pasos[actual].classList.remove('hidden');
            if(actual === pasos.length - 1) btn.style.display = 'none';
        } else {
            alert("Por favor, llena los campos obligatorios para continuar.");
        }
    });
});
