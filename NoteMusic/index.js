class Musica {
    constructor(nome, album, artista, genero) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.genero = genero;
    }

    async cadastrar() {
        try {
            // Verifica se a música já está cadastrada
            const repetido = await this.verifica_Repeticao();

            if (repetido) {
                alert('Música já cadastrada! Por favor, adicione outra música.');
            } else {
                // Se não estiver cadastrada, cadastra a música
                const response = await this.cadastro();
                if (response.status === 200) {
                    alert('Música Cadastrada com sucesso!');
                } else {
                    alert('Erro no Cadastro! Verifique se os dados estão corretos.');
                }
            }
        } catch (error) {
            alert('Erro ao processar a solicitação.');
        }
    }

    async verifica_Repeticao() {
        try {
            const response = await fetch('/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: this.nome,
                    album: this.album,
                    artista: this.artista,
                    genero: this.genero
                })
            });

            const data = await response.text();
            return data === 'true'; // Assuma que o servidor retorna 'true' ou 'false'
        } catch (error) {
            console.error('Erro ao verificar repetição:', error);
            return false;
        }
    }

    async cadastro() {
        try {
            const response = await fetch('/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: this.nome,
                    album: this.album,
                    artista: this.artista,
                    genero: this.genero
                })
            });

            return response;
        } catch (error) {
            console.error('Erro ao cadastrar música:', error);
            return { status: 500 };
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('musicForm');
    const nomeInput = document.getElementById('nome');
    const albumInput = document.getElementById('album');
    const artistaInput = document.getElementById('artista');
    const generoSelect = document.getElementById('genero');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = nomeInput.value;
        const album = albumInput.value;
        const artista = artistaInput.value;
        const genero = generoSelect.value;

        const musica = new Musica(nome, album, artista, genero);
        await musica.cadastrar();
    });
});