document
    .getElementById('registerForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const firstname = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastName').value;
        const correu = document.getElementById('correu').value;
        const pass = document.getElementById('pass').value;
        const idNumber = document.getElementById('idNumber').value;
        const data = document.getElementById('data').value;
        const genere = document.getElementById('genere').value;
        const acceptarTermes = document.getElementById('acceptarTermes').checked;

        // Tots els camps del formulari són obligatoris
        if (!firstname || !lastName || !correu || !pass || !idNumber || !data || !genere) {
            alert('Cap camp pot estar buit');
            return;
        }

        // L'usuari ha de marcar l'opció per acceptar els Termes i Condicions
        if (!acceptarTermes) {
            alert('Has d\'acceptar els termes i condicions');
            return;
        }

        // La contrasenya ha de tenir com a mínim 6 caràcters
        if (pass.length < 6) {
            alert('La contrasenya ha de tenir mínim 6 caràcters');
            return;
        }

        // L'adreça de correu electrònic ha de tenir un format vàlid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correu)) {
            alert('L\'adreça de correu electrònic no és vàlid');
        }

        // L'usuari ha de ser major d'edat per registrar-se
        const avui = new Date();
        // Variable amb la data que ens han introduït al formulari
        const aniversari = new Date(data);
        const edat = avui.getFullYear() - aniversari.getFullYear();
        if (edat < 18) {
            alert('Has de ser major d\'edat per registrar-te');
        }

        // El camp del DNI/NIF ha de tenir un format vàlid
        const dniRegex = /^[a-zA-Z0-9]?[0-9]{7}[a-zA-Z0-9]?$/;
        if (!dniRegex.test(idNumber)) {
            alert('El DNI no és vàlid');
        }


    })