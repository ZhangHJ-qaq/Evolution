class KangarooProblem {

    function = (x) => {
        return Math.cos(x)+Math.sin(2*x);
    }
    lowerBound = -4;
    higherBound = 4;
    kangaroos;


    constructor(kangarooNum) {
        this.kangaroos = new Set();
        for (let i = 0; i < kangarooNum; i++) {
            this.kangaroos.add(new Kangaroo());
        }

    }

    getKangarooPosition(kangaroo) {
        let gene = kangaroo.gene;
        let gap = this.higherBound - this.lowerBound;

        let intFromGene = binaryStringToInt(gene);
        let maximum = Math.pow(2, Kangaroo.geneLength);

        let result = this.lowerBound + gap * intFromGene / maximum;

        return result;

    }

    getKangarooHeight(kangaroo) {
        return this.function(this.getKangarooPosition(kangaroo));
    }


    //选择过程，淘汰掉高度在后一半的袋鼠
    selection() {
        let kangarooArray = [];
        for (let singleKangaroo of this.kangaroos) {
            kangarooArray[kangarooArray.length] = singleKangaroo;
        }


        kangarooArray.sort((kangarooA, kangarooB) => {
                return this.getKangarooHeight(kangarooB) - this.getKangarooHeight(kangarooA);
            }
        );

        this.kangaroos.clear();

        for (let i = 0; i < kangarooArray.length / 2; i++) {
            this.kangaroos.add(kangarooArray[i]);
        }

        // let k = Math.floor(heightArray.length / 2);
        //
        // let mediumHeight = heightArray[k];
        //
        //
        // for (let singleKangaroo of this.kangaroos) {
        //
        //     let height = this.getKangarooHeight(singleKangaroo);
        //
        //     if (height < mediumHeight) {
        //         this.kangaroos.delete(singleKangaroo);
        //     }
        //
        // }

    }

    //袋鼠变异
    mutate() {
        for (let singleKangaroo of this.kangaroos) {
            singleKangaroo.mutate();
        }

    }

    //把两只袋鼠基因进行交换，生出两只新的袋鼠
    geneExchange() {

        let kangaroosArray = [];
        for (let singleKangaroo of this.kangaroos) {
            kangaroosArray[kangaroosArray.length] = singleKangaroo;//读出全部的袋鼠
        }

        shuffleSelf(kangaroosArray);

        for (let i = 0; i + 1 < kangaroosArray.length; i += 2) {
            let gene1 = kangaroosArray[i].gene;
            let gene2 = kangaroosArray[i + 1].gene;

            let exchangeStart = randomNum(0, Kangaroo.geneLength);
            let exchangeEnd = randomNum(0, Kangaroo.geneLength);

            if (exchangeEnd < exchangeStart) {
                let tmp = exchangeStart;
                exchangeStart = exchangeEnd;
                exchangeEnd = tmp;
            }

            //交换[exchangeStart,exchangeEnd)的基因


            let gene1A = gene1.substring(0, exchangeStart);
            let gene1B = gene1.substring(exchangeStart, exchangeEnd);
            let gene1C = gene1.substring(exchangeEnd, gene1.length);

            let gene2A = gene2.substring(0, exchangeStart);
            let gene2B = gene2.substring(exchangeStart, exchangeEnd);
            let gene2C = gene2.substring(exchangeEnd, gene2.length);

            let gene3 = gene1A + gene2B + gene1C;
            let gene4 = gene2A + gene1B + gene2C;

            let baby1 = new Kangaroo();
            let baby2 = new Kangaroo();

            baby1.gene = gene3;
            baby2.gene = gene4;

            this.kangaroos.add(baby1);
            this.kangaroos.add(baby2);

        }


    }


    //选择->交换->变异的整个流程
    evolve() {
        this.selection();
        this.geneExchange();
        this.mutate();
    }


}