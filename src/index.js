document
    .getElementById('registerForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const firstname = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastName').value;
        const correu = document.getElementById('correu').value;
        const pass = document.getElementById('pass').value;
        const dni = document.getElementById('dni').value;
        const data = document.getElementById('data').value;
        const genere = document.getElementById('genere').value;
        const acceptarTermes = document.getElementById('acceptarTermes').checked;

        // Validar que tots els camps siguin obligatoris
        if (!firstname || !lastName || !correu || !pass || !dni || !data || !genere) {
            alert('Cap camp pot estar buit');
            return;
        }
        if (!acceptarTermes) {
            alert('Has d\'acceptar els termes i condicions');
            return;
        }

        // Validar que la contrasenya tingui com a mínim 6 caràcters
        if (pass.length < 6) {
            alert('La contrasenya ha de tenir mínim 6 caràcters');
            return;
        }

        // Adreça del correu ha de tenir un format vàlid

    }) 