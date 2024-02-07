package iptu_vv;

import java.util.ArrayList;
import java.util.List;

public class Municipio {
    List<Imovel> imoveis = new ArrayList<>();
    
    public Municipio(){
        
    }
    
    void AdicionarImovel(Imovel i){
        imoveis.add(i);
    }
    
    void exibirImoveis(){
        for (Imovel i: imoveis){
            System.out.print("\nNome do proprietario: "+ i.nome +" | ");
            System.out.print("Meses de atraso: "+ i.meses_atraso + " | ");
            System.out.print("Valor do imovel: "+ i.valor + "\n");
        }
    }
    
    boolean pesquisarMultaPorNome(String nome){
        for (Imovel i: imoveis){
            if (i.nome.equals(nome)){
                double m = i.valorMulta();
                System.out.println("\nA multa dessa pessoa é de "+ m +" reais");
                return true;
            }
        }
        System.out.println("\nEssa pessoa não tem um imovel nessa cidade");
        return false;
    }
}
