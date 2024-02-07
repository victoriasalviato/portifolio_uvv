package ecomerce;

import java.util.*;

public class Pedido {
    int pedidoID;
    Date dataEmissao; 
    float valorTotalCalculado;
    ArrayList<itemPedido> itens = new ArrayList<>();
    
    public Pedido(Random gerador) {
        this.pedidoID = gerador.nextInt(8999)+1000;
        this.dataEmissao = new Date();
    }
    
    int getPedidoID(){
        return this.pedidoID;
    }
    
    Date getData(){
        return this.dataEmissao;
    }
    
    Pedido inserirItem(){
        int parar = 1;
        while (parar == 1){
            itens.add(this.adicionarItem());
            parar = InOut.leInt("1 - adicionar outro item\n0 - sair");
        }
        return this;
    }
    
    itemPedido adicionarItem(){
        itemPedido i = new itemPedido();
        i.criarItem();
        return i;
    }
    
    
    void removerItem(String i){
        int indice = 0;
        int remover = 0;
        for (itemPedido item: itens){
            if (item.getItem() == i){
                remover = indice;
            }
            indice += 1;
        }
        itens.remove(remover);
        InOut.MsgDeInformacao("", "Item removido!");
    }
    
    String verItens(){
        String todosItens = "";
        for (itemPedido i: itens){
            todosItens += ("\nItem: "+i.getItem()+" - Qndt: "+i.getQuantidade()+" - precoUnd: "+i.getPrecoUnd());
            System.out.println(todosItens);
        }
        return todosItens;
    }
    
    float totalPedido(){
        float soma = 0;
        for (itemPedido i: itens){
            soma += i.getQuantidade() * i.getPrecoUnd();
        }
        return soma;
    }
    
    void manipularPedido(){
        while (true){
            int opc = InOut.leInt("O que deseja fazer?\n1 - adicionar item\n2 - remover item\n3 - alterar quantidade do item\n4 - alterar preco do item\n0 - sair");
            if (opc != 0 && opc != 1){
                System.out.println(this.verItens());
                String item = InOut.leString("Qual item deseja manipular?");
                boolean encontrei = false;
                for (itemPedido i: itens){
                    if (i.getItem().equals(item)){
                        encontrei = true;
                        if (opc == 2){
                            this.removerItem(item);
                        }
                        if (opc == 3){
                            int qnt = InOut.leInt("Qual a nova quantidade que deseja atribuir a este item?");
                            i.alterarQuantidade(qnt);
                        }
                        if (opc == 4){
                            float preco = InOut.leFloat("Qual o novo preco que deseja atribuir a este item?");
                            i.alterarPreco(preco);
                        }
                    }
                }
                if (encontrei == false){
                    InOut.MsgDeErro("", "Item nao encontrado");
                }
            }
            if (opc == 1){
                int parar = 1;
                while (parar == 1){
                    itens.add(this.adicionarItem());
                    parar = InOut.leInt("1 - adicionar outro item\n0 - sair");
                }        
            }
            if (opc == 0){
                break;
            }
        }
    }

}
