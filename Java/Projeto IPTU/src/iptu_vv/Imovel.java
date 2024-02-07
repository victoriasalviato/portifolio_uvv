package iptu_vv;

public class Imovel {
    String nome;
    double imposto;
    int meses_atraso;
    float valor;
    Municipio cidade;

    public Imovel(String nome, int meses_atraso, float valor) {
        this.nome = nome;
        this.meses_atraso = meses_atraso;
        this.valor = valor;
        this.definirImposto(this.meses_atraso);
    }
    
    
    public Imovel(){
        
    }
    
    void definirNome(String nome){
        this.nome = nome;
    }
    
    void definirMesesAtraso(int meses){
        this.meses_atraso = meses;
        this.definirImposto(this.meses_atraso);
    }
    
    void definirValor(float valor){
        this.valor = valor;
    }
    
    
    private void definirImposto(int meses){
        if (meses <= 5){
            this.imposto = 0.01;
        }
        if (meses > 5 && meses <= 8){
            this.imposto = 0.023;
        }
        if (meses > 8 && meses <= 10){
            this.imposto = 0.03;
        }
        if (meses > 10 && meses <= 12){
            this.imposto = 0.054;
        }
        if (meses > 12){
            this.imposto = 0.1;
        }
    }
    
    double valorMulta(){
        //double multa = 1*(Math.pow((1+this.imposto), this.meses_atraso)) - 1;
        double multa = this.valor * this.imposto * this.meses_atraso;
        return multa;
    }
}
