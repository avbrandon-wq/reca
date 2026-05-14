document.addEventListener('DOMContentLoaded', () => {
    // Generación de ID Único
    const cvId = `RECA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('cv-id-num').textContent = cvId;

    const btn = document.getElementById('btn-siguiente');
    const pasos = document.querySelectorAll('.form-step');
    let actual = 0;

    // Sincronización en tiempo real
    const sync = (idIn, idOut) => {
        document.getElementById(idIn).addEventListener('input', (e) => {
            document.getElementById(idOut).textContent = e.target.value.toUpperCase();
        });
    };

    sync('in-nombre', 'cv-nombre');
    sync('in-email', 'cv-email');
    sync('in-tel', 'cv-tel');

    // Carga de Foto
    document.getElementById('in-foto').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('cv-foto-prev').src = reader.result;
        reader.readAsDataURL(e.target.files[0]);
    });

    // Navegación por pasos
    btn.addEventListener('click', () => {
        const requeridos = pasos[actual].querySelectorAll('input[required]');
        let esValido = true;
        requeridos.forEach(i => { if(!i.value) esValido = false; });

        if(esValido) {
            pasos[actual].classList.add('hidden');
            actual++;
            if(pasos[actual]) {
                pasos[actual].classList.remove('hidden');
            }
            
            if(actual === pasos.length - 1) {
                btn.classList.add('hidden');
            }
        } else {
            alert("Completa todos los campos con * para continuar.");
        }
    });
});
