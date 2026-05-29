class Transacao {
    constructor(id, descricao, valor, tipo, data) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.data = data;
    }
}
module.exports = Transacao;