document.getElementById('cadastroForm').addEventListener('submit', cadastrarJogo);
var result = 0;
function cadastrarJogo(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const plataform = document.getElementById('plataform').value;

    fetch('http://localhost:8080/jogo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, plataform }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Jogo cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar jogo:', error);
        });
    window.reload;
}
function pesquisarJogo() {
    const searchId = document.getElementById('searchId').value;

    fetch(`http://localhost:8080/jogo/${searchId}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Jogo não encontrado');
                result = 0;
            }
            return response.json();
        })
        .then(data => {
            result = 1;
            document.getElementById('name').value = `${data.name}`;
            document.getElementById('plataform').value = `${data.plataform}`;
        })
        .catch(error => {
            console.error('Erro ao pesquisar jogo:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Jogo não encontrado.';

        });
}
function atualizarJogo() {
    pesquisarJogo();
    if (result == 1) {
        const name = document.getElementById('name').value;
        const plataform = document.getElementById('plataform').value;
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/jogo/${searchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, plataform }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Jogo atualizado com sucesso!');
                document.getElementById('cadastroForm').reset();
            })
            .catch(error => {
                console.error('Erro ao atualizar jogo:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum jogo foi alterado. Favor pesquisar jogo a ser alterado !!!');
    }
    window.reload;
}

function excluirJogo() {
    pesquisarJogo();
    if (result == 1) {
        const name = document.getElementById('name').value;
        const plataform = document.getElementById('plataform').value;
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/jogo/${searchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, plataform })
        })
            .then(response => {
				if(response.status===200){
					alert('Jogo apagado com sucesso!');
                document.getElementById('cadastroForm').reset();
				}          
            })
            .catch(error => {
                console.error('Erro ao excluir jogo:', error);
            });
            location.reload;
                document.getElementById('name').value = "";
                document.getElementById('plataform').value = "";
                document.getElementById('searchId').value = "";
    } else {
        alert('ID não encontrado na base de dados. Nenhum jogo foi alterado. Favor pesquisar jogo a ser alterado !!!');
    }
    window.reload;

}

var num = 0;
function left() {
    if (num != 1) {
        num++
    }
    if (num == 1) {
        document.querySelector('#test').innerHTML = `<button type="button" onclick="atualizarJogo()">🔁Atualizar</button>`
    }
    if (num == 0) {
        document.querySelector('#test').innerHTML = `<button id="botao" type="submit">Cadastrar</button>`
    }
    if (num == -1) {
        document.querySelector('#test').innerHTML = `<button type="button" onclick="excluirJogo()">❌Excluir</button>`
    }
}

function right() {

    if (num != -1) {
        num--
    }

    if (num == 0) {
        document.querySelector('#test').innerHTML = `<button id="botao" type="submit">Cadastrar</button>`
    }
    if (num == -1) {
        document.querySelector('#test').innerHTML = `<button type="button" onclick="excluirJogo()">❌Excluir</button>`
    }
    if (num == 1) {
        document.querySelector('#test').innerHTML = `<button type="button" onclick="atualizarJogo()">🔁Atualizar</button>`
    }
}