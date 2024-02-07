package iptu_vv;


public class IPTU_vv {

    public static void main(String[] args) {
        Municipio vv = new Municipio();
        
        
        Imovel i1 = new Imovel();
        i1.definirNome("Pedro");
        i1.definirMesesAtraso(10);
        i1.definirValor(250000);
        Imovel i2 = new Imovel("Davi", 4, 170000);
        Imovel i3 = new Imovel("Junior", 6, 150000);
        
        vv.AdicionarImovel(i1);
        vv.AdicionarImovel(i2);
        vv.AdicionarImovel(i3);
        
        vv.exibirImoveis();
        
        vv.pesquisarMultaPorNome("Pedro");
        vv.pesquisarMultaPorNome("Davi");
        vv.pesquisarMultaPorNome("Junior");
        
    }
    
}
