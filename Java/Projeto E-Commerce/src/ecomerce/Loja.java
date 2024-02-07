package ecomerce;

import java.util.*;

public class Loja {
    ArrayList<Pedido> listaPedidos = new ArrayList();
    Funcionario funcionario;
    Random gerador = new Random();
    
    public Loja() {
    }
    
    void definirFuncionario(Funcionario f){
        this.funcionario = f;
    }
    
    void inserirPedido(){
        Pedido p = new Pedido(this.gerador);
        if (InOut.leInt("1 - para adicionar itens agora\n0 - sair") == 1){
            listaPedidos.add(p.inserirItem());
        }
        else{
            listaPedidos.add(p);
        }
    }
    
    void removerPedido(){
        this.verPedidos();
        int cod = InOut.leInt("Qual o codigo do pedido que deseja remover?");
        int indice = 0;
        int indice_remover = 0;
        boolean encontrei = false;
        for (Pedido p: listaPedidos){
            if (p.getPedidoID() == cod){
                indice_remover = indice;
                encontrei = true;
            }
            indice += 1;
        }
        if (encontrei == true){
            listaPedidos.remove(indice_remover);
            InOut.MsgDeInformacao("", "pedido removido");
        }
        else{
            InOut.MsgDeAviso("", "pedido não encontrado");
        }
        
    }
    
    void buscarPedido(){
        this.verPedidos();
        int cod = InOut.leInt("Qual o codigo do pedido que deseja buscar?");
        boolean encontrei = false;
        for (Pedido p: listaPedidos){
            if (p.getPedidoID() == cod){
                encontrei = true;
                InOut.MsgDeInformacao("Pedido: "+p.getPedidoID(), "data emissao: "+p.getData()+"\nItens:"+p.verItens()+"\nValor total: R$"+p.totalPedido());
            }
        }
    }
    
    void manipularPedido(){
        this.verPedidos();
        int cod = InOut.leInt("Qual o codigo do pedido que deseja manipular?");
        boolean encontrei = false;
        for (Pedido p: listaPedidos){
            if (p.getPedidoID() == cod){
                encontrei = true;
                p.manipularPedido();
            }
        }
        if (encontrei == false){
            InOut.MsgDeErro("", "Pedido nao encontrado!");
        }
        
    }
    
    void verPedidos(){
        for (Pedido p: listaPedidos){
            System.out.println("Cod: "+p.pedidoID +" - data de emissao: "+ p.dataEmissao);
        }
    }
    
    void verItensPedido(int codigo){
        for (Pedido p: listaPedidos){
            if (p.pedidoID == codigo){
                p.verItens();
            }
        }
    }
    
    float valorTotal(){
        this.verPedidos();
        int cod = InOut.leInt("Qual o codigo do pedido que deseja ver o valor?");
        int indice = 0;
        boolean encontrei = false;
        for (Pedido p: listaPedidos){
            if (p.getPedidoID() == cod){
                encontrei = true;
                return p.totalPedido();
            }
        }
        return 0;
    }
    
}
