package ecomerce;

public class itemPedido {
    String item;
    int quantidade;
    float precoUnitario;

    public itemPedido() {
    }
    
    String getItem(){
        return this.item;
    }
    
    int getQuantidade(){
        return this.quantidade;
    }
    
    float getPrecoUnd(){
        return this.precoUnitario;
    }
    
    itemPedido criarItem(){
        this.item = InOut.leString("Qual item deseja adicionar?");
        this.quantidade = InOut.leInt("Qual a quantidade deseja adicionar ao pedido?");
        this.precoUnitario = InOut.leFloat("Qual o preco unitario do item?");
        return this;
    }
    
    void alterarQuantidade(int q){
        this.quantidade = q;
    }
    
    void alterarPreco(float p){
        this.precoUnitario = p;
    }
}
