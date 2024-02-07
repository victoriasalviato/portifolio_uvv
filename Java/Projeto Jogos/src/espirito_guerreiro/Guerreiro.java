package espirito_guerreiro;

public class Guerreiro {
    String nome;
    int vidas;

    public Guerreiro() {
    }
    
    void setNome(String nome){
        this.nome = nome;
    }
    
    int getVidas(){
        return this.vidas;
    }
    
    String getNome(){
        return this.nome;
    }
    
    String vidaExtra(){
        String suplica = InOut.leString("Envie sua suplica para o Oraculo pedindo mais uma vida");
        
        return suplica;
    }
}
