export class Randomizer {
    static getRandomElement<T>(arr: Array<T>, currentEelement?: T): T {
        // If currentElement was not provided, or if the array only has 1 element, just return a normal random element
        if (!currentEelement || arr.length < 2)
            return this.random(arr);

        // If currentElement was provided, then keep randomizing until we get an element that's different than the currnet one
        let item: T;
        while (item == null || item == currentEelement) {
            item = this.random(arr);
        }

        return item;
    }

    private static random<T>(arr: Array<T>): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static shuffleArray(array: any[]): any[] {
        let currentIndex = array.length;
        let temporaryValue: any;
        let randomIndex: any;;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}