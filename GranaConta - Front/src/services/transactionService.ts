import api from "./api";

export async function criarTransacao(
    dados: any,
    token: string
) {
    return api.post(
        "/transacoes",
        dados,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}