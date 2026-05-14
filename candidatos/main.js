document.addEventListener('DOMContentLoaded', () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const idFinal = `RECA-2026-${randomId}`;
    document.getElementById('cv-id-num').textContent = idFinal;

    // --- Sincronización de campos (Se mantiene igual) ---
    const sync = (inId, outId) => {
        const input = document.getElementById(inId);
        if (input) input.addEventListener('input', (e) => {
            document.getElementById(outId).textContent = e.target.value.toUpperCase();
        });
    };
    sync('in-nombre', 'cv-nombre');
    sync('in-cedula', 'cv-cedula-out');
    sync('in-cel', 'cv-cel-out');
    sync('in-responsable', 'cv-responsable-out');
    sync('in-tipo-dis', 'cv-dis-out');

    // --- Lógica de la Foto ---
    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.getElementById('cv-foto-prev');
            img.src = reader.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // --- FUNCIÓN PARA DESCARGAR PDF ---
    document.getElementById('btn-download').addEventListener('click', () => {
        const elemento = document.getElementById('cv-to-pdf');
        const opciones = {
            margin: 10,
            filename: `HV_${idFinal}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opciones).from(elemento).save();
    });

    // --- Navegación entre pasos ---
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
