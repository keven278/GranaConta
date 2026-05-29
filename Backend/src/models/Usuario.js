class Usuario {
    constructor(id, nome, email, senha, rendaMensal) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.rendaMensal = rendaMensal;
    }
}
module.exports = Usuario;