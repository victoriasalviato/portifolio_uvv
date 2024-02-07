package espirito_guerreiro;


public class Espirito_guerreiro {

    public static void main(String[] args) {
        boolean passouLvl1 = false, passouLvl2 = false;
        Oraculo o1 = new Oraculo();
        o1.setNome("Roberval");
        InOut.MsgDeInformacao("ESPIRITO GUERREIRO", "Confirme para iniciar");
        Guerreiro g1 = new Guerreiro();
        o1.guerreiro = g1;
        String nome = InOut.leString("Qual seu nome meu nobre guerreiro?");
        g1.setNome(nome);
        InOut.MsgDeInformacao("ESPIRITO GUERREIRO", "Agora iremos definir sua quantidade de vidas");
        o1.setVidas();
        o1.prologoIntroducao();
        
        while (true) {
            if (g1.getVidas()>0 && false == passouLvl1){
                o1.loadLevel1();
                if (g1.getVidas()>0){
                    passouLvl1 = true;
                }
            }
            if (g1.getVidas()>0 && true == passouLvl1 && false == passouLvl2){
                int opc = InOut.leInt("LEVEL 2 - nesse nivel voce deve escolher 0 para PAR ou 1 para IMPAR");
                o1.loadLevel2(opc);
                if (g1.getVidas()>0){
                    passouLvl2 = true;
                }
            }
            if (g1.getVidas()>0 && true == passouLvl1 && true == passouLvl2){
                o1.prologoVencedor();
                break;
            }
            else{
                InOut.MsgDeAviso("ESPIRITO GUERREIRO", "suas vidas acabaram, mas voce pode tentar mandar uma mensagem de misericordia para o oraculo");
                boolean viver = o1.decidirVidaExtra(g1.vidaExtra());
                if (viver == false){
                    o1.prologoPerdedor();
                    break;
                }
            }
        }
    }
    
}
