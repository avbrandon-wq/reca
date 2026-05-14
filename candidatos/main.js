document.addEventListener('DOMContentLoaded', () => {
    // Generar ID único RECA
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('cv-id-num').textContent = `RECA-2026-${randomId}`;

    const sync = (inId, outId) => {
        const input = document.getElementById(inId);
        if (input) {
            input.addEventListener('input', (e) => {
                document.getElementById(outId).textContent = e.target.value.toUpperCase();
            });
        }
    };

    sync('in-nombre', 'cv-nombre');
    sync('in-cedula', 'cv-cedula-out');
    sync('in-cel', 'cv-cel-out');
    sync('in-responsable', 'cv-responsable-out');
    sync('in-tipo-dis', 'cv-dis-out');

    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.getElementById('cv-foto-prev');
            img.src = reader.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    let actual = 0;

    btn.addEventListener('click', () => {
        const requeridos = pasos[actual].querySelectorAll('[required]');
        let valido = true;
        requeridos.forEach(r => { if(!r.value) valido = false; });

        if(valido) {
            pasos[actual].classList.add('hidden');
            actual++;
            if(pasos[actual]) pasos[actual].classList.remove('hidden');
            if(actual === pasos.length - 1) btn.style.display = 'none';
        } else {
            alert("Por favor, llena los campos obligatorios.");
        }
    });
});
