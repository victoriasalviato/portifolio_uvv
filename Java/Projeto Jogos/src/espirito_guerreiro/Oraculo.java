package espirito_guerreiro;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Oraculo {
    String nome;
    Guerreiro guerreiro;
    
    public Oraculo(){
    }
    
    void setNome(String nome){
        this.nome = nome;
    }
    
    int setVidas(){
        Random gerador = new Random();
        guerreiro.vidas = gerador.nextInt(4) + 9;
        return guerreiro.vidas;
    }
    
    String prologoIntroducao(){
        InOut.MsgDeInformacao("INICIO", "Do oraculo: "+ this.nome + " para o guerreiro: "+ guerreiro.getNome() + "\nVoce tem "+ guerreiro.getVidas()+" vidas");
        return "";
    }
    
    int loadLevel1(){
        int chute = -1;
        Random gerador = new Random();
        int num = gerador.nextInt(101);
        while (guerreiro.getVidas() > 0 && num != chute){
            chute = InOut.leInt("LEVEL 1 - Chute um numero inteiro entre 0 e 100 para encontrar o segredo");
            if (chute != num){
                guerreiro.vidas -= 1;
                if (chute > num){
                    InOut.MsgDeAviso("ATENCAO","O segredo é menor que o chute, restam "+ guerreiro.getVidas()+" vidas!");
                }
                else{
                    InOut.MsgDeAviso("ATENCAO","O segredo é maior que o chute, restam "+ guerreiro.getVidas()+" vidas!");
                }
            }
            else{
                InOut.MsgDeInformacao("SUCESSO", "Parabens, voce acertou o segredo!");
                return num;
            }
        }
        InOut.MsgDeAviso("FRACASSO", "Suas vidas acabaram :(");
        return chute;    
    }
    
    int loadLevel2(int opcao){
        /** Informe a opcao:
         * Sendo 0 para escolher PAR e 1 para IMPAR
         */
        int soma = 0;
        Random gerador = new Random();
        boolean guerreiro_win = false;
        while (guerreiro.getVidas() > 0 && guerreiro_win == false){
            InOut.MsgDeInformacao("IMPAR OU PAR", "LEVEL 2 - Confime para jogar");
            int num_guerreiro = gerador.nextInt(6);
            int num_oraculo = gerador.nextInt(6);
            soma = num_oraculo + num_guerreiro;
            if (opcao == 0){
                if (soma%2 == 0){
                    guerreiro_win = true;
                }
                else{
                    guerreiro_win = false;
                }
            }
            else{
                if (soma%2 == 0){
                    guerreiro_win = false;
                }
                else{
                    guerreiro_win = true;
                }
            }
            
            if (guerreiro_win == true) {
                InOut.MsgDeInformacao("GANHOU", "O resultado deu "+soma+", voce ganhou!");
                return soma;
            }
            else{
                InOut.MsgDeAviso("PERDEU", "O resultado deu "+soma+" ... tente novamente, restam "+guerreiro.getVidas()+" vidas");
                guerreiro.vidas -= 1;
            }
         
        }
        return soma;
    }
    
    boolean decidirVidaExtra(String misericordia){
        int num_espaco = 0;
        List<String> pedido = new ArrayList<>();
        int indice = 0;
        while (indice < misericordia.length()){
            pedido.add(misericordia.substring(indice, indice + 1));
            indice += 1;
        }
        
        for (String s: pedido){
            if (" ".equals(s)){
                num_espaco += 1;
            }
        }
  
        if (num_espaco > 4){
            InOut.MsgDeInformacao("SUCESSO", "Seu pedido de vida extra foi concedido!");
        }
        else{
            InOut.MsgDeAviso("FRACASSO", "Seu pedido de vida extra foi negado");
            return false;
        }
        
        return true;
    }
    
    String prologoVencedor(){
        InOut.MsgSemIcone("PARABENS", "Do Oraculo "+this.nome+" para o guerreiro "+guerreiro.getNome()+" - VENCEDOR");
        return "";
    }
    
    String prologoPerdedor(){
        InOut.MsgSemIcone("FRACASSO", "Do Oraculo "+this.nome+" para o guerreiro "+guerreiro.getNome()+" - PERDEDOR");
        return "";
    }
}
