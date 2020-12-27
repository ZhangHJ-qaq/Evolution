class Kangaroo {

    static geneLength = 16;
    gene;

    constructor() {

        this.gene = "";
        for (let i = 0; i < Kangaroo.geneLength; i++) {
            this.gene += Math.round(Math.random());

        }


    }

    mutate() {//调用这个函数时，袋鼠有一定可能发生变异

        //随机生成0~1的浮点数
        let x = Math.random();

        let newGene = "";

        let mutationProb = 0.02;//袋鼠有2%的可能性发生变异。

        //袋鼠有2%的可能发生变异
        if (x <= mutationProb) {
            //变异发生时，每一位上发生突变的概率是2%
            for (let i = 0; i < this.gene.length; i++) {
                let x2 = Math.random();
                if (x2 <= mutationProb) {
                    newGene += this.gene.charAt(i);
                } else {
                    if (this.gene.charAt(i) === '0') {
                        newGene += '1';
                    } else {
                        newGene += '0';
                    }
                }

            }


        } else {
            newGene = this.gene;
        }

        this.gene = newGene;

    }


}