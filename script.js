class Pessoa {
    constructor(nome, email, dtNascimento, telefone, celular) {
        this.nome = nome;
        this.email = email;
        this.dtNascimento = dtNascimento;
        this.telefone = telefone;
        this.celular = celular;
    }
}

class Professor extends Pessoa {
    constructor(nome, email, dtNascimento, telefone, celular, area, matriculaProf, lattes) {
        super(nome, email, dtNascimento, telefone, celular);
        this.perfil = 'Professor';
        this.area = area;
        this.matriculaProf = matriculaProf;
        this.lattes = lattes;
    }
}

class Aluno extends Pessoa {
    constructor(nome, email, dtNascimento, telefone, celular, curso, matriculaAluno) {
        super(nome, email, dtNascimento, telefone, celular);
        this.perfil = 'Aluno';
        this.curso = curso;
        this.matriculaAluno = matriculaAluno;
    }
}

function mostrarErro(id, msg) {
    document.getElementById('err-' + id).textContent = msg;
    document.getElementById(id).classList.remove('error');
}

function limparErro(id) {
    document.getElementById('err-' + id).textContent = '';
    document.getElementById(id).classList.remove('error');
}

function validarCampo(id) {
    const el = document.getElementById(id);
    if (!el || el.closest('[style*="display: none"], [style*="display: none"]')) {
        limparErro(id);
        return true;
    }

    const val = el.value.trim();

    if (id === 'nome') {
        if(!val) {
            mostrarErro('nome', 'Nome obrigatório'); 
            return false;
        }
        if (!/^[^\s]+\s+[^\s]+/.test(val)) { 
            mostrarErro('nome', 'Informe nome e sobrenome'); 
            return false; 
        }
    }

    else if (id === 'email') {
        if (!val) { 
            mostrarErro('email', 'Email obrigatório'); 
            return false; 
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { 
            mostrarErro('email', 'Email inválido'); 
            return false; 
        }
    }

    else if (id === 'dtNascimento') {
        if (!val) { 
            mostrarErro('dtNascimento', 'Data obrigatória'); 
            return false; 
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) { 
            mostrarErro('dtNascimento', 'Formato: dd/mm/aaaa'); 
            return false; 
        }
    }

    else if (id === 'telefone') {
        if (!val) { 
            mostrarErro('telefone', 'Telefone fixo obrigatório'); 
            return false; 
        }
        if (!/^\(\d{2}\)\d{4}-\d{4}$/.test(val)) { 
            mostrarErro('telefone', 'Formato: (99)9999-9999'); 
            return false; 
        }
    }

    else if (id === 'celular') {
        if (!val) { 
            mostrarErro('celular', 'Celular obrigatório'); 
            return false; 
        }
        if (!/^\(\d{2}\)\d{4,5}-\d{4}$/.test(val)) { 
            mostrarErro('celular', 'Formato: (99)99999-9999'); 
            return false; 
        }
    }

    else if (id === 'area' || id === 'lattes' || id === 'curso') {
        if (!val) { 
            mostrarErro(id, 'Campo obrigatório'); 
            return false; 
        }
    }

    else if (id === 'matriculaProf') {
        if (!val) { 
            mostrarErro('matriculaProf', 'Matrícula obrigatória'); 
            return false; 
        }
        if (!/^\d{5}$/.test(val)) { 
            mostrarErro('matriculaProf', 'Matrícula: 5 dígitos'); 
            return false; 
        }
    }

    else if (id === 'matriculaAluno') {
        if (!val) { 
            mostrarErro('matriculaAluno', 'Matrícula obrigatória'); 
            return false; 
        }
        if (!/^\d{10}$/.test(val)) { 
            mostrarErro('matriculaAluno', 'Matrícula: 10 dígitos'); 
            return false; 
        }
    }
 
    limparErro(id);
    return true;
}

document.querySelectorAll('input[name="perfil"').forEach(radio => {
    radio.addEventListener('change', function () {
        const isProfessor = this.value === 'professor';
        document.getElementById('campos-professor').style.display = isProfessor ? '' : 'none';
        document.getElementById('campos-alunos').style.display = isProfessor ? 'none' : '';
        ['area', 'lattes', 'matriculaProf', 'curso', 'matriculaAluno'].forEach(id => limparErro(id));
    });
});

const campos = ['nome', 'email', 'dtNascimento', 'telefone', 'celular', 'area', 'latter', 'matriculaProf', 'matriculaAluno'];

campos.forEach(id => {
    document.getElementById(id).addEventListener('blur', () => validarCampo(id));
});

document.getElementById('btnEnviar').addEventListener('click', function() {
    const validos = campos.map(id => validarCampo(id));
    if (!validos.every(Boolean)) return;

    const pf = id => document.getElementById(id).value;
    const perfil = document.querySelector('input[name="perfil"]:checked').value;
    let cadastro;

    if (perfil === 'professor') {
        cadastro = new Professor (pf('nome')), pf('email'), pf('dtNascimento'), pf('telefone'), pf('celular'), pf('area'), pf('matriculaProf'), pf('lattes');
    } else {
        cadastro = new Aluno (pf('nome')), pf('email'), pf('dtNascimento'), pf('telefone'), pf('celular'), pf('curso'), pf('matriculaAluno');
    }

    console.log('Cadastro:', cadastro);
    document.getElementById('success-data').textContent = JSON.stringify(cadastro, null, 2);
    document.getElementById('success-msg').style.display = 'block';
});

document.getElementById('btnRedefinir').addEventListener('click', function () {
    campos.forEach(id => {
        document.getElementById(id).value = '';
        limparErro(id);
    });
    document.getElementById('rProfessor').checked = true;
    document.getElementById('campos-professor').style.display = '';
    document.getElementById('campos-aluno').style.display = 'none';
    document.getElementById('success-msg').style.display = 'none';
});