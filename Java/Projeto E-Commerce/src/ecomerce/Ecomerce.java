package ecomerce;

public class Ecomerce {

    public static void main(String[] args) {
        Loja minha_loja = new Loja();
        Funcionario f1 = new Funcionario();
        minha_loja.definirFuncionario(f1);
        f1.nome = InOut.leString("Informe seu nome");
        while (true){
            int opc = InOut.leInt("O que deseja fazer:\n1 - adicionar pedido\n2 - remover pedido\n3 - buscar pedido\n4 - manipulacao de pedidos\n0 - sair do programa");
            if (opc == 1){
                minha_loja.inserirPedido();
            }
            if (opc == 2){
                minha_loja.removerPedido();
            }
            if (opc == 3){
                minha_loja.buscarPedido();
            }
            if (opc == 4){
                minha_loja.manipularPedido();
            }
            if (opc == 0){
                break;
            }
        }
    }
    
}
